"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

const serviceLinksRu = [
  { href: "/services#ai", label: "AI Implementation" },
  { href: "/services#strategy", label: "IT & Digital Strategy" },
  { href: "/services#teams", label: "FinTech Team Assembly" },
  { href: "/services#delivery", label: "Turnkey Delivery" },
  { href: "/services#regtech", label: "RegTech & DWH" },
  { href: "/services#cto", label: "CTO-as-a-Service" },
];

const serviceLinksEn = [
  { href: "/en/services#ai", label: "AI Implementation" },
  { href: "/en/services#strategy", label: "IT & Digital Strategy" },
  { href: "/en/services#teams", label: "FinTech Team Assembly" },
  { href: "/en/services#delivery", label: "Turnkey Delivery" },
  { href: "/en/services#regtech", label: "RegTech & DWH" },
  { href: "/en/services#cto", label: "CTO-as-a-Service" },
];

const navLinksRu = [
  { href: "/", label: "Главная" },
  { href: "/cases", label: "Кейсы" },
  { href: "/about", label: "О себе" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

const navLinksEn = [
  { href: "/en", label: "Home" },
  { href: "/en/cases", label: "Cases" },
  { href: "/en/about", label: "About" },
  { href: "/en/blog", label: "Blog" },
  { href: "/en/contacts", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");

  const serviceLinks = isEn ? serviceLinksEn : serviceLinksRu;
  const navLinks = isEn ? navLinksEn : navLinksRu;

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <span className="text-white font-bold text-base">PP</span>
              </div>
              <div>
                <p className="font-bold text-base leading-tight">
                  {isEn ? "Pavel Popov" : "Павел Попов"}
                </p>
                <p className="text-xs text-blue-300 leading-tight">IT · AI · FinTech Advisor</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {isEn
                ? "International IT & AI Advisor with 25+ years of experience. Digital transformations for banks, telecom and public sector across Central Asia."
                : "Международный IT & AI консультант с 25-летним опытом. Цифровые трансформации для банков, телекома и государственного сектора Центральной Азии."}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/pavel-popov-19917266/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#2563EB] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://t.me/popov_pa_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#2563EB] flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              {isEn ? "Services" : "Услуги"}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              {isEn ? "Navigation" : "Навигация"}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
              {isEn ? "Contact" : "Контакты"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:popov@iofm.ru"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-[#2563EB] shrink-0" />
                  popov@iofm.ru
                </a>
              </li>
              <li>
                <a
                  href="tel:+998951480206"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[#2563EB] shrink-0" />
                  +998 95 148 02 06
                </a>
              </li>
              <li>
                <a
                  href="tel:+79255064560"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[#2563EB] shrink-0" />
                  +7 925 506 45 60
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <MapPin size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
                {isEn ? "Tashkent, Uzbekistan / Remote" : "Ташкент, Узбекистан / Remote"}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            {isEn
              ? `© ${new Date().getFullYear()} Pavel Popov. All rights reserved.`
              : `© ${new Date().getFullYear()} Павел Попов. Все права защищены.`}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={isEn ? "/en/privacy" : "/privacy"}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isEn ? "Privacy Policy" : "Политика конфиденциальности"}
            </Link>
            <Link
              href={isEn ? "/" : "/en"}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isEn ? "RU" : "EN"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
