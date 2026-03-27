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
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h1>
          <p className="text-slate-500 mb-8">{t.noCards}</p>
        </div>
      );
    }

    return (
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.title}</h1>
        <p className="text-slate-500 mb-8">{t.subtitle}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {Math.min(EXAM_QUESTIONS, examCards.length)}
            </div>
            <div className="text-xs text-slate-400">{t.questions}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">120</div>
            <div className="text-xs text-slate-400">{t.time}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">720</div>
            <div className="text-xs text-slate-400">{t.passing}</div>
          </div>
        </div>

        <button
          onClick={startExam}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
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
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t.score}</h1>

        <div
          className={`text-center mb-8 p-6 rounded-2xl border-2 shadow-sm ${
            score.passed
              ? "border-emerald-400 bg-emerald-50"
              : "border-red-400 bg-red-50"
          }`}
        >
          <div
            className={`text-6xl font-bold mb-2 ${
              score.passed ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {score.scaled}
          </div>
          <div className="text-sm text-slate-400 mb-2">/ {MAX_SCORE}</div>
          <div
            className={`text-lg font-semibold ${
              score.passed ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {score.passed ? t.passed : t.failed}
          </div>
          <div className="text-xs text-slate-400 mt-2">{t.passingNote}</div>
          <div className="text-xs text-slate-400 mt-1">
            {score.correct}/{score.total} {t.correct.toLowerCase()}
            {score.unanswered > 0 && ` · ${score.unanswered} ${t.unanswered}`}
          </div>
        </div>

        {/* Domain breakdown */}
        <h2 className="text-sm font-semibold text-slate-900 mb-3">{t.domainBreakdown}</h2>
        <div className="space-y-2 mb-6">
          {Object.entries(score.domainScores).map(([domain, s]) => {
            const pct = Math.round((s.correct / s.total) * 100);
            return (
              <div
                key={domain}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm"
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">{domain}</span>
                  <span className={pct >= 70 ? "text-emerald-600" : "text-red-600"}>
                    {s.correct}/{s.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
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
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.tryAgain}
          </button>
          <button
            onClick={() => setShowReview(!showReview)}
            className="flex-1 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
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
                  className={`bg-white border rounded-xl p-4 shadow-sm ${
                    isCorrect ? "border-emerald-200" : "border-red-200"
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-1">
                    #{i + 1} · {q.domain}
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-2">{q.question}</div>
                  {userAnswer !== undefined && !isCorrect && (
                    <div className="text-xs text-red-600 mb-1">
                      {t.yourAnswer}: {String.fromCharCode(65 + userAnswer)}){" "}
                      {q.options[userAnswer]}
                    </div>
                  )}
                  <div className="text-xs text-emerald-600 mb-1">
                    {t.correctAnswer}: {String.fromCharCode(65 + q.answer)}){" "}
                    {q.options[q.answer]}
                  </div>
                  <div className="text-xs text-slate-400">{q.explanation}</div>
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
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-50 py-2 z-10">
        <span
          className={`text-sm font-mono ${
            isUrgent ? "text-red-600 animate-pulse" : "text-slate-500"
          }`}
        >
          {t.timeLeft}: {formatTime(timeLeft)}
        </span>
        <span className="text-xs text-slate-400">
          {t.question} {current + 1}/{questions.length}
        </span>
        <button
          onClick={finishExam}
          className="text-xs text-red-600 hover:text-red-500 border border-red-200 rounded px-2 py-1 transition-colors"
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
                  ? "bg-blue-600 text-white"
                  : answered
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white border border-slate-200 text-slate-400 hover:bg-slate-50"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question */}
      <div className="text-xs text-blue-600 mb-2">{q.domain}</div>
      <div className="text-lg font-medium text-slate-900 mb-6">{q.question}</div>

      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selectAnswer(i)}
            className={`w-full text-left px-4 py-3 text-sm rounded-xl border transition-colors ${
              answers.get(current) === i
                ? "bg-blue-50 border-blue-400 text-blue-700"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span className="text-slate-400 mr-2">{String.fromCharCode(65 + i)})</span>
            {opt}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-30 transition-colors"
        >
          {t.prev}
        </button>
        <div className="flex-1" />
        {current < questions.length - 1 ? (
          <button
            onClick={() => goTo(current + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.next}
          </button>
        ) : (
          <button
            onClick={finishExam}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.finish}
          </button>
        )}
      </div>
    </div>
  );
}
