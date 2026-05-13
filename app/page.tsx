"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Users, Shield, Sparkles, Building2, Package, Monitor, Globe,
  CheckCircle2, ArrowRight, Star, Quote, ChevronLeft, ChevronRight,
  Award, Clock, MapPin, TrendingUp, Zap, HeartHandshake
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */
const services = [
  { icon: Users, label: "Manpower Supply", desc: "Skilled and unskilled workforce solutions tailored to your business needs." },
  { icon: Shield, label: "Security Services", desc: "Trained security personnel ensuring safety and protection 24/7." },
  { icon: Sparkles, label: "Housekeeping", desc: "Professional cleaning and sanitation services for all facilities." },
  { icon: Building2, label: "Facility Management", desc: "End-to-end management of your premises for optimal efficiency." },
  { icon: Package, label: "Stationery Supply", desc: "Complete office stationery and supplies for your business." },
  { icon: Monitor, label: "IT Services", desc: "Technology solutions including hardware, software & networking support." },
  { icon: Globe, label: "Web Designing", desc: "Modern, responsive websites that grow your digital presence." },
];

const whyUs = [
  { icon: Award, label: "Experienced Team", desc: "10+ years in workforce management" },
  { icon: CheckCircle2, label: "Verified Staff", desc: "Background-checked professionals" },
  { icon: Zap, label: "Fast Deployment", desc: "Quick turnaround on requirements" },
  { icon: HeartHandshake, label: "Professional Support", desc: "24/7 dedicated account manager" },
  { icon: TrendingUp, label: "Affordable Pricing", desc: "Competitive rates, no hidden costs" },
  { icon: MapPin, label: "PAN India Service", desc: "Operating across all major cities" },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "HR Manager, Maruti Solutions",
    text: "PSG Associate delivered exceptional security personnel within 48 hours. Their staff is well-trained and professional. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Operations Director, TechCorp India",
    text: "We've been using PSG's facility management services for 2 years. Zero complaints — clean, efficient, and always on time.",
    rating: 5,
  },
  {
    name: "Amit Singh",
    role: "CEO, Buildex Construction",
    text: "The best manpower agency in Haryana. PSG Associate understood our requirements and provided quality workers promptly.",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Admin Head, Global Pharma Ltd",
    text: "Housekeeping services from PSG are top-notch. Very professional team, always responsive and thorough.",
    rating: 5,
  },
];

const clients = [
  "Maruti Suzuki", "Bajaj Auto", "Hero MotoCorp", "Havells India",
  "Orient Electric", "HPCL", "DLF Group", "NTPC", "BHEL", "SAIL",
];

const stats = [
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 5000, suffix: "+", label: "Staff Deployed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Cities Covered" },
];

/* ─── Animation Variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Animated Counter ───────────────────────────────────────────── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (value / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="count-up">
      {count}
      {suffix}
    </span>
  );
}

/* ─── Section wrapper with fade animation ───────────────────────── */
function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Home Page ─────────────────────────────────────────────────── */
export default function HomePage() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    autoRef.current = setInterval(nextTestimonial, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, var(--navy-light) 100%)",
        }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-bg opacity-50" />

        {/* Gold orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 rounded-full opacity-8 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--gold-light) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="gold-badge mb-6 inline-flex">
              <Star size={10} fill="currentColor" />
              Trusted Manpower Partner Since 2014
            </span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: "var(--gold)", transform: "scale(1.2)" }} />
              <Image
                src="/logo.png"
                alt="PSG Associate"
                width={140}
                height={93}
                className="relative z-10 rounded-2xl shadow-2xl bg-white p-2"
                style={{ objectFit: 'contain', width: 140, height: 'auto' }}
                priority
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-white font-extrabold mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Complete Workforce &amp;<br />
            <span className="text-gradient-gold">Business Service Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            PSG Associate — Your trusted partner for manpower supply, security, housekeeping,
            facility management, IT services &amp; more across PAN India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/client-requirement" id="hire-manpower-cta" className="btn-gold text-base py-4 px-8">
              <Users size={18} /> Hire Manpower
            </Link>
            <Link href="/job-seeker" id="apply-jobs-cta" className="btn-outline-gold text-base py-4 px-8">
              <ArrowRight size={18} /> Apply for Jobs
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="glass-card py-5 px-4">
                <p className="text-3xl font-extrabold text-gradient-gold mb-1">
                  <Counter value={value} suffix={suffix} />
                </p>
                <p className="text-white/60 text-sm font-medium">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-6 rounded-full bg-[var(--gold)]"
          />
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-14">
            <span className="gold-badge mb-4">What We Offer</span>
            <h2 className="section-title text-navy mb-4">Our <span className="text-gradient-gold">Services</span></h2>
            <div className="gold-line mx-auto mb-4" />
            <p className="section-subtitle mx-auto text-center" style={{ maxWidth: 600 }}>
              From workforce solutions to digital services — PSG Associate covers all your business needs under one roof.
            </p>
          </AnimSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          >
            {services.map(({ icon: Icon, label, desc }) => (
              <motion.div key={label} variants={fadeUp} className="w-full">
                <div className="glass-card-white card-hover h-full p-7 flex flex-col gap-4 group">
                  <div className="icon-ring">
                    <Icon size={24} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="font-bold text-navy text-lg leading-tight">{label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                  <Link
                    href="/services"
                    className="flex items-center gap-1 text-sm font-bold text-[var(--gold)] hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)" }}
      >
        <div className="absolute inset-0 pattern-bg opacity-40" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)", transform: "translate(40%, -40%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimSection className="text-center mb-14">
            <span className="gold-badge mb-4">Our Advantage</span>
            <h2 className="section-title text-white mb-4">Why Choose <span className="text-gradient-gold">PSG Associate</span>?</h2>
            <div className="gold-line mx-auto mb-4" />
            <p className="section-subtitle text-white/60 mx-auto text-center" style={{ maxWidth: 520 }}>
              We combine experience, integrity and speed to deliver results that matter.
            </p>
          </AnimSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyUs.map(({ icon: Icon, label, desc }) => (
              <motion.div key={label} variants={fadeUp}>
                <div
                  className="p-7 rounded-2xl flex items-start gap-5 group card-hover cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(201,168,76,0.18)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}
                  >
                    <Icon size={22} style={{ color: "var(--navy)" }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{label}</h3>
                    <p className="text-white/50 text-sm">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Clients Marquee ─────────────────────────────────────── */}
      <section className="py-14 overflow-hidden" style={{ background: "var(--off-white)", borderTop: "1px solid var(--gray-100)" }}>
        <AnimSection className="text-center mb-10">
          <span className="gold-badge mb-3">Trusted By</span>
          <h2 className="font-bold text-navy text-2xl">Our Clients &amp; Partners</h2>
        </AnimSection>

        <div className="relative">
          <div className="flex gap-12 overflow-hidden">
            <motion.div
              className="flex gap-12 items-center shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            >
              {[...clients, ...clients].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center px-8 py-3 rounded-xl shrink-0 font-bold text-sm whitespace-nowrap"
                  style={{
                    background: "white",
                    border: "1px solid var(--gray-100)",
                    color: "var(--navy-light)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    minWidth: 140,
                  }}
                >
                  {c}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-14">
            <span className="gold-badge mb-4">Client Stories</span>
            <h2 className="section-title text-navy mb-4">What Our <span className="text-gradient-gold">Clients Say</span></h2>
            <div className="gold-line mx-auto" />
          </AnimSection>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl p-10 relative"
                style={{
                  background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)",
                }}
              >
                <Quote
                  size={56}
                  className="absolute top-8 right-8 opacity-10"
                  style={{ color: "var(--gold)" }}
                />
                <div className="flex gap-1 mb-6">
                  {Array(testimonials[testimonialIdx].rating).fill(0).map((_, i) => (
                    <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-2xl">
                  &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-bold">{testimonials[testimonialIdx].name}</p>
                  <p className="text-[var(--gold)] text-sm">{testimonials[testimonialIdx].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === testimonialIdx ? 28 : 10,
                      height: 10,
                      background: i === testimonialIdx ? "var(--gold)" : "var(--gray-200)",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--gray-100)", border: "1px solid var(--gray-200)" }}
                >
                  <ChevronLeft size={18} style={{ color: "var(--navy)" }} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--gold)" }}
                >
                  <ChevronRight size={18} style={{ color: "var(--navy)" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(10,22,40,0.07) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimSection>
            <h2 className="font-extrabold text-navy mb-5"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              Need Workforce or Business Services?
            </h2>
            <p className="text-navy/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact PSG Associate today. We deliver reliable, professional and affordable solutions for all your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-navy py-4 px-8 text-base">
                <MapPin size={18} /> Get in Touch
              </Link>
              <a
                href="https://wa.me/919313045554"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white font-bold py-4 px-8 rounded-full hover:bg-[#20ba5a] transition-all hover:-translate-y-1 text-base"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  );
}


