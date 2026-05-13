"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, var(--navy-light) 100%)",
      }}
    >
      {/* Pattern background */}
      <div className="absolute inset-0 pattern-bg opacity-40" />

      {/* Gold orb */}
      <div
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gold-badge mb-6 inline-flex">Page Not Found</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
          className="font-extrabold text-gradient-gold mb-4"
          style={{ fontSize: "clamp(5rem, 20vw, 9rem)", lineHeight: 1 }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-white/70 text-lg mb-3 leading-relaxed"
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-white/40 text-sm mb-10"
        >
          It may have been moved, deleted, or you may have typed the URL incorrectly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/" className="btn-gold py-4 px-8 text-base">
            <Home size={18} /> Go Home
          </Link>
          <Link href="/contact" className="btn-outline-gold py-4 px-8 text-base">
            <ArrowRight size={18} /> Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
