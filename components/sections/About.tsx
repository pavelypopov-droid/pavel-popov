import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { skills } from "@/lib/data";

export default function About() {
  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/pavel-popov-photo.jpg"
                  alt="Павел Попов"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#2563EB]/10 rounded-3xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
              Обо мне
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A] mb-6">
              25 лет строю цифровое будущее банков
            </h2>

            <div className="space-y-4 text-[#374151] leading-relaxed mb-8">
              <p>
                25 лет в IT и FinTech России и Центральной Азии. CIO крупнейших
                банков, основатель AI-направлений, реализатор 150+ проектов.
              </p>
              <p>
                AI эксперт с практическим опытом: от постановки задачи до
                production-деплоя. Machine Learning, Speech Analytics,
                LLM-интеграции, AI-driven development — реализованные проекты,
                а не теория.
              </p>
              <p>
                Работаю как независимый советник и лидер команды. Понимаю рынок
                ЦА изнутри: регуляторику, культуру, технологический ландшафт.
                Даю международные практики с адаптацией под реальный контекст
                клиента.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-semibold text-[#2563EB] hover:gap-3 transition-all"
            >
              Подробнее обо мне <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
