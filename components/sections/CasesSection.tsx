import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cases } from "@/lib/data";
import type { Locale } from "@/lib/i18n-config";

const caseTitlesEn: Record<number, { title: string; challenge: string; solution: string; results: string[] }> = {
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

const t = {
  ru: {
    eyebrow: "Результаты в цифрах",
    title: "Избранные кейсы",
    subtitle: "Анонимизированные проекты из реальной практики — задачи, решения, измеримые результаты.",
    challengeLabel: "Задача",
    resultLabel: "Результат",
    more: "Читать подробнее",
    allCases: "Все кейсы",
    casesHref: "/cases",
  },
  en: {
    eyebrow: "Results in Numbers",
    title: "Selected Cases",
    subtitle: "Anonymised real-world projects — challenges, solutions, measurable results.",
    challengeLabel: "Challenge",
    resultLabel: "Results",
    more: "Read more",
    allCases: "All cases",
    casesHref: "/en/cases",
  },
};

interface Props {
  lang?: Locale;
}

export default function CasesSection({ lang = "ru" }: Props) {
  const tx = t[lang];
  const featured = cases.slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
            {tx.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A]">
            {tx.title}
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
            {tx.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c) => {
            const enData = caseTitlesEn[c.id];
            const title = lang === "en" ? enData?.title : c.title;
            const challenge = lang === "en" ? enData?.challenge : c.challenge;
            const results = lang === "en" ? enData?.results : c.results;

            return (
              <Card key={c.id} className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="industry">{c.industry}</Badge>
                  {c.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-base font-bold text-[#0F172A] leading-snug">{title}</h3>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                    {tx.challengeLabel}
                  </p>
                  <p className="text-sm text-[#374151]">{challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                    {tx.resultLabel}
                  </p>
                  <ul className="space-y-1.5">
                    {results?.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
                        <span className="font-medium text-[#0F172A]">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href={tx.casesHref}
            className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:underline"
          >
            {tx.allCases} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
