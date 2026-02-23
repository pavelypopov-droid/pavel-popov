import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Map,
  Users,
  Package,
  Shield,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/data";
import CTABlock from "@/components/sections/CTABlock";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "IT & FinTech консалтинг, AI внедрение, цифровая трансформация, CTO-as-a-Service для банков и финтех компаний Центральной Азии.",
};

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Map,
  Users,
  Package,
  Shield,
  Briefcase,
};

const serviceAnchors = [
  "ai",
  "strategy",
  "teams",
  "delivery",
  "regtech",
  "cto",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            Услуги
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            Что я делаю
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Каждое направление — это реализованные проекты в банках и
            финтех-компаниях Центральной Азии и России.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon];
              const anchor = serviceAnchors[idx] || String(service.id);

              return (
                <div
                  key={service.id}
                  id={anchor}
                  className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start pt-4 border-t border-slate-100 first:border-0"
                >
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
                        <Icon size={32} className="text-[#2563EB]" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-[#374151] leading-relaxed text-lg mb-6">
                      {service.description}
                    </p>
                    <div className="bg-[#F8FAFC] rounded-2xl p-5">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                        Для кого
                      </p>
                      <p className="text-sm text-[#374151]">{service.forWho}</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div>
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">
                        Что входит
                      </p>
                      <ul className="space-y-3">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2
                              size={16}
                              className="text-[#2563EB] shrink-0 mt-0.5"
                            />
                            <span className="text-sm text-[#374151]">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#EFF6FF] rounded-2xl p-5 mb-6">
                      <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
                        Результат
                      </p>
                      <p className="text-sm font-medium text-[#1e3a8a]">
                        {service.result}
                      </p>
                    </div>

                    <Link
                      href="/contacts"
                      className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors"
                    >
                      Обсудить задачу <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
