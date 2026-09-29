import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: "/hero-1.jpg",
    label: "EDITION 2026 · HAUTE ATELIER",
    title: "MADE BY HAND.\nMADE TO BE YOURS.",
    subtitle: "Tactile crochet pieces sculpted stitch by individual stitch in our atelier.",
    ctaText: "Discover the Collection",
    ctaLink: "/shop",
    objectFocus: "The Noir Series"
  },
  {
    image: "/hero-2.jpg",
    label: "THE EDITORIAL SERIES",
    title: "TEXTURE\nIN MOTION.",
    subtitle: "Kinetic fringing and structural openwork designed for fluid cadence.",
    ctaText: "Explore Sculptural Bags",
    ctaLink: "/shop/bags",
    objectFocus: "Tactile Bags"
  },
  {
    image: "/hero-3.jpg",
    label: "ARCHIVAL RESTRAINT",
    title: "WORN\nYOUR WAY.",
    subtitle: "A modern homage to slow craft, individual drape, and unbleached cotton.",
    ctaText: "View Editorial Lookbook",
    ctaLink: "/lookbook",
    objectFocus: "Kinetic Tops"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-screen min-h-[680px] overflow-hidden bg-noir select-none">
      {/* Background Image Carousel with Cinematic Ken Burns Scale */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle multi-stage vignette for editorial depth & legible text */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/35 to-noir/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-between pt-32 pb-12 md:pb-16 text-[#faf8f5]">
        {/* Top Metadata */}
        <div className="flex items-center justify-between text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/70 font-sans">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SELENE ATELIER · 2026
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-white/50"
          >
            0{current + 1} / 0{HERO_SLIDES.length}
          </motion.span>
        </div>

        {/* Editorial Headline & Subtitle */}
        <div className="max-w-4xl py-6 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 md:space-y-6"
            >
              <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/75 font-sans font-medium">
                {slide.label}
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white leading-[1.02] tracking-tight uppercase whitespace-pre-line">
                {slide.title}
              </h1>

              <p className="text-sm md:text-lg text-white/80 font-serif italic max-w-xl leading-relaxed pt-1">
                {slide.subtitle}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  to={slide.ctaLink}
                  className="group relative inline-flex items-center gap-3 text-xs-caps tracking-[0.28em] text-white py-2 border-b border-white/40 hover:border-white transition-all duration-300"
                >
                  <span>{slide.ctaText}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <Link
                  to="/lookbook"
                  className="text-xs-caps tracking-[0.24em] text-white/60 hover:text-white transition-colors hidden sm:inline"
                >
                  Explore Campaign
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Slide Controls & Scroll Indicator */}
        <div className="flex items-end justify-between border-t border-white/15 pt-6 text-xs text-white/60">
          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1 transition-all duration-500 rounded-none ${
                    current === idx ? 'w-10 bg-white' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 pl-4">
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="p-1 hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-1 hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scroll Down Cue */}
          <a
            href="#featured"
            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/60 hover:text-white transition-colors"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce stroke-[1.2]" />
          </a>
        </div>
      </div>
    </section>
  );
}
