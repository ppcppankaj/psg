"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, Mail, MessageSquare, Tag, MapPin, Clock, Send, CheckCircle2
} from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Please provide a message (min 10 characters)"),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSuccess(true);
      reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(7rem, 18vw, 13rem)",
          paddingBottom: "5rem",
          background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)"
        }}
      >
        <div className="absolute inset-0 pattern-bg opacity-40" />
        <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="gold-badge mb-5">Get In Touch</span>
            <h1 className="section-title text-white mb-4">
              Contact <span className="text-gradient-gold">PSG Associate</span>
            </h1>
            <div className="gold-line mb-5" />
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              Have a question or need a quote? We&apos;d love to hear from you. Our team responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info cards */}
              {[
                {
                  icon: MapPin,
                  title: "Our Address",
                  lines: [
                    "167/3 Uttam Nagar, Near Skoda Showroom",
                    "Delhi Road, Rewari",
                    "Haryana – 123401",
                  ],
                },
                {
                  icon: Phone,
                  title: "Phone / WhatsApp",
                  lines: ["+91 93130 45554"],
                  link: "tel:+919313045554",
                },
                {
                  icon: Mail,
                  title: "Email",
                  lines: ["psgassociate1@gmail.com"],
                  link: "mailto:psgassociate1@gmail.com",
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 2:00 PM"],
                },
              ].map(({ icon: Icon, title, lines, link }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card-white rounded-2xl p-6 flex items-start gap-4 card-hover"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--navy), var(--navy-light))" }}
                  >
                    <Icon size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <p className="text-navy font-bold text-sm mb-1">{title}</p>
                    {lines.map((l, i) =>
                      link && i === 0 ? (
                        <a key={l} href={link} className="block text-gray-500 text-sm hover:text-[var(--gold)] transition-colors">
                          {l}
                        </a>
                      ) : (
                        <p key={l} className="text-gray-500 text-sm">{l}</p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919313045554"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-2xl text-white font-bold transition-all hover:-translate-y-1"
                style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>

              {/* Google Maps embed — corrected coordinates for Rewari, Haryana */}
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ height: 220 }}>
                <iframe
                  title="PSG Associate Location"
                  src="https://maps.google.com/maps?q=167/3+Uttam+Nagar+Near+Skoda+Showroom+Delhi+Road+Rewari+Haryana+123401&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card-white rounded-3xl p-8 md:p-10 shadow-xl h-full">
                <h2 className="text-navy font-bold text-2xl mb-2">Send us a Message</h2>
                <p className="text-gray-400 text-sm mb-8">Fill in the form and we&apos;ll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register("name")} id="contact-name" type="text" placeholder="Your name" className="input-field pl-10" />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Mobile <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register("mobile")} id="contact-mobile" type="tel" placeholder="10-digit number" className="input-field pl-10" />
                      </div>
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register("email")} id="contact-email" type="email" placeholder="your@email.com" className="input-field pl-10" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input {...register("subject")} id="contact-subject" type="text" placeholder="How can we help you?" className="input-field pl-10" />
                    </div>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                      <textarea {...register("message")} id="contact-message" rows={5} placeholder="Describe your requirement..." className="input-field pl-10 resize-none" />
                    </div>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{error}</div>
                  )}

                  <button type="submit" id="contact-submit-btn" disabled={submitting} className="btn-gold w-full py-4 justify-center text-base">
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,22,40,0.75)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}>
                <CheckCircle2 size={40} style={{ color: "var(--navy)" }} />
              </div>
              <h3 className="text-navy font-extrabold text-2xl mb-3">Message Sent!</h3>
              <p className="text-gray-500 mb-8">Thank you for reaching out. Our team will contact you within 24 hours.</p>
              <button onClick={() => setSuccess(false)} className="btn-gold w-full py-3 justify-center">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


