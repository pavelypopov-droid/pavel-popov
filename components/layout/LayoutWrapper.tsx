"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAcademy = pathname.includes("/academy");

  if (isAcademy) {
    return <>{children}</>;
  }

  return (
    <>
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
    </>
  );
}
