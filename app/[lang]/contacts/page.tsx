import type { Metadata } from "next";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? { title: "Contacts | Pavel Popov", description: "Let's discuss your project. Free initial consultation with IT & FinTech Advisor Pavel Popov." }
    : { title: "Контакты | Павел Попов" };
}

export default async function ContactsPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <>
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            {isEn ? "Contact" : "Контакты"}
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            {isEn ? "Let's discuss your project" : "Давайте обсудим вашу задачу"}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {isEn
              ? "Fill in the form or reach out directly — I'll respond within 24 hours"
              : "Заполните форму или напишите напрямую — отвечу в течение 24 часов"}
          </p>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                  {isEn ? "Contact Information" : "Контактная информация"}
                </h2>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:popov@iofm.ru" className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors">
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
                    <a href="tel:+998951480206" className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] font-medium">{isEn ? "Phone (UZ)" : "Телефон (UZ)"}</p>
                        <p className="text-sm font-semibold">+998 95 148 02 06</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+79255064560" className="flex items-center gap-3 text-[#374151] hover:text-[#2563EB] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] font-medium">{isEn ? "Phone (RU)" : "Телефон (RU)"}</p>
                        <p className="text-sm font-semibold">+7 925 506 45 60</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-[#374151]">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B] font-medium">{isEn ? "Location" : "Локация"}</p>
                      <p className="text-sm font-semibold">{isEn ? "Tashkent, Uzbekistan / Remote" : "Ташкент, Узбекистан / Remote"}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-4">
                  {isEn ? "Social" : "Соцсети"}
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
                    href="https://t.me/popov_pa_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    <Send size={16} />
                    Telegram
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-base font-bold text-[#0F172A] mb-2">
                  {isEn ? "Book a meeting" : "Запишитесь на встречу"}
                </h3>
                <p className="text-sm text-[#64748B] mb-4">
                  {isEn
                    ? "Pick a convenient time for a 30-minute consultation directly in my calendar."
                    : "Выберите удобное время для 30-минутной консультации прямо в моём календаре."}
                </p>
                <a
                  href="https://calendly.com/pavelypopov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm"
                >
                  {isEn ? "Open Calendly →" : "Открыть Calendly →"}
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
