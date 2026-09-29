import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '../common/SectionReveal';

export default function LookbookCampaignSection() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-noir flex items-center justify-center">
      {/* Background Campaign Image with subtle scale */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/hero-3.jpg"
          alt="SELENE Editorial Campaign Lookbook"
          className="w-full h-full object-cover object-center brightness-[0.78]"
        />
        {/* Subtle cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-noir/40" />
      </motion.div>

      {/* Editorial Magazine Typography Overlay */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 w-full text-center text-[#faf8f5]">
        <SectionReveal className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block border border-white/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/80 font-sans">
              Editorial Campaign Series
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white leading-[1.0] tracking-tight uppercase">
            THE ANATOMY<br />OF SILENCE.
          </h2>

          <p className="text-sm md:text-lg text-white/85 font-serif italic max-w-xl mx-auto leading-relaxed pt-2">
            “When every element is reduced to essential fiber, texture speaks with profound resonance.”
          </p>

          <div className="pt-6">
            <Link
              to="/lookbook"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-noir text-xs-caps tracking-[0.28em] hover:bg-[#faf8f5] hover:shadow-2xl transition-all duration-300"
            >
              <span>Explore The Lookbook</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </SectionReveal>
      </div>

      {/* Magazine Footer Watermark info */}
      <div className="absolute bottom-6 inset-x-0 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-white/40 font-sans">
        <span>SELENE EDITORIAL ARCHIVE</span>
        <span>ISSUE NO. 04 · KINETIC WEAVES</span>
      </div>
    </section>
  );
}
