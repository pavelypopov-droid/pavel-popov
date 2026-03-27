"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getCourses } from "@/lib/academy/data";
import type { KBEntry } from "@/lib/academy/types";

const L = {
  ru: {
    title: "База знаний",
    search: "Поиск по статьям...",
    allCourses: "Все курсы",
    examOnly: "Только экзамен",
    entries: "статей",
    noResults: "Ничего не найдено",
  },
  en: {
    title: "Knowledge Base",
    search: "Search articles...",
    allCourses: "All courses",
    examOnly: "Exam only",
    entries: "entries",
    noResults: "No results found",
  },
};

export default function KnowledgeBasePage() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ru") ? "ru" : "en";
  const t = L[lang];

  const courses = useMemo(() => getCourses(lang), [lang]);

  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [examFilter, setExamFilter] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const allEntries = useMemo(() => courses.flatMap((c) => c.knowledgeBase), [courses]);

  const filtered = useMemo(() => {
    let result = allEntries;

    // fuzzy search (simple includes)
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.lessonTitle.toLowerCase().includes(q) ||
          e.content.toLowerCase().includes(q),
      );
    }

    if (courseFilter) {
      result = result.filter((e) => e.courseId === courseFilter);
    }

    if (examFilter) {
      result = result.filter((e) => e.examRelevant);
    }

    return result;
  }, [allEntries, query, courseFilter, examFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, KBEntry[]>();
    for (const entry of filtered) {
      const list = map.get(entry.courseId) || [];
      list.push(entry);
      map.set(entry.courseId, list);
    }
    return map;
  }, [filtered]);

  const courseMap = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder={t.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-48 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={courseFilter ?? ""}
          onChange={(e) => setCourseFilter(e.target.value || null)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700"
        >
          <option value="">{t.allCourses}</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.examRelevant ? "* " : ""}
              {c.title}
            </option>
          ))}
        </select>
        <button
          onClick={() => setExamFilter((f) => !f)}
          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
            examFilter
              ? "bg-blue-50 border-blue-400 text-blue-600"
              : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50"
          }`}
        >
          {t.examOnly}
        </button>
      </div>

      <div className="text-xs text-slate-400 mb-4">
        {filtered.length} {t.entries}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-slate-400 py-12">{t.noResults}</div>
      )}

      <div className="space-y-6">
        {Array.from(grouped.entries()).map(([cid, entries]) => {
          const course = courseMap.get(cid);
          return (
            <div key={cid}>
              <h2 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
                {course?.examRelevant && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                    CCA-F
                  </span>
                )}
                {course ? course.title : cid}
              </h2>
              <div className="space-y-1">
                {entries.map((entry) => {
                  const isOpen = expanded.has(entry.id);
                  return (
                    <div
                      key={entry.id}
                      className={`bg-white border rounded-xl overflow-hidden shadow-sm ${
                        entry.examRelevant
                          ? "border-blue-200 bg-blue-50/30"
                          : "border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => toggle(entry.id)}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 flex justify-between items-center transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {entry.examRelevant && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          )}
                          {entry.lessonTitle}
                        </span>
                        <span className="text-slate-400 text-xs">{isOpen ? "^" : "v"}</span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-slate-500 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto border-t border-slate-100">
                          {entry.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
