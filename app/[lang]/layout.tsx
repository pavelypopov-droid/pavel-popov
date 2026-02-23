import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { i18nConfig } from "@/lib/i18n-config";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang === "en") {
    return {
      alternates: {
        canonical: "https://beyondcore.pro/en",
        languages: {
          ru: "https://beyondcore.pro",
          en: "https://beyondcore.pro/en",
        },
      },
    };
  }
  return {};
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!i18nConfig.locales.includes(lang as "ru" | "en")) {
    notFound();
  }

  return <>{children}</>;
}
