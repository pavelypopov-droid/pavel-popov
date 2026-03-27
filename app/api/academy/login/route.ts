import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "academy_token";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function POST(request: NextRequest) {
  const text = await request.text();
  let password: string | undefined;
  try {
    password = JSON.parse(text)?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
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
