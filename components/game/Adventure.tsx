"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Zap, Briefcase, Heart, ArrowRight, RotateCcw, MessageCircle, Bot, ShieldCheck,
} from "lucide-react";
import { track } from "@/components/seo/Analytics";
import AdventureScene from "./AdventureScene";
import {
  LEVELS, ENDINGS, INITIAL_METRICS, ROLE_INFO, getEnding,
  type AdventureMetrics, type Choice,
} from "./adventure-data";
import type { Locale } from "@/lib/i18n-config";

// ─── Types ───

type Phase = "role_select" | "playing" | "level_complete" | "game_over" | "victory";
type Role = "cio" | "caio";

interface GameState {
  phase: Phase;
  role: Role | null;
  level: number;
  situation: number;
  step: number; // for multi-step situations
  metrics: AdventureMetrics;
  choices: number[];
  weights: number[];
  showFeedback: boolean;
  selectedChoice: number | null;
  feedbackText: string;
  timer: number;
  aiCardUsed: boolean;
  aiHighlight: number | null;
}

type Action =
  | { type: "SELECT_ROLE"; role: Role }
  | { type: "CHOOSE"; index: number; feedback: string; effects: Partial<AdventureMetrics>; weight: number }
  | { type: "NEXT" }
  | { type: "NEXT_LEVEL" }
  | { type: "TICK" }
  | { type: "TIMEOUT"; feedback: string; effects: Partial<AdventureMetrics> }
  | { type: "USE_AI"; bestIndex: number }
  | { type: "CLEAR_AI" }
  | { type: "RESTART" };

const TIMER_SECONDS = 30;

function applyEffects(m: AdventureMetrics, e: Partial<AdventureMetrics>): AdventureMetrics {
  return {
    energy: Math.max(0, Math.min(100, m.energy + (e.energy || 0))),
    reputation: Math.max(0, Math.min(100, m.reputation + (e.reputation || 0))),
    budget: m.budget + (e.budget || 0),
    karma: Math.max(0, Math.min(100, m.karma + (e.karma || 0))),
  };
}

function isGameOver(m: AdventureMetrics): string | null {
  if (m.energy <= 0) return "E";
  if (m.reputation <= 0) return "D";
  if (m.budget <= 0) return "F";
  if (m.karma <= 0) return "G";
  return null;
}

function getSituationChoices(state: GameState): Choice[] {
  const sit = LEVELS[state.level].situations[state.situation];
  if (sit.steps && sit.steps.length > 0) {
    return sit.steps[state.step]?.choices || [];
  }
  return sit.choices;
}

function getSituationScene(state: GameState): string[] {
  const sit = LEVELS[state.level].situations[state.situation];
  if (sit.steps && sit.steps.length > 0 && sit.steps[state.step]) {
    return sit.steps[state.step].scene;
  }
  return sit.scene;
}

function getSituationDescription(state: GameState, lang: Locale): string {
  const sit = LEVELS[state.level].situations[state.situation];
  if (sit.steps && sit.steps.length > 0 && sit.steps[state.step]) {
    return sit.steps[state.step].description[lang];
  }
  return sit.description[lang];
}

function getTotalSituations(): number {
  return LEVELS.reduce((sum, l) => {
    return sum + l.situations.reduce((s2, sit) => {
      return s2 + (sit.steps && sit.steps.length > 0 ? sit.steps.length : 1);
    }, 0);
  }, 0);
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SELECT_ROLE":
      return {
        ...state,
        phase: "playing",
        role: action.role,
        level: 0,
        situation: 0,
        step: 0,
        timer: TIMER_SECONDS,
        aiCardUsed: false,
        aiHighlight: null,
      };

    case "CHOOSE": {
      const newMetrics = applyEffects(state.metrics, action.effects);
      const go = isGameOver(newMetrics);
      return {
        ...state,
        showFeedback: true,
        selectedChoice: action.index,
        feedbackText: action.feedback,
        metrics: newMetrics,
        choices: [...state.choices, action.index],
        weights: [...state.weights, action.weight],
        phase: go ? "game_over" : state.phase,
        aiHighlight: null,
      };
    }

    case "TIMEOUT": {
      const newMetrics = applyEffects(state.metrics, action.effects);
      newMetrics.energy = Math.max(0, newMetrics.energy - 5); // timeout penalty
      const go = isGameOver(newMetrics);
      return {
        ...state,
        showFeedback: true,
        selectedChoice: -1, // timeout marker
        feedbackText: action.feedback,
        metrics: newMetrics,
        choices: [...state.choices, -1],
        weights: [...state.weights, 0],
        phase: go ? "game_over" : state.phase,
        aiHighlight: null,
      };
    }

    case "NEXT": {
      if (state.phase === "game_over") return state;

      const sit = LEVELS[state.level].situations[state.situation];
      const hasSteps = sit.steps && sit.steps.length > 0;
      const maxSteps = hasSteps ? sit.steps!.length : 1;
      const nextStep = state.step + 1;

      // More steps in this situation?
      if (hasSteps && nextStep < maxSteps) {
        return {
          ...state,
          step: nextStep,
          showFeedback: false,
          selectedChoice: null,
          feedbackText: "",
          timer: TIMER_SECONDS,
        };
      }

      // More situations in this level?
      const nextSit = state.situation + 1;
      if (nextSit < LEVELS[state.level].situations.length) {
        return {
          ...state,
          situation: nextSit,
          step: 0,
          showFeedback: false,
          selectedChoice: null,
          feedbackText: "",
          timer: TIMER_SECONDS,
        };
      }

      // More levels?
      const nextLevel = state.level + 1;
      if (nextLevel < LEVELS.length) {
        return {
          ...state,
          phase: "level_complete",
          showFeedback: false,
          selectedChoice: null,
          feedbackText: "",
        };
      }

      // Victory!
      return { ...state, phase: "victory", showFeedback: false };
    }

    case "TICK":
      if (state.showFeedback || state.phase !== "playing") return state;
      return { ...state, timer: Math.max(0, state.timer - 1) };

    case "NEXT_LEVEL": {
      const nextLevel = state.level + 1;
      if (nextLevel >= LEVELS.length) return { ...state, phase: "victory" };
      // Rest between levels: recover 15 energy (weekend rest)
      const recoveredMetrics = {
        ...state.metrics,
        energy: Math.min(100, state.metrics.energy + 25),
      };
      return {
        ...state,
        phase: "playing",
        level: nextLevel,
        situation: 0,
        step: 0,
        metrics: recoveredMetrics,
        showFeedback: false,
        selectedChoice: null,
        feedbackText: "",
        timer: TIMER_SECONDS,
        aiCardUsed: false,
        aiHighlight: null,
      };
    }

    case "USE_AI":
      return { ...state, aiCardUsed: true, aiHighlight: action.bestIndex };

    case "CLEAR_AI":
      return { ...state, aiHighlight: null };

    case "RESTART":
      return initialState();

    default:
      return state;
  }
}

function initialState(): GameState {
  return {
    phase: "role_select",
    role: null,
    level: 0,
    situation: 0,
    step: 0,
    metrics: { ...INITIAL_METRICS },
    choices: [],
    weights: [],
    showFeedback: false,
    selectedChoice: null,
    feedbackText: "",
    timer: TIMER_SECONDS,
    aiCardUsed: false,
    aiHighlight: null,
  };
}

// ─── Translations ───

const t = {
  ru: {
    title: "Выживание CIO",
    subtitle: "Пошаговое приключение. 5 уровней, 17 ситуаций, 8 концовок.",
    pickRole: "Выберите роль",
    start: "Начать игру",
    level: "Уровень",
    of: "из",
    next: "Далее",
    nextLevel: "Следующий уровень",
    levelComplete: "Уровень пройден!",
    energyRecovery: "Выходные: энергия +25",
    currentMetrics: "Текущие метрики",
    timerExpired: "Время вышло! Вы замешкались, и ситуация ухудшилась.",
    useAI: "Использовать AI",
    aiUsed: "AI использован",
    pavelComment: "Комментарий Павла:",
    result: "Результат",
    rank: "Ранг",
    restart: "Играть заново",
    cta: "Обсудить с Павлом",
    ctaHref: "/ru/contacts",
    gameOver: "Игра окончена",
    victory: "Вы дожили до конца года!",
    energy: "Энергия",
    reputation: "Репутация",
    budget: "Бюджет",
    karma: "Карма",
    step: "Шаг",
    timeout: "Время на решение",
    summary: "Ваш путь",
    summaryCorrect: "Оптимально",
    summaryRisky: "Рискованно",
    summaryBad: "Неудачно",
    summaryTimeout: "Время вышло",
    ctaBlock: "Хотите разобрать ваши решения с практикующим экспертом? 30 минут — бесплатно.",
    correctRatio: "Оптимальных решений",
  },
  en: {
    title: "CIO Survival",
    subtitle: "Step-by-step adventure. 5 levels, 17 situations, 8 endings.",
    pickRole: "Choose your role",
    start: "Start Game",
    level: "Level",
    of: "of",
    next: "Next",
    nextLevel: "Next Level",
    levelComplete: "Level Complete!",
    energyRecovery: "Weekend rest: energy +25",
    currentMetrics: "Current metrics",
    timerExpired: "Time's up! You hesitated and the situation worsened.",
    useAI: "Use AI",
    aiUsed: "AI used",
    pavelComment: "Pavel's comment:",
    result: "Result",
    rank: "Rank",
    restart: "Play Again",
    cta: "Discuss with Pavel",
    ctaHref: "/en/contacts",
    gameOver: "Game Over",
    victory: "You survived the year!",
    energy: "Energy",
    reputation: "Reputation",
    budget: "Budget",
    karma: "Karma",
    step: "Step",
    timeout: "Time to decide",
    summary: "Your Journey",
    summaryCorrect: "Optimal",
    summaryRisky: "Risky",
    summaryBad: "Poor",
    summaryTimeout: "Timed out",
    ctaBlock: "Want to review your decisions with a practising expert? 30 minutes — free.",
    correctRatio: "Optimal decisions",
  },
};

// ─── Component ───

interface Props {
  lang?: Locale;
}

export default function Adventure({ lang = "ru" }: Props) {
  const tx = t[lang] || t.ru;
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (state.phase === "playing" && !state.showFeedback) {
      timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    if (timerRef.current) clearInterval(timerRef.current);
  }, [state.phase, state.showFeedback, state.level, state.situation, state.step]);

  // Timer expired
  useEffect(() => {
    if (state.timer === 0 && state.phase === "playing" && !state.showFeedback) {
      const choices = getSituationChoices(state);
      const randomIdx = Math.floor(Math.random() * choices.length);
      const choice = choices[randomIdx];
      if (!choice) return;
      const isAlt = choice.random && Math.random() < choice.random && choice.altEffects;
      dispatch({
        type: "TIMEOUT",
        feedback: tx.timerExpired,
        effects: isAlt && choice.altEffects ? choice.altEffects : choice.effects,
      });
    }
  }, [state.timer, state.phase, state.showFeedback]);

  // AI card auto-clear
  useEffect(() => {
    if (state.aiHighlight !== null) {
      const t = setTimeout(() => dispatch({ type: "CLEAR_AI" }), 3000);
      return () => clearTimeout(t);
    }
  }, [state.aiHighlight]);

  const handleChoice = useCallback(
    (idx: number) => {
      if (state.showFeedback) return;
      const choices = getSituationChoices(state);
      const choice = choices[idx];
      if (!choice) return;

      const isAlt = choice.random && Math.random() < choice.random && choice.altEffects;
      const effects = isAlt && choice.altEffects ? choice.altEffects : choice.effects;
      const feedback = isAlt && choice.altFeedback ? choice.altFeedback[lang] : choice.feedback[lang];

      dispatch({ type: "CHOOSE", index: idx, feedback, effects, weight: choice.weight });
      track.serviceView(`adventure_l${state.level}_s${state.situation}_c${idx}`);
    },
    [state, lang],
  );

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT" });
  }, []);

  const handleUseAI = useCallback(() => {
    if (state.aiCardUsed) return;
    const choices = getSituationChoices(state);
    let bestIdx = 0;
    let bestWeight = -1;
    choices.forEach((c, i) => {
      if (c.weight > bestWeight) {
        bestWeight = c.weight;
        bestIdx = i;
      }
    });
    dispatch({ type: "USE_AI", bestIndex: bestIdx });
  }, [state]);

  // ─── Summary Block ───
  const SummaryBlock = () => {
    // Build list of played situations with their choice quality
    const played: { title: string; quality: "correct" | "risky" | "bad" | "timeout" }[] = [];
    let choiceIdx = 0;
    for (let l = 0; l <= Math.min(state.level, LEVELS.length - 1); l++) {
      const level = LEVELS[l];
      for (let s = 0; s < level.situations.length; s++) {
        const sit = level.situations[s];
        const hasSteps = sit.steps && sit.steps.length > 0;
        const stepCount = hasSteps ? sit.steps!.length : 1;
        for (let st = 0; st < stepCount; st++) {
          if (choiceIdx >= state.choices.length) break;
          const w = state.weights[choiceIdx];
          const c = state.choices[choiceIdx];
          const quality = c === -1 ? "timeout" : w >= 7 ? "correct" : w >= 4 ? "risky" : "bad";
          if (st === 0) {
            played.push({ title: sit.title[lang], quality });
          }
          choiceIdx++;
        }
        if (choiceIdx >= state.choices.length) break;
      }
      if (choiceIdx >= state.choices.length) break;
    }

    const optimal = state.weights.filter((w, i) => state.choices[i] !== -1 && w >= 7).length;
    const totalPlayed = state.weights.length;
    const pct = totalPlayed > 0 ? Math.round((optimal / totalPlayed) * 100) : 0;

    const qualityIcon = { correct: "✅", risky: "⚠️", bad: "❌", timeout: "⏰" };
    const qualityLabel = { correct: tx.summaryCorrect, risky: tx.summaryRisky, bad: tx.summaryBad, timeout: tx.summaryTimeout };

    return (
      <div className="mt-6 mb-6 text-left">
        <h4 className="text-base font-bold text-white mb-1">{tx.summary}</h4>
        <p className="text-sm text-slate-400 mb-3">{tx.correctRatio}: {optimal}/{totalPlayed} ({pct}%)</p>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {played.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span>{qualityIcon[p.quality]}</span>
              <span className="text-slate-300 truncate">{p.title}</span>
              <span className="text-xs text-slate-500 ml-auto whitespace-nowrap">{qualityLabel[p.quality]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── CTA Block ───
  const CTABlockGame = () => (
    <div className="bg-gradient-to-r from-[#2563EB]/20 to-purple-500/20 border border-[#2563EB]/30 rounded-xl p-5 mb-6 text-center">
      <p className="text-sm text-slate-300 mb-3">{tx.ctaBlock}</p>
      <Link
        href={tx.ctaHref}
        onClick={() => track.ctaClick("adventure_summary_cta")}
        className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm"
      >
        <MessageCircle size={16} /> {tx.cta}
      </Link>
    </div>
  );

  // ─── Metrics Bar (full — for end screens) ───
  const MetricsBar = () => {
    const items = [
      { icon: Zap, label: tx.energy, value: state.metrics.energy, suffix: "%", max: 100, color: state.metrics.energy < 25 ? "text-red-400" : "text-yellow-400" },
      { icon: ShieldCheck, label: tx.reputation, value: state.metrics.reputation, suffix: "%", max: 100, color: state.metrics.reputation < 25 ? "text-red-400" : "text-blue-400" },
      { icon: Briefcase, label: tx.budget, value: state.metrics.budget, suffix: "M", max: 30, color: state.metrics.budget < 5 ? "text-red-400" : "text-green-400" },
      { icon: Heart, label: tx.karma, value: state.metrics.karma, suffix: "", max: 100, color: state.metrics.karma < 15 ? "text-red-400" : "text-purple-400" },
    ];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {items.map(({ icon: Icon, label, value, suffix, max, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-3 text-center">
            <Icon size={14} className={`mx-auto mb-1 ${color}`} />
            <p className={`text-sm sm:text-lg font-bold ${color}`}>
              {label === tx.budget ? `$${value}` : value}{suffix !== "M" ? suffix : "M"}
            </p>
            <p className="text-[9px] sm:text-xs text-slate-500">{label}</p>
            <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${value / max < 0.25 ? "bg-red-500" : value / max < 0.5 ? "bg-yellow-500" : "bg-green-500"}`}
                style={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ─── Compact Metrics (inline — for playing screen) ───
  const CompactMetrics = () => {
    const items = [
      { icon: Zap, value: `${state.metrics.energy}%`, color: state.metrics.energy < 25 ? "text-red-400" : "text-yellow-400" },
      { icon: ShieldCheck, value: `${state.metrics.reputation}%`, color: state.metrics.reputation < 25 ? "text-red-400" : "text-blue-400" },
      { icon: Briefcase, value: `$${state.metrics.budget}M`, color: state.metrics.budget < 5 ? "text-red-400" : "text-green-400" },
      { icon: Heart, value: `${state.metrics.karma}`, color: state.metrics.karma < 15 ? "text-red-400" : "text-purple-400" },
    ];
    return (
      <div className="flex items-center gap-3 mb-3">
        {items.map(({ icon: Icon, value, color }) => (
          <div key={value} className="flex items-center gap-1">
            <Icon size={12} className={color} />
            <span className={`text-xs font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    );
  };

  // ─── Progress + Timer Bar (combined) ───
  const ProgressTimerBar = ({ completedCount, total }: { completedCount: number; total: number }) => {
    const progressPct = ((completedCount + 1) / total) * 100;
    const timerPct = (state.timer / TIMER_SECONDS) * 100;
    const isUrgent = state.timer < 10;
    const showTimer = !state.showFeedback && state.phase === "playing";
    return (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-500">
            {tx.level} {state.level + 1} · {completedCount + 1}/{total}
          </span>
          {showTimer && (
            <span className={`text-[10px] font-mono font-bold ${isUrgent ? "text-red-400 animate-pulse" : "text-slate-400"}`}>
              {state.timer}s
            </span>
          )}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          {showTimer ? (
            <motion.div
              className={`h-full rounded-full ${isUrgent ? "bg-red-500" : timerPct < 50 ? "bg-yellow-500" : "bg-blue-500"}`}
              animate={{ width: `${timerPct}%` }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="h-full bg-[#2563EB] rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>
    );
  };

  // ─── ROLE SELECT ───
  if (state.phase === "role_select") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center">
        <div className="text-4xl sm:text-5xl mb-4">🏦</div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{tx.title}</h3>
        <p className="text-slate-400 mb-8">{tx.subtitle}</p>

        <p className="text-sm text-slate-500 mb-4">{tx.pickRole}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {(["cio", "caio"] as Role[]).map((role) => {
            const info = ROLE_INFO[role];
            return (
              <button
                key={role}
                onClick={() => {
                  dispatch({ type: "SELECT_ROLE", role });
                  track.serviceView(`adventure_start_${role}`);
                }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 hover:border-[#2563EB]/50 transition-all group"
              >
                <span className="text-3xl mb-3 block">{info.emoji}</span>
                <p className="text-lg font-bold text-white group-hover:text-[#2563EB] transition-colors">
                  {info.title[lang]}
                </p>
                <p className="text-xs text-slate-500 mb-2">{info.subtitle[lang]}</p>
                <p className="text-sm text-slate-400">{info.description[lang]}</p>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: Zap, label: tx.energy, value: `${INITIAL_METRICS.energy}%` },
            { icon: ShieldCheck, label: tx.reputation, value: `${INITIAL_METRICS.reputation}%` },
            { icon: Briefcase, label: tx.budget, value: `$${INITIAL_METRICS.budget}M` },
            { icon: Heart, label: tx.karma, value: `${INITIAL_METRICS.karma}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
              <Icon size={14} className="mx-auto mb-1 text-slate-400" />
              <p className="text-sm font-bold text-white">{value}</p>
              <p className="text-[9px] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // ─── LEVEL COMPLETE ───
  if (state.phase === "level_complete") {
    const levelInfo = LEVELS[state.level];
    const nextLevel = state.level + 1;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-2">{tx.levelComplete}</h3>
        <p className="text-slate-400 mb-2">
          {tx.level} {state.level + 1}: {levelInfo.name[lang]}
        </p>
        <p className="text-sm text-slate-500 mb-4">{tx.currentMetrics}</p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
          <Zap size={14} />
          {tx.energyRecovery}
        </div>

        <MetricsBar />

        {nextLevel < LEVELS.length && (
          <div className="mb-6">
            <p className="text-sm text-slate-400">
              {tx.level} {nextLevel + 1}: {LEVELS[nextLevel].name[lang]}
            </p>
            <p className="text-xs text-slate-500">{LEVELS[nextLevel].subtitle[lang]}</p>
          </div>
        )}

        <button
          onClick={() => {
            dispatch({ type: "NEXT_LEVEL" });
            track.serviceView(`adventure_level_${state.level + 2}`);
          }}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#1d4ed8] transition-colors"
        >
          {tx.nextLevel} <ArrowRight size={18} />
        </button>
      </motion.div>
    );
  }

  // ─── GAME OVER ───
  if (state.phase === "game_over") {
    const goRank = isGameOver(state.metrics);
    const ending = ENDINGS.find((e) => e.rank === goRank) || ENDINGS[4];
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center">
        <div className="text-6xl mb-4">{ending.emoji}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{tx.gameOver}</h3>
        <h4 className="text-xl text-red-400 font-semibold mb-4">{ending.title[lang]}</h4>

        {state.feedbackText && (
          <p className="text-sm text-slate-400 mb-4 bg-white/5 border border-white/10 rounded-xl p-4">{state.feedbackText}</p>
        )}

        <p className="text-slate-300 mb-6">{ending.description[lang]}</p>

        <div className="bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-xl p-4 mb-8">
          <p className="text-sm font-semibold text-blue-300 mb-1">{tx.pavelComment}</p>
          <p className="text-sm text-slate-300">{ending.pavelAdvice[lang]}</p>
        </div>

        <MetricsBar />

        <SummaryBlock />
        <CTABlockGame />

        <div className="flex justify-center">
          <button
            onClick={() => dispatch({ type: "RESTART" })}
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-colors"
          >
            <RotateCcw size={18} /> {tx.restart}
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── VICTORY ───
  if (state.phase === "victory") {
    const totalWeight = state.weights.reduce((a, b) => a + b, 0);
    const maxWeight = getTotalSituations() * 9;
    const ending = getEnding(state.metrics, totalWeight, maxWeight);
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center">
        <div className="text-6xl mb-4">{ending.emoji}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{tx.victory}</h3>
        <p className="text-sm text-slate-500 mb-2">{tx.rank}: {ending.rank}</p>
        <h4 className="text-xl text-[#2563EB] font-semibold mb-4">{ending.title[lang]}</h4>
        <p className="text-slate-300 mb-6">{ending.description[lang]}</p>

        <div className="bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-xl p-4 mb-8">
          <p className="text-sm font-semibold text-blue-300 mb-1">{tx.pavelComment}</p>
          <p className="text-sm text-slate-300">{ending.pavelAdvice[lang]}</p>
        </div>

        <MetricsBar />

        <SummaryBlock />
        <CTABlockGame />

        <div className="flex justify-center">
          <button
            onClick={() => dispatch({ type: "RESTART" })}
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-colors"
          >
            <RotateCcw size={18} /> {tx.restart}
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── PLAYING ───
  const currentLevel = LEVELS[state.level];
  const currentSituation = currentLevel.situations[state.situation];
  const choices = getSituationChoices(state);
  const scene = getSituationScene(state);
  const description = getSituationDescription(state, lang);
  const hasSteps = currentSituation.steps && currentSituation.steps.length > 0;
  const totalSteps = hasSteps ? currentSituation.steps!.length : 1;

  // Progress: count completed situations across all levels
  let completedCount = 0;
  for (let l = 0; l < state.level; l++) {
    for (const s of LEVELS[l].situations) {
      completedCount += s.steps && s.steps.length > 0 ? s.steps.length : 1;
    }
  }
  for (let s = 0; s < state.situation; s++) {
    const sit = currentLevel.situations[s];
    completedCount += sit.steps && sit.steps.length > 0 ? sit.steps.length : 1;
  }
  completedCount += state.step;
  const total = getTotalSituations();

  return (
    <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
      {/* Left column: scene (desktop: sticky, mobile: collapsible) */}
      <div className={`${state.showFeedback ? "hidden lg:block" : ""} lg:sticky lg:top-24 lg:self-start`}>
        <AdventureScene tags={scene} energy={state.metrics.energy} />
        <p className="text-[10px] text-slate-500 mt-1 hidden lg:block">
          {tx.level} {state.level + 1}: {currentLevel.name[lang]}
        </p>
      </div>

      {/* Right column: gameplay */}
      <div>
        <CompactMetrics />
        <ProgressTimerBar completedCount={completedCount} total={total} />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${state.level}-${state.situation}-${state.step}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {currentSituation.title[lang]}
              {hasSteps && (
                <span className="text-xs text-slate-500 ml-2">
                  ({tx.step} {state.step + 1}/{totalSteps})
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-3 line-clamp-3">{description}</p>

            {/* AI Card button (CAIO only) */}
            {state.role === "caio" && !state.showFeedback && (
              <div className="mb-3">
                <button
                  onClick={handleUseAI}
                  disabled={state.aiCardUsed}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    state.aiCardUsed
                      ? "bg-white/5 text-slate-600 cursor-not-allowed"
                      : "bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30"
                  }`}
                >
                  <Bot size={14} />
                  {state.aiCardUsed ? tx.aiUsed : tx.useAI}
                </button>
              </div>
            )}

            {/* Choices */}
            <div className="space-y-1.5">
              {choices.map((choice, i) => {
                const isSelected = state.selectedChoice === i;
                const isHighlighted = state.aiHighlight === i;
                const bestChoice = choices.reduce((best, c, idx) => c.weight > choices[best].weight ? idx : best, 0);
                const isBest = i === bestChoice;

                return (
                  <button
                    key={i}
                    onClick={() => handleChoice(i)}
                    disabled={state.showFeedback}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-all text-xs sm:text-sm ${
                      isHighlighted
                        ? "bg-green-500/20 border-green-500 text-green-200 ring-2 ring-green-500/50"
                        : isSelected
                        ? isBest
                          ? "bg-green-500/20 border-green-500 text-white"
                          : "bg-amber-500/20 border-amber-500 text-white"
                        : state.showFeedback && isBest
                        ? "bg-green-500/10 border-green-500/30 text-slate-300"
                        : state.showFeedback
                        ? "bg-white/5 border-white/5 text-slate-500"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="font-medium">{choice.label[lang]}</span>
                  </button>
                );
              })}
            </div>

            {/* Timeout indicator */}
            {state.selectedChoice === -1 && state.showFeedback && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-400 mt-2"
              >
                {tx.timerExpired}
              </motion.p>
            )}

            {/* Feedback */}
            {state.showFeedback && state.feedbackText && state.selectedChoice !== -1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-white/5 border border-white/10 rounded-xl p-3"
              >
                <p className="text-xs sm:text-sm text-slate-300">{state.feedbackText}</p>
              </motion.div>
            )}

            {/* Pavel's comment (after last step of situation or non-step situation) */}
            {state.showFeedback && (
              (!hasSteps || state.step === totalSteps - 1) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-xl p-3"
                >
                  <p className="text-xs font-semibold text-blue-300 mb-0.5">{tx.pavelComment}</p>
                  <p className="text-xs sm:text-sm text-slate-300">{currentSituation.pavelComment[lang]}</p>
                </motion.div>
              )
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {state.showFeedback && state.phase === "playing" && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm"
            >
              {tx.next} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
