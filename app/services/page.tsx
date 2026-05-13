"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Users, Shield, Sparkles, Building2, Package, Monitor, Globe,
  ArrowRight, CheckCircle2, Phone
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: Users,
    title: "Manpower Supply",
    desc: "We provide skilled, semi-skilled, and unskilled manpower to industries including manufacturing, construction, logistics, and retail. All our staff is background-verified and trained.",
    features: ["Background verified", "Quick deployment", "All categories", "PAN India coverage"],
    color: "var(--navy)",
  },
  {
    icon: Shield,
    title: "Security Services",
    desc: "Professional security guards, supervisors, and ex-servicemen available for residential, commercial, industrial and event security. All personnel are PSARA licensed.",
    features: ["PSARA licensed guards", "Ex-servicemen available", "24/7 deployment", "CCTV monitoring support"],
    color: "var(--gold)",
  },
  {
    icon: Sparkles,
    title: "Housekeeping Services",
    desc: "Comprehensive cleaning and sanitation services for offices, hospitals, malls, hotels, and industrial premises. Trained staff with eco-friendly cleaning products.",
    features: ["Trained housekeepers", "Eco-friendly products", "Daily/weekly plans", "Quality inspection"],
    color: "var(--navy)",
  },
  {
    icon: Building2,
    title: "Facility Management",
    desc: "End-to-end integrated facility management including maintenance, pantry services, reception management, and more. We help businesses run smoothly.",
    features: ["Multi-service management", "Preventive maintenance", "Pantry services", "Soft & hard services"],
    color: "var(--gold)",
  },
  {
    icon: Package,
    title: "Stationery Supply",
    desc: "Complete office stationery, consumables and supplies delivered to your doorstep. Bulk orders for corporates at competitive pricing with GST invoicing.",
    features: ["GST invoicing", "Bulk discounts", "Doorstep delivery", "All brands available"],
    color: "var(--navy)",
  },
  {
    icon: Monitor,
    title: "IT Services",
    desc: "Complete IT support including hardware supply, AMC, networking, server setup, and cloud solutions. We keep your IT infrastructure running 24/7.",
    features: ["Hardware supply & AMC", "Networking & server", "Cloud solutions", "Remote & onsite support"],
    color: "var(--gold)",
  },
  {
    icon: Globe,
    title: "Web Designing",
    desc: "Modern, mobile-first websites and digital solutions including e-commerce, portals, and branding. From concept to launch with SEO and performance optimization.",
    features: ["Mobile-first design", "SEO optimized", "E-commerce ready", "Fast loading sites"],
    color: "var(--navy)",
  },
];

export default function ServicesPage() {
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
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="gold-badge mb-5">What We Provide</span>
            <h1 className="section-title text-white mb-4">
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <div className="gold-line mb-5" />
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              7 specialized service categories. One trusted partner. PAN India reach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {services.map(({ icon: Icon, title, desc, features, color }, idx) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`w-full min-w-0 ${idx === services.length - 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="glass-card-white card-hover h-full rounded-2xl overflow-hidden flex flex-col">
                  {/* Card top accent */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background:
                        color === "var(--gold)"
                          ? "linear-gradient(90deg, var(--gold-light), var(--gold-dark))"
                          : "linear-gradient(90deg, var(--navy-light), var(--navy))",
                    }}
                  />
                  <div className="p-8 flex flex-col flex-1">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                      style={{
                        background:
                          color === "var(--gold)"
                            ? "linear-gradient(135deg, var(--gold-light), var(--gold-dark))"
                            : "linear-gradient(135deg, var(--navy-light), var(--navy))",
                      }}
                    >
                      <Icon size={26} color="white" />
                    </div>
                    <h2 className="text-navy font-bold text-xl mb-3">{title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{desc}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-7">
                      {features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/client-requirement"
                      id={`get-quote-${title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="btn-gold text-sm py-3 justify-center"
                    >
                      <ArrowRight size={15} /> Get Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimSection className="text-center mb-14">
            <span className="gold-badge mb-4">How It Works</span>
            <h2 className="section-title text-white">Simple <span className="text-gradient-gold">4-Step Process</span></h2>
            <div className="gold-line mx-auto mt-4" />
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { step: "01", title: "Submit Requirement", desc: "Fill our online form or call us with your staffing needs." },
              { step: "02", title: "Get a Quote", desc: "Receive a transparent, competitive quote within 24 hours." },
              { step: "03", title: "Staff Selection", desc: "We shortlist and verify the right candidates for you." },
              { step: "04", title: "Deployment", desc: "Staff deployed at your location, ready to work." },
            ].map(({ step, title, desc }) => (
              <AnimSection key={step} className="w-full min-w-0">
                <div className="text-center glass-card p-7 rounded-2xl h-full w-full">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center font-extrabold text-lg"
                    style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold-dark))", color: "var(--navy)" }}
                  >
                    {step}
                  </div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--off-white)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimSection>
            <h2 className="section-title text-navy mb-4">
              Ready to <span className="text-gradient-gold">Get Started</span>?
            </h2>
            <p className="text-gray-500 mb-8">
              Contact us today for a free consultation and quote tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/client-requirement" className="btn-gold py-4 px-8">
                <Users size={18} /> Submit Requirement
              </Link>
              <a href="tel:+919313045554" className="btn-navy py-4 px-8">
                <Phone size={18} /> +91 93130 45554
              </a>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  );
}


