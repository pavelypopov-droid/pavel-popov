import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Практика и аналитика от IT & FinTech консультанта. AI в банкинге, цифровая трансформация, RegTech в Центральной Азии.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            Блог
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            Практика и аналитика
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Без воды и маркетинга — только реальный опыт из проектов в банках
            и финтех Центральной Азии.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#2563EB] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Cover placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center">
                  <span className="text-5xl font-bold text-white/20 select-none">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="default">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-[#64748B]">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-[#64748B] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-[#64748B]">
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] group-hover:gap-2 transition-all">
                      Читать <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
