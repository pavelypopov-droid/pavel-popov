import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/lib/data";
import type { Locale } from "@/lib/i18n-config";

interface Props {
  lang?: Locale;
}

export default function SocialProof({ lang = "ru" }: Props) {
  const isEn = lang === "en";

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </span>
              <span className="text-sm text-[#64748B] font-medium">
                {isEn ? (stat.labelEn || stat.label) : stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
