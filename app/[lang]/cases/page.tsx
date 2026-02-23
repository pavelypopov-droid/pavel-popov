import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { cases } from "@/lib/data";
import CTABlock from "@/components/sections/CTABlock";
import type { Locale } from "@/lib/i18n-config";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? { title: "Cases | Pavel Popov", description: "Digital transformation of banks, AI implementation, and FinTech consulting projects in Central Asia." }
    : { title: "Кейсы | Павел Попов" };
}

const casesEn: Record<number, { title: string; challenge: string; solution: string; results: string[] }> = {
  1: {
    title: "Digital Transformation of a State Bank of Uzbekistan",
    challenge: "Transformation of IT and IS departments, building an AI practice from scratch in one of the country's largest state banks.",
    solution: "Restructured in 4 months, launched AI projects, created an IT hub of 4 cross-functional teams (60 people). Implemented Agile and OKR.",
    results: ["+30% to SLA metrics", "25 key specialists hired and trained", "$25M+ transformation budget", "4 AI projects launched in production in one year"],
  },
  2: {
    title: "Speech Technologies Market Leader in 6 Months",
    challenge: "A leading CA IT integrator wanted to enter the speech technology market from scratch. Strategy, team and product localisation needed.",
    solution: "Developed go-to-market strategy, built presales and sales team, adapted products to Uzbekistan legislation, partnered with key vendors.",
    results: ["Market leader in speech tech in 6 months", "+$3M revenue (10x year-over-year)", "Team of 15 experts", "5 major bank clients"],
  },
  3: {
    title: "IT Company from Zero to Bank Stake Sale",
    challenge: "Build an IT company (subsidiary of a top-5 bank) from scratch: team, products, sales. Fill the niche for banking software in Russia amid vendor exodus.",
    solution: "Built a team of 120, launched AI practice, structured sales through parent bank and external market. Passed the Ministry of Digital Development registry.",
    results: ["Team of 120 people from scratch in 18 months", "Projects worth 3B+ RUB", "Stake sold to strategic investor", "Russian Ministry of Digital Development registry"],
  },
  4: {
    title: "FinTech Practice Development at a Major IT Integrator",
    challenge: "Developing fintech practice and DWH/BI at a company with $100M+ revenue. Entry into new industry markets.",
    solution: "Launched banking and insurance practices, built presales team, established partnerships with leading vendors.",
    results: ["+$8M FinTech revenue in 2 years", "15 new enterprise clients", "Gold/Platinum partnerships with 3 vendors"],
  },
};

export default async function CasesPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <>
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            {isEn ? "Results in Numbers" : "Результаты в цифрах"}
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            {isEn ? "Cases" : "Кейсы"}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {isEn
              ? "Anonymised real-world projects — challenges, solutions, measurable results."
              : "Анонимизированные проекты из практики. Задачи, решения, измеримые результаты."}
          </p>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c) => {
              const enData = casesEn[c.id];
              const title = isEn ? enData?.title : c.title;
              const challenge = isEn ? enData?.challenge : c.challenge;
              const solution = isEn ? enData?.solution : c.solution;
              const results = isEn ? enData?.results : c.results;

              return (
                <Card key={c.id} className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="industry">{c.industry}</Badge>
                      {c.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <span className="text-xs text-[#64748B]">{c.period}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#0F172A] leading-snug">{title}</h2>

                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                      {isEn ? "Challenge" : "Задача"}
                    </p>
                    <p className="text-sm text-[#374151]">{challenge}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                      {isEn ? "Solution" : "Решение"}
                    </p>
                    <p className="text-sm text-[#374151]">{solution}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                      {isEn ? "Results" : "Результат"}
                    </p>
                    <ul className="space-y-2">
                      {results?.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="font-semibold text-[#0F172A]">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">
            {isEn ? "Recognise your situation?" : "Узнаёте свою ситуацию?"}
          </h2>
          <p className="text-[#64748B] mb-8">
            {isEn
              ? "If your challenge looks like one of these cases — let's discuss how I can help."
              : "Если ваша задача похожа на один из этих кейсов — давайте обсудим, как я могу помочь."}
          </p>
          <Link
            href={isEn ? "/en/contacts" : "/contacts"}
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            {isEn ? "Discuss project" : "Обсудить задачу"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABlock lang={lang as Locale} />
    </>
  );
}
