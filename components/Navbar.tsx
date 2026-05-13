"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  {
    label: "Forms",
    children: [
      { href: "/client-requirement", label: "Client Requirement" },
      { href: "/job-seeker", label: "Job Seeker" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--navy)] shadow-2xl py-2"
            : "bg-transparent py-4"
        }`}
        style={{
          background: scrolled
            ? "rgba(10,22,40,0.97)"
            : "linear-gradient(180deg, rgba(10,22,40,0.85) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.png"
                alt="PSG Associate Logo"
                width={48}
                height={32}
                style={{ objectFit: 'contain', height: 'auto' }}
                className="rounded-lg object-contain bg-white p-0.5"
              />
              <div className="hidden sm:block">
                <p
                  className="text-white font-extrabold text-base leading-tight tracking-wide"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  PSG Associate
                </p>
                <p className="text-[var(--gold)] text-[10px] font-semibold tracking-widest uppercase">
                  Manpower &amp; Business Services
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="nav-link flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute top-full mt-2 right-0 w-52 rounded-xl overflow-hidden shadow-2xl"
                          style={{
                            background: "rgba(10,22,40,0.97)",
                            border: "1px solid rgba(201,168,76,0.3)",
                          }}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-5 py-3 text-sm font-semibold text-white hover:text-[var(--gold-light)] hover:bg-white/5 transition-all"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`nav-link ${pathname === link.href ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="tel:+919313045554"
                className="btn-gold text-sm py-2.5 px-5"
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white hover:text-[var(--gold)] transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden shadow-2xl mobile-menu-enter"
            style={{
              background: "rgba(10,22,40,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-bold mb-2 mt-2">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2.5 px-3 text-white font-semibold rounded-lg hover:bg-white/5 hover:text-[var(--gold-light)] transition-all"
                      >
                        — {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`py-3 px-3 text-white font-semibold rounded-lg hover:bg-white/5 hover:text-[var(--gold-light)] transition-all border-b border-white/5 ${
                      pathname === link.href ? "text-[var(--gold-light)]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a href="tel:+919313045554" className="btn-gold mt-4 justify-center">
                <Phone size={16} />
                +91 93130 45554
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
