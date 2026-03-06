"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, ArrowRight } from "lucide-react";
import { track } from "@/components/seo/Analytics";
import type { Locale } from "@/lib/i18n-config";

const t = {
  ru: {
    badge: "Интерактив",
    title: "Давайте сыграем!",
    description: "Пройдите диагностику IT-зрелости или примерьте роль CIO крупного банка. 5 минут — и вы узнаете, где ваш IT сейчас и куда двигаться.",
    cta: "Играть",
    href: "/ru/game",
    quiz: "Квиз: 7 вопросов → IT-профиль",
    sim: "Симулятор: 5 реальных ситуаций из практики",
    adventure: "Выживание CIO: 17 ситуаций, 8 концовок",
  },
  en: {
    badge: "Interactive",
    title: "Let's Play!",
    description: "Take an IT maturity diagnostic or step into the shoes of a major bank CIO. 5 minutes — and you'll know where your IT stands and where to go.",
    cta: "Play",
    href: "/en/game",
    quiz: "Quiz: 7 questions → IT profile",
    sim: "Simulator: 5 real-world CIO scenarios",
    adventure: "CIO Survival: 17 situations, 8 endings",
  },
};

interface Props {
  lang?: Locale;
}

export default function GameTeaser({ lang = "ru" }: Props) {
  const tx = t[lang];

  return (
    <section className="bg-[#0F172A] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563EB]/20 via-[#1E3A8A]/10 to-[#0F172A] border border-[#2563EB]/20 p-8 sm:p-10 lg:p-12"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F59E0B]/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-semibold mb-4">
                <Gamepad2 size={14} />
                {tx.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{tx.title}</h2>
              <p className="text-slate-400 mb-6 max-w-xl">{tx.description}</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  {tx.quiz}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  {tx.sim}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  {tx.adventure}
                </li>
              </ul>
            </div>

            <Link
              href={tx.href}
              onClick={() => track.ctaClick("game_teaser")}
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-xl hover:bg-[#1d4ed8] transition-colors text-base sm:text-lg whitespace-nowrap"
            >
              {tx.cta} <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
