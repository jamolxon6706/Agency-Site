import { z } from "zod";

export const serviceInterestOptions = [
  "custom-crm",
  "telegram-bots",
  "dashboards",
  "landing-pages",
  "websites",
] as const;

export const budgetOptions = ["under-3k", "3k-7k", "7k-15k", "15k-plus"] as const;
export const timelineOptions = ["asap", "2-4-weeks", "1-2-months", "3-months-plus"] as const;
export const preferredLanguageOptions = ["uz", "ru"] as const;

export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(150).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  phone_or_telegram: z.string().trim().min(4).max(120),
  email: z.string().trim().email().max(150),
  service_interest: z.array(z.enum(serviceInterestOptions)).min(1).max(5),
  budget_range: z.enum(budgetOptions),
  timeline: z.enum(timelineOptions),
  project_summary: z.string().trim().min(20).max(3000),
  preferred_language: z.enum(preferredLanguageOptions),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export type LeadRecord = LeadSubmission & {
  id: string;
  createdAt: string;
  sourceIp: string;
  userAgent: string;
};

export function buildLeadFingerprint(input: Pick<LeadSubmission, "email" | "phone_or_telegram" | "project_summary">): string {
  return `${input.email.toLowerCase()}|${input.phone_or_telegram.toLowerCase()}|${input.project_summary
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()}`;
}

