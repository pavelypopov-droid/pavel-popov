"use client";

import { useState, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getCourses } from "@/lib/academy/data";
import { useProgress } from "@/lib/academy/useProgress";
import type { Flashcard } from "@/lib/academy/types";

type Phase = "setup" | "playing" | "results";

const L = {
  ru: {
    title: "Тест",
    courses: "Курс",
    allMixed: "Все курсы (микс)",
    questions: "Количество вопросов",
    start: "Начать тест",
    recent: "Последние результаты",
    results: "Результаты",
    of: "из",
    correct: "Правильно",
    review: "Разбор ошибок",
    retry: "Пройти заново",
    newQuiz: "Новый тест",
    next: "Далее",
    seeResults: "Результаты",
    question: "Вопрос",
  },
  en: {
    title: "Quiz",
    courses: "Course",
    allMixed: "All courses (mixed)",
    questions: "Number of questions",
    start: "Start Quiz",
    recent: "Recent Results",
    results: "Results",
    of: "of",
    correct: "Correct",
    review: "Review Mistakes",
    retry: "Retry",
    newQuiz: "New Quiz",
    next: "Next",
    seeResults: "See Results",
    question: "Question",
  },
};

export default function QuizPage() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ru") ? "ru" : "en";
  const t = L[lang];

  const courses = useMemo(() => getCourses(lang), [lang]);
  const { progress, addQuizResult } = useProgress();

  const [phase, setPhase] = useState<Phase>("setup");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [finalResult, setFinalResult] = useState<{
    correct: number;
    total: number;
    wrong: string[];
  } | null>(null);

  const allCards = useMemo(() => courses.flatMap((c) => c.flashcards), [courses]);

  const startQuiz = useCallback(() => {
    const pool = courseId ? allCards.filter((c) => c.courseId === courseId) : allCards;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, Math.min(count, shuffled.length)));
    setAnswers(new Map());
    setCurrent(0);
    setSelected(null);
    setFinalResult(null);
    setPhase("playing");
  }, [courseId, count, allCards]);

  const q = questions[current];

  const handleSelect = useCallback(
    (optIndex: number) => {
      if (selected !== null) return;
      setSelected(optIndex);
      setAnswers((prev) => new Map(prev).set(q.id, optIndex));
    },
    [selected, q],
  );

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
      const correct = questions.filter((qq) => answers.get(qq.id) === qq.answer).length;
      const wrong = questions.filter((qq) => answers.get(qq.id) !== qq.answer).map((qq) => qq.id);
      const result = {
        date: new Date().toISOString(),
        courseId,
        total: questions.length,
        correct,
        wrong,
      };
      addQuizResult(result);
      setFinalResult({ correct, total: questions.length, wrong });
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }, [current, questions, answers, courseId, addQuizResult]);

  // --- SETUP ---
  if (phase === "setup") {
    return (
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-[#e8e4f0] mb-6">{t.title}</h1>

        <div className="space-y-5 mb-6">
          <div>
            <label className="text-sm text-[#9890ab] block mb-1.5">{t.courses}</label>
            <select
              value={courseId ?? ""}
              onChange={(e) => setCourseId(e.target.value || null)}
              className="w-full bg-[#1a1726] border border-[#2d2845] rounded-lg px-3 py-2.5 text-sm text-[#c4bdd4] focus:outline-none focus:ring-2 focus:ring-[#7c5cfc]"
            >
              <option value="">{t.allMixed}</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-[#9890ab] block mb-1.5">{t.questions}</label>
            <div className="flex gap-2">
              {[10, 20, 50].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    count === n
                      ? "bg-[#7c5cfc]/15 border-[#7c5cfc]/50 text-[#7c5cfc] font-medium"
                      : "bg-[#1a1726] border-[#2d2845] text-[#9890ab] hover:bg-[#231f33]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-3 bg-[#7c5cfc] hover:bg-[#9479ff] text-white rounded-lg font-medium transition-colors"
        >
          {t.start}
        </button>

        {/* Quiz History */}
        {progress.quizHistory.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-[#e8e4f0] mb-3">{t.recent}</h2>
            <div className="space-y-2">
              {progress.quizHistory
                .slice(-5)
                .reverse()
                .map((r, i) => {
                  const pct = Math.round((r.correct / r.total) * 100);
                  return (
                    <div
                      key={i}
                      className="flex justify-between text-sm bg-[#1a1726] border border-[#2d2845] rounded-xl px-4 py-2.5"
                    >
                      <span className="text-[#9890ab]">{new Date(r.date).toLocaleDateString()}</span>
                      <span className={pct >= 80 ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>
                        {r.correct}/{r.total} ({pct}%)
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RESULTS ---
  if (phase === "results" && finalResult) {
    const pct = Math.round((finalResult.correct / finalResult.total) * 100);
    const wrongCards = questions.filter((qq) => finalResult.wrong.includes(qq.id));
    return (
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-[#e8e4f0] mb-2">{t.results}</h1>

        <div
          className={`text-5xl font-bold my-6 ${
            pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-[#7c5cfc]" : "text-red-400"
          }`}
        >
          {pct}%
        </div>
        <p className="text-[#9890ab] mb-6">
          {finalResult.correct} {t.of} {finalResult.total} {t.correct.toLowerCase()}
        </p>

        {wrongCards.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-[#e8e4f0] mb-3">{t.review}</h2>
            <div className="space-y-3">
              {wrongCards.map((wq) => (
                <div
                  key={wq.id}
                  className="bg-[#1a1726] border border-red-400/30 rounded-2xl p-4 text-left"
                >
                  <div className="text-sm font-medium text-[#e8e4f0] mb-2">{wq.question}</div>
                  <div className="text-xs text-emerald-400 mb-1">
                    {t.correct}: {String.fromCharCode(65 + wq.answer)}) {wq.options[wq.answer]}
                  </div>
                  <div className="text-xs text-[#9890ab]">{wq.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={startQuiz}
            className="flex-1 py-2.5 bg-[#7c5cfc] hover:bg-[#9479ff] text-white rounded-lg text-sm font-medium transition-colors"
          >
            {t.retry}
          </button>
          <button
            onClick={() => setPhase("setup")}
            className="flex-1 py-2.5 bg-[#1a1726] border border-[#2d2845] rounded-lg text-sm text-[#9890ab] hover:bg-[#231f33] transition-colors"
          >
            {t.newQuiz}
          </button>
        </div>
      </div>
    );
  }

  // --- PLAYING ---
  if (!q) return null;
  const progressPct = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-[#7a7290]">
          {t.question} {current + 1} / {questions.length}
        </span>
        <span className="text-xs text-[#7c5cfc] font-medium">{q.domain}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#231f33] rounded-full mb-6">
        <div
          className="h-full bg-[#7c5cfc] rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="text-lg font-medium text-[#e8e4f0] mb-6">{q.question}</div>

      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => {
          let cls =
            "w-full text-left px-4 py-3 text-sm rounded-xl border transition-colors cursor-pointer ";
          if (selected !== null) {
            if (i === q.answer) cls += "border-emerald-400/30 bg-emerald-400/10 text-emerald-400";
            else if (i === selected) cls += "border-red-400/30 bg-red-400/10 text-red-400";
            else cls += "border-[#2d2845] bg-[#1a1726] text-[#9890ab]";
          } else {
            cls += "border-[#2d2845] bg-[#1a1726] text-[#c4bdd4] hover:bg-[#231f33] hover:border-[#3d3657]";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} className={cls} disabled={selected !== null}>
              <span className="text-[#7a7290] mr-2">{String.fromCharCode(65 + i)})</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mb-4">
          <div className="text-sm text-[#9890ab] bg-[#0f0d1a] border border-[#2d2845] rounded-xl p-4">
            {q.explanation}
          </div>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={next}
          className="w-full py-2.5 bg-[#7c5cfc] hover:bg-[#9479ff] text-white rounded-lg text-sm font-medium transition-colors"
        >
          {current + 1 >= questions.length ? t.seeResults : t.next}
        </button>
      )}
    </div>
  );
}
