import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Languages, GraduationCap, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { skills, timeline } from "@/lib/data";
import CTABlock from "@/components/sections/CTABlock";

export const metadata: Metadata = {
  title: "О себе",
  description:
    "Павел Попов — международный IT & FinTech консультант с 25-летним опытом. CIO банков, AI эксперт, цифровая трансформация в Центральной Азии.",
};

const expertise = [
  {
    title: "IT Strategy",
    items: [
      "IT-аудит и диагностика",
      "Разработка IT-стратегии",
      "Дорожная карта трансформации",
      "IT-governance",
      "Vendor management",
    ],
  },
  {
    title: "AI & ML",
    items: [
      "Machine Learning скоринг",
      "Speech Analytics (ASR/NLP)",
      "LLM-интеграции",
      "Антифрод системы",
      "AI-driven development",
    ],
  },
  {
    title: "FinTech Delivery",
    items: [
      "DWH / BI для банков",
      "ДБО и мобильный банкинг",
      "RegTech & Compliance",
      "Платёжные интеграции",
      "Команды под ключ",
    ],
  },
];

const education = [
  {
    year: "1994–1999",
    degree: "Специалист (математика / информатика)",
    institution: "МГУ им. М.В. Ломоносова",
    country: "RU",
  },
  {
    year: "2010",
    degree: "MBA — Управление IT-проектами",
    institution: "Высшая школа экономики",
    country: "RU",
  },
];

const languages = [
  { name: "Русский", level: "Родной", pct: 100 },
  { name: "Английский", level: "C1 — Advanced", pct: 85 },
  { name: "Французский", level: "A2 — Beginner", pct: 20 },
];

const countryFlags: Record<string, string> = {
  UZ: "🇺🇿",
  CA: "🌐",
  RU: "🇷🇺",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/images/pavel-popov-photo.jpg"
                  alt="Павел Попов"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
            {/* Info */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Павел Попов
              </h1>
              <p className="text-xl text-blue-300 mb-4">
                IT & FinTech Advisor · AI Expert
              </p>
              <p className="text-slate-400 flex items-center justify-center lg:justify-start gap-2 mb-6">
                <MapPin size={16} />
                Ташкент, Узбекистан / Remote
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-blue-200 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6">
            О себе
          </h2>
          <div className="space-y-4 text-[#374151] leading-relaxed text-lg">
            <p>
              25 лет в IT и FinTech России и Центральной Азии. Начинал как
              разработчик, вырос до CIO крупнейших банков. Прошёл весь путь от
              написания кода до управления IT-стратегией на уровне совета
              директоров.
            </p>
            <p>
              Основал и выстроил AI-направления в нескольких организациях.
              Внедрял машинное обучение когда это ещё называлось{" "}
              <em>data mining</em>. Сегодня работаю с современными LLM и
              строю системы речевой аналитики для банков ЦА.
            </p>
            <p>
              Независимый советник с 2022 года. Работаю на пересечении
              стратегии и исполнения — помогаю не только придумать, но и
              реализовать. Понимаю рынок ЦА изнутри: регуляторику,
              технологический ландшафт, специфику найма и культуры.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-[#F8FAFC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10 text-center">
            Моя экспертиза
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#0F172A] mb-4">
                  {area.title}
                </h3>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">
            Опыт работы
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative flex gap-6 pl-16">
                  {/* Dot */}
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#2563EB] border-4 border-white shadow" />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#2563EB]">
                        {item.period}
                      </span>
                      <span className="text-sm text-[#64748B]">
                        {countryFlags[item.country] || ""}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {item.role}
                    </h3>
                    <p className="text-sm text-[#64748B] mb-2">{item.company}</p>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Languages */}
      <section className="bg-[#F8FAFC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={24} className="text-[#2563EB]" />
                <h2 className="text-xl font-bold text-[#0F172A]">Образование</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 p-5"
                  >
                    <p className="text-xs text-[#2563EB] font-semibold mb-1">
                      {edu.year}
                    </p>
                    <p className="font-semibold text-[#0F172A] text-sm">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-[#64748B]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Languages size={24} className="text-[#2563EB]" />
                <h2 className="text-xl font-bold text-[#0F172A]">Языки</h2>
              </div>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-[#0F172A]">
                        {lang.name}
                      </span>
                      <span className="text-sm text-[#64748B]">{lang.level}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-[#2563EB] h-2 rounded-full transition-all"
                        style={{ width: `${lang.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
