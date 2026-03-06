"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RotateCcw, MessageCircle, DollarSign, Users, Star, Clock } from "lucide-react";
import { track } from "@/components/seo/Analytics";
import type { Locale } from "@/lib/i18n-config";

interface Metrics {
  budget: number;   // $M
  team: number;     // people
  reputation: number; // %
  time: number;     // months
}

interface Choice {
  label: string;
  effect: Partial<Metrics>;
  feedback: string;
}

interface Scenario {
  title: string;
  description: string;
  choices: Choice[];
  pavelChoice: number; // index of what Pavel would pick
  pavelComment: string;
}

const t = {
  ru: {
    title: "Симулятор CIO: День в банке",
    subtitle: "5 реальных ситуаций. Управляйте бюджетом, командой и репутацией.",
    start: "Начать симуляцию",
    next: "Следующая ситуация",
    seeResult: "Показать итоги",
    restart: "Пройти заново",
    cta: "Обсудить с Павлом",
    ctaHref: "/ru/contacts",
    situationOf: "из",
    pavelWouldDo: "Как решал Павел:",
    yourChoice: "Ваш выбор:",
    resultTitle: "Итоги симуляции",
    comparison: "Сравнение с решениями Павла",
    matchLabel: "Совпадение с Павлом",
    metricsLabels: {
      budget: "Бюджет",
      team: "Команда",
      reputation: "Репутация",
      time: "Время",
    },
    scenarios: [
      {
        title: "ЦБ требует отчётность через 6 месяцев",
        description: "Регулятор ужесточил требования к банковской отчётности. У вас 6 месяцев и вопрос: как обеспечить соответствие?",
        choices: [
          { label: "Построить DWH с нуля", effect: { budget: -8, team: -2, time: -4, reputation: 5 }, feedback: "Долго и дорого, но фундаментально. Риск не уложиться в срок." },
          { label: "Купить готовое решение", effect: { budget: -12, time: -1, reputation: 0 }, feedback: "Быстро, но дорого и зависимость от вендора." },
          { label: "Гибридный MVP: ядро + вендор", effect: { budget: -6, team: -1, time: -2, reputation: 3 }, feedback: "Баланс скорости и гибкости. Оптимальный путь." },
        ],
        pavelChoice: 2,
        pavelComment: "Гибридный подход: MVP за 3 месяца покрывает требования ЦБ, затем развиваем собственный DWH. Так я делал в двух банках.",
      },
      {
        title: "CEO хочет AI в кредитовании",
        description: "Совет директоров вдохновлён AI-хайпом. CEO хочет «AI в кредитном скоринге» к следующему кварталу. Данные разрозненные, ML-команды нет.",
        choices: [
          { label: "Нанять ML-команду из 5 человек", effect: { budget: -5, team: 5, time: -6, reputation: 2 }, feedback: "Правильная инвестиция, но долго: найм + онбординг + разработка." },
          { label: "Купить SaaS-решение от вендора", effect: { budget: -7, time: -2, reputation: -5 }, feedback: "Быстро, но данные уходят наружу. Регулятор может не одобрить." },
          { label: "Начать с пилота на своих данных", effect: { budget: -2, time: -3, reputation: 5 }, feedback: "Пилот доказывает ценность, минимизирует риски, даёт время на команду." },
        ],
        pavelChoice: 2,
        pavelComment: "Всегда начинаю с пилота. Собираем данные, доказываем ROI, затем масштабируем. 4 AI-проекта в банке — все начинались с пилотов.",
      },
      {
        title: "Уходит половина IT-команды",
        description: "Конкуренты предложили x2 зарплату. 5 из 10 ключевых инженеров готовы уйти. У вас критичные проекты в работе.",
        choices: [
          { label: "Повысить зарплаты всем на 50%", effect: { budget: -6, reputation: -3 }, feedback: "Удержите людей, но бюджет пострадает. И остальные тоже попросят повышение." },
          { label: "Аутсорс для критичных проектов", effect: { budget: -4, team: -3, time: -2, reputation: -5 }, feedback: "Покроете дыру, но потеряете экспертизу и контроль." },
          { label: "Создать IT-хаб в регионе с нуля", effect: { budget: -3, team: 8, time: -4, reputation: 8 }, feedback: "Долгосрочное решение: дешевле, лояльнее, масштабируемо." },
        ],
        pavelChoice: 2,
        pavelComment: "Я создал IT-хаб на 60 человек с нуля. Первые результаты через 3 месяца, полная мощность через 6. Дешевле и устойчивее, чем гонка зарплат.",
      },
      {
        title: "Кибер-инцидент: утечка данных",
        description: "Обнаружена утечка персональных данных 50,000 клиентов. Пресса пока не знает. Регулятор ждёт отчёт через 72 часа.",
        choices: [
          { label: "Закрыть всё: отключить системы", effect: { budget: -3, time: -1, reputation: -15 }, feedback: "Паника видна всем. Клиенты не могут пользоваться сервисами. СМИ подхватят." },
          { label: "Расследование + патч + раскрытие", effect: { budget: -4, time: -1, reputation: -5 }, feedback: "Профессиональный подход: найти причину, закрыть, уведомить по процедуре." },
          { label: "Срочно нанять CISO и отдать ему", effect: { budget: -5, team: 1, time: -2, reputation: -10 }, feedback: "CISO не появится за день. Пока ищете — теряете время и контроль." },
        ],
        pavelChoice: 1,
        pavelComment: "Расследование + патч + прозрачное раскрытие. Регулятор ценит проактивность, а не панику. Параллельно — нанимаем CISO на будущее.",
      },
      {
        title: "Совет директоров просит 3-летнюю стратегию",
        description: "Через 2 недели заседание совета директоров. Нужна IT-стратегия на 3 года с бюджетом и KPI. У вас нет стратегического документа.",
        choices: [
          { label: "Сделать PowerPoint за неделю", effect: { budget: 0, time: -1, reputation: -8 }, feedback: "Красиво, но поверхностно. Совет задаст неудобные вопросы." },
          { label: "Full аудит + roadmap за 2 недели", effect: { budget: -2, team: -2, time: -2, reputation: 8 }, feedback: "Интенсивно, но результат обоснованный. Уважение совета гарантировано." },
          { label: "Нанять консультанта", effect: { budget: -8, time: -1, reputation: 2 }, feedback: "Дорого и формально. Совет может спросить: «Почему CIO не справился сам?»" },
        ],
        pavelChoice: 1,
        pavelComment: "Full аудит за 2 недели: интервью с бизнесом, анализ систем, roadmap с бюджетом. Именно такие стратегии я делаю для клиентов.",
      },
    ] as Scenario[],
  },
  en: {
    title: "CIO Simulator: Day at the Bank",
    subtitle: "5 real situations. Manage budget, team, and reputation.",
    start: "Start Simulation",
    next: "Next Situation",
    seeResult: "See Results",
    restart: "Start Over",
    cta: "Discuss with Pavel",
    ctaHref: "/en/contacts",
    situationOf: "of",
    pavelWouldDo: "How Pavel solved it:",
    yourChoice: "Your choice:",
    resultTitle: "Simulation Results",
    comparison: "Comparison with Pavel's decisions",
    matchLabel: "Match with Pavel",
    metricsLabels: {
      budget: "Budget",
      team: "Team",
      reputation: "Reputation",
      time: "Time",
    },
    scenarios: [
      {
        title: "Central Bank demands reporting in 6 months",
        description: "The regulator has tightened bank reporting requirements. You have 6 months. How do you comply?",
        choices: [
          { label: "Build DWH from scratch", effect: { budget: -8, team: -2, time: -4, reputation: 5 }, feedback: "Slow and expensive, but fundamental. Risk of missing the deadline." },
          { label: "Buy a turnkey solution", effect: { budget: -12, time: -1, reputation: 0 }, feedback: "Fast but expensive with vendor lock-in." },
          { label: "Hybrid MVP: core + vendor", effect: { budget: -6, team: -1, time: -2, reputation: 3 }, feedback: "Balance of speed and flexibility. Optimal path." },
        ],
        pavelChoice: 2,
        pavelComment: "Hybrid approach: MVP in 3 months covers CB requirements, then we develop our own DWH. Did this in two banks.",
      },
      {
        title: "CEO wants AI in lending",
        description: "The board is inspired by the AI hype. CEO wants 'AI credit scoring' by next quarter. Data is scattered, no ML team.",
        choices: [
          { label: "Hire an ML team of 5", effect: { budget: -5, team: 5, time: -6, reputation: 2 }, feedback: "Right investment, but slow: hiring + onboarding + development." },
          { label: "Buy a SaaS vendor solution", effect: { budget: -7, time: -2, reputation: -5 }, feedback: "Fast, but data goes outside. Regulator may not approve." },
          { label: "Start with a pilot on own data", effect: { budget: -2, time: -3, reputation: 5 }, feedback: "Pilot proves value, minimizes risks, gives time for team building." },
        ],
        pavelChoice: 2,
        pavelComment: "Always start with a pilot. Collect data, prove ROI, then scale. All 4 AI projects at the bank started as pilots.",
      },
      {
        title: "Half the IT team is leaving",
        description: "Competitors offered 2x salary. 5 of 10 key engineers are ready to leave. Critical projects are in progress.",
        choices: [
          { label: "Raise salaries by 50% for everyone", effect: { budget: -6, reputation: -3 }, feedback: "You'll retain people, but the budget suffers. Others will ask for raises too." },
          { label: "Outsource critical projects", effect: { budget: -4, team: -3, time: -2, reputation: -5 }, feedback: "Covers the gap but loses expertise and control." },
          { label: "Build an IT hub in a new region", effect: { budget: -3, team: 8, time: -4, reputation: 8 }, feedback: "Long-term solution: cheaper, more loyal, scalable." },
        ],
        pavelChoice: 2,
        pavelComment: "I built an IT hub of 60 people from scratch. First results in 3 months, full capacity in 6. Cheaper and more sustainable than a salary race.",
      },
      {
        title: "Cyber incident: data breach",
        description: "A data breach of 50,000 customer records detected. Press doesn't know yet. Regulator expects a report in 72 hours.",
        choices: [
          { label: "Shut everything down", effect: { budget: -3, time: -1, reputation: -15 }, feedback: "Panic is visible. Customers can't use services. Media will pick it up." },
          { label: "Investigate + patch + disclose", effect: { budget: -4, time: -1, reputation: -5 }, feedback: "Professional approach: find the cause, fix, notify following procedure." },
          { label: "Urgently hire a CISO", effect: { budget: -5, team: 1, time: -2, reputation: -10 }, feedback: "A CISO won't appear in a day. While searching — losing time and control." },
        ],
        pavelChoice: 1,
        pavelComment: "Investigate + patch + transparent disclosure. The regulator values proactivity, not panic. In parallel — hire a CISO for the future.",
      },
      {
        title: "Board requests a 3-year strategy",
        description: "Board meeting in 2 weeks. Need a 3-year IT strategy with budget and KPIs. You have no strategic document.",
        choices: [
          { label: "Make a PowerPoint in a week", effect: { budget: 0, time: -1, reputation: -8 }, feedback: "Looks nice, but shallow. The board will ask uncomfortable questions." },
          { label: "Full audit + roadmap in 2 weeks", effect: { budget: -2, team: -2, time: -2, reputation: 8 }, feedback: "Intensive but well-founded. Board's respect guaranteed." },
          { label: "Hire a consultant", effect: { budget: -8, time: -1, reputation: 2 }, feedback: "Expensive and formal. Board may ask: 'Why couldn't the CIO do it?'" },
        ],
        pavelChoice: 1,
        pavelComment: "Full audit in 2 weeks: business interviews, systems analysis, roadmap with budget. This is exactly the kind of strategy I build for clients.",
      },
    ] as Scenario[],
  },
};

const INITIAL_METRICS: Metrics = { budget: 25, team: 10, reputation: 100, time: 12 };

interface Props {
  lang?: Locale;
}

export default function Simulator({ lang = "ru" }: Props) {
  const tx = t[lang];
  const [step, setStep] = useState(-1); // -1 = intro
  const [metrics, setMetrics] = useState<Metrics>({ ...INITIAL_METRICS });
  const [choices, setChoices] = useState<number[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scenarios = tx.scenarios;

  const handleChoice = useCallback((idx: number) => {
    if (showFeedback) return;
    setSelectedChoice(idx);
    setShowFeedback(true);

    const scenario = scenarios[step];
    const effect = scenario.choices[idx].effect;
    setMetrics((prev) => ({
      budget: prev.budget + (effect.budget || 0),
      team: Math.max(0, prev.team + (effect.team || 0)),
      reputation: Math.max(0, Math.min(100, prev.reputation + (effect.reputation || 0))),
      time: Math.max(0, prev.time + (effect.time || 0)),
    }));
    setChoices((prev) => [...prev, idx]);

    track.serviceView(`sim_s${step}_c${idx}`);
  }, [showFeedback, step, scenarios]);

  const goNext = useCallback(() => {
    if (step < scenarios.length - 1) {
      setStep(step + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setShowResult(true);
      track.serviceView("sim_result");
    }
  }, [step, scenarios.length]);

  const restart = useCallback(() => {
    setStep(-1);
    setMetrics({ ...INITIAL_METRICS });
    setChoices([]);
    setSelectedChoice(null);
    setShowFeedback(false);
    setShowResult(false);
  }, []);

  const matchCount = choices.filter((c, i) => c === scenarios[i].pavelChoice).length;

  // Metrics bar
  const MetricsBar = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8">
      {[
        { icon: DollarSign, label: tx.metricsLabels.budget, value: `$${metrics.budget}M`, color: metrics.budget < 10 ? "text-red-400" : "text-green-400" },
        { icon: Users, label: tx.metricsLabels.team, value: `${metrics.team}`, color: metrics.team < 5 ? "text-red-400" : "text-blue-400" },
        { icon: Star, label: tx.metricsLabels.reputation, value: `${metrics.reputation}%`, color: metrics.reputation < 50 ? "text-red-400" : "text-amber-400" },
        { icon: Clock, label: tx.metricsLabels.time, value: `${metrics.time}m`, color: metrics.time < 4 ? "text-red-400" : "text-slate-300" },
      ].map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-3 text-center">
          <Icon size={14} className={`mx-auto mb-1 ${color} sm:w-4 sm:h-4`} />
          <p className={`text-base sm:text-lg font-bold ${color}`}>{value}</p>
          <p className="text-[10px] sm:text-xs text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  );

  // Result screen
  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{tx.resultTitle}</h3>

        <MetricsBar />

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-white mb-4">{tx.comparison}</h4>
          <div className="space-y-4">
            {scenarios.map((scenario, i) => {
              const matched = choices[i] === scenario.pavelChoice;
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${matched ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>
                    {matched ? "=" : "~"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{scenario.title}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {tx.yourChoice} {scenario.choices[choices[i]]?.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-lg font-bold text-white">
              {tx.matchLabel}: {matchCount}/{scenarios.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={tx.ctaHref}
            onClick={() => track.ctaClick("simulator_result")}
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

  // Intro screen
  if (step === -1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="text-6xl mb-6">🏦</div>
        <h3 className="text-2xl font-bold text-white mb-4">{tx.title}</h3>
        <p className="text-slate-400 mb-8">{tx.subtitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {[
            { icon: DollarSign, label: tx.metricsLabels.budget, value: `$${INITIAL_METRICS.budget}M` },
            { icon: Users, label: tx.metricsLabels.team, value: `${INITIAL_METRICS.team}` },
            { icon: Star, label: tx.metricsLabels.reputation, value: `${INITIAL_METRICS.reputation}%` },
            { icon: Clock, label: tx.metricsLabels.time, value: `${INITIAL_METRICS.time}m` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-3 text-center">
              <Icon size={14} className="mx-auto mb-1 text-slate-400 sm:w-4 sm:h-4" />
              <p className="text-sm font-bold text-white">{value}</p>
              <p className="text-[10px] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStep(0)}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#1d4ed8] transition-colors"
        >
          {tx.start} <ArrowRight size={18} />
        </button>
      </motion.div>
    );
  }

  // Scenario screen
  const scenario = scenarios[step];

  return (
    <div className="max-w-2xl mx-auto">
      <MetricsBar />

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-slate-400">
          {step + 1} {tx.situationOf} {scenarios.length}
        </span>
        <div className="flex-1 mx-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2563EB] rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / scenarios.length) * 100}%` }}
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
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{scenario.title}</h3>
          <p className="text-slate-400 mb-6">{scenario.description}</p>

          <div className="space-y-2 sm:space-y-3">
            {scenario.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                disabled={showFeedback}
                className={`w-full text-left px-3 py-2.5 sm:px-5 sm:py-4 rounded-xl border transition-all text-sm sm:text-base ${
                  selectedChoice === i
                    ? i === scenario.pavelChoice
                      ? "bg-green-500/20 border-green-500 text-white"
                      : "bg-amber-500/20 border-amber-500 text-white"
                    : showFeedback && i === scenario.pavelChoice
                    ? "bg-green-500/10 border-green-500/30 text-slate-300"
                    : showFeedback
                    ? "bg-white/5 border-white/5 text-slate-500"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span className="font-medium">{choice.label}</span>
                {showFeedback && (selectedChoice === i || i === scenario.pavelChoice) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-slate-400 mt-2"
                  >
                    {choice.feedback}
                  </motion.p>
                )}
              </button>
            ))}
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-xl p-4"
            >
              <p className="text-sm font-semibold text-blue-300 mb-1">{tx.pavelWouldDo}</p>
              <p className="text-sm text-slate-300">{scenario.pavelComment}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {showFeedback && (
        <div className="flex justify-end mt-6">
          <button
            onClick={goNext}
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            {step === scenarios.length - 1 ? tx.seeResult : tx.next}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
