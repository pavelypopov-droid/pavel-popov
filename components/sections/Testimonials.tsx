import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import type { Locale } from "@/lib/i18n-config";

interface Props {
  lang?: Locale;
}

export default function Testimonials({ lang = "ru" }: Props) {
  const isEn = lang === "en";

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
            {isEn ? "Testimonials" : "Отзывы"}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A]">
            {isEn ? "What clients say" : "Что говорят клиенты"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            const name = isEn ? (t.nameEn || t.name) : t.name;
            const company = isEn ? (t.companyEn || t.company) : t.company;
            const text = isEn ? (t.textEn || t.text) : t.text;
            return (
              <div
                key={t.id}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote
                  size={32}
                  className="text-[#BFDBFE] mb-4"
                  fill="currentColor"
                />
                <p className="text-[#374151] leading-relaxed mb-6 italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                    <span className="text-[#2563EB] font-bold text-sm">
                      {name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {name}
                    </p>
                    <p className="text-xs text-[#64748B]">{company}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
