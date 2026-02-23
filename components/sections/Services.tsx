import Link from "next/link";
import {
  Brain,
  Map,
  Users,
  Package,
  Shield,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={28} className="text-[#2563EB]" />,
  Map: <Map size={28} className="text-[#2563EB]" />,
  Users: <Users size={28} className="text-[#2563EB]" />,
  Package: <Package size={28} className="text-[#2563EB]" />,
  Shield: <Shield size={28} className="text-[#2563EB]" />,
  Briefcase: <Briefcase size={28} className="text-[#2563EB]" />,
};

export default function Services() {
  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest">
            Что я делаю
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0F172A]">
            Услуги
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
            Работаю на стыке бизнеса и технологий. Каждое направление — это
            реализованные проекты, а не теория.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                {iconMap[service.icon]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {service.description}
                </p>
              </div>
              <Link
                href={`/services#${service.id}`}
                className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                Подробнее <ArrowRight size={14} />
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:underline"
          >
            Все услуги <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
