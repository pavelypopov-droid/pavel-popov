import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { cases } from "@/lib/data";

export default function Cases() {
  const featured = cases.slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
            Результаты в цифрах
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Избранные кейсы
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
            Анонимизированные проекты из реальной практики — задачи, решения,
            измеримые результаты.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c) => (
            <Card key={c.id} className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="industry">{c.industry}</Badge>
                {c.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                {c.title}
              </h3>

              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                  Задача
                </p>
                <p className="text-sm text-[#374151]">{c.challenge}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                  Результат
                </p>
                <ul className="space-y-1.5">
                  {c.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        size={14}
                        className="text-[#2563EB] shrink-0 mt-0.5"
                      />
                      <span className="font-medium text-[#0F172A]">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/cases/${c.slug}`}
                className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                Читать подробнее <ArrowRight size={14} />
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:underline"
          >
            Все кейсы <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
