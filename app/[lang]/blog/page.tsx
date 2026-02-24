import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? { title: "Blog | Pavel Popov", description: "Practical insights from an IT & FinTech Advisor. AI in banking, digital transformation, RegTech in Central Asia." }
    : { title: "Блог | Павел Попов" };
}

// Cover images for blog posts
const blogImages: Record<string, string> = {
  "ai-banking-central-asia-2025": "/images/blog-ai-banking.jpg",
  "how-to-choose-cio-uzbekistan": "/images/blog-cio.jpg",
  "regtech-uzbekistan-2024-2025": "/images/blog-regtech.jpg",
  "dwh-bank-build-vs-buy": "/images/blog-dwh.jpg",
};

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === "en";

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(isEn ? "en-GB" : "ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            {isEn ? "Blog" : "Блог"}
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            {isEn ? "Insights & Analysis" : "Практика и аналитика"}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {isEn
              ? "No fluff, no marketing — only real experience from projects in banks and fintech across Central Asia."
              : "Без воды и маркетинга — только реальный опыт из проектов в банках и финтех Центральной Азии."}
          </p>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const coverImg = blogImages[post.slug];
              return (
                <Link
                  key={post.slug}
                  href={`/${lang}/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#2563EB] transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Cover image */}
                  <div className="relative h-48 overflow-hidden">
                    {coverImg ? (
                      <Image
                        src={coverImg}
                        alt={isEn ? (post.titleEn ?? post.title) : post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center">
                        <span className="text-5xl font-bold text-white/20 select-none">{post.category}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="default">{isEn ? (post.categoryEn ?? post.category) : post.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-[#64748B]">
                        <Clock size={12} />
                        {isEn ? (post.readTimeEn ?? post.readTime) : post.readTime}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors">
                      {isEn ? (post.titleEn ?? post.title) : post.title}
                    </h2>
                    <p className="text-sm text-[#64748B] leading-relaxed flex-1">{isEn ? (post.excerptEn ?? post.excerpt) : post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-[#64748B]">{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] group-hover:gap-2 transition-all">
                        {isEn ? "Read" : "Читать"} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
