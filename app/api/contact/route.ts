import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/nodemailer";
import { rateLimit } from "@/lib/rateLimit";

// Escape HTML entities in user-supplied values before inserting into email HTML.
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip, 3, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const { name, mobile, email, subject, message } = await req.json();

    if (!name || !mobile || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ── Build email with escaped user input ──────────────────────────────
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const refId = `PSG-${Date.now().toString(36).toUpperCase()}`;

    const adminHtml = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:620px;margin:0 auto;background:#f4f6f9;">
  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0a1628,#112240);padding:28px 32px;border-radius:12px 12px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <h1 style="color:#c9a84c;margin:0;font-size:20px;font-weight:700;">PSG Associate</h1>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:12px;">psgassociate.com</p>
        </td>
        <td align="right">
          <span style="background:rgba(201,168,76,0.2);color:#c9a84c;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(201,168,76,0.4);">NEW CONTACT INQUIRY</span>
        </td>
      </tr>
    </table>
  </div>
  <!-- Body -->
  <div style="background:white;padding:32px;border-left:1px solid #e8ecf2;border-right:1px solid #e8ecf2;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${[
        ["Name", escapeHtml(name)],
        ["Mobile", escapeHtml(mobile)],
        ["Email", escapeHtml(email)],
        ["Subject", escapeHtml(subject)],
      ]
        .map(
          ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#4a5568;font-size:13px;width:30%;font-weight:600;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a1628;font-size:13px;">${value}</td>
      </tr>`
        )
        .join("")}
    </table>
    <div style="margin-top:16px;">
      <p style="font-weight:600;color:#4a5568;font-size:13px;margin:0 0 8px;">Message:</p>
      <div style="background:#f8f9fb;padding:16px;border-radius:8px;color:#0a1628;font-size:13px;line-height:1.6;">
        ${escapeHtml(message)}
      </div>
    </div>
    <p style="color:#8a9ab5;font-size:12px;margin:16px 0 0;">Ref: ${refId} | Submitted: ${timestamp} IST</p>
  </div>
  <!-- Action buttons -->
  <div style="background:#f8f9fb;padding:20px 32px;border:1px solid #e8ecf2;text-align:center;">
    <a href="mailto:${escapeHtml(email)}" style="background:#0a1628;color:white;text-decoration:none;padding:10px 24px;border-radius:20px;font-size:13px;font-weight:600;margin:0 8px;display:inline-block;">Reply via Email</a>
    <a href="https://wa.me/91${escapeHtml(mobile)}" style="background:#25D366;color:white;text-decoration:none;padding:10px 24px;border-radius:20px;font-size:13px;font-weight:600;margin:0 8px;display:inline-block;">WhatsApp</a>
  </div>
  <!-- Footer -->
  <div style="padding:16px 32px;text-align:center;border-radius:0 0 12px 12px;">
    <p style="color:#8a9ab5;font-size:11px;margin:0;">PSG Associate | 167/3 Uttam Nagar, Rewari, Haryana | GSTIN: 06GFVPM7025D1Z5</p>
  </div>
</div>`;

    const userHtml = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;background:#f4f6f9;">
  <div style="background:linear-gradient(135deg,#0a1628,#112240);padding:28px;border-radius:10px 10px 0 0;text-align:center;">
    <h2 style="color:#c9a84c;margin:0;">PSG Associate</h2>
    <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px;">We've received your message</p>
  </div>
  <div style="background:white;padding:28px;border-radius:0 0 10px 10px;border:1px solid #e0e0e0;">
    <p>Dear <strong>${escapeHtml(name)}</strong>,</p>
    <p>Thank you for contacting PSG Associate. We have received your message regarding <strong>${escapeHtml(subject)}</strong> and will respond within <strong>24 hours</strong>.</p>
    <div style="background:#f8f0dc;padding:16px;border-radius:8px;border-left:4px solid #c9a84c;margin:20px 0;">
      <p style="margin:0;font-weight:600;color:#0a1628;">What happens next?</p>
      <ol style="margin:8px 0 0;padding-left:18px;color:#4a5568;font-size:13px;line-height:1.8;">
        <li>Our team reviews your inquiry</li>
        <li>A specialist contacts you within 24 hours</li>
        <li>We provide a tailored solution proposal</li>
      </ol>
    </div>
    <p style="font-size:12px;color:#8a9ab5;">Reference: ${refId}</p>
    <p>For urgent inquiries: <strong>+91 93130 45554</strong></p>
    <a href="https://wa.me/919313045554" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:10px 22px;border-radius:20px;font-size:13px;font-weight:600;margin-top:8px;">Chat on WhatsApp</a>
    <br/><br/>
    <p style="font-size:13px;">Regards,<br/><strong>PSG Associate Team</strong><br/>167/3 Uttam Nagar, Rewari, Haryana</p>
  </div>
</div>`;

    await transporter.sendMail({
      from: `"PSG Associate Website" <${process.env.SMTP_USER}>`,
      to: "psgassociate1@gmail.com",
      subject: `[${refId}] Contact Form: ${escapeHtml(subject)} — ${escapeHtml(name)}`,
      html: adminHtml,
    });

    await transporter.sendMail({
      from: `"PSG Associate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — PSG Associate",
      html: userHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
