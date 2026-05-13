"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, User, Phone, Mail, Briefcase, Users, MapPin,
  MessageSquare, Paperclip, Send, CheckCircle2, X
} from "lucide-react";

const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  employees: z.string().min(1, "Please enter number of employees"),
  location: z.string().min(2, "Location is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Manpower Supply", "Security Services", "Housekeeping Services",
  "Facility Management", "Stationery Supply", "IT Services", "Web Designing",
];

export default function ClientRequirementPage() {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => v && formData.append(k, v));
      if (file) formData.append("attachment", file);

      const res = await fetch("/api/client-requirement", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSuccess(true);
      reset();
      setFile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: "companyName" as const, label: "Company Name", icon: Building2, type: "text", placeholder: "ABC Pvt Ltd", col: "sm:col-span-1" },
    { name: "contactPerson" as const, label: "Contact Person", icon: User, type: "text", placeholder: "Full Name", col: "sm:col-span-1" },
    { name: "mobile" as const, label: "Mobile Number", icon: Phone, type: "tel", placeholder: "10-digit number", col: "sm:col-span-1" },
    { name: "email" as const, label: "Email Address", icon: Mail, type: "email", placeholder: "email@company.com", col: "sm:col-span-1" },
    { name: "employees" as const, label: "No. of Employees Required", icon: Users, type: "number", placeholder: "e.g. 10", col: "sm:col-span-1" },
    { name: "location" as const, label: "Location / City", icon: MapPin, type: "text", placeholder: "Delhi, Gurugram, Rewari...", col: "sm:col-span-1" },
  ];

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(7rem, 18vw, 13rem)",
          paddingBottom: "4rem",
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
            <span className="gold-badge mb-5">For Companies</span>
            <h1 className="section-title text-white mb-4">
              Client <span className="text-gradient-gold">Requirement Form</span>
            </h1>
            <div className="gold-line mb-5" />
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              Submit your workforce requirements. Our team will respond within 24 hours with a tailored solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold-dark))" }}>
                <Briefcase size={22} style={{ color: "var(--navy)" }} />
              </div>
              <div>
                <h2 className="text-navy font-bold text-xl">Submit Your Requirement</h2>
                <p className="text-gray-400 text-sm">All fields marked with * are required</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                {fields.map(({ name, label, icon: Icon, type, placeholder, col }) => (
                  <div key={name} className={col}>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        {...register(name)}
                        type={type}
                        id={`client-${name}`}
                        placeholder={placeholder}
                        className="input-field pl-10"
                      />
                    </div>
                    {errors[name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
                    )}
                  </div>
                ))}

                {/* Service dropdown */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <select
                      {...register("service")}
                      id="client-service"
                      className="input-field pl-10 appearance-none"
                    >
                      <option value="">-- Select Service --</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Additional Message
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <textarea
                      {...register("message")}
                      id="client-message"
                      placeholder="Describe your requirement, timeline, or any special needs..."
                      rows={4}
                      className="input-field pl-10 resize-none"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Attachment (PDF/DOC/Image)
                  </label>
                  <div
                    className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-[var(--gold)] hover:bg-amber-50/30"
                    style={{ borderColor: file ? "var(--gold)" : "var(--gray-200)" }}
                    onClick={() => document.getElementById("client-file-input")?.click()}
                  >
                    <input
                      type="file"
                      id="client-file-input"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <Paperclip size={24} className="mx-auto mb-3" style={{ color: "var(--gold)" }} />
                    {file ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-navy font-semibold text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="text-red-400 hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-500 text-sm font-medium">Click to upload or drag & drop</p>
                        <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                id="client-submit-btn"
                disabled={submitting}
                className="btn-gold w-full py-4 justify-center text-base"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send size={18} /> Submit Requirement
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,22,40,0.75)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}>
                <CheckCircle2 size={40} style={{ color: "var(--navy)" }} />
              </div>
              <h3 className="text-navy font-extrabold text-2xl mb-3">Requirement Submitted!</h3>
              <p className="text-gray-500 mb-2">
                Thank you! Your requirement has been sent to our team at{" "}
                <strong>psgassociate1@gmail.com</strong>
              </p>
              <p className="text-gray-400 text-sm mb-8">
                We will contact you within 24 hours with a tailored solution.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-gold w-full py-3 justify-center"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


