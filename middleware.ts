import { NextRequest, NextResponse } from "next/server";
import { i18nConfig } from "@/lib/i18n-config";

// CIS + nearby countries where Russian is commonly understood
const CIS_COUNTRIES = new Set([
  "RU", "UZ", "KZ", "KG", "TJ", "TM", // Central Asia + Russia
  "AZ", "AM", "GE", "BY", "MD", "UA",  // Caucasus + Eastern Europe
]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes, static files, favicon
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/files/") ||
    pathname.startsWith("/images/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Detect country from Vercel header (available on Vercel Edge)
  const country = request.headers.get("x-vercel-ip-country") || "";

  if (pathnameHasLocale) {
    // Set country cookie for client-side use (phone input)
    const response = NextResponse.next();
    if (country) {
      response.cookies.set("visitor-country", country, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
        sameSite: "lax",
      });
    }
    return response;
  }

  // Non-CIS visitor without locale prefix → redirect to /en/
  if (country && !CIS_COUNTRIES.has(country)) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("visitor-country", country, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // CIS visitor or unknown country — default to Russian (no prefix)
  const response = NextResponse.next();
  if (country) {
    response.cookies.set("visitor-country", country, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
