type Entry = {
  count: number;
  resetAt: number;
};

export class SlidingWindowRateLimiter {
  private readonly store = new Map<string, Entry>();

  constructor(private readonly limit: number, private readonly windowMs: number) {}

  check(key: string, now = Date.now()) {
    const existing = this.store.get(key);
    if (!existing || now >= existing.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetAt: now + this.windowMs,
      };
    }

    if (existing.count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: existing.resetAt,
      };
    }

    existing.count += 1;
    return {
      allowed: true,
      remaining: Math.max(this.limit - existing.count, 0),
      resetAt: existing.resetAt,
    };
  }
}

