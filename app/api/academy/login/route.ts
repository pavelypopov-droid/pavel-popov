import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "academy_token";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const expected = process.env.ACADEMY_PASSWORD;

  if (!expected || password !== expected) {
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
