import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Instagram, Mail, Phone } from 'lucide-react';

const menuLinks = [
  { label: "Collections", path: "/shop", subtitle: "21 Handcrafted Pieces" },
  { label: "Handbags", path: "/shop/bags", subtitle: "Tactile Knotting & Pearls" },
  { label: "Ready-To-Wear", path: "/shop/tops", subtitle: "Couture Knitwear & Open-Stitch" },
  { label: "Runway Lookbook", path: "/lookbook", subtitle: "Campaign Series 2026" },
  { label: "The Atelier", path: "/about", subtitle: "Philosophy of the Hook" },
  { label: "Client Services", path: "/services", subtitle: "Concierge, Care & FAQs" },
  { label: "Order Tracking", path: "/services?tab=orders", subtitle: "Atelier Progress & Archives" }
];

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#0e0e0d] text-[#faf8f5] flex flex-col justify-between overflow-y-auto px-6 py-8 md:px-12 md:py-12"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link
              to="/"
              onClick={onClose}
              className="text-lg tracking-[0.35em] font-serif uppercase font-light"
            >
              SELENE
            </Link>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs-caps text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <span>Close</span>
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* Staggered Navigation Items */}
          <div className="py-12 space-y-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6 font-sans">
              Navigation Index
            </p>
            <nav className="flex flex-col space-y-3">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + idx * 0.045,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-white/30 transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-white/30 group-hover:text-gold-accent transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-2xl md:text-3xl font-serif font-light tracking-wide group-hover:italic group-hover:translate-x-1.5 transition-transform duration-300">
                        {link.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/40 tracking-wider font-sans hidden sm:inline">
                      {link.subtitle}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Footer of Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-white/50 tracking-wider"
          >
            <div>
              <p className="font-serif italic text-white/80 text-sm">
                Your imagination, our crochet hook.
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">
                Handmade in limited series · India
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/theselene.fashion/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@theselene.fashion</span>
              </a>
              <a
                href="mailto:contact@selenefashion.in"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>contact@selenefashion.in</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
