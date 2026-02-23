import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data";
import fs from "fs";
import path from "path";
import CTABlock from "@/components/sections/CTABlock";
import type { Locale } from "@/lib/i18n-config";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const langs = ["ru", "en"];
  return blogPosts.flatMap((post) =>
    langs.map((lang) => ({ lang, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function parseMdx(content: string) {
  return content.replace(/^---[\s\S]*?---\n/, "");
}

function mdToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-[#0F172A] mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-[#0F172A] mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[#0F172A]">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#2563EB] hover:underline font-medium">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-[#374151]"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0"></span><span>$1</span></li>')
    .replace(/(<li[\s\S]+?<\/li>\n?)+/g, '<ul class="space-y-2 my-4 list-none">$&</ul>')
    .replace(/^(?!<[h|u|l|o])(.+)$/gm, (line) => {
      if (line.trim() === "") return "";
      return `<p class="text-[#374151] leading-relaxed my-4">${line}</p>`;
    });
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const isEn = lang === "en";
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  let htmlContent = "";
  try {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const md = parseMdx(raw);
    htmlContent = mdToHtml(md);
  } catch {
    htmlContent = `<p class="text-[#374151]">${post.excerpt}</p>`;
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(isEn ? "en-GB" : "ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <section className="bg-[#0F172A] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            {isEn ? "All articles" : "Все статьи"}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#2563EB]/20 border border-[#2563EB]/30 text-blue-300 text-xs font-medium rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-400">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-sm text-slate-400">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-custom" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          <div className="mt-16 pt-8 border-t border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <div>
              <p className="font-semibold text-[#0F172A]">Pavel Popov</p>
              <p className="text-sm text-[#64748B]">IT & FinTech Advisor · AI Expert</p>
            </div>
          </div>
        </div>
      </section>

      <CTABlock lang={lang as Locale} />
    </>
  );
}
