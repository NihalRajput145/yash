import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '../common/SectionReveal';
import ImageReveal from '../common/ImageReveal';

export default function FeaturedCollection() {
  return (
    <section id="featured" className="py-24 md:py-36 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 space-y-32 md:space-y-48">

        {/* Feature 1: The Artisanal Bag (Asymmetric Right Dominant) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text & Philosophy Column */}
          <SectionReveal className="lg:col-span-5 space-y-6 lg:pr-8 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans">
                Curated Series N° 01
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-noir leading-[1.08] tracking-tight uppercase">
                OBJECTS<br />TO CARRY.
              </h2>
            </div>

            <p className="text-stone-600 font-serif italic text-lg leading-relaxed pt-2">
              “A handbag should not simply contain possessions; it should declare an intimate relationship between tactile craft and personal presence.”
            </p>

            <p className="text-xs text-stone-500 font-sans leading-relaxed tracking-wider">
              From our signature Bow Crochet Bag to the lustrous Pearl Handle, each vessel is knotted continuously in our atelier from premium mercerized cotton yarn. Designed without rigid internal metal frames, allowing each piece to soften and conform naturally to the wearer over decades.
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-6">
              <Link
                to="/shop/bags"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors"
              >
                <span>Explore All Bags</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/product/bags/0"
                className="text-xs-caps tracking-[0.2em] text-stone-600 hover:text-noir link-underline py-1"
              >
                Bow Crochet Bag — ₹2,490
              </Link>
            </div>
          </SectionReveal>

          {/* Large Photographic Dominance */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ImageReveal
              src="/cover-bag.jpg"
              alt="SELENE Sculptural Crochet Bag editorial"
              aspectRatio="aspect-[4/5] md:aspect-[16/11]"
            >
              <div className="absolute bottom-6 right-6 bg-[#faf8f5]/90 backdrop-blur-md px-4 py-2 text-stone-800 text-[10px] tracking-[0.25em] uppercase font-sans">
                Atelier Edition · 18h Knotting
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Feature 2: The Kinetic Silhouette (Asymmetric Left Dominant) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Large Photographic Dominance */}
          <div className="lg:col-span-7 order-1">
            <ImageReveal
              src="/cover-top.jpg"
              alt="SELENE Haute Crochet Top campaign"
              aspectRatio="aspect-[4/5] md:aspect-[16/11]"
            >
              <div className="absolute bottom-6 left-6 bg-noir/85 backdrop-blur-md px-4 py-2 text-[#faf8f5] text-[10px] tracking-[0.25em] uppercase font-sans">
                Series 2026 · Organic Combed Cotton
              </div>
            </ImageReveal>
          </div>

          {/* Text & Philosophy Column */}
          <SectionReveal className="lg:col-span-5 space-y-6 lg:pl-8 order-2">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans">
                Curated Series N° 02
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-noir leading-[1.08] tracking-tight uppercase">
                TEXTURE<br />IN MOTION.
              </h2>
            </div>

            <p className="text-stone-600 font-serif italic text-lg leading-relaxed pt-2">
              “Garments that breathe, shift, and drape with uninhibited cadence. We embrace openwork meshes and tactile fringing as extensions of movement.”
            </p>

            <p className="text-xs text-stone-500 font-sans leading-relaxed tracking-wider">
              Our couture tops celebrate the delicate balance of coverage and negative space. Hand-crocheted using breathable biological fibers, each top provides unmatched comfort during warmer months while acting as a striking sculptural layer during autumn soirées.
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-6">
              <Link
                to="/shop/tops"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors"
              >
                <span>Explore Couture Tops</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/product/tops/0"
                className="text-xs-caps tracking-[0.2em] text-stone-600 hover:text-noir link-underline py-1"
              >
                Red Crochet Cardigan — ₹2,290
              </Link>
            </div>
          </SectionReveal>
        </div>

      </div>
    </section>
  );
}
