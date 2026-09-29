import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageReveal from '../components/common/ImageReveal';
import { EDITORIAL_LOOKBOOK_ITEMS } from '../data/products';

export default function LookbookPage() {
  return (
    <PageTransition className="pt-24 md:pt-28 pb-32 bg-[#faf8f5] text-noir">
      {/* Editorial Header */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-16">
        <div className="max-w-4xl space-y-4">
          <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-stone-500 font-sans block">
            Autumn / Winter Campaign · Vol. IV
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-noir tracking-tight uppercase leading-[0.98]">
            THE KINETIC<br />
            <span className="italic font-normal">CADENCE.</span>
          </h1>
          <p className="text-sm sm:text-lg text-stone-600 font-serif italic max-w-xl pt-2">
            A photographic exploration of tension, light, and tactile volume. Shot between early dusk and midnight in natural ambient light.
          </p>
        </div>
      </section>

      {/* Lookbook Layout: Asymmetric, varying sizes, full-width sections */}
      <div className="space-y-32 md:space-y-48">

        {/* Act I: Full-Bleed Panorama with Overlay Quote */}
        <section className="relative w-full h-[80vh] min-h-[550px] overflow-hidden bg-noir">
          <motion.img
            src="/hero-2.jpg"
            alt="SELENE campaign panorama"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-noir/40" />

          <div className="absolute inset-0 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-end pb-16 text-[#faf8f5]">
            <SectionReveal className="max-w-2xl space-y-4">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-sans">
                Plate 01 · Dusk Atmosphere
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide uppercase leading-tight">
                THE SHADOWS OF MERCERIZED THREAD.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-serif italic">
                “When thread is pulled by hand, every knot holds the pulse and breathing tempo of the artisan.”
              </p>
              <Link
                to="/product/bags/2"
                className="inline-flex items-center gap-2 text-xs-caps tracking-[0.24em] text-white hover:underline pt-2"
              >
                <span>Discover Midnight Shoulder Bag</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </SectionReveal>
          </div>
        </section>

        {/* Act II: Asymmetric Duo (Tall Left dominant, Offset Right with quote) */}
        <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Tall Hero Left */}
            <div className="lg:col-span-7">
              <ImageReveal
                src="/tops/top3.jpeg"
                alt="Cloud Crochet Hoodie look"
                aspectRatio="aspect-[3/4] md:aspect-[4/5]"
              >
                <div className="absolute bottom-6 left-6 bg-[#faf8f5]/90 backdrop-blur-md px-4 py-2 text-noir text-[10px] tracking-[0.25em] uppercase font-sans">
                  Plate 02 · Cloud Crochet Hoodie
                </div>
              </ImageReveal>
            </div>

            {/* Right Column: Quote + Smaller Offset Still */}
            <div className="lg:col-span-5 space-y-12">
              <SectionReveal className="space-y-6">
                <span className="font-mono text-xs text-stone-400">/ 02 ARCHIVE</span>
                <h3 className="text-3xl sm:text-4xl font-serif font-light text-noir tracking-tight uppercase leading-snug">
                  ARCHITECTURE FOR THE SKIN.
                </h3>
                <p className="text-stone-600 font-serif italic text-lg leading-relaxed">
                  Sculptural hood geometry draping over the shoulders with weightless poise. Crafted from 30 hours of continuous rib and open-cell stitching.
                </p>
                <Link
                  to="/product/tops/2"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors"
                >
                  <span>Acquire Piece</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </SectionReveal>

              <SectionReveal delay={0.2} className="w-3/4 ml-auto">
                <ImageReveal
                  src="/bags/bag6.jpeg"
                  alt="Pearl Handle Bag detail"
                  aspectRatio="aspect-square"
                >
                  <div className="absolute bottom-4 right-4 bg-noir/80 text-white px-3 py-1 text-[9px] uppercase tracking-[0.2em]">
                    Pearl Alabaster
                  </div>
                </ImageReveal>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Act III: Full Width Typography Interlude */}
        <section className="py-20 md:py-28 bg-[#f4f1e9] border-y border-[#161514]/10 text-center">
          <SectionReveal className="max-w-4xl mx-auto px-6 space-y-6">
            <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 font-sans block">
              The Movement of Texture
            </span>
            <p className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-noir leading-[1.1] uppercase tracking-tight">
              “TEXTURE IS NOT AN EMBELLISHMENT.<br />
              <span className="italic font-normal text-stone-700">IT IS THE SCULPTURE ITSELF.”</span>
            </p>
            <p className="text-xs text-stone-500 tracking-[0.25em] uppercase font-sans pt-4">
              SELENE LOOKBOOK 2026 · CURATED BY THE FOUNDING ATELIER
            </p>
          </SectionReveal>
        </section>

        {/* Act IV: Asymmetric Dynamic Triptych (Fringe in Motion) */}
        <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
            {/* Image 1: Wide */}
            <SectionReveal className="md:col-span-4 space-y-3">
              <ImageReveal
                src="/tops/top8.jpeg"
                alt="Beige Fringe Top in motion"
                aspectRatio="aspect-[3/4]"
              />
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block font-sans">
                  Plate 04 · Kinetic Fringe
                </span>
                <Link to="/product/tops/7" className="font-serif text-lg text-noir hover:underline">
                  Beige Fringe Top — ₹2,090
                </Link>
              </div>
            </SectionReveal>

            {/* Image 2: Tall Center */}
            <SectionReveal delay={0.15} className="md:col-span-5 md:-mb-12 space-y-3">
              <ImageReveal
                src="/tops/top6.jpeg"
                alt="Black Halter Top study"
                aspectRatio="aspect-[4/5] md:aspect-[3/4]"
              />
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block font-sans">
                  Plate 05 · Nocturnal Noir
                </span>
                <Link to="/product/tops/5" className="font-serif text-lg text-noir hover:underline">
                  Black Halter Top — ₹1,790
                </Link>
              </div>
            </SectionReveal>

            {/* Image 3: Bag focus */}
            <SectionReveal delay={0.25} className="md:col-span-3 space-y-3">
              <ImageReveal
                src="/bags/bag1.jpeg"
                alt="Bow Crochet Bag still"
                aspectRatio="aspect-[3/4]"
              />
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block font-sans">
                  Plate 06 · The Bow Ribbon
                </span>
                <Link to="/product/bags/0" className="font-serif text-lg text-noir hover:underline">
                  Bow Crochet Bag — ₹2,490
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
