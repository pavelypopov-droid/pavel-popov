import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AcademyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <AcademyShell lang={lang}>{children}</AcademyShell>;
}

import { AcademyShell } from "@/components/academy/AcademyShell";
