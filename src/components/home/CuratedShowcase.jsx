import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import SectionReveal from '../common/SectionReveal';

export default function CuratedShowcase() {
  // Select 4 iconic pieces for the 2-column editorial showcase
  const featuredPieces = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-24 md:py-36 bg-[#f7f5ef] border-y border-[#161514]/5">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block mb-2">
              Atelier Selection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-noir tracking-tight uppercase">
              THE PERMANENT EDIT.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-stone-500 font-sans max-w-xs hidden lg:block tracking-wider">
              Selected handcrafted works defining the tactile identity of SELENE.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs-caps tracking-[0.25em] text-noir hover:opacity-70 transition-opacity link-underline py-1"
            >
              <span>View All 21 Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </SectionReveal>

        {/* 2-Column Editorial Grid on Desktop / 1-Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24 pt-16 md:pt-20">
          {featuredPieces.map((product, idx) => (
            <SectionReveal
              key={product.id}
              delay={idx % 2 === 0 ? 0 : 0.15}
              className={`${idx % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              <ProductCard
                product={product}
                priority={idx < 2}
                showSecondaryOnHover={true}
              />
            </SectionReveal>
          ))}
        </div>

        {/* Bottom Editorial Quote */}
        <SectionReveal className="mt-20 md:mt-32 pt-12 border-t border-[#161514]/10 text-center">
          <p className="font-serif italic text-xl md:text-2xl text-stone-700 max-w-2xl mx-auto">
            “Each stitch represents a moment of conscious human focus. No machines, no shortcuts.”
          </p>
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans block mt-3">
            SELENE Atelier Philosophy
          </span>
        </SectionReveal>
      </div>
    </section>
  );
}
