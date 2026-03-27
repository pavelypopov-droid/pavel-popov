import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import JsonLd from "@/components/seo/JsonLd";
import Analytics from "@/components/seo/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beyondcore.pro"),
  title: {
    default:
      "Павел Попов — IT консультант, AI эксперт, Центральная Азия",
    template: "%s | Павел Попов",
  },
  description:
    "Международный IT консультант и AI эксперт с 25-летним опытом. Цифровая трансформация, AI внедрение, DWH и RegTech под ключ для банков, телекома и государственных заказчиков Центральной Азии.",
  keywords: [
    "IT консультант Узбекистан",
    "FinTech консалтинг Ташкент",
    "AI эксперт Центральная Азия",
    "CIO консультант",
    "цифровая трансформация",
    "Pavel Popov IT consultant Central Asia",
    "IT стратегия телеком",
    "AI внедрение государственный сектор",
    "IT консультант госсектор",
  ],
  authors: [{ name: "Павел Попов", url: "https://beyondcore.pro" }],
  creator: "Павел Попов",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://beyondcore.pro",
    siteName: "Павел Попов — IT & FinTech Advisor",
    title: "Павел Попов — IT консультант, AI эксперт",
    description:
      "25 лет в IT. Цифровые трансформации под ключ для банков, телекома и государственных заказчиков Центральной Азии.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Павел Попов — IT & FinTech Advisor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Павел Попов — IT & FinTech Advisor, AI Expert",
    description: "25 лет в IT и FinTech. Цифровые трансформации для банков ЦА.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://beyondcore.pro",
    languages: {
      ru: "https://beyondcore.pro",
      en: "https://beyondcore.pro/en",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="antialiased">
        <Analytics />
        <JsonLd />
        <SpeedInsights />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
