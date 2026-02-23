import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#2563EB] mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-3">
          Страница не найдена
        </h1>
        <p className="text-[#64748B] mb-8">
          Возможно, страница была перемещена или больше не существует.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            <Home size={16} />
            На главную
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 bg-white text-[#2563EB] border border-[#2563EB] font-semibold py-3 px-6 rounded-xl hover:bg-[#EFF6FF] transition-colors"
          >
            Связаться <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
