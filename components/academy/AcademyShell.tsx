"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { path: "", label: { ru: "Главная", en: "Dashboard" }, icon: "◎" },
  { path: "/guide", label: { ru: "Гайд", en: "Exam Guide" }, icon: "⬡" },
  { path: "/flashcards", label: { ru: "Карточки", en: "Flashcards" }, icon: "▦" },
  { path: "/quiz", label: { ru: "Тест", en: "Quiz" }, icon: "✦" },
  { path: "/mock", label: { ru: "Пробный экзамен", en: "Mock Exam" }, icon: "⏱" },
  { path: "/kb", label: { ru: "База знаний", en: "Knowledge Base" }, icon: "⊞" },
];

export function AcademyShell({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const l = lang === "en" ? "en" : "ru";
  const base = `/${lang}/academy`;

  // Don't show shell on login page
  if (pathname.endsWith("/login")) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <nav className="w-56 shrink-0 bg-white border-r border-slate-200 p-4 flex flex-col gap-1 max-md:hidden">
        <Link href={`/${lang}`} className="text-sm text-slate-400 hover:text-slate-600 mb-2 px-3">
          ← {l === "ru" ? "На сайт" : "Back to site"}
        </Link>
        <div className="text-blue-600 font-bold text-lg mb-4 px-3">CCA-F Academy</div>

        {NAV.map((item) => {
          const href = `${base}${item.path}`;
          const isActive = item.path === ""
            ? pathname === base || pathname === `${base}/`
            : pathname.startsWith(href);
          return (
            <Link
              key={item.path}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label[l]}
            </Link>
          );
        })}
      </nav>

      {/* Mobile nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 z-50 md:hidden">
        {NAV.map((item) => {
          const href = `${base}${item.path}`;
          const isActive = item.path === ""
            ? pathname === base || pathname === `${base}/`
            : pathname.startsWith(href);
          return (
            <Link
              key={item.path}
              href={href}
              className={`flex flex-col items-center gap-0.5 text-xs px-2 py-1 ${
                isActive ? "text-blue-600" : "text-slate-400"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label[l]}
            </Link>
          );
        })}
      </nav>

      {/* Content */}
      <main className="flex-1 p-6 pb-20 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
