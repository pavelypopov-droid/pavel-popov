import Link from "next/link";
import { Brain, Map, Users, Package, Shield, Briefcase, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { services } from "@/lib/data";
import type { Locale } from "@/lib/i18n-config";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={28} className="text-[#2563EB]" />,
  Map: <Map size={28} className="text-[#2563EB]" />,
  Users: <Users size={28} className="text-[#2563EB]" />,
  Package: <Package size={28} className="text-[#2563EB]" />,
  Shield: <Shield size={28} className="text-[#2563EB]" />,
  Briefcase: <Briefcase size={28} className="text-[#2563EB]" />,
};

const servicesTitlesEn: Record<number, { title: string; description: string }> = {
  1: {
    title: "AI Implementation",
    description: "Speech analytics, ML scoring, fraud monitoring — implementation with deep technical expertise. From architecture to production.",
  },
  2: {
    title: "IT & Digital Strategy",
    description: "IT strategy and roadmap development, current state audit, transformation preparation.",
  },
  3: {
    title: "FinTech Team Assembly",
    description: "Building and managing teams for projects of any scale. Own network of FinTech and AI experts.",
  },
  4: {
    title: "Turnkey Delivery",
    description: "End-to-end project delivery: DWH, RegTech, Digital Banking, integrations — with knowledge base creation and team handover.",
  },
  5: {
    title: "RegTech & DWH",
    description: "Design and implementation of regulatory reporting systems for the Central Bank — from CBS data inventory to data delivery to regulator.",
  },
  6: {
    title: "CTO-as-a-Service",
    description: "Interim CTO for a bank or fintech startup. I make decisions — I take responsibility for results.",
  },
};

const t = {
  ru: {
    eyebrow: "Что я делаю",
    title: "Услуги",
    subtitle: "Работаю на стыке бизнеса и технологий. Каждое направление — это реализованные проекты, а не теория.",
    more: "Подробнее",
    allServices: "Все услуги",
    servicesHref: "/services",
  },
  en: {
    eyebrow: "What I Do",
    title: "Services",
    subtitle: "I work at the intersection of business and technology. Every service is backed by real projects, not theory.",
    more: "Learn more",
    allServices: "All services",
    servicesHref: "/en/services",
  },
};

interface Props {
  lang?: Locale;
}

export default function ServicesSection({ lang = "ru" }: Props) {
  const tx = t[lang];

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
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
          {services.map((service) => {
            const enData = servicesTitlesEn[service.id];
            const title = lang === "en" ? enData?.title : service.title;
            const description = lang === "en" ? enData?.description : service.description;

            return (
              <Card key={service.id} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                  {iconMap[service.icon]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
                </div>
                <Link
                  href={`${tx.servicesHref}#${service.id}`}
                  className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:gap-2 transition-all"
                >
                  {tx.more} <ArrowRight size={14} />
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href={tx.servicesHref}
            className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:underline"
          >
            {tx.allServices} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
