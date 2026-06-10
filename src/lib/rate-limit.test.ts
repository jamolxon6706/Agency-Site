import { describe, expect, it } from "vitest";
import { DuplicateGuard } from "@/src/lib/duplicate-guard";
import { SlidingWindowRateLimiter } from "@/src/lib/rate-limit";

describe("SlidingWindowRateLimiter", () => {
  it("blocks requests after limit is reached", () => {
    const limiter = new SlidingWindowRateLimiter(2, 1000);

    expect(limiter.check("ip-1", 0).allowed).toBe(true);
    expect(limiter.check("ip-1", 100).allowed).toBe(true);
    expect(limiter.check("ip-1", 200).allowed).toBe(false);
  });

  it("resets after window", () => {
    const limiter = new SlidingWindowRateLimiter(1, 1000);

    expect(limiter.check("ip-2", 0).allowed).toBe(true);
    expect(limiter.check("ip-2", 300).allowed).toBe(false);
    expect(limiter.check("ip-2", 1200).allowed).toBe(true);
  });
});

describe("DuplicateGuard", () => {
  it("marks key as duplicate within ttl", () => {
    const guard = new DuplicateGuard(1000);
    guard.add("lead-key", 0);

    expect(guard.hasRecent("lead-key", 500)).toBe(true);
    expect(guard.hasRecent("lead-key", 1200)).toBe(false);
  });
});

