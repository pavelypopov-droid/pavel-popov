import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
            Отзывы
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Что говорят клиенты
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
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
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                  <span className="text-[#2563EB] font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#64748B]">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
