import { describe, it, expect } from "vitest";
import { cn, formatDate } from "@/lib/utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });
});

describe("formatDate", () => {
  it("formats date in Russian", () => {
    const result = formatDate("2025-01-20", "ru");
    expect(result).toContain("2025");
    expect(result).toContain("20");
  });

  it("formats date in English", () => {
    const result = formatDate("2025-01-20", "en");
    expect(result).toContain("2025");
    expect(result).toContain("20");
  });

  it("defaults to Russian locale", () => {
    const ru = formatDate("2025-06-15", "ru");
    const def = formatDate("2025-06-15");
    expect(def).toBe(ru);
  });
});
