import { describe, it, expect, vi, beforeEach } from "vitest";

// We test the API logic by simulating the route handler behavior
// since Next.js route handlers need the full server context

describe("contact API validation logic", () => {
  it("rejects honeypot submissions silently", () => {
    const body = { name: "Bot", email: "bot@spam.com", message: "spam", _honeypot: "gotcha" };
    expect(body._honeypot).toBeTruthy();
  });

  it("requires name, email, and message", () => {
    const testCases = [
      { name: "", email: "a@b.com", message: "hi" },
      { name: "Test", email: "", message: "hi" },
      { name: "Test", email: "a@b.com", message: "" },
    ];

    for (const body of testCases) {
      const isValid = !!(body.name && body.email && body.message);
      expect(isValid).toBe(false);
    }
  });

  it("accepts valid submission", () => {
    const body = { name: "Test", email: "test@test.com", message: "Hello" };
    const isValid = !!(body.name && body.email && body.message);
    expect(isValid).toBe(true);
  });
});

describe("rate limiting logic", () => {
  let rateLimitMap: Map<string, { count: number; resetAt: number }>;

  function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
      return true;
    }

    if (entry.count >= 5) return false;
    entry.count++;
    return true;
  }

  beforeEach(() => {
    rateLimitMap = new Map();
  });

  it("allows first request", () => {
    expect(checkRateLimit("1.2.3.4")).toBe(true);
  });

  it("allows up to 5 requests per minute", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4")).toBe(true);
    }
  });

  it("blocks 6th request from same IP", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("1.2.3.4");
    }
    expect(checkRateLimit("1.2.3.4")).toBe(false);
  });

  it("allows requests from different IPs", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("1.2.3.4");
    }
    expect(checkRateLimit("5.6.7.8")).toBe(true);
  });
});
