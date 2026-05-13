"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Users, Award, TrendingUp, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

const milestones = [
  { year: "2014", event: "PSG Associate founded in Rewari, Haryana" },
  { year: "2016", event: "Expanded to security & housekeeping services" },
  { year: "2018", event: "Launched IT services and web design division" },
  { year: "2020", event: "Crossed 200+ corporate clients across Haryana" },
  { year: "2022", event: "PAN India operations with 3,000+ staff deployed" },
  { year: "2024", event: "500+ clients | 5,000+ professionals placed" },
];

const team = [
  { name: "Pradeep Singh Gill", role: "Founder & Managing Director", initials: "PSG" },
  { name: "Ravi Kumar", role: "Operations Manager", initials: "RK" },
  { name: "Sunita Devi", role: "HR & Staffing Head", initials: "SD" },
  { name: "Mohit Arora", role: "Business Development", initials: "MA" },
];

const values = [
  { icon: CheckCircle2, title: "Integrity", desc: "Transparent dealings and honest communication with all stakeholders." },
  { icon: Award, title: "Excellence", desc: "Consistently delivering high-quality services that exceed expectations." },
  { icon: Users, title: "People First", desc: "Our workforce is our strength — we treat every employee with dignity." },
  { icon: TrendingUp, title: "Growth", desc: "Helping businesses scale with the right people and resources." },
];

const statsData = [
  { value: "500+", label: "Clients Served", dark: true },
  { value: "5000+", label: "Staff Deployed", dark: false },
  { value: "10+", label: "Years Experience", dark: false },
  { value: "PAN India", label: "Operations", dark: true },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(8rem, 20vw, 14rem)",
          paddingBottom: "4rem",
          background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)"
        }}
      >
        <div className="absolute inset-0 pattern-bg opacity-40" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="gold-badge mb-4">Who We Are</span>
            <h1 className="section-title text-white mt-3 mb-4">
              About <span className="text-gradient-gold">PSG Associate</span>
            </h1>
            <div className="gold-line mb-5" />
            <p className="text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
              A trusted name in manpower and business services, empowering companies across India since 2014.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-16 lg:py-24" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left col */}
            <AnimSection>
              <span className="gold-badge mb-4">Our Story</span>
              <h2 className="section-title text-navy mt-3 mb-5">
                Building Bridges Between{" "}
                <span className="text-gradient-gold">Talent &amp; Business</span>
              </h2>
              <div className="gold-line mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                PSG Associate was established in 2014 by Pradeep Singh Gill with a vision to provide quality
                manpower solutions to businesses across Haryana and beyond. Starting with a small team in Rewari,
                we have grown into a multi-service organization serving 500+ clients across India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our GSTIN-registered company offers end-to-end workforce solutions including security,
                housekeeping, facility management, stationery supply, IT services and web design — making us
                a one-stop business partner for companies of all sizes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Headquartered at 167/3 Uttam Nagar, Near Skoda Showroom, Delhi Road, Rewari, Haryana,
                we operate with the highest standards of professionalism and client satisfaction.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/client-requirement" className="btn-gold">
                  <Users size={16} /> Hire Our Team
                </Link>
                <Link href="/contact" className="btn-navy">
                  <MapPin size={16} /> Our Location
                </Link>
              </div>
            </AnimSection>

            {/* Stats grid */}
            <AnimSection>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {statsData.map(({ value, label, dark }) => (
                  <div
                    key={label}
                    className="p-6 sm:p-8 rounded-2xl text-center card-hover cursor-default"
                    style={{
                      background: dark
                        ? "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)"
                        : "var(--off-white)",
                      border: dark ? "1px solid rgba(201,168,76,0.2)" : "1px solid var(--gray-100)",
                    }}
                  >
                    <p
                      className="text-3xl sm:text-4xl font-extrabold mb-2"
                      style={{ color: dark ? "var(--gold-light)" : "var(--navy)" }}
                    >
                      {value}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: dark ? "rgba(255,255,255,0.65)" : "var(--gray-600)" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="gold-badge mb-4">Our Purpose</span>
            <h2 className="section-title text-navy mt-3">Mission &amp; Vision</h2>
            <div className="gold-line mx-auto mt-4" />
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Target, title: "Our Mission", color: "var(--navy)",
                text: "To provide reliable, high-quality manpower and business services that help companies grow — while creating dignified employment opportunities for individuals across India.",
              },
              {
                icon: Eye, title: "Our Vision", color: "var(--gold)",
                text: "To become India's leading integrated business services company — known for integrity, professionalism and excellence — making PSG Associate the first choice for both businesses and professionals.",
              },
            ].map(({ icon: Icon, title, color, text }) => (
              <AnimSection key={title}>
                <div className="glass-card-white p-8 lg:p-10 h-full card-hover rounded-2xl">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: color === "var(--gold)"
                        ? "linear-gradient(135deg, var(--gold-light), var(--gold-dark))"
                        : "linear-gradient(135deg, var(--navy-light), var(--navy))",
                    }}
                  >
                    <Icon size={26} color="white" />
                  </div>
                  <h3 className="text-navy font-bold text-xl mb-4">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="gold-badge mb-4">Core Principles</span>
            <h2 className="section-title text-navy mt-3">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
            <div className="gold-line mx-auto mt-4" />
          </AnimSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}>
                <div
                  className="text-center p-7 rounded-2xl card-hover cursor-default h-full"
                  style={{ background: "var(--off-white)", border: "1px solid var(--gray-100)" }}
                >
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}
                  >
                    <Icon size={24} style={{ color: "var(--navy)" }} />
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimSection className="text-center mb-12">
            <span className="gold-badge mb-4">Our Journey</span>
            <h2 className="section-title text-white mt-3">
              A Decade of <span className="text-gradient-gold">Growth</span>
            </h2>
            <div className="gold-line mx-auto mt-4" />
          </AnimSection>
          <div className="relative">
            {/* Center line — hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px opacity-30"
              style={{ background: "var(--gold)", transform: "translateX(-50%)" }} />
            {/* Mobile left line */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-px opacity-30"
              style={{ background: "var(--gold)" }} />
            <div className="space-y-6">
              {milestones.map(({ year, event }, i) => (
                <AnimSection key={year}>
                  <div className={`flex items-center gap-4 md:gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 pl-10 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="glass-card p-4 rounded-xl inline-block text-left">
                        <p className="text-[var(--gold)] font-bold text-lg mb-1">{year}</p>
                        <p className="text-white/80 text-sm">{event}</p>
                      </div>
                    </div>
                    <div
                      className="absolute left-4 md:relative md:left-auto flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10"
                      style={{ background: "var(--gold)", boxShadow: "0 0 12px rgba(201,168,76,0.5)" }}
                    >
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-20" style={{ background: "var(--off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="gold-badge mb-4">Leadership</span>
            <h2 className="section-title text-navy mt-3">
              Meet the <span className="text-gradient-gold">Team</span>
            </h2>
            <div className="gold-line mx-auto mt-4" />
          </AnimSection>
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {team.map(({ name, role, initials }) => (
              <motion.div key={name} variants={fadeUp}>
                <div className="glass-card-white card-hover text-center p-6 sm:p-8 rounded-2xl h-full">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl sm:text-2xl font-extrabold"
                    style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)", color: "var(--gold-light)" }}
                  >
                    {initials}
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-1 leading-snug">{name}</h3>
                  <p className="text-[var(--gold)] text-xs font-semibold">{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "var(--navy)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimSection>
            <h2 className="text-white font-extrabold text-2xl md:text-3xl mb-4">
              Ready to work with <span className="text-gradient-gold">PSG Associate</span>?
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Get in touch today and let us build the perfect workforce solution for you.
            </p>
            <Link href="/contact" className="btn-gold py-4 px-8 text-base">
              <ArrowRight size={18} /> Contact Us Now
            </Link>
          </AnimSection>
        </div>
      </section>
    </>
  );
}
