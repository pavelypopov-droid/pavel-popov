"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RotateCcw, MessageCircle } from "lucide-react";
import { track } from "@/components/seo/Analytics";
import type { Locale } from "@/lib/i18n-config";

const t = {
  ru: {
    title: "Проверь зрелость своего IT",
    subtitle: "7 вопросов — персональный IT-профиль с рекомендациями",
    next: "Далее",
    back: "Назад",
    seeResult: "Показать результат",
    restart: "Пройти заново",
    resultTitle: "Ваш IT-профиль",
    recommended: "Рекомендованные услуги",
    cta: "Обсудить с Павлом",
    ctaHref: "/ru/contacts",
    questionOf: "из",
    axes: {
      strategy: "Стратегия",
      ai: "AI",
      data: "Данные",
      team: "Команда",
    },
    questions: [
      {
        question: "Ваша отрасль",
        options: ["Банк", "Телеком", "Госсектор", "FinTech", "Другое"],
      },
      {
        question: "Размер IT-команды",
        options: ["Нет команды", "1–10 человек", "10–50 человек", "50+ человек"],
      },
      {
        question: "Есть ли IT-стратегия на 3+ года?",
        options: ["Да, утверждена", "В процессе разработки", "Нет"],
      },
      {
        question: "Уровень внедрения AI",
        options: ["В продакшене", "Пилотные проекты", "Планируем", "Не рассматриваем"],
      },
      {
        question: "Данные и хранилище (DWH)",
        options: ["Зрелый DWH", "Разрозненные базы", "Excel-файлы", "Ничего нет"],
      },
      {
        question: "Регуляторная отчётность (ЦБ)",
        options: ["Автоматизирована", "Частично автоматизирована", "Ручная", "Не актуально"],
      },
      {
        question: "Главный вызов сейчас",
        options: ["Масштабирование", "Команда и кадры", "AI и автоматизация", "Регуляторика", "Стратегия"],
      },
    ],
    services: {
      strategy: { name: "IT & Digital Strategy", desc: "Аудит и стратегия на 3–5 лет" },
      ai: { name: "AI Implementation", desc: "Речевая аналитика, ML-скоринг, фрод-мониторинг" },
      data: { name: "RegTech & DWH", desc: "Регуляторная отчётность и хранилище данных" },
      team: { name: "FinTech Team Assembly", desc: "Сборка и развитие IT-команд" },
      delivery: { name: "Turnkey Delivery", desc: "Комплексная поставка под ключ" },
      cto: { name: "CTO-as-a-Service", desc: "Внешний CTO для вашего бизнеса" },
    },
  },
  en: {
    title: "Check Your IT Maturity",
    subtitle: "7 questions — personal IT profile with recommendations",
    next: "Next",
    back: "Back",
    seeResult: "See Result",
    restart: "Start Over",
    resultTitle: "Your IT Profile",
    recommended: "Recommended Services",
    cta: "Discuss with Pavel",
    ctaHref: "/en/contacts",
    questionOf: "of",
    axes: {
      strategy: "Strategy",
      ai: "AI",
      data: "Data",
      team: "Team",
    },
    questions: [
      {
        question: "Your industry",
        options: ["Banking", "Telecom", "Government", "FinTech", "Other"],
      },
      {
        question: "IT team size",
        options: ["No team", "1–10 people", "10–50 people", "50+ people"],
      },
      {
        question: "Do you have an IT strategy for 3+ years?",
        options: ["Yes, approved", "In development", "No"],
      },
      {
        question: "AI adoption level",
        options: ["In production", "Pilot projects", "Planning", "Not considering"],
      },
      {
        question: "Data & warehouse (DWH)",
        options: ["Mature DWH", "Scattered databases", "Excel files", "Nothing"],
      },
      {
        question: "Regulatory reporting (Central Bank)",
        options: ["Automated", "Partially automated", "Manual", "Not applicable"],
      },
      {
        question: "Main challenge right now",
        options: ["Scaling", "Team & talent", "AI & automation", "Regulatory", "Strategy"],
      },
    ],
    services: {
      strategy: { name: "IT & Digital Strategy", desc: "Audit and 3–5 year strategy" },
      ai: { name: "AI Implementation", desc: "Speech analytics, ML scoring, fraud monitoring" },
      data: { name: "RegTech & DWH", desc: "Regulatory reporting and data warehouse" },
      team: { name: "FinTech Team Assembly", desc: "Building and developing IT teams" },
      delivery: { name: "Turnkey Delivery", desc: "End-to-end solution delivery" },
      cto: { name: "CTO-as-a-Service", desc: "External CTO for your business" },
    },
  },
};

// Scoring weights: each answer maps to axis scores
const scoring: Record<number, number[][]> = {
  // Q0: Industry — no scoring, context only
  0: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
  // Q1: Team size → Team axis
  1: [[0,0,0,1],[0,0,0,3],[0,0,0,6],[0,0,0,9]],
  // Q2: IT Strategy → Strategy axis
  2: [[9,0,0,0],[5,0,0,0],[1,0,0,0]],
  // Q3: AI level → AI axis
  3: [[0,9,0,0],[0,6,0,0],[0,3,0,0],[0,1,0,0]],
  // Q4: Data → Data axis
  4: [[0,0,9,0],[0,0,5,0],[0,0,2,0],[0,0,1,0]],
  // Q5: Regulatory → Data axis boost
  5: [[0,0,3,0],[0,0,2,0],[0,0,1,0],[0,0,0,0]],
  // Q6: Main challenge — boost relevant axis
  6: [[2,0,0,0],[0,0,0,3],[0,3,0,0],[0,0,3,0],[3,0,0,0]],
};

function calcScores(answers: number[]): [number, number, number, number] {
  const raw = [0, 0, 0, 0];
  for (let q = 0; q < answers.length; q++) {
    const a = answers[q];
    if (a >= 0 && scoring[q]?.[a]) {
      const s = scoring[q][a];
      raw[0] += s[0]; raw[1] += s[1]; raw[2] += s[2]; raw[3] += s[3];
    }
  }
  // Normalize to 0-10
  const max = [12, 12, 12, 12];
  return raw.map((v, i) => Math.round((v / max[i]) * 10)) as [number, number, number, number];
}

function getTopServices(scores: [number, number, number, number]): string[] {
  const axes: Array<{ axis: string; score: number }> = [
    { axis: "strategy", score: scores[0] },
    { axis: "ai", score: scores[1] },
    { axis: "data", score: scores[2] },
    { axis: "team", score: scores[3] },
  ];
  // Recommend services for weakest axes
  axes.sort((a, b) => a.score - b.score);
  const weakest = axes.slice(0, 2).map((a) => a.axis);
  return weakest;
}

// Simple SVG radar chart
function RadarChart({ scores, labels }: { scores: [number, number, number, number]; labels: string[] }) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

  const getPoint = (angle: number, value: number) => ({
    x: cx + (r * value / 10) * Math.cos(angle),
    y: cy + (r * value / 10) * Math.sin(angle),
  });

  const gridLevels = [2.5, 5, 7.5, 10];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px] mx-auto">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = angles.map((a) => getPoint(a, level));
        return (
          <polygon
            key={level}
            points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        );
      })}
      {/* Axes */}
      {angles.map((a, i) => {
        const end = getPoint(a, 10);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />;
      })}
      {/* Data polygon */}
      <motion.polygon
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        points={angles.map((a, i) => {
          const p = getPoint(a, scores[i]);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill="rgba(37, 99, 235, 0.3)"
        stroke="#2563EB"
        strokeWidth={2}
      />
      {/* Score dots */}
      {angles.map((a, i) => {
        const p = getPoint(a, scores[i]);
        return <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2563EB" stroke="white" strokeWidth={2} />;
      })}
      {/* Labels */}
      {angles.map((a, i) => {
        const p = getPoint(a, 13);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-300 text-[10px] font-medium"
          >
            {labels[i]} ({scores[i]})
          </text>
        );
      })}
    </svg>
  );
}

interface Props {
  lang?: Locale;
}

export default function Quiz({ lang = "ru" }: Props) {
  const tx = t[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(7).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = useCallback((optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = optionIndex;
    setAnswers(newAnswers);
    track.serviceView(`quiz_q${step}_a${optionIndex}`);
  }, [answers, step]);

  const goNext = useCallback(() => {
    if (step < 6) setStep(step + 1);
    else {
      setShowResult(true);
      track.serviceView("quiz_result");
    }
  }, [step]);

  const goBack = useCallback(() => {
    if (showResult) setShowResult(false);
    else if (step > 0) setStep(step - 1);
  }, [step, showResult]);

  const restart = useCallback(() => {
    setStep(0);
    setAnswers(new Array(7).fill(-1));
    setShowResult(false);
  }, []);

  const scores = calcScores(answers);
  const topServiceKeys = getTopServices(scores);
  const allServices = tx.services as Record<string, { name: string; desc: string }>;

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-white mb-8 text-center">{tx.resultTitle}</h3>

        <RadarChart
          scores={scores}
          labels={[tx.axes.strategy, tx.axes.ai, tx.axes.data, tx.axes.team]}
        />

        <div className="mt-10">
          <h4 className="text-lg font-semibold text-white mb-4">{tx.recommended}</h4>
          <div className="space-y-3">
            {topServiceKeys.map((key) => {
              const svc = allServices[key];
              if (!svc) return null;
              return (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white">{svc.name}</p>
                  <p className="text-sm text-slate-400">{svc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link
            href={tx.ctaHref}
            onClick={() => track.ctaClick("quiz_result")}
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            <MessageCircle size={18} />
            {tx.cta}
          </Link>
          <button
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-colors"
          >
            <RotateCcw size={18} />
            {tx.restart}
          </button>
        </div>
      </motion.div>
    );
  }

  const q = tx.questions[step];
  const currentAnswer = answers[step];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-slate-400">
          {step + 1} {tx.questionOf} {tx.questions.length}
        </span>
        <div className="flex-1 mx-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2563EB] rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / tx.questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">{q.question}</h3>

          <div className="space-y-2 sm:space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl border transition-all text-sm sm:text-base ${
                  currentAnswer === i
                    ? "bg-[#2563EB]/20 border-[#2563EB] text-white"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} />
          {tx.back}
        </button>
        <button
          onClick={goNext}
          disabled={currentAnswer < 0}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {step === 6 ? tx.seeResult : tx.next}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
