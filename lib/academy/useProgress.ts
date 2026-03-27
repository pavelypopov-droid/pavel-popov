"use client";

import { useState, useCallback } from "react";

export interface QuizResult {
  date: string;
  courseId: string | null;
  total: number;
  correct: number;
  wrong: string[];
}

export interface Progress {
  knownCards: string[];
  repeatCards: string[];
  quizHistory: QuizResult[];
}

const KEY = "cca-f-progress";

function load(): Progress {
  if (typeof window === "undefined") return { knownCards: [], repeatCards: [], quizHistory: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { knownCards: [], repeatCards: [], quizHistory: [] };
}

function save(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load);

  const markKnown = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev, knownCards: [...new Set([...prev.knownCards, id])], repeatCards: prev.repeatCards.filter((x) => x !== id) };
      save(next);
      return next;
    });
  }, []);

  const markRepeat = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev, repeatCards: [...new Set([...prev.repeatCards, id])], knownCards: prev.knownCards.filter((x) => x !== id) };
      save(next);
      return next;
    });
  }, []);

  const addQuizResult = useCallback((r: QuizResult) => {
    setProgress((prev) => {
      const next = { ...prev, quizHistory: [...prev.quizHistory, r] };
      save(next);
      return next;
    });
  }, []);

  return { progress, markKnown, markRepeat, addQuizResult };
}
