import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Languages, GraduationCap, ArrowRight } from "lucide-react";
import { skills, timeline } from "@/lib/data";
import CTABlock from "@/components/sections/CTABlock";
import type { Locale } from "@/lib/i18n-config";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? { title: "About | Pavel Popov", description: "International IT & FinTech Advisor with 25+ years of experience. CIO of banks, AI Expert, digital transformation in Central Asia." }
    : { title: "О себе | Павел Попов" };
}

const expertiseEn = [
  {
    title: "IT Strategy",
    items: ["IT audit & diagnostics", "IT strategy development", "Transformation roadmap", "IT governance", "Vendor management"],
  },
  {
    title: "AI & ML",
    items: ["Machine Learning scoring", "Speech Analytics (ASR/NLP)", "LLM integrations", "Anti-fraud systems", "AI-driven development"],
  },
  {
    title: "FinTech Delivery",
    items: ["DWH / BI for banks", "Digital & mobile banking", "RegTech & DWH", "Payment integrations", "Turnkey teams"],
  },
];

const expertiseRu = [
  {
    title: "IT Strategy",
    items: ["IT-аудит и диагностика", "Разработка IT-стратегии", "Дорожная карта трансформации", "IT-governance", "Vendor management"],
  },
  {
    title: "AI & ML",
    items: ["Machine Learning скоринг", "Speech Analytics (ASR/NLP)", "LLM-интеграции", "Антифрод системы", "AI-driven development"],
  },
  {
    title: "FinTech Delivery",
    items: ["DWH / BI для банков", "ДБО и мобильный банкинг", "RegTech & DWH", "Платёжные интеграции", "Команды под ключ"],
  },
];

const education = [
  { year: "until 2005", yearRu: "до 2005", degree: "Specialist — Physics Faculty", degreeRu: "Специалист — Физический факультет", institution: "Lomonosov Moscow State University", institutionRu: "МГУ им. М.В. Ломоносова" },
  { year: "until 2007", yearRu: "до 2007", degree: "Postgraduate Studies", degreeRu: "Аспирантура", institution: "MGUPI", institutionRu: "МГУПИ" },
];

const courses = [
  { year: "2024", title: "Advanced Negotiations", titleRu: "Сложные переговоры", institution: "Skolkovo" },
  { year: "2017", title: "Blockchain for Business", titleRu: "Blockchain для бизнеса", institution: "HSE" },
  { year: "2016", title: "PMP, Project Management, ITIL Foundation", titleRu: "PMP, управление проектами, ITIL Foundation", institution: "IT-Expert" },
  { year: "2014", title: "NLP in Business", titleRu: "NLP в бизнесе", institution: "HSE" },
];

const languages = [
  { name: "Russian", nameRu: "Русский", level: "Native", levelRu: "Родной", pct: 100 },
  { name: "English", nameRu: "Английский", level: "C1 — Advanced", levelRu: "C1 — Advanced", pct: 85 },
  { name: "French", nameRu: "Французский", level: "A2 — Beginner", levelRu: "A2 — Beginner", pct: 20 },
];

const timelineEn: Record<number, { role: string; description: string }> = {
  0: { role: "Independent IT & FinTech Advisor", description: "Strategic consulting on AI, digital transformation, and IT strategy for banks and fintech companies across Central Asia. Focus on markets of Uzbekistan, Kazakhstan, and Kyrgyzstan." },
  1: { role: "CTO / Director of AI and Anti-fraud, Banks Soft Systems", description: "Led AI and anti-fraud directions for a FinTech company. Built products and teams for banks across the CIS region." },
  2: { role: "CEO, IT Company (subsidiary of a Top-5 bank)", description: "Built an IT company from scratch: 120-person team, AI practice, sales structure. 3B+ RUB project portfolio. Stake sold to a strategic investor." },
  3: { role: "CDO / Head of FinTech Practice, Bell Integrator", description: "Developed fintech and DWH/BI practices at a large IT integrator serving companies with $100M+ in revenue. +$8M in FinTech revenue in 2 years." },
  4: { role: "CIO, National Bank of Uzbekistan", description: "Led full digital transformation of one of the largest state banks. Built 4 cross-functional IT teams, launched AI practice, managed $25M+ budget." },
  5: { role: "Head of Speech Technologies Practice", description: "Built a speech tech practice from scratch at a leading CA IT integrator. Achieved market leadership in 6 months. +$3M revenue, 10x year-over-year." },
};

const countryFlags: Record<string, string> = { UZ: "🇺🇿", CA: "🌐", RU: "🇷🇺" };

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === "en";
  const expertise = isEn ? expertiseEn : expertiseRu;

  return (
    <>
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/images/pavel-popov-about.jpg"
                  alt="Pavel Popov"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Pavel Popov</h1>
              <p className="text-xl text-blue-300 mb-4">IT & FinTech Advisor · AI Expert</p>
              <p className="text-slate-400 flex items-center justify-center lg:justify-start gap-2 mb-6">
                <MapPin size={16} />
                {isEn ? "Tashkent, Uzbekistan / Remote" : "Ташкент, Узбекистан / Remote"}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {skills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-blue-200 font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6">
            {isEn ? "About Me" : "О себе"}
          </h2>
          <div className="space-y-4 text-[#374151] leading-relaxed text-lg">
            {isEn ? (
              <>
                <p>25 years in IT across Russia and Central Asia. Started as a developer, grew to CIO of major banks. Went all the way from writing code to managing IT strategy at board level.</p>
                <p>Founded and built AI practices in several organisations. Was implementing machine learning when it was still called <em>data mining</em>. Today I work with modern LLMs, build speech analytics and automate processes for banks, telecom operators and government organisations across CA.</p>
                <p>Independent advisor since 2022. I work at the intersection of strategy and execution — helping not just to design, but to deliver. I know the CA market from the inside: sector-specific regulations, technology landscape, hiring specifics and culture.</p>
              </>
            ) : (
              <>
                <p>25 лет в IT и FinTech России и Центральной Азии. Начинал как разработчик, вырос до CIO крупнейших банков. Прошёл весь путь от написания кода до управления IT-стратегией на уровне совета директоров.</p>
                <p>Основал и выстроил AI-направления в нескольких организациях. Внедрял машинное обучение когда это ещё называлось <em>data mining</em>. Сегодня работаю с современными LLM и строю системы речевой аналитики для банков ЦА.</p>
                <p>Независимый советник с 2022 года. Работаю на пересечении стратегии и исполнения — помогаю не только придумать, но и реализовать. Понимаю рынок ЦА изнутри: регуляторику, технологический ландшафт, специфику найма и культуры.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10 text-center">
            {isEn ? "Areas of Expertise" : "Моя экспертиза"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map((area) => (
              <div key={area.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0F172A] mb-4">{area.title}</h3>
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

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">
            {isEn ? "Work Experience" : "Опыт работы"}
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {timeline.map((item, idx) => {
                const enData = timelineEn[idx];
                const role = isEn ? enData?.role : item.role;
                const description = isEn ? enData?.description : item.description;
                return (
                  <div key={idx} className="relative flex gap-6 pl-16">
                    <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#2563EB] border-4 border-white shadow" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#2563EB]">{item.period}</span>
                        <span className="text-sm text-[#64748B]">{countryFlags[item.country] || ""}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#0F172A]">{role}</h3>
                      <p className="text-sm text-[#64748B] mb-2">{item.company}</p>
                      <p className="text-sm text-[#374151] leading-relaxed">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={24} className="text-[#2563EB]" />
                <h2 className="text-xl font-bold text-[#0F172A]">{isEn ? "Education" : "Образование"}</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <p className="text-xs text-[#2563EB] font-semibold mb-1">{isEn ? edu.year : edu.yearRu}</p>
                    <p className="font-semibold text-[#0F172A] text-sm">{isEn ? edu.degree : edu.degreeRu}</p>
                    <p className="text-sm text-[#64748B]">{isEn ? edu.institution : edu.institutionRu}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={24} className="text-[#F59E0B]" />
                <h2 className="text-xl font-bold text-[#0F172A]">{isEn ? "Courses" : "Курсы"}</h2>
              </div>
              <div className="space-y-3">
                {courses.map((c, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs text-[#F59E0B] font-semibold mb-0.5">{c.year} · {c.institution}</p>
                    <p className="text-sm font-medium text-[#0F172A]">{isEn ? c.title : c.titleRu}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Languages size={24} className="text-[#2563EB]" />
                <h2 className="text-xl font-bold text-[#0F172A]">{isEn ? "Languages" : "Языки"}</h2>
              </div>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-[#0F172A]">{isEn ? lang.name : lang.nameRu}</span>
                      <span className="text-sm text-[#64748B]">{isEn ? lang.level : lang.levelRu}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-[#2563EB] h-2 rounded-full transition-all" style={{ width: `${lang.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABlock lang={lang as Locale} />
    </>
  );
}
