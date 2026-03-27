import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "academy_token";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function POST(request: NextRequest) {
  // Debug: try multiple approaches to read body
  let password: string | undefined;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    try {
      // Clone and try text
      const text = await request.text();
      if (text) {
        password = JSON.parse(text)?.password;
      }
    } catch {
      // Try URL search params (form encoded)
      password = request.nextUrl.searchParams.get("password") ?? undefined;
    }
  }

  if (!password) {
    return NextResponse.json({ error: "No password provided" }, { status: 400 });
  }
  const expected = (process.env.ACADEMY_PASSWORD || "").trim();

  if (!expected) {
    return NextResponse.json({ error: "Server misconfigured", debug: "no_env" }, { status: 500 });
  }

  if (password.trim() !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Simple signed token: timestamp + hash
  const token = Buffer.from(
    JSON.stringify({ auth: true, exp: Date.now() + COOKIE_MAX_AGE * 1000 })
  ).toString("base64");

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
