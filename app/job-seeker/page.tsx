"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, Mail, GraduationCap, Briefcase, MapPin,
  MessageSquare, Paperclip, Send, CheckCircle2, X, Camera
} from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.string().min(1, "Experience is required"),
  jobRole: z.string().min(2, "Preferred job role is required"),
  location: z.string().min(2, "Location is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const qualifications = [
  "10th Pass", "12th Pass", "ITI / Diploma", "Graduate (BA/BSc/BCom)",
  "Graduate (BE/BTech)", "Post Graduate", "MBA", "Other"
];

const experienceOptions = [
  "Fresher (0 years)", "1 year", "2 years", "3-5 years",
  "5-8 years", "8-10 years", "10+ years"
];

const jobRoles = [
  "Security Guard", "Supervisor", "Housekeeping Staff", "Driver",
  "Office Boy / Peon", "Data Entry Operator", "Receptionist",
  "IT Support Engineer", "Web Developer", "Sales Executive",
  "Warehouse Helper", "Electrician / Technician", "Other"
];

export default function JobSeekerPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
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
      if (resume) formData.append("resume", resume);
      if (photo) formData.append("photo", photo);

      const res = await fetch("/api/job-seeker", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Submission failed");
      setSuccess(true);
      reset();
      setResume(null);
      setPhoto(null);
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
          paddingTop: "14rem",
          paddingBottom: "4rem",
          background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)"
        }}
      >
        <div className="absolute inset-0 pattern-bg opacity-40" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="gold-badge mb-5">Career Opportunities</span>
            <h1 className="section-title text-white mb-4">
              Job <span className="text-gradient-gold">Application Form</span>
            </h1>
            <div className="gold-line mb-5" />
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              Looking for a job? Apply now and our HR team will connect you with the best opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold-dark))" }}>
                <User size={22} style={{ color: "var(--navy)" }} />
              </div>
              <div>
                <h2 className="text-navy font-bold text-xl">Job Application Form</h2>
                <p className="text-gray-400 text-sm">Fill all details for best job matching</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input {...register("fullName")} id="job-fullName" type="text" placeholder="Your full name" className="input-field pl-10" />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input {...register("mobile")} id="job-mobile" type="tel" placeholder="10-digit number" className="input-field pl-10" />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input {...register("email")} id="job-email" type="email" placeholder="your@email.com" className="input-field pl-10" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select {...register("qualification")} id="job-qualification" className="input-field pl-10 appearance-none">
                      <option value="">-- Select Qualification --</option>
                      {qualifications.map((q) => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                  {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification.message}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select {...register("experience")} id="job-experience" className="input-field pl-10 appearance-none">
                      <option value="">-- Select Experience --</option>
                      {experienceOptions.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                </div>

                {/* Job Role */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Preferred Job Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select {...register("jobRole")} id="job-role" className="input-field pl-10 appearance-none">
                      <option value="">-- Select Role --</option>
                      {jobRoles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  {errors.jobRole && <p className="text-red-500 text-xs mt-1">{errors.jobRole.message}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Current Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input {...register("location")} id="job-location" type="text" placeholder="City, State" className="input-field pl-10" />
                  </div>
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-navy mb-2">Message (Optional)</label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <textarea {...register("message")} id="job-message" placeholder="Tell us about yourself, skills, or any specific requirements..." rows={3} className="input-field pl-10 resize-none" />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Resume Upload</label>
                  <div
                    className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all hover:border-[var(--gold)] hover:bg-amber-50/20"
                    style={{ borderColor: resume ? "var(--gold)" : "var(--gray-200)" }}
                    onClick={() => document.getElementById("resume-input")?.click()}
                  >
                    <input type="file" id="resume-input" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setResume(e.target.files?.[0] || null)} />
                    <Paperclip size={22} className="mx-auto mb-2" style={{ color: "var(--gold)" }} />
                    {resume ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-navy text-xs font-semibold truncate max-w-[120px]">{resume.name}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setResume(null); }}><X size={12} className="text-red-400" /></button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-500 text-xs font-medium">Upload Resume</p>
                        <p className="text-gray-400 text-xs">PDF, DOC, DOCX</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Passport Photo</label>
                  <div
                    className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all hover:border-[var(--gold)] hover:bg-amber-50/20"
                    style={{ borderColor: photo ? "var(--gold)" : "var(--gray-200)" }}
                    onClick={() => document.getElementById("photo-input")?.click()}
                  >
                    <input type="file" id="photo-input" accept=".jpg,.jpeg,.png" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                    <Camera size={22} className="mx-auto mb-2" style={{ color: "var(--gold)" }} />
                    {photo ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-navy text-xs font-semibold truncate max-w-[120px]">{photo.name}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setPhoto(null); }}><X size={12} className="text-red-400" /></button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-500 text-xs font-medium">Upload Photo</p>
                        <p className="text-gray-400 text-xs">JPG, PNG</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{error}</div>
              )}

              <button type="submit" id="job-submit-btn" disabled={submitting} className="btn-gold w-full py-4 justify-center text-base">
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <><Send size={18} /> Submit Application</>
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
              <h3 className="text-navy font-extrabold text-2xl mb-3">Application Submitted!</h3>
              <p className="text-gray-500 mb-2">Your application has been received. Our HR team will review it and reach out to you shortly.</p>
              <p className="text-gray-400 text-sm mb-8">Confirmation sent to <strong>psgassociate1@gmail.com</strong></p>
              <button onClick={() => setSuccess(false)} className="btn-gold w-full py-3 justify-center">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


