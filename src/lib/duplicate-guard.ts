export class DuplicateGuard {
  private readonly seen = new Map<string, number>();

  constructor(private readonly ttlMs: number) {}

  hasRecent(key: string, now = Date.now()) {
    const expiresAt = this.seen.get(key);
    if (!expiresAt) {
      return false;
    }

    if (now > expiresAt) {
      this.seen.delete(key);
      return false;
    }

    return true;
  }

  add(key: string, now = Date.now()) {
    this.seen.set(key, now + this.ttlMs);
  }
}

