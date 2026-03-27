export const runtime = "nodejs";

const COOKIE_NAME = "academy_token";
const MAX_AGE = 30 * 24 * 60 * 60;

export async function POST(request: Request) {
  const expected = (process.env.ACADEMY_PASSWORD || "").trim();
  if (!expected) {
    return Response.json({ error: "Not configured" }, { status: 500 });
  }

  const { password } = await request.json().catch(() => ({ password: "" }));

  if (!password || password.trim() !== expected) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = btoa(JSON.stringify({ auth: true, exp: Date.now() + MAX_AGE * 1000 }));

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
    },
  });
}
