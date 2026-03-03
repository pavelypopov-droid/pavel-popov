import { describe, it, expect } from "vitest";
import { translations, getTranslation } from "@/lib/i18n";
import { i18nConfig } from "@/lib/i18n-config";

describe("i18n config", () => {
  it("has ru as default locale", () => {
    expect(i18nConfig.defaultLocale).toBe("ru");
  });

  it("supports ru and en locales", () => {
    expect(i18nConfig.locales).toContain("ru");
    expect(i18nConfig.locales).toContain("en");
  });
});

describe("translations", () => {
  it("has all required top-level sections for both locales", () => {
    const sections = ["nav", "hero", "services", "cases", "about", "cta", "footer", "contacts", "blog"];
    for (const locale of ["ru", "en"] as const) {
      for (const section of sections) {
        expect(translations[locale]).toHaveProperty(section);
      }
    }
  });

  it("has matching keys between ru and en", () => {
    const ruKeys = Object.keys(translations.ru);
    const enKeys = Object.keys(translations.en);
    expect(ruKeys.sort()).toEqual(enKeys.sort());
  });

  it("nav has all expected links", () => {
    const expectedKeys = ["services", "cases", "about", "blog", "contacts", "cta"];
    for (const key of expectedKeys) {
      expect(translations.ru.nav).toHaveProperty(key);
      expect(translations.en.nav).toHaveProperty(key);
    }
  });
});

describe("getTranslation", () => {
  it("returns ru translations for 'ru'", () => {
    expect(getTranslation("ru")).toBe(translations.ru);
  });

  it("returns en translations for 'en'", () => {
    expect(getTranslation("en")).toBe(translations.en);
  });

  it("falls back to ru for unknown locale", () => {
    // @ts-expect-error testing invalid locale
    expect(getTranslation("fr")).toBe(translations.ru);
  });
});
