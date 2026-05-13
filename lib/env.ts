// Environment variable validation — imported in layout.tsx (server component)
// Logs a clear error on cold start if SMTP credentials are missing.

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error(
    "[PSG] ⚠️  SMTP credentials missing! Set SMTP_USER and SMTP_PASS in .env.local\n" +
      "      Emails will NOT be sent until these are configured."
  );
}
