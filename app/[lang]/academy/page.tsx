"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCourses } from "@/lib/academy/data";
import { useProgress } from "@/lib/academy/useProgress";

const L = {
  ru: {
    title: "CCA-F Academy",
    subtitle: "Подготовка к сертификации Claude Certified Associate — Fundamentals",
    mastered: "Изучено",
    quizzes: "Тестов",
    avg: "Средний балл",
    courses: "Курсы",
    cards: "карточек",
    articles: "статей",
    lastQuiz: "Последний тест",
    correct: "правильно",
    examPrep: "Подготовка к экзамену",
    flashcards: "Карточки",
    quiz: "Тест",
    mock: "Пробный экзамен",
    guide: "Гайд",
    domains: "Области экзамена CCA-F",
    domainAgentic: "Agentic Coding & Workflows",
    domainClaudeCode: "Claude Code & IDE Integration",
    domainPrompt: "Prompt Engineering & Model Behavior",
    domainTools: "Tool Use & Function Calling",
    domainContext: "Context Windows & Retrieval",
  },
  en: {
    title: "CCA-F Academy",
    subtitle: "Preparation for Claude Certified Associate — Fundamentals exam",
    mastered: "Mastered",
    quizzes: "Quizzes",
    avg: "Avg score",
    courses: "Courses",
    cards: "cards",
    articles: "articles",
    lastQuiz: "Last Quiz",
    correct: "correct",
    examPrep: "Exam Prep",
    flashcards: "Flashcards",
    quiz: "Quiz",
    mock: "Mock Exam",
    guide: "Exam Guide",
    domains: "CCA-F Exam Domains",
    domainAgentic: "Agentic Coding & Workflows",
    domainClaudeCode: "Claude Code & IDE Integration",
    domainPrompt: "Prompt Engineering & Model Behavior",
    domainTools: "Tool Use & Function Calling",
    domainContext: "Context Windows & Retrieval",
  },
};

export default function DashboardPage() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ru") ? "ru" : "en";
  const t = L[lang];
  const base = `/${lang}/academy`;

  const courses = useMemo(() => getCourses(lang), [lang]);
  const { progress } = useProgress();

  const totalCards = useMemo(() => courses.reduce((s, c) => s + c.flashcards.length, 0), [courses]);
  const knownCount = progress.knownCards.length;
  const quizCount = progress.quizHistory.length;
  const avgScore = quizCount > 0
    ? Math.round(progress.quizHistory.reduce((s, q) => s + (q.correct / q.total) * 100, 0) / quizCount)
    : 0;
  const lastScore = progress.quizHistory.at(-1);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
      <p className="text-slate-500 mb-8">{t.subtitle}</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label={t.mastered} value={`${knownCount}/${totalCards}`} />
        <StatCard label={t.quizzes} value={String(quizCount)} />
        <StatCard label={t.avg} value={quizCount > 0 ? `${avgScore}%` : "—"} />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href={`${base}/guide`}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {t.guide}
        </Link>
        <Link
          href={`${base}/flashcards`}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          {t.flashcards}
        </Link>
        <Link
          href={`${base}/quiz`}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          {t.quiz}
        </Link>
        <Link
          href={`${base}/mock`}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          {t.mock}
        </Link>
      </div>

      {/* Courses */}
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{t.courses}</h2>
      <div className="space-y-3 mb-8">
        {courses.map((course) => {
          const known = course.flashcards.filter((c) => progress.knownCards.includes(c.id)).length;
          const total = course.flashcards.length;
          const pct = total > 0 ? Math.round((known / total) * 100) : 0;
          return (
            <div key={course.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-sm text-slate-900 flex items-center gap-2">
                    {course.examRelevant && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                        CCA-F
                      </span>
                    )}
                    {course.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{course.description}</div>
                </div>
                <div className="text-xs text-slate-400 shrink-0 ml-4">
                  {course.flashcards.length} {t.cards} · {course.knowledgeBase.length} {t.articles}
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {known}/{total} ({pct}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Last Quiz */}
      {lastScore && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-8">
          <div className="text-sm font-medium text-slate-900 mb-1">{t.lastQuiz}</div>
          <div className="text-xs text-slate-500">
            {lastScore.correct}/{lastScore.total} {t.correct} (
            {Math.round((lastScore.correct / lastScore.total) * 100)}%) ·{" "}
            {new Date(lastScore.date).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Exam Domains */}
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{t.domains}</h2>
      <div className="space-y-2">
        {[
          { label: t.domainAgentic, weight: "27%" },
          { label: t.domainClaudeCode, weight: "20%" },
          { label: t.domainPrompt, weight: "20%" },
          { label: t.domainTools, weight: "18%" },
          { label: t.domainContext, weight: "15%" },
        ].map((d) => (
          <div
            key={d.label}
            className="flex justify-between text-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm"
          >
            <span className="text-slate-700">{d.label}</span>
            <span className="text-blue-600 font-mono font-medium">{d.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}
