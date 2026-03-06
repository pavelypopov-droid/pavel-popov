"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Gamepad2 } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinksRu = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/about", label: "О себе" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

const navLinksEn = [
  { href: "/en/services", label: "Services" },
  { href: "/en/cases", label: "Cases" },
  { href: "/en/about", label: "About" },
  { href: "/en/blog", label: "Blog" },
  { href: "/en/contacts", label: "Contact" },
];

function getAlternateLang(pathname: string): { href: string; label: string } {
  if (pathname.startsWith("/en")) {
    // Switch to RU: remove /en prefix
    const ruPath = pathname.replace(/^\/en/, "") || "/";
    return { href: ruPath, label: "RU" };
  } else {
    // Switch to EN: remove /ru prefix (if any) then add /en prefix
    const strippedPath = pathname.replace(/^\/ru/, "") || "/";
    const enPath = "/en" + (strippedPath === "/" ? "" : strippedPath);
    return { href: enPath, label: "EN" };
  }
}

interface Props {
  lang?: "ru" | "en";
}

export default function Header({ lang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Auto-detect language from pathname if not explicitly provided
  const detectedLang = lang ?? (pathname.startsWith("/en") ? "en" : "ru");
  const isEn = detectedLang === "en";

  const navLinks = isEn ? navLinksEn : navLinksRu;
  const alternate = getAlternateLang(pathname);
  const contactHref = isEn ? "/en/contacts" : "/contacts";
  const gameHref = isEn ? "/en/game" : "/ru/game";
  const gameLabel = isEn ? "Play" : "Играть";
  const ctaLabel = isEn ? "Discuss project" : "Обсудить проект";
  const logoName = isEn ? "Pavel Popov" : "Павел Попов";
  const homeHref = isEn ? "/en" : "/";

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
          <Link href={homeHref} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <span className="text-white font-bold text-base">PP</span>
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-bold text-base leading-tight transition-colors ${
                  scrolled ? "text-[#0F172A]" : "text-white"
                }`}
              >
                {logoName}
              </p>
              <p
                className={`text-xs leading-tight transition-colors ${
                  scrolled ? "text-[#64748B]" : "text-blue-200"
                }`}
              >
                IT · AI · FinTech Advisor
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
            {/* Language switcher */}
            <Link
              href={alternate.href}
              className={`text-sm font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                scrolled
                  ? "border-slate-200 text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]"
                  : "border-white/30 text-white/80 hover:text-white hover:border-white/60"
              }`}
            >
              {alternate.label}
            </Link>
            <Link
              href={gameHref}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                scrolled
                  ? "border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/10"
                  : "border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10"
              }`}
            >
              <Gamepad2 size={15} />
              {gameLabel}
            </Link>
            <Link href={contactHref}>
              <Button size="sm">{ctaLabel}</Button>
            </Link>
          </div>

          {/* Mobile: game button + menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={gameHref}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                scrolled
                  ? "border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/10"
                  : "border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10"
              }`}
            >
              <Gamepad2 size={14} />
              {gameLabel}
            </Link>
            <button
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#374151]" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
            <Link
              href={gameHref}
              className="px-4 py-3 rounded-lg text-sm font-medium text-[#F59E0B] hover:bg-[#FEF3C7] transition-colors inline-flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <Gamepad2 size={16} />
              {gameLabel}
            </Link>
            <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between">
              <Link
                href={alternate.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors"
              >
                {alternate.label === "EN" ? "English" : "Русский"}
              </Link>
              <Link href={contactHref} onClick={() => setMobileOpen(false)}>
                <Button size="sm">{ctaLabel}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
