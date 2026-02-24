import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data";

const BASE = "https://beyondcore.pro";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages — both languages
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/cases", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contacts", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const staticUrls: MetadataRoute.Sitemap = staticPages.flatMap((page) => [
    // Russian (root)
    {
      url: `${BASE}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ru: `${BASE}${page.path}`,
          en: `${BASE}/en${page.path}`,
        },
      },
    },
    // English
    {
      url: `${BASE}/en${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.9,
      alternates: {
        languages: {
          ru: `${BASE}${page.path}`,
          en: `${BASE}/en${page.path}`,
        },
      },
    },
  ]);

  // Blog posts — both languages
  const blogUrls: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const date = new Date(post.date);
    return [
      {
        url: `${BASE}/blog/${post.slug}`,
        lastModified: date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            ru: `${BASE}/blog/${post.slug}`,
            en: `${BASE}/en/blog/${post.slug}`,
          },
        },
      },
      {
        url: `${BASE}/en/blog/${post.slug}`,
        lastModified: date,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: {
            ru: `${BASE}/blog/${post.slug}`,
            en: `${BASE}/en/blog/${post.slug}`,
          },
        },
      },
    ];
  });

  return [...staticUrls, ...blogUrls];
}
