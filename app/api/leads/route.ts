import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { DuplicateGuard } from "@/src/lib/duplicate-guard";
import { notifyLead } from "@/src/lib/lead-notify";
import { buildLeadFingerprint, leadSubmissionSchema, type LeadRecord } from "@/src/lib/leads";
import { SlidingWindowRateLimiter } from "@/src/lib/rate-limit";
import { persistLead } from "@/src/lib/lead-storage";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_REQUESTS = 5;
const DUPLICATE_TTL_MS = 60 * 60 * 1000;

type GlobalGuards = {
  leadLimiter?: SlidingWindowRateLimiter;
  duplicateGuard?: DuplicateGuard;
};

const guardStore = globalThis as typeof globalThis & GlobalGuards;

const leadLimiter = guardStore.leadLimiter ?? new SlidingWindowRateLimiter(RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW_MS);
const duplicateGuard = guardStore.duplicateGuard ?? new DuplicateGuard(DUPLICATE_TTL_MS);

guardStore.leadLimiter = leadLimiter;
guardStore.duplicateGuard = duplicateGuard;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = leadLimiter.check(ip);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  const rawPayload = await request.json().catch(() => null);
  if (!rawPayload || typeof rawPayload !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const parsed = leadSubmissionSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", details: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json({ ok: true, accepted: true });
  }

  const fingerprint = buildLeadFingerprint(payload);
  if (duplicateGuard.hasRecent(fingerprint)) {
    return NextResponse.json({ ok: true, duplicate: true }, { status: 202 });
  }

  duplicateGuard.add(fingerprint);

  const lead: LeadRecord = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    sourceIp: ip,
    userAgent: request.headers.get("user-agent") || "unknown",
  };

  await persistLead(lead);
  const notificationResults = await notifyLead(lead);

  return NextResponse.json({
    ok: true,
    id: lead.id,
    notifications: notificationResults,
  });
}

