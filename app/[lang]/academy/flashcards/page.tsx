"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getCourses } from "@/lib/academy/data";
import { useProgress } from "@/lib/academy/useProgress";
import type { Flashcard } from "@/lib/academy/types";

type Filter = "all" | "unseen" | "repeat";

const L = {
  ru: {
    title: "Карточки",
    allCourses: "Все курсы",
    all: "Все",
    unseen: "Новые",
    repeat: "Повторить",
    noCards: "Нет карточек для выбранного фильтра",
    flip: "Нажмите, чтобы перевернуть",
    prev: "← Назад",
    next: "Далее →",
    know: "Знаю",
    repeatBtn: "Повторить",
    keyboard: "← → навигация · Пробел перевернуть · K знаю · R повторить",
  },
  en: {
    title: "Flashcards",
    allCourses: "All courses",
    all: "All",
    unseen: "Unseen",
    repeat: "Repeat",
    noCards: "No cards match the current filter",
    flip: "Click to flip",
    prev: "← Prev",
    next: "Next →",
    know: "Know",
    repeatBtn: "Repeat",
    keyboard: "← → navigate · Space flip · K know · R repeat",
  },
};

export default function FlashcardsPage() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ru") ? "ru" : "en";
  const t = L[lang];

  const courses = useMemo(() => getCourses(lang), [lang]);
  const { progress, markKnown, markRepeat } = useProgress();

  const [courseId, setCourseId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const allCards = useMemo(() => courses.flatMap((c) => c.flashcards), [courses]);

  const cards = useMemo(() => {
    let filtered = courseId ? allCards.filter((c) => c.courseId === courseId) : allCards;
    if (filter === "unseen")
      filtered = filtered.filter(
        (c) => !progress.knownCards.includes(c.id) && !progress.repeatCards.includes(c.id),
      );
    else if (filter === "repeat") filtered = filtered.filter((c) => progress.repeatCards.includes(c.id));
    return filtered;
  }, [allCards, courseId, filter, progress.knownCards, progress.repeatCards]);

  const card: Flashcard | undefined = cards[index];

  const go = useCallback(
    (delta: number) => {
      setFlipped(false);
      setIndex((i) => {
        const next = i + delta;
        if (next < 0) return cards.length - 1;
        if (next >= cards.length) return 0;
        return next;
      });
    },
    [cards.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "n") go(1);
      if (e.key === "ArrowLeft" || e.key === "p") go(-1);
      if (e.key === " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (e.key === "k" && card) {
        markKnown(card.id);
        go(1);
      }
      if (e.key === "r" && card) {
        markRepeat(card.id);
        go(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, card, markKnown, markRepeat]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [courseId, filter]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t.title}</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={courseId ?? ""}
          onChange={(e) => setCourseId(e.target.value || null)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {t.allCourses} ({allCards.length})
          </option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.flashcards.length})
            </option>
          ))}
        </select>

        {(["all", "unseen", "repeat"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              filter === f
                ? "bg-blue-50 border-blue-300 text-blue-600 font-medium"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {f === "all" ? t.all : f === "unseen" ? t.unseen : t.repeat}
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="text-xs text-slate-400 mb-4">
        {cards.length > 0 ? `${index + 1} / ${cards.length}` : t.noCards}
      </div>

      {/* Card */}
      {card && (
        <>
          <div
            className="cursor-pointer mb-4"
            onClick={() => setFlipped((f) => !f)}
            style={{ perspective: 1000, minHeight: 300 }}
          >
            <div
              className="relative w-full transition-transform duration-500"
              style={{
                minHeight: 300,
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-xs text-blue-600 font-medium mb-3">{card.domain}</div>
                <div className="text-lg font-medium text-slate-900 flex-1 flex items-center">
                  {card.question}
                </div>
                <div className="text-xs text-slate-400 mt-4">{t.flip}</div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-white border border-blue-200 rounded-2xl p-6 shadow-sm flex flex-col overflow-auto"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="space-y-2 mb-4">
                  {card.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`text-sm px-3 py-2 rounded-lg border ${
                        i === card.answer
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-500"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}) {opt}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-500 mt-auto">{card.explanation}</div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => go(-1)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {t.prev}
            </button>
            <button
              onClick={() => {
                markRepeat(card.id);
                go(1);
              }}
              className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors"
            >
              {t.repeatBtn} (R)
            </button>
            <button
              onClick={() => {
                markKnown(card.id);
                go(1);
              }}
              className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm hover:bg-emerald-100 transition-colors"
            >
              {t.know} (K)
            </button>
            <button
              onClick={() => go(1)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {t.next}
            </button>
          </div>
          <div className="text-xs text-slate-400 text-center mt-3">{t.keyboard}</div>
        </>
      )}
    </div>
  );
}
