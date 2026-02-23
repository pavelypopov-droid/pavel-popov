"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  _honeypot: string;
};

const subjects = [
  "Консультация",
  "AI проект",
  "IT стратегия",
  "Подбор команды",
  "Другое",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#0F172A] mb-6">
        Написать сообщение
      </h2>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">
            Спасибо за обращение!
          </h3>
          <p className="text-[#64748B]">Отвечу в течение 24 часов</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-[#2563EB] hover:underline"
          >
            Отправить ещё одно сообщение
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
                Имя <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Введите имя" })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Ваше имя"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                Компания
              </label>
              <input
                type="text"
                {...register("company")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="Название компании"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Введите email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Некорректный email",
                  },
                })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="email@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                Телефон
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="+7 / +998"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Тема обращения
            </label>
            <select
              {...register("subject")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white"
            >
              <option value="">Выберите тему</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Описание задачи <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", { required: "Опишите задачу" })}
              rows={5}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none ${
                errors.message
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              placeholder="Расскажите о вашей задаче, контексте и ожидаемом результате..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
              Ошибка отправки. Попробуйте ещё раз или напишите напрямую на
              popov@iofm.ru
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-[#2563EB] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Отправка..." : "Отправить запрос →"}
          </button>
        </form>
      )}
    </div>
  );
}
