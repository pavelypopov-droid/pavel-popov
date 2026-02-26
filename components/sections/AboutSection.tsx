import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { skills } from "@/lib/data";
import type { Locale } from "@/lib/i18n-config";

const t = {
  ru: {
    eyebrow: "Обо мне",
    title: "25 лет строю цифровое будущее компаний",
    p1: "25 лет в IT России и Центральной Азии. CIO крупнейших банков, основатель AI-направлений, 150+ реализованных проектов в банках, телекоме и госсекторе.",
    p2: "AI эксперт с практическим опытом: от постановки задачи до production-деплоя. Machine Learning, Speech Analytics, LLM-интеграции, AI-driven development — реализованные проекты, а не теория.",
    p3: "Работаю как независимый советник и лидер команды. Понимаю рынок ЦА изнутри: регуляторику разных отраслей, культуру, технологический ландшафт.",
    more: "Подробнее обо мне",
    aboutHref: "/about",
  },
  en: {
    eyebrow: "About Me",
    title: "25 years building the digital future of organisations",
    p1: "25 years in IT across Russia and Central Asia. CIO of major banks, founder of AI practices — 150+ projects delivered in banking, telecom and public sector.",
    p2: "AI expert with hands-on experience: from problem definition to production deployment. Machine Learning, Speech Analytics, LLM integrations — real projects, not theory.",
    p3: "I work as an independent advisor and team leader. I understand the CA market from the inside: industry-specific regulation, culture and technology landscape.",
    more: "More about me",
    aboutHref: "/en/about",
  },
};

interface Props {
  lang?: Locale;
}

export default function AboutSection({ lang = "ru" }: Props) {
  const tx = t[lang];

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <div className="w-80 h-96 sm:w-96 sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/pavel-popov-home.jpg"
                  alt="Pavel Popov"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#2563EB]/10 rounded-3xl -z-10" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
              {tx.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A] mb-6">
              {tx.title}
            </h2>
            <div className="space-y-4 text-[#374151] leading-relaxed mb-8">
              <p>{tx.p1}</p>
              <p>{tx.p2}</p>
              <p>{tx.p3}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <Badge key={skill} variant="default">{skill}</Badge>
              ))}
            </div>
            <Link
              href={tx.aboutHref}
              className="inline-flex items-center gap-2 font-semibold text-[#2563EB] hover:gap-3 transition-all"
            >
              {tx.more} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
