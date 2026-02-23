import type { Metadata } from "next";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Обсудим вашу задачу. Бесплатная первичная консультация с IT & FinTech консультантом Павлом Поповым.",
};

export default function ContactsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            Контакты
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            Давайте обсудим вашу задачу
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Заполните форму или напишите напрямую — отвечу в течение 24 часов
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                  Контактная информация
                </h2>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="mailto:popov@iofm.ru"
                      className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Mail size={18} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] font-medium">Email</p>
                        <p className="text-sm font-semibold">popov@iofm.ru</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+998951480206"
                      className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] font-medium">Телефон (UZ)</p>
                        <p className="text-sm font-semibold">+998 95 148 02 06</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+79255064560"
                      className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] font-medium">Телефон (RU)</p>
                        <p className="text-sm font-semibold">+7 925 506 45 60</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-[#374151]">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B] font-medium">Локация</p>
                      <p className="text-sm font-semibold">Ташкент, Узбекистан / Remote</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-4">
                  Соцсети
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/pavel-popov-19917266/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                  <a
                    href="https://t.me/pavel_popov_consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    <Send size={16} />
                    Telegram
                  </a>
                </div>
              </div>

              {/* Calendly */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-base font-bold text-[#0F172A] mb-2">
                  Запишитесь на встречу
                </h3>
                <p className="text-sm text-[#64748B] mb-4">
                  Выберите удобное время для 30-минутной консультации прямо в
                  моём календаре.
                </p>
                <a
                  href="https://calendly.com/pavel-popov/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm"
                >
                  Открыть Calendly →
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
