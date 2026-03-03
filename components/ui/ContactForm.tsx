"use client";

import { useState } from "react";
import { track } from "@/components/seo/Analytics";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
    phonePlaceholder: "+7 / +998",
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
    phonePlaceholder: "+7 / +998",
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
  const tx = lang === "en" ? t.en : t.ru;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data._honeypot) return; // spam trap
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
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder={tx.phonePlaceholder}
              />
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
