"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";

// Social icons as inline SVG since lucide-react v0.4+ removed social brands
const SocialFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--gold-light)]">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SocialInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold-light)]">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const SocialLinkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--gold-light)]">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const SocialTwitter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--gold-light)]">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const services = [
  "Manpower Supply",
  "Security Services",
  "Housekeeping Services",
  "Facility Management",
  "Stationery Supply",
  "IT Services",
  "Web Designing",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/client-requirement", label: "Hire Manpower" },
  { href: "/job-seeker", label: "Apply for Jobs" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      {/* Top gold line */}
      <div
        className="w-full h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)",
        }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="PSG Associate"
                width={52}
                height={35}
                style={{ objectFit: 'contain', height: 'auto' }}
                className="rounded-xl object-contain bg-white p-1"
              />
              <div>
                <p className="text-white font-extrabold text-lg leading-tight">
                  PSG Associate
                </p>
                <p className="text-[var(--gold)] text-[10px] font-semibold tracking-widest uppercase">
                  Business Services
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Complete Workforce &amp; Business Service Solutions. Serving
              businesses across PAN India with trusted professional services.
            </p>
            <div className="space-y-2">
              <p className="text-[var(--gold)] text-xs font-bold uppercase tracking-widest">
                GSTIN
              </p>
              <p className="text-white/80 text-sm font-mono">
                06GFVPM7025D1Z5
              </p>
            </div>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: SocialFacebook, href: "#", label: "Facebook" },
                { Icon: SocialInstagram, href: "#", label: "Instagram" },
                { Icon: SocialLinkedin, href: "#", label: "LinkedIn" },
                { Icon: SocialTwitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.12)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-6 h-0.5 inline-block"
                style={{ background: "var(--gold)" }}
              />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-white/60 text-sm hover:text-[var(--gold-light)] transition-colors group"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[var(--gold)] group-hover:translate-x-1 transition-transform"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-6 h-0.5 inline-block"
                style={{ background: "var(--gold)" }}
              />
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-white/60 text-sm hover:text-[var(--gold-light)] transition-colors group"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[var(--gold)] group-hover:translate-x-1 transition-transform"
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-6 h-0.5 inline-block"
                style={{ background: "var(--gold)" }}
              />
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(201,168,76,0.12)" }}
                >
                  <MapPin size={15} className="text-[var(--gold)]" />
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  167/3 Uttam Nagar, Near Skoda Showroom, Delhi Road, Rewari,
                  Haryana – 123401
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)" }}
                >
                  <Phone size={15} className="text-[var(--gold)]" />
                </div>
                <a
                  href="tel:+919313045554"
                  className="text-white/60 text-sm hover:text-[var(--gold-light)] transition-colors"
                >
                  +91 93130 45554
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)" }}
                >
                  <Mail size={15} className="text-[var(--gold)]" />
                </div>
                <a
                  href="mailto:psgassociate1@gmail.com"
                  className="text-white/60 text-sm hover:text-[var(--gold-light)] transition-colors"
                >
                  psgassociate1@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)" }}
                >
                  <Clock size={15} className="text-[var(--gold)]" />
                </div>
                <div className="text-white/60 text-sm">
                  <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
                  <p>Sun: 10:00 AM – 2:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
        >
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} PSG Associate. All rights reserved.
          </p>
          <p className="text-white/40 text-sm text-center">
            Designed & Developed with ❤️ for PSG Associate
          </p>
        </div>
      </div>
    </footer>
  );
}
