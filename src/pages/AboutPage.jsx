import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Feather, Compass, HeartHandshake } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageReveal from '../components/common/ImageReveal';

export default function AboutPage() {
  return (
    <PageTransition className="pt-24 md:pt-32 pb-32 bg-[#faf8f5] text-noir">
      {/* Editorial Page Hero */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <SectionReveal className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/selene-logo.jpeg"
                alt="SELENE Atelier Seal"
                className="w-10 h-10 object-cover rounded-full border border-[#161514]/15"
              />
              <span className="text-[10px] tracking-[0.35em] uppercase text-stone-500 font-sans">
                Atelier Provenance & Heritage
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-noir tracking-tight uppercase leading-[1.02]">
              YOUR IMAGINATION,<br />
              <span className="italic font-normal">OUR CROCHET HOOK.</span>
            </h1>

            <p className="text-stone-600 font-serif italic text-lg sm:text-xl leading-relaxed pt-2">
              SELENE was born as an intentional rebellion against rapid algorithmic fashion and mechanized mass production.
            </p>

            <p className="text-xs text-stone-500 font-sans leading-relaxed tracking-wider">
              We operate as a tactile couture studio where garments and accessories are treated as sculpture. Every row is measured against the human breath, resulting in pieces with palpable weight, enduring grace, and individual soul.
            </p>
          </SectionReveal>

          <div className="lg:col-span-6">
            <ImageReveal
              src="/about-hero.jpg"
              alt="Artisan hands weaving crochet in the SELENE atelier"
              aspectRatio="aspect-[4/3] md:aspect-[5/4]"
            >
              <div className="absolute bottom-6 right-6 bg-[#faf8f5]/90 backdrop-blur-md px-4 py-2 text-noir text-[10px] tracking-[0.25em] uppercase font-sans">
                The Atelier · Handmade in Limited Series
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* The 4 Principles of the Hook */}
      <section className="py-24 md:py-36 bg-[#f7f5ef] border-y border-[#161514]/10">
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionReveal className="max-w-3xl mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block">
              The Fundamental Core
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-noir tracking-tight uppercase">
              CRAFTED SLOWLY. MADE TO LAST.
            </h2>
            <p className="text-xs text-stone-600 font-sans tracking-wider">
              Four inviolable tenets that govern every single piece we release to the world.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SectionReveal delay={0.1} className="p-8 bg-[#faf8f5] border border-[#161514]/5 space-y-4">
              <span className="font-mono text-xs text-stone-400">/ 01</span>
              <h3 className="font-serif text-2xl text-noir">Tactile Singularity</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Because every loop is pulled by human fingers, no two pieces are entirely identical. Minor variations in tension are not defects; they are the maker’s permanent signature.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2} className="p-8 bg-[#faf8f5] border border-[#161514]/5 space-y-4">
              <span className="font-mono text-xs text-stone-400">/ 02</span>
              <h3 className="font-serif text-2xl text-noir">Zero Waste Architecture</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Unlike cut-and-sew tailoring where 15–20% of fabric ends as floor waste, crochet begins with a thread and uses only the exact length required. Zero offcuts.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.3} className="p-8 bg-[#faf8f5] border border-[#161514]/5 space-y-4">
              <span className="font-mono text-xs text-stone-400">/ 03</span>
              <h3 className="font-serif text-2xl text-noir">Biological Fibers</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                We refuse acrylics and polyester blends. We work strictly in combed long-staple cotton, natural flax linen, and botanical dyes that allow the skin to breathe.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.4} className="p-8 bg-[#faf8f5] border border-[#161514]/5 space-y-4">
              <span className="font-mono text-xs text-stone-400">/ 04</span>
              <h3 className="font-serif text-2xl text-noir">Repair Over Replace</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Every SELENE creation can be re-tensioned or repaired in our atelier should a thread unravel over years of devoted wear. We design for heirlooms, not seasons.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Alternating Narrative Section: The Philosophy of Slowness */}
      <section className="py-24 md:py-36 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 space-y-28 md:space-y-40">
        {/* Story Part 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6">
            <ImageReveal
              src="/shop-bags.jpg"
              alt="Detail of hand-crocheted bags in the studio"
              aspectRatio="aspect-[4/3] md:aspect-[16/11]"
            />
          </div>
          <SectionReveal className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block">
              Chapter I · The Dialogue
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-noir tracking-tight uppercase leading-snug">
              WHY DOES A BAG TAKE 20 HOURS?
            </h2>
            <p className="text-stone-600 font-serif italic text-lg leading-relaxed">
              Industrial machinery can churn out a nylon shoulder bag in 90 seconds. We choose not to participate in that race.
            </p>
            <p className="text-xs text-stone-500 font-sans leading-relaxed tracking-wider">
              Crochet cannot be automated by any machine on earth. Unlike knitting, which industrial looms have reproduced, the hook’s three-dimensional multidirectional knotting requires spatial human perception. When you hold a SELENE bag, you hold 20 dedicated hours of someone's conscious life.
            </p>
            <div className="pt-4">
              <Link
                to="/shop/bags"
                className="inline-flex items-center gap-2 text-xs-caps tracking-[0.25em] text-noir link-underline py-1"
              >
                <span>View The Bags Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SectionReveal>
        </div>

        {/* Story Part 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <SectionReveal className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block">
              Chapter II · The Silhouette
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-noir tracking-tight uppercase leading-snug">
              FREEDOM THROUGH RESTRAINT.
            </h2>
            <p className="text-stone-600 font-serif italic text-lg leading-relaxed">
              Our garments celebrate the wearer's authentic silhouette rather than forcing rigid synthetic tailoring.
            </p>
            <p className="text-xs text-stone-500 font-sans leading-relaxed tracking-wider">
              From our breezy open-work halters to our dense architectural cardigans, we sculpt negative space as deliberately as the fiber itself. Sunlight filters through the geometric voids, producing dynamic patterns of shadow on bare skin.
            </p>
            <div className="pt-4">
              <Link
                to="/shop/tops"
                className="inline-flex items-center gap-2 text-xs-caps tracking-[0.25em] text-noir link-underline py-1"
              >
                <span>View Couture Tops</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SectionReveal>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ImageReveal
              src="/shop-tops.jpg"
              alt="Detail of open-gauge crochet top in natural light"
              aspectRatio="aspect-[4/3] md:aspect-[16/11]"
            />
          </div>
        </div>
      </section>

      {/* Founder & Atelier Consultation Banner */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-12">
        <div className="bg-[#121110] text-[#faf8f5] p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-sans">
              Bespoke Atelier Commission
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-white uppercase tracking-wide">
              Have an idea for a custom piece?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-serif italic">
              We welcome custom orders, individual sizing adjustments, and bespoke bridal or runway pieces.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-[#faf8f5] text-noir text-xs-caps tracking-[0.28em] hover:bg-white transition-colors whitespace-nowrap"
          >
            Consult With The Atelier
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
