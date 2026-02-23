export const i18nConfig = {
  defaultLocale: "ru",
  locales: ["ru", "en"],
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
