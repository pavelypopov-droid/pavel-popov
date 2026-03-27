"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { getCourses } from "@/lib/academy/data";
import type { Flashcard } from "@/lib/academy/types";

type Phase = "intro" | "exam" | "results";

const EXAM_QUESTIONS = 60;
const EXAM_TIME_SEC = 120 * 60;
const PASSING_SCORE = 720;
const MAX_SCORE = 1000;

const L = {
  ru: {
    title: "Пробный экзамен CCA-F",
    subtitle: "Симуляция реального экзамена: 60 вопросов, 120 минут, шкала 100-1000",
    questions: "Вопросов",
    time: "Минут",
    passing: "Проходной",
    start: "Начать экзамен",
    timeLeft: "Осталось",
    question: "Вопрос",
    finish: "Завершить",
    score: "Результат экзамена",
    passed: "СДАН",
    failed: "НЕ СДАН",
    passingNote: "Проходной балл: 720 / 1000",
    correct: "Правильно",
    unanswered: "без ответа",
    domainBreakdown: "Результат по доменам",
    tryAgain: "Попробовать снова",
    review: "Разбор ответов",
    yourAnswer: "Ваш ответ",
    correctAnswer: "Правильный ответ",
    prev: "Назад",
    next: "Далее",
    noCards: "Нет вопросов для экзамена. Убедитесь, что курсы с флагом examRelevant содержат карточки.",
  },
  en: {
    title: "CCA-F Mock Exam",
    subtitle: "Real exam simulation: 60 questions, 120 minutes, scaled score 100-1000",
    questions: "Questions",
    time: "Minutes",
    passing: "Passing",
    start: "Start Exam",
    timeLeft: "Time left",
    question: "Question",
    finish: "Finish",
    score: "Exam Results",
    passed: "PASSED",
    failed: "FAILED",
    passingNote: "Passing score: 720 / 1000",
    correct: "Correct",
    unanswered: "unanswered",
    domainBreakdown: "Domain Breakdown",
    tryAgain: "Try Again",
    review: "Review Answers",
    yourAnswer: "Your answer",
    correctAnswer: "Correct answer",
    prev: "Previous",
    next: "Next",
    noCards: "No exam questions available. Make sure examRelevant courses contain flashcards.",
  },
};

export default function MockExamPage() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ru") ? "ru" : "en";
  const t = L[lang];

  const courses = useMemo(() => getCourses(lang), [lang]);

  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME_SEC);
  const [showReview, setShowReview] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const examCards = useMemo(
    () => courses.filter((c) => c.examRelevant).flatMap((c) => c.flashcards),
    [courses],
  );

  const startExam = useCallback(() => {
    const shuffled = [...examCards].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, Math.min(EXAM_QUESTIONS, shuffled.length)));
    setAnswers(new Map());
    setCurrent(0);
    setTimeLeft(EXAM_TIME_SEC);
    setShowReview(false);
    setPhase("exam");
  }, [examCards]);

  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const finishExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("results");
  }, []);

  const selectAnswer = useCallback(
    (optIndex: number) => {
      setAnswers((prev) => new Map(prev).set(current, optIndex));
    },
    [current],
  );

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(Math.max(0, Math.min(idx, questions.length - 1)));
    },
    [questions.length],
  );

  const score = useMemo(() => {
    if (phase !== "results") return null;
    let correct = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q, i) => {
      const domain = q.domain || "Unknown";
      if (!domainScores[domain]) domainScores[domain] = { correct: 0, total: 0 };
      domainScores[domain].total++;

      if (answers.get(i) === q.answer) {
        correct++;
        domainScores[domain].correct++;
      }
    });

    const pct = questions.length > 0 ? correct / questions.length : 0;
    const scaled = Math.round(100 + pct * 900);
    return {
      correct,
      total: questions.length,
      scaled,
      passed: scaled >= PASSING_SCORE,
      domainScores,
      unanswered: questions.length - answers.size,
    };
  }, [phase, questions, answers]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // --- Intro ---
  if (phase === "intro") {
    if (examCards.length === 0) {
      return (
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#e8e4f0] mb-2">{t.title}</h1>
          <p className="text-[#9890ab] mb-8">{t.noCards}</p>
        </div>
      );
    }

    return (
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-[#e8e4f0] mb-2">{t.title}</h1>
        <p className="text-[#9890ab] mb-8">{t.subtitle}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1726] border border-[#2d2845] rounded-2xl p-4">
            <div className="text-2xl font-bold text-[#7c5cfc]">
              {Math.min(EXAM_QUESTIONS, examCards.length)}
            </div>
            <div className="text-xs text-[#7a7290]">{t.questions}</div>
          </div>
          <div className="bg-[#1a1726] border border-[#2d2845] rounded-2xl p-4">
            <div className="text-2xl font-bold text-[#7c5cfc]">120</div>
            <div className="text-xs text-[#7a7290]">{t.time}</div>
          </div>
          <div className="bg-[#1a1726] border border-[#2d2845] rounded-2xl p-4">
            <div className="text-2xl font-bold text-[#7c5cfc]">720</div>
            <div className="text-xs text-[#7a7290]">{t.passing}</div>
          </div>
        </div>

        <button
          onClick={startExam}
          className="w-full py-3 bg-[#7c5cfc] hover:bg-[#9479ff] text-white rounded-lg font-medium text-lg transition-colors"
        >
          {t.start}
        </button>
      </div>
    );
  }

  // --- Results ---
  if (phase === "results" && score) {
    return (
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-[#e8e4f0] mb-6 text-center">{t.score}</h1>

        <div
          className={`text-center mb-8 p-6 rounded-2xl border-2 ${
            score.passed
              ? "border-emerald-400 bg-emerald-400/10"
              : "border-red-400 bg-red-400/10"
          }`}
        >
          <div
            className={`text-6xl font-bold mb-2 ${
              score.passed ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {score.scaled}
          </div>
          <div className="text-sm text-[#7a7290] mb-2">/ {MAX_SCORE}</div>
          <div
            className={`text-lg font-semibold ${
              score.passed ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {score.passed ? t.passed : t.failed}
          </div>
          <div className="text-xs text-[#7a7290] mt-2">{t.passingNote}</div>
          <div className="text-xs text-[#7a7290] mt-1">
            {score.correct}/{score.total} {t.correct.toLowerCase()}
            {score.unanswered > 0 && ` · ${score.unanswered} ${t.unanswered}`}
          </div>
        </div>

        {/* Domain breakdown */}
        <h2 className="text-sm font-semibold text-[#e8e4f0] mb-3">{t.domainBreakdown}</h2>
        <div className="space-y-2 mb-6">
          {Object.entries(score.domainScores).map(([domain, s]) => {
            const pct = Math.round((s.correct / s.total) * 100);
            return (
              <div
                key={domain}
                className="bg-[#1a1726] border border-[#2d2845] rounded-xl px-4 py-2"
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#9890ab]">{domain}</span>
                  <span className={pct >= 70 ? "text-emerald-400" : "text-red-400"}>
                    {s.correct}/{s.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-[#231f33] rounded-full">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 70 ? "bg-emerald-500" : "bg-red-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={startExam}
            className="flex-1 py-2.5 bg-[#7c5cfc] hover:bg-[#9479ff] text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.tryAgain}
          </button>
          <button
            onClick={() => setShowReview(!showReview)}
            className="flex-1 py-2.5 bg-[#1a1726] border border-[#2d2845] rounded-lg text-sm text-[#c4bdd4] hover:bg-[#231f33] transition-colors"
          >
            {t.review}
          </button>
        </div>

        {showReview && (
          <div className="space-y-3">
            {questions.map((q, i) => {
              const userAnswer = answers.get(i);
              const isCorrect = userAnswer === q.answer;
              return (
                <div
                  key={i}
                  className={`bg-[#1a1726] border rounded-xl p-4 ${
                    isCorrect ? "border-emerald-400/30" : "border-red-400/30"
                  }`}
                >
                  <div className="text-xs text-[#7a7290] mb-1">
                    #{i + 1} · {q.domain}
                  </div>
                  <div className="text-sm font-medium text-[#e8e4f0] mb-2">{q.question}</div>
                  {userAnswer !== undefined && !isCorrect && (
                    <div className="text-xs text-red-400 mb-1">
                      {t.yourAnswer}: {String.fromCharCode(65 + userAnswer)}){" "}
                      {q.options[userAnswer]}
                    </div>
                  )}
                  <div className="text-xs text-emerald-400 mb-1">
                    {t.correctAnswer}: {String.fromCharCode(65 + q.answer)}){" "}
                    {q.options[q.answer]}
                  </div>
                  <div className="text-xs text-[#7a7290]">{q.explanation}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // --- Exam ---
  const q = questions[current];
  if (!q) return null;
  const isUrgent = timeLeft < 300;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header: timer + progress */}
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#0f0d1a] py-2 z-10">
        <span
          className={`text-sm font-mono ${
            isUrgent ? "text-red-400 animate-pulse" : "text-[#9890ab]"
          }`}
        >
          {t.timeLeft}: {formatTime(timeLeft)}
        </span>
        <span className="text-xs text-[#7a7290]">
          {t.question} {current + 1}/{questions.length}
        </span>
        <button
          onClick={finishExam}
          className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 rounded px-2 py-1 transition-colors"
        >
          {t.finish}
        </button>
      </div>

      {/* Question grid */}
      <div className="flex flex-wrap gap-1 mb-6">
        {questions.map((_, i) => {
          const answered = answers.has(i);
          const isCurrent = i === current;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-6 h-6 text-xs rounded flex items-center justify-center transition-colors ${
                isCurrent
                  ? "bg-[#7c5cfc] text-white"
                  : answered
                    ? "bg-[#7c5cfc]/20 text-[#7c5cfc]"
                    : "bg-[#1a1726] border border-[#2d2845] text-[#7a7290] hover:bg-[#231f33]"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question */}
      <div className="text-xs text-[#7c5cfc] mb-2">{q.domain}</div>
      <div className="text-lg font-medium text-[#e8e4f0] mb-6">{q.question}</div>

      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selectAnswer(i)}
            className={`w-full text-left px-4 py-3 text-sm rounded-xl border transition-colors ${
              answers.get(current) === i
                ? "bg-[#7c5cfc]/15 border-[#7c5cfc] text-[#9479ff]"
                : "bg-[#1a1726] border-[#2d2845] text-[#c4bdd4] hover:bg-[#231f33]"
            }`}
          >
            <span className="text-[#7a7290] mr-2">{String.fromCharCode(65 + i)})</span>
            {opt}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="px-4 py-2 bg-[#1a1726] border border-[#2d2845] rounded-lg text-sm text-[#c4bdd4] hover:bg-[#231f33] disabled:opacity-30 transition-colors"
        >
          {t.prev}
        </button>
        <div className="flex-1" />
        {current < questions.length - 1 ? (
          <button
            onClick={() => goTo(current + 1)}
            className="px-4 py-2 bg-[#7c5cfc] hover:bg-[#9479ff] text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.next}
          </button>
        ) : (
          <button
            onClick={finishExam}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.finish}
          </button>
        )}
      </div>
    </div>
  );
}
