"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ClipboardCheck, Building2, Sword } from "lucide-react";
import Quiz from "@/components/game/Quiz";
import Simulator from "@/components/game/Simulator";
import Adventure from "@/components/game/Adventure";
import type { Locale } from "@/lib/i18n-config";

const t = {
  ru: {
    hero: "Давайте сыграем!",
    heroSub: "Интерактивная диагностика и симулятор из реальной практики",
    tabQuiz: "Диагностика",
    tabSim: "Симулятор CIO",
    tabAdv: "Выживание CIO",
  },
  en: {
    hero: "Let's Play!",
    heroSub: "Interactive diagnostics and simulator from real practice",
    tabQuiz: "Diagnostics",
    tabSim: "CIO Simulator",
    tabAdv: "CIO Survival",
  },
};

export default function GamePage() {
  const params = useParams();
  const lang = (params?.lang as Locale) || "ru";
  const tx = t[lang] || t.ru;
  const [tab, setTab] = useState<"quiz" | "sim" | "adventure">("quiz");

  return (
    <main className="min-h-screen bg-[#0F172A]">
      {/* Hero */}
      <section className="pt-32 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {tx.hero}
          </motion.h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">{tx.heroSub}</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setTab("quiz")}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                tab === "quiz"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <ClipboardCheck size={16} className="sm:w-[18px] sm:h-[18px]" />
              {tx.tabQuiz}
            </button>
            <button
              onClick={() => setTab("sim")}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                tab === "sim"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <Building2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              {tx.tabSim}
            </button>
            <button
              onClick={() => setTab("adventure")}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                tab === "adventure"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <Sword size={16} className="sm:w-[18px] sm:h-[18px]" />
              {tx.tabAdv}
            </button>
          </div>

          {tab === "quiz" ? <Quiz lang={lang} /> : tab === "sim" ? <Simulator lang={lang} /> : <Adventure lang={lang} />}
        </div>
      </section>
    </main>
  );
}
