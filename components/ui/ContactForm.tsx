"use client";

import { useState, useEffect, useRef } from "react";
import { track } from "@/components/seo/Analytics";
import { useForm } from "react-hook-form";
import Link from "next/link";

// Country code data: [code, dialCode, flag]
const COUNTRY_CODES: [string, string, string][] = [
  ["UZ", "+998", "\u{1F1FA}\u{1F1FF}"],
  ["RU", "+7", "\u{1F1F7}\u{1F1FA}"],
  ["KZ", "+7", "\u{1F1F0}\u{1F1FF}"],
  ["KG", "+996", "\u{1F1F0}\u{1F1EC}"],
  ["TJ", "+992", "\u{1F1F9}\u{1F1EF}"],
  ["TM", "+993", "\u{1F1F9}\u{1F1F2}"],
  ["AZ", "+994", "\u{1F1E6}\u{1F1FF}"],
  ["AM", "+374", "\u{1F1E6}\u{1F1F2}"],
  ["GE", "+995", "\u{1F1EC}\u{1F1EA}"],
  ["BY", "+375", "\u{1F1E7}\u{1F1FE}"],
  ["MD", "+373", "\u{1F1F2}\u{1F1E9}"],
  ["UA", "+380", "\u{1F1FA}\u{1F1E6}"],
  ["US", "+1", "\u{1F1FA}\u{1F1F8}"],
  ["GB", "+44", "\u{1F1EC}\u{1F1E7}"],
  ["DE", "+49", "\u{1F1E9}\u{1F1EA}"],
  ["AE", "+971", "\u{1F1E6}\u{1F1EA}"],
  ["TR", "+90", "\u{1F1F9}\u{1F1F7}"],
  ["CN", "+86", "\u{1F1E8}\u{1F1F3}"],
  ["IN", "+91", "\u{1F1EE}\u{1F1F3}"],
];

function getCountryFromCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/visitor-country=([A-Z]{2})/);
  return match ? match[1] : "";
}

function findCountry(code: string): [string, string, string] | undefined {
  return COUNTRY_CODES.find(([c]) => c === code);
}

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  _honeypot: string;
};

const t = {
  ru: {
    title: "Написать сообщение",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    nameError: "Введите имя",
    company: "Компания",
    companyPlaceholder: "Название компании",
    email: "Email",
    emailPlaceholder: "email@company.com",
    emailRequired: "Введите email",
    emailInvalid: "Некорректный email",
    phone: "Телефон",
    phonePlaceholder: "Номер телефона",
    subject: "Тема обращения",
    subjectPlaceholder: "Выберите тему",
    subjects: ["Консультация", "AI проект", "IT стратегия", "Подбор команды", "Другое"],
    message: "Описание задачи",
    messagePlaceholder: "Расскажите о вашей задаче, контексте и ожидаемом результате...",
    messageError: "Опишите задачу",
    error: "Ошибка отправки. Попробуйте ещё раз или напишите напрямую на popov@iofm.ru",
    sending: "Отправка...",
    submit: "Отправить запрос →",
    successTitle: "Спасибо за обращение!",
    successText: "Отвечу в течение 24 часов",
    successAgain: "Отправить ещё одно сообщение",
    consent: "Нажимая «Отправить запрос», вы даёте согласие на обработку персональных данных и их трансграничную передачу в соответствии с",
    consentLink: "Политикой конфиденциальности",
    privacyHref: "/privacy",
  },
  en: {
    title: "Send a Message",
    name: "Name",
    namePlaceholder: "Your name",
    nameError: "Please enter your name",
    company: "Company",
    companyPlaceholder: "Company name",
    email: "Email",
    emailPlaceholder: "email@company.com",
    emailRequired: "Please enter your email",
    emailInvalid: "Invalid email address",
    phone: "Phone",
    phonePlaceholder: "Phone number",
    subject: "Subject",
    subjectPlaceholder: "Select a subject",
    subjects: ["Consultation", "AI Project", "IT Strategy", "Team Assembly", "Other"],
    message: "Project Description",
    messagePlaceholder: "Tell us about your project, context and expected outcome...",
    messageError: "Please describe your project",
    error: "Failed to send. Please try again or email popov@iofm.ru directly",
    sending: "Sending...",
    submit: "Send Request →",
    successTitle: "Thank you!",
    successText: "I'll respond within 24 hours",
    successAgain: "Send another message",
    consent: "By clicking \"Send Request\", you consent to the processing of your personal data and its cross-border transfer in accordance with the",
    consentLink: "Privacy Policy",
    privacyHref: "/en/privacy",
  },
};

interface Props {
  lang?: string;
}

export default function ContactForm({ lang = "ru" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedCountry, setSelectedCountry] = useState<[string, string, string]>(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tx = lang === "en" ? t.en : t.ru;

  // Auto-detect country from cookie set by middleware
  useEffect(() => {
    const code = getCountryFromCookie();
    if (code) {
      const found = findCountry(code);
      if (found) setSelectedCountry(found);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data._honeypot) return; // spam trap
    // Prepend country code if phone doesn't start with +
    if (data.phone && !data.phone.startsWith("+")) {
      data.phone = `${selectedCountry[1]} ${data.phone}`;
    }
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        track.formSubmit(true);
        reset();
      } else {
        setStatus("error");
        track.formSubmit(false);
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0F172A] mb-6">
        {tx.title}
      </h2>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">
            {tx.successTitle}
          </h3>
          <p className="text-[#64748B]">{tx.successText}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-[#2563EB] hover:underline"
          >
            {tx.successAgain}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot — hidden spam trap */}
          <input
            type="text"
            {...register("_honeypot")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                {tx.name} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: tx.nameError })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder={tx.namePlaceholder}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                {tx.company}
              </label>
              <input
                type="text"
                {...register("company")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder={tx.companyPlaceholder}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                {tx.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: tx.emailRequired,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: tx.emailInvalid,
                  },
                })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder={tx.emailPlaceholder}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                {tx.phone}
              </label>
              <div className="relative flex" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-1 px-2.5 py-2.5 rounded-l-xl border border-r-0 border-slate-200 hover:border-slate-300 bg-slate-50 text-sm transition-colors shrink-0"
                >
                  <span className="text-base leading-none">{selectedCountry[2]}</span>
                  <span className="text-[#374151] font-medium">{selectedCountry[1]}</span>
                  <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-52 overflow-y-auto">
                    {COUNTRY_CODES.map(([code, dial, flag]) => (
                      <button
                        key={code}
                        type="button"
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#EFF6FF] transition-colors ${
                          selectedCountry[0] === code ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#374151]"
                        }`}
                        onClick={() => {
                          setSelectedCountry([code, dial, flag]);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <span className="text-base">{flag}</span>
                        <span className="font-medium">{dial}</span>
                        <span className="text-[#94A3B8]">{code}</span>
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-3 py-2.5 rounded-r-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder={tx.phonePlaceholder}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              {tx.subject}
            </label>
            <select
              {...register("subject")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white"
            >
              <option value="">{tx.subjectPlaceholder}</option>
              {tx.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              {tx.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", { required: tx.messageError })}
              rows={5}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none ${
                errors.message
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              placeholder={tx.messagePlaceholder}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
              {tx.error}
            </p>
          )}

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            {tx.consent}{" "}
            <Link href={tx.privacyHref} className="text-[#2563EB] hover:underline">
              {tx.consentLink}
            </Link>.
          </p>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-[#2563EB] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? tx.sending : tx.submit}
          </button>
        </form>
      )}
    </div>
  );
}
