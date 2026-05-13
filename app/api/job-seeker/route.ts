import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attachments: nodemailer.Attachment[] = [];

    if (resume && resume.size > 0) {
      const buf = Buffer.from(await resume.arrayBuffer());
      attachments.push({ filename: `Resume_${fullName}_${resume.name}`, content: buf, contentType: resume.type });
    }
    if (photo && photo.size > 0) {
      const buf = Buffer.from(await photo.arrayBuffer());
      attachments.push({ filename: `Photo_${fullName}_${photo.name}`, content: buf, contentType: photo.type });
    }

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fb;">
        <div style="background: linear-gradient(135deg, #0a1628, #112240); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #c9a84c; margin: 0; font-size: 22px;">PSG Associate</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">New Job Application</p>
        </div>
        <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e8ecf2;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            ${[
              ["Full Name", fullName],
              ["Mobile", mobile],
              ["Email", email],
              ["Qualification", qualification],
              ["Experience", experience],
              ["Preferred Job Role", jobRole],
              ["Current Location", location],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #4a5568; font-size: 13px; width: 40%; font-weight: 600;">${label}</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0a1628; font-size: 13px;">${value || "—"}</td>
              </tr>`
              )
              .join("")}
            ${
              message
                ? `<tr><td colspan="2" style="padding: 16px 0 0;"><p style="color: #4a5568; font-size: 13px; font-weight: 600; margin: 0 0 6px;">About Applicant:</p><p style="background: #f8f9fb; padding: 12px; border-radius: 8px; color: #0a1628; font-size: 13px; margin: 0;">${message}</p></td></tr>`
                : ""
            }
          </table>
          <div style="margin-top: 24px; padding: 16px; background: linear-gradient(135deg, #f8f0dc, #fdf6e3); border-radius: 8px; border-left: 4px solid #c9a84c;">
            <p style="margin: 0; font-size: 12px; color: #a07830;">
              ${attachments.length > 0 ? `Attachments: ${attachments.map((a) => a.filename).join(", ")}` : "No attachments"}
              <br/>Submitted via PSG Associate Website
            </p>
          </div>
        </div>
      </div>
    `;

    // Send to company
    await transporter.sendMail({
      from: `"PSG Associate Website" <${process.env.SMTP_USER}>`,
      to: "psgassociate1@gmail.com",
      subject: `New Job Application: ${jobRole} — ${fullName}`,
      html: htmlBody,
      attachments,
    });

    // Confirmation to applicant
    await transporter.sendMail({
      from: `"PSG Associate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Application Received — PSG Associate",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0a1628, #112240); padding: 28px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: #c9a84c; margin: 0;">PSG Associate</h2>
          </div>
          <div style="background: white; padding: 28px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for applying for the role of <strong>${jobRole}</strong>. Our HR team will review your application and contact you for suitable opportunities.</p>
            <p>For any queries, reach us at:</p>
            <p style="font-size: 18px; font-weight: bold; color: #0a1628;">+91 93130 45554</p>
            <p>WhatsApp: <a href="https://wa.me/919313045554">wa.me/919313045554</a></p>
            <br/>
            <p>Best regards,<br/><strong>PSG Associate HR Team</strong><br/>Rewari, Haryana</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Job application email error:", error);
    return NextResponse.json({ error: "Failed to send application. Please try again." }, { status: 500 });
  }
}
