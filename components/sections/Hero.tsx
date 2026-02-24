"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n-config";

const t = {
  ru: {
    badge: "AI Expert · FinTech · Central Asia",
    name: "Павел Попов",
    title: "IT & FinTech Advisor · AI Expert",
    subtitle: "Международный консультант в Центральной Азии",
    description: "Помогаю банкам, телекому и государственным заказчикам пройти цифровую трансформацию — от стратегии до работающего продукта с передачей знаний команде.",
    highlight: "25 лет в IT · 150+ проектов · 6 стран ЦА и СНГ",
    cta: "Обсудить проект",
    cv: "Скачать CV",
    contactsHref: "/contacts",
    expLabel: "Опыт",
    expYears: "лет в IT",
    projectsLabel: "Проектов",
  },
  en: {
    badge: "AI Expert · FinTech · Central Asia",
    name: "Pavel Popov",
    title: "IT & FinTech Advisor · AI Expert",
    subtitle: "International Consultant in Central Asia",
    description: "I help banks, telecom operators and government organisations run digital transformations — from strategy to working product with knowledge transfer to the team.",
    highlight: "25 years in IT · 150+ projects · 6 countries in CA & CIS",
    cta: "Discuss Project",
    cv: "Download CV",
    contactsHref: "/en/contacts",
    expLabel: "Experience",
    expYears: "years in IT",
    projectsLabel: "Projects",
  },
};

interface Props {
  lang?: Locale;
}

export default function Hero({ lang = "ru" }: Props) {
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex items-center bg-[#0F172A] overflow-hidden">
      {/* AI-generated background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover object-center opacity-30"
        priority
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 via-[#0F172A]/60 to-[#1E3A8A]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 text-blue-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                {tx.badge}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
              {tx.name}
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-2">
              {tx.title}
            </h2>
            <p className="text-lg text-slate-400 mb-6">{tx.subtitle}</p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              {tx.description}{" "}
              <span className="text-white font-medium">{tx.highlight}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={tx.contactsHref}>
                <Button size="lg" className="w-full sm:w-auto">
                  {tx.cta}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="/files/CV_Pavel_Popov_RU.pdf" download>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                >
                  <Download size={18} />
                  {tx.cv}
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#2563EB]/20 rounded-3xl blur-2xl" />
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden border-2 border-white/10">
                <Image
                  src="/images/pavel-popov-photo.jpg"
                  alt="Pavel Popov — IT & FinTech Advisor"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-[#64748B] font-medium">{tx.expLabel}</p>
                <p className="text-2xl font-bold text-[#0F172A]">25+</p>
                <p className="text-xs text-[#64748B]">{tx.expYears}</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#2563EB] rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-blue-200 font-medium">{tx.projectsLabel}</p>
                <p className="text-2xl font-bold text-white">150+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
