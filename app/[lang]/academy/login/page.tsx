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
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d1a]">
      <div className="w-full max-w-sm">
        <div className="bg-[#1a1726] rounded-2xl border border-[#2d2845] p-8">
          <h1 className="text-2xl font-bold text-[#e8e4f0] mb-2 text-center">Academy</h1>
          <p className="text-sm text-[#9890ab] mb-6 text-center">
            {lang === "ru" ? "Введите пароль для доступа" : "Enter password to access"}
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={lang === "ru" ? "Пароль" : "Password"}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-[#2d2845] bg-[#0f0d1a] text-[#e8e4f0] text-sm focus:border-[#7c5cfc] focus:ring-1 focus:ring-[#7c5cfc] outline-none mb-4"
            />

            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">
                {lang === "ru" ? "Неверный пароль" : "Invalid password"}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-[#7c5cfc] hover:bg-[#9479ff] disabled:bg-[#2d2845] text-white rounded-xl font-medium text-sm transition-colors"
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
