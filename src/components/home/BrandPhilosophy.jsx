import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionReveal from '../common/SectionReveal';

export default function BrandPhilosophy() {
  return (
    <section className="py-32 md:py-48 lg:py-60 bg-[#faf8f5] text-noir">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionReveal className="max-w-5xl mx-auto text-center space-y-10 md:space-y-14">
          <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.4em] uppercase text-stone-500 font-sans">
            <span className="w-8 h-px bg-stone-400" />
            <span>The Atelier Manifesto</span>
            <span className="w-8 h-px bg-stone-400" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-noir leading-[1.05] tracking-tight uppercase">
            MADE SLOWLY.<br />
            <span className="font-serif italic font-normal text-stone-700">WORN FREELY.</span>
          </h2>

          <p className="text-base sm:text-xl md:text-2xl text-stone-600 font-serif leading-relaxed max-w-3xl mx-auto font-light">
            SELENE was founded on a simple, uncompromising conviction: that the world has enough mass-produced garments, but hungers for things made with human devotion. Each piece begins with pure cotton filament and transforms through hours of deliberate knotting into wearable fiber sculpture.
          </p>

          <div className="pt-6">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-xs-caps tracking-[0.3em] text-noir py-2 border-b border-noir hover:opacity-60 transition-opacity"
            >
              <span>Discover Our Story & Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
