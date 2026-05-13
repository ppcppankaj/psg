import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email, subject, message } = await req.json();

    if (!name || !mobile || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0a1628, #112240); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #c9a84c; margin: 0; font-size: 22px;">PSG Associate</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">New Contact Form Submission</p>
        </div>
        <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e8ecf2;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            ${[
              ["Name", name],
              ["Mobile", mobile],
              ["Email", email],
              ["Subject", subject],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #4a5568; font-size: 13px; width: 30%; font-weight: 600;">${label}</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0a1628; font-size: 13px;">${value}</td>
              </tr>`
              )
              .join("")}
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: 600; color: #4a5568; font-size: 13px; margin: 0 0 8px;">Message:</p>
            <div style="background: #f8f9fb; padding: 16px; border-radius: 8px; color: #0a1628; font-size: 13px; line-height: 1.6;">
              ${message}
            </div>
          </div>
          <div style="margin-top: 24px; padding: 12px 16px; background: #f8f0dc; border-radius: 8px; border-left: 4px solid #c9a84c;">
            <p style="margin: 0; font-size: 12px; color: #a07830;">Submitted via psgassociate.com contact form</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"PSG Associate Website" <${process.env.SMTP_USER}>`,
      to: "psgassociate1@gmail.com",
      subject: `Contact Form: ${subject} — ${name}`,
      html: htmlBody,
    });

    await transporter.sendMail({
      from: `"PSG Associate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — PSG Associate",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0a1628, #112240); padding: 28px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: #c9a84c; margin: 0;">PSG Associate</h2>
          </div>
          <div style="background: white; padding: 28px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for contacting PSG Associate. We have received your message regarding <strong>${subject}</strong> and will respond within 24 hours.</p>
            <p>For urgent inquiries, call us: <strong>+91 93130 45554</strong></p>
            <p>WhatsApp: <a href="https://wa.me/919313045554">wa.me/919313045554</a></p>
            <br/><p>Regards,<br/><strong>PSG Associate Team</strong><br/>167/3 Uttam Nagar, Rewari, Haryana</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
