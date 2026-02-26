import Image from "next/image";
import Link from "next/link";
import { Users, Cpu, UserRound, Briefcase } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";

const t = {
  ru: {
    eyebrow: "Партнёры",
    title: "Работаю не один",
    subtitle:
      "За каждым проектом стоит команда профессионалов. Я координирую нужных людей и партнёров под конкретную задачу клиента.",
    partners: [
      {
        icon: Users,
        title: "Команда консультантов",
        description:
          "Пул независимых экспертов: архитекторы, аналитики, менеджеры проектов и отраслевые специалисты по банкингу, телекому и госсектору. Подключаем нужных людей под конкретную задачу.",
      },
      {
        icon: Cpu,
        title: "Технологические партнёры",
        description:
          "Вендоры и интеграторы в области AI, речевых технологий, DWH, RegTech и FinTech. Партнёрства позволяют предлагать проверенные решения без лишних посредников.",
      },
      {
        icon: Briefcase,
        title: "Аутстафф",
        description:
          "Доступ к квалифицированным командам разработки и внедрения под проект. Быстрый старт без найма в штат: от отдельных специалистов до кросс-функциональных команд.",
      },
      {
        icon: UserRound,
        title: "Корпоративный и личный психолог",
        description:
          "Партнёрство с практикующим психологом для поддержки топ-менеджмента и команд в периоды изменений, высокой нагрузки и трансформаций. Работает индивидуально и с командами.",
        link: {
          href: "https://toselfness.com",
          label: "toselfness.com",
        },
      },
    ],
  },
  en: {
    eyebrow: "Partners",
    title: "I don't work alone",
    subtitle:
      "Behind every project stands a team of professionals. I coordinate the right people and partners for each client's specific challenge.",
    partners: [
      {
        icon: Users,
        title: "Consulting Team",
        description:
          "A pool of independent experts: architects, analysts, project managers and domain specialists in banking, telecom and public sector. We bring in the right people for each task.",
      },
      {
        icon: Cpu,
        title: "Technology Partners",
        description:
          "Vendors and integrators in AI, speech technologies, DWH, RegTech and FinTech. Partnerships allow us to offer proven solutions without unnecessary intermediaries.",
      },
      {
        icon: Briefcase,
        title: "Outstaffing",
        description:
          "Access to qualified development and implementation teams for your project. Fast start without in-house hiring: from individual specialists to cross-functional teams.",
      },
      {
        icon: UserRound,
        title: "Corporate & Personal Psychologist",
        description:
          "Partnership with a practising psychologist to support top management and teams during periods of change, high workload and transformation. Works individually and with teams.",
        link: {
          href: "https://toselfness.com",
          label: "toselfness.com",
        },
      },
    ],
  },
};

interface Props {
  lang?: Locale;
}

export default function PartnersSection({ lang = "ru" }: Props) {
  const tx = t[lang];

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
            {tx.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A]">
            {tx.title}
          </h2>
          <p className="mt-4 text-lg text-[#374151] max-w-2xl mx-auto">
            {tx.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[2/3]">
            <Image
              src="/images/partners-bg.jpg"
              alt="Pavel Popov — team meeting"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {tx.partners.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-[#F8FAFC] rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#2563EB]" />
                  </div>
                  <h3 className="font-semibold text-[#0F172A] text-sm leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {p.description}
                  </p>
                  {"link" in p && p.link && (
                    <Link
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#2563EB] hover:underline mt-auto"
                    >
                      {p.link.label} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
