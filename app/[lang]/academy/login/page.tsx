"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AcademyLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.startsWith("/en") ? "en" : "ru";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/academy/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(`/${lang}/academy`);
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Academy</h1>
          <p className="text-sm text-slate-500 mb-6 text-center">
            {lang === "ru" ? "Введите пароль для доступа" : "Enter password to access"}
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={lang === "ru" ? "Пароль" : "Password"}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mb-4"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {lang === "ru" ? "Неверный пароль" : "Invalid password"}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-medium text-sm transition-colors"
            >
              {loading
                ? (lang === "ru" ? "Вход..." : "Signing in...")
                : (lang === "ru" ? "Войти" : "Sign in")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
