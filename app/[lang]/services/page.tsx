import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Map, Users, Package, Shield, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import CTABlock from "@/components/sections/CTABlock";
import type { Locale } from "@/lib/i18n-config";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? { title: "Services | Pavel Popov", description: "IT & FinTech consulting, AI implementation, digital transformation for banks in Central Asia." }
    : { title: "Услуги | Павел Попов" };
}

const iconMap: Record<string, React.ElementType> = { Brain, Map, Users, Package, Shield, Briefcase };
const serviceAnchors = ["ai", "strategy", "teams", "delivery", "regtech", "cto"];

const servicesEn = [
  { id: 1, title: "AI Implementation", description: "Speech analytics, ML scoring, fraud monitoring, AI agents — from architecture to production.", details: ["Audit of existing AI initiatives and prioritisation","ML system architecture: from problem definition to deployment","Speech analytics (ASR/NLP) for call centres and banks","ML credit risk scoring and anti-fraud systems","LLM integration into bank and FinTech processes","AI agent development and deployment: autonomous assistants, multi-agent systems, workflow automation","Knowledge transfer to the client's team"], forWho: "Banks, insurance companies, FinTech startups, telecom", result: "A working AI system (including AI agents) in production with a trained in-house team" },
  { id: 2, title: "IT & Digital Strategy", description: "IT strategy and roadmap development, audit, and transformation preparation.", details: ["IT landscape audit: architecture, processes, teams","3–5 year IT strategy development","Digital transformation roadmap","Build/buy/partner evaluation","Regulatory compliance preparation","Benchmarking against market best practices"], forWho: "CIOs, CEOs and boards of banks and fintech companies in CA", result: "A clear strategy with priorities, budgets and KPIs for 3–5 years" },
  { id: 3, title: "FinTech Team Assembly", description: "Building and managing teams for any scale. Own network of FinTech and AI experts.", details: ["Building cross-functional IT teams","Recruiting CTOs, architects, tech leads, AI engineers","Creating IT hubs and centres of excellence","Managing distributed teams","Motivating and retaining key talent","Handover to the client's internal team"], forWho: "Banks launching IT divisions; startups at growth stage", result: "A fully formed team ready to operate autonomously" },
  { id: 4, title: "Turnkey Delivery", description: "End-to-end project delivery: DWH, RegTech, Digital Banking, integrations.", details: ["DWH/BI project management from architecture to launch","Digital banking and mobile banking implementation","Regulatory reporting and compliance systems","API integrations with payment systems and regulators","Documentation and knowledge base creation","Post-launch support and development"], forWho: "Banks and fintech companies that need results, not consulting", result: "A working product, documentation and a competent client team" },
  { id: 5, title: "RegTech & DWH", description: "Design and implementation of regulatory reporting systems for the Central Bank — from CBS data inventory to data delivery to regulator.", details: ["Core Banking System data inventory (1,300+ indicators)","GAP analysis and roadmap agreed with the Central Bank","DWH architecture and build (Staging + Reporting)","ETL processes, API integrations and automated data delivery to CBU","Reporting System for the bank (Metabase / Superset)","Project management until CBU sign-off"], forWho: "Commercial banks in Uzbekistan with a RegTech project for the Central Bank", result: "Fully operational data delivery system to CBU, documentation and trained bank team" },
  { id: 6, title: "CTO-as-a-Service", description: "Interim CTO for a bank or fintech startup. I make decisions — I take responsibility for results.", details: ["CTO role during transformation or while searching for a permanent leader","Technical decisions at board level","IT budget and vendor management","Building IT governance and processes","Mentoring the internal IT team","Gradual handover to the internal CTO"], forWho: "Banks during leadership transitions; startups without a technical leader", result: "A stable IT function with established processes and a strong team" },
];

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === "en";
  const data = isEn ? servicesEn : services;

  return (
    <>
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">{isEn ? "What I Do" : "Что я делаю"}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">{isEn ? "Services" : "Услуги"}</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{isEn ? "Every service is backed by real projects in banks and fintech across Central Asia and Russia." : "Каждое направление — это реализованные проекты в банках и финтех-компаниях Центральной Азии и России."}</p>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {data.map((service, idx) => {
              const Icon = iconMap[services[idx]?.icon || "Brain"];
              const anchor = serviceAnchors[idx] || String(service.id);
              return (
                <div key={service.id} id={anchor} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start pt-4 border-t border-slate-100 first:border-0">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] flex items-center justify-center"><Icon size={32} className="text-[#2563EB]" /></div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{service.title}</h2>
                    </div>
                    <p className="text-[#374151] leading-relaxed text-lg mb-6">{service.description}</p>
                    <div className="bg-[#F8FAFC] rounded-2xl p-5">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">{isEn ? "Who it's for" : "Для кого"}</p>
                      <p className="text-sm text-[#374151]">{service.forWho}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">{isEn ? "What's included" : "Что входит"}</p>
                    <ul className="space-y-3 mb-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3"><CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" /><span className="text-sm text-[#374151]">{detail}</span></li>
                      ))}
                    </ul>
                    <div className="bg-[#EFF6FF] rounded-2xl p-5 mb-6">
                      <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-2">{isEn ? "Result" : "Результат"}</p>
                      <p className="text-sm font-medium text-[#1e3a8a]">{service.result}</p>
                    </div>
                    <Link href={isEn ? "/en/contacts" : "/contacts"} className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors">
                      {isEn ? "Discuss project" : "Обсудить задачу"} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CTABlock lang={lang as Locale} />
    </>
  );
}
