import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTABlock() {
  return (
    <section className="bg-[#0F172A] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Есть задача? Давайте обсудим за 30 минут
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Бесплатная первичная консультация — разберём вашу ситуацию и
            определим, чем могу помочь
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#1d4ed8] transition-colors"
            >
              <MessageCircle size={18} />
              Записаться на консультацию
            </Link>
            <a
              href="https://t.me/pavel_popov_consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-colors"
            >
              Написать напрямую <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
