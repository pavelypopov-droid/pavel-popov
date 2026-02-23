import { NextRequest, NextResponse } from "next/server";

// Rate limiting (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 minute window
    return true;
  }

  if (entry.count >= 5) return false; // max 5 per minute
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, company, phone, subject, message, _honeypot } = body;

  // Honeypot check
  if (_honeypot) {
    return NextResponse.json({ ok: true }); // silently ignore spam
  }

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // Dev mode: just log and return ok
    console.log("Contact form submission (dev mode):", { name, email, subject });
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "site@beyondcore.pro",
      to: "popov@iofm.ru",
      subject: `Новое обращение: ${subject || "с сайта"} — ${name}`,
      html: `
        <h2>Новое обращение с сайта</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;color:#64748B;">Имя</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#64748B;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px;font-weight:bold;color:#64748B;">Компания</td><td style="padding:8px;">${company}</td></tr>` : ""}
          ${phone ? `<tr><td style="padding:8px;font-weight:bold;color:#64748B;">Телефон</td><td style="padding:8px;">${phone}</td></tr>` : ""}
          ${subject ? `<tr><td style="padding:8px;font-weight:bold;color:#64748B;">Тема</td><td style="padding:8px;">${subject}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;color:#64748B;vertical-align:top;">Сообщение</td><td style="padding:8px;">${message.replace(/\n/g, "<br/>")}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
