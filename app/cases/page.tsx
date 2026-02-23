import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { cases } from "@/lib/data";
import CTABlock from "@/components/sections/CTABlock";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Реализованные проекты по цифровой трансформации банков, AI внедрению и FinTech консалтингу в Центральной Азии.",
};

export default function CasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            Результаты в цифрах
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            Кейсы
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Анонимизированные проекты из практики. Задачи, решения, измеримые
            результаты.
          </p>
        </div>
      </section>

      {/* Cases grid */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <Card key={c.id} className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="industry">{c.industry}</Badge>
                    {c.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-[#64748B]">{c.period}</span>
                </div>

                <h2 className="text-lg font-bold text-[#0F172A] leading-snug">
                  {c.title}
                </h2>

                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                    Задача
                  </p>
                  <p className="text-sm text-[#374151]">{c.challenge}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                    Решение
                  </p>
                  <p className="text-sm text-[#374151]">{c.solution}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                    Результат
                  </p>
                  <ul className="space-y-2">
                    {c.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          size={14}
                          className="text-[#2563EB] shrink-0 mt-0.5"
                        />
                        <span className="font-semibold text-[#0F172A]">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA prompt */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">
            Узнаёте свою ситуацию?
          </h2>
          <p className="text-[#64748B] mb-8">
            Если ваша задача похожа на один из этих кейсов — давайте обсудим,
            как я могу помочь.
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            Обсудить задачу <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
