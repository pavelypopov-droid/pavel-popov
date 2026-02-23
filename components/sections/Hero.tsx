"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0F172A] overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/30 via-transparent to-[#0F172A]/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 text-blue-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                AI Expert · FinTech · Central Asia
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
              Павел Попов
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-2">
              IT & FinTech Advisor · AI Expert
            </h2>
            <p className="text-lg text-slate-400 mb-6">
              Международный консультант в Центральной Азии
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              Строю цифровые трансформации под ключ — от стратегии до
              работающего продукта с передачей знаний.{" "}
              <span className="text-white font-medium">
                25 лет в IT, 150+ проектов, 6 стран ЦА.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacts">
                <Button size="lg" className="w-full sm:w-auto">
                  Обсудить проект
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="/files/CV_Pavel_Popov_RU.pdf" download>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                >
                  <Download size={18} />
                  Скачать CV
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-[#2563EB]/20 rounded-3xl blur-2xl" />
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden border-2 border-white/10">
                <Image
                  src="/images/pavel-popov-photo.jpg"
                  alt="Павел Попов — IT & FinTech Advisor"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-[#64748B] font-medium">Опыт</p>
                <p className="text-2xl font-bold text-[#0F172A]">25+</p>
                <p className="text-xs text-[#64748B]">лет в IT</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#2563EB] rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-blue-200 font-medium">Проектов</p>
                <p className="text-2xl font-bold text-white">150+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
