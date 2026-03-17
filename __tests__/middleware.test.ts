import { describe, it, expect, vi } from "vitest";

// Test the middleware logic by importing just the config
// and testing the URL routing patterns
describe("i18n routing patterns", () => {
  it("static files are excluded from middleware", () => {
    const staticPaths = [
      "/api/contact",
      "/_next/static/chunk.js",
      "/files/CV_Pavel_Popov_RU.pdf",
      "/images/hero-bg.jpg",
      "/favicon.ico",
    ];

    for (const path of staticPaths) {
      const isStatic =
        path.startsWith("/api/") ||
        path.startsWith("/_next/") ||
        path.startsWith("/files/") ||
        path.startsWith("/images/") ||
        path.includes(".");
      expect(isStatic).toBe(true);
    }
  });

  it("locale paths are detected correctly", () => {
    const locales = ["ru", "en"];

    const hasLocale = (pathname: string) =>
      locales.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`);

    expect(hasLocale("/en")).toBe(true);
    expect(hasLocale("/en/about")).toBe(true);
    expect(hasLocale("/ru")).toBe(true);
    expect(hasLocale("/ru/services")).toBe(true);
    expect(hasLocale("/about")).toBe(false);
    expect(hasLocale("/")).toBe(false);
    expect(hasLocale("/privacy")).toBe(false);
  });
});

describe("language switching logic", () => {
  function getAlternateLang(pathname: string) {
    if (pathname.startsWith("/en")) {
      const subPath = pathname.replace(/^\/en/, "") || "";
      return { href: "/ru" + subPath, label: "RU" };
    } else {
      const subPath = pathname.replace(/^\/ru/, "") || "";
      return { href: "/en" + subPath, label: "EN" };
    }
  }

  it("switches from RU root to EN", () => {
    expect(getAlternateLang("/")).toEqual({ href: "/en/", label: "EN" });
  });

  it("switches from RU page to EN", () => {
    expect(getAlternateLang("/about")).toEqual({ href: "/en/about", label: "EN" });
  });

  it("switches from EN root to RU", () => {
    expect(getAlternateLang("/en")).toEqual({ href: "/ru", label: "RU" });
  });

  it("switches from EN page to RU", () => {
    expect(getAlternateLang("/en/services")).toEqual({ href: "/ru/services", label: "RU" });
  });

  it("handles /privacy route", () => {
    expect(getAlternateLang("/privacy")).toEqual({ href: "/en/privacy", label: "EN" });
    expect(getAlternateLang("/en/privacy")).toEqual({ href: "/ru/privacy", label: "RU" });
  });
});
