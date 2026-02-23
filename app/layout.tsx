import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";

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
      "Павел Попов — IT & FinTech консультант, AI эксперт, Центральная Азия",
    template: "%s | Павел Попов",
  },
  description:
    "Международный IT консультант и AI эксперт с 25-летним опытом в FinTech. Цифровая трансформация, AI внедрение, DWH, RegTech под ключ для банков и финтех компаний Центральной Азии.",
  keywords: [
    "IT консультант Узбекистан",
    "FinTech консалтинг Ташкент",
    "AI эксперт Центральная Азия",
    "CIO консультант",
    "цифровая трансформация банк",
    "Pavel Popov IT consultant Central Asia",
    "IT стратегия банк",
    "AI внедрение FinTech",
  ],
  authors: [{ name: "Павел Попов", url: "https://beyondcore.pro" }],
  creator: "Павел Попов",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://beyondcore.pro",
    siteName: "Павел Попов — IT & FinTech Advisor",
    title: "Павел Попов — IT & FinTech консультант, AI эксперт",
    description:
      "25 лет в IT и FinTech. Цифровые трансформации под ключ для банков и финтех-компаний Центральной Азии.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="antialiased">
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Mobile sticky CTA */}
        <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden pb-safe">
          <a
            href="/contacts"
            className="flex items-center justify-center w-full bg-[#2563EB] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:bg-[#1d4ed8] transition-colors"
          >
            Обсудить проект →
          </a>
        </div>
      </body>
    </html>
  );
}
