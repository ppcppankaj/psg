import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/nodemailer";
import { rateLimit } from "@/lib/rateLimit";

function escapeHtml(str: string): string {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/jpeg","image/png"];

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip, 3, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;
    const qualification = formData.get("qualification") as string;
    const experience = formData.get("experience") as string;
    const jobRole = formData.get("jobRole") as string;
    const location = formData.get("location") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File | null;
    const photo = formData.get("photo") as File | null;

    // File validation
    for (const file of [resume, photo]) {
      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: "File too large. Maximum size is 5 MB." }, { status: 400 });
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json({ error: "Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG." }, { status: 400 });
        }
      }
    }

    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    if (resume && resume.size > 0) {
      const buf = Buffer.from(await resume.arrayBuffer());
      attachments.push({ filename: `Resume_${fullName}_${resume.name}`, content: buf, contentType: resume.type });
    }
    if (photo && photo.size > 0) {
      const buf = Buffer.from(await photo.arrayBuffer());
      attachments.push({ filename: `Photo_${fullName}_${photo.name}`, content: buf, contentType: photo.type });
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const refId = `PSG-${Date.now().toString(36).toUpperCase()}`;

    const rows = [
      ["Full Name", fullName], ["Mobile", mobile], ["Email", email],
      ["Qualification", qualification], ["Experience", experience],
      ["Preferred Job Role", jobRole], ["Current Location", location],
    ].map(([l, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#4a5568;font-size:13px;width:40%;font-weight:600;">${l}</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a1628;font-size:13px;">${escapeHtml(v||"") || "—"}</td></tr>`).join("");

    const adminHtml = `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:620px;margin:0 auto;background:#f4f6f9;">
  <div style="background:linear-gradient(135deg,#0a1628,#112240);padding:28px 32px;border-radius:12px 12px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><h1 style="color:#c9a84c;margin:0;font-size:20px;">PSG Associate</h1><p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:12px;">psgassociate.com</p></td>
      <td align="right"><span style="background:rgba(201,168,76,0.2);color:#c9a84c;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(201,168,76,0.4);">JOB APPLICATION</span></td>
    </tr></table>
  </div>
  <div style="background:white;padding:32px;border-left:1px solid #e8ecf2;border-right:1px solid #e8ecf2;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}${message ? `<tr><td colspan="2" style="padding:16px 0 0;"><p style="color:#4a5568;font-size:13px;font-weight:600;margin:0 0 6px;">About Applicant:</p><p style="background:#f8f9fb;padding:12px;border-radius:8px;color:#0a1628;font-size:13px;margin:0;">${escapeHtml(message)}</p></td></tr>` : ""}</table>
    <p style="color:#8a9ab5;font-size:12px;margin:16px 0 0;">Ref: ${refId} | Submitted: ${timestamp} IST${attachments.length > 0 ? ` | Attachments: ${attachments.map(a => a.filename).join(", ")}` : ""}</p>
  </div>
  <div style="background:#f8f9fb;padding:20px 32px;border:1px solid #e8ecf2;text-align:center;">
    <a href="mailto:${escapeHtml(email||"")}" style="background:#0a1628;color:white;text-decoration:none;padding:10px 24px;border-radius:20px;font-size:13px;font-weight:600;margin:0 8px;display:inline-block;">Reply via Email</a>
    <a href="https://wa.me/91${escapeHtml(mobile||"")}" style="background:#25D366;color:white;text-decoration:none;padding:10px 24px;border-radius:20px;font-size:13px;font-weight:600;margin:0 8px;display:inline-block;">WhatsApp</a>
  </div>
  <div style="padding:16px 32px;text-align:center;"><p style="color:#8a9ab5;font-size:11px;margin:0;">PSG Associate | 167/3 Uttam Nagar, Rewari, Haryana | GSTIN: 06GFVPM7025D1Z5</p></div>
</div>`;

    const userHtml = `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#0a1628,#112240);padding:28px;border-radius:10px 10px 0 0;text-align:center;"><h2 style="color:#c9a84c;margin:0;">PSG Associate</h2></div>
  <div style="background:white;padding:28px;border-radius:0 0 10px 10px;border:1px solid #e0e0e0;">
    <p>Dear <strong>${escapeHtml(fullName||"")}</strong>,</p>
    <p>Thank you for applying for the role of <strong>${escapeHtml(jobRole||"")}</strong>. Our HR team will review your application and contact you for suitable opportunities.</p>
    <p style="font-size:12px;color:#8a9ab5;">Reference: ${refId}</p>
    <p>For queries: <strong>+91 93130 45554</strong></p>
    <a href="https://wa.me/919313045554" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:10px 22px;border-radius:20px;font-size:13px;font-weight:600;">Chat on WhatsApp</a>
    <br/><br/><p style="font-size:13px;">Best regards,<br/><strong>PSG Associate HR Team</strong><br/>Rewari, Haryana</p>
  </div>
</div>`;

    await transporter.sendMail({
      from: `"PSG Associate Website" <${process.env.SMTP_USER}>`,
      to: "psgassociate1@gmail.com",
      subject: `[${refId}] Job Application: ${escapeHtml(jobRole||"")} — ${escapeHtml(fullName||"")}`,
      html: adminHtml,
      attachments,
    });

    await transporter.sendMail({
      from: `"PSG Associate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Application Received — PSG Associate",
      html: userHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Job application email error:", error);
    return NextResponse.json({ error: "Failed to send application. Please try again." }, { status: 500 });
  }
}
