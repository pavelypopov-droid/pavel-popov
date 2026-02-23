"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/about", label: "О себе" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <span className="text-white font-bold text-base">PP</span>
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-bold text-base leading-tight transition-colors ${
                  scrolled ? "text-[#0F172A]" : "text-white"
                }`}
              >
                Павел Попов
              </p>
              <p
                className={`text-xs leading-tight transition-colors ${
                  scrolled ? "text-[#64748B]" : "text-blue-200"
                }`}
              >
                IT & FinTech Advisor
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 ${
                  scrolled
                    ? "text-[#374151] hover:text-[#2563EB] hover:bg-[#EFF6FF]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/en" className={`text-sm font-medium transition-colors ${
              scrolled ? "text-[#64748B] hover:text-[#2563EB]" : "text-white/70 hover:text-white"
            }`}>
              EN
            </Link>
            <Link href="/contacts">
              <Button size="sm">Обсудить проект</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-[#374151]" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-lg text-sm font-medium text-[#374151] hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between">
              <Link href="/en" className="text-sm text-[#64748B]">English</Link>
              <Link href="/contacts" onClick={() => setMobileOpen(false)}>
                <Button size="sm">Обсудить проект</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
