import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { i18nConfig, type Locale } from "@/lib/i18n-config";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ServicesSection from "@/components/sections/ServicesSection";
import CasesSection from "@/components/sections/CasesSection";
import AboutSection from "@/components/sections/AboutSection";
import Testimonials from "@/components/sections/Testimonials";
import CTABlock from "@/components/sections/CTABlock";
import GameTeaser from "@/components/sections/GameTeaser";
import PartnersSection from "@/components/sections/PartnersSection";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang === "en") {
    return {
      title: "Pavel Popov — IT & FinTech Advisor, AI Expert | Central Asia",
      description:
        "International IT & FinTech consultant with 25+ years of experience. AI implementation, digital transformation, DWH, RegTech for banks and fintech companies in Central Asia.",
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

export default async function LangHome({ params }: Props) {
  const { lang } = await params;

  if (!i18nConfig.locales.includes(lang as Locale)) {
    notFound();
  }

  return (
    <>
      <Hero lang={lang as Locale} />
      <SocialProof lang={lang as Locale} />
      <ServicesSection lang={lang as Locale} />
      <CasesSection lang={lang as Locale} />
      <PartnersSection lang={lang as Locale} />
      <AboutSection lang={lang as Locale} />
      <Testimonials lang={lang as Locale} />
      <GameTeaser lang={lang as Locale} />
      <CTABlock lang={lang as Locale} />
    </>
  );
}
