// Singleton Nodemailer transporter — created once at module level.
// This avoids creating a new SMTP connection on every API request.

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify once on cold start so mis-configuration is caught early in logs.
transporter.verify().catch((err) =>
  console.error("[PSG] Nodemailer verify failed:", err)
);

export default transporter;
