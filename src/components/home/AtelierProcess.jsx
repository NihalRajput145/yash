import React from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../common/SectionReveal';
import { BRAND_VALUES } from '../../data/products';

export default function AtelierProcess() {
  return (
    <section className="py-24 md:py-36 bg-[#f4f1e9] border-t border-[#161514]/10 text-noir">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block mb-2">
              Artisanal Standards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-noir tracking-tight uppercase">
              THE ANATOMY OF CRAFT.
            </h2>
          </div>
          <p className="text-xs text-stone-500 font-sans max-w-sm tracking-wider">
            Reinterpreting ancient domestic crochet into modern architectural silhouettes.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-16">
          {BRAND_VALUES.map((val, idx) => (
            <SectionReveal
              key={val.number}
              delay={idx * 0.1}
              className="space-y-4 pr-4 border-l border-[#161514]/10 pl-6"
            >
              <span className="font-mono text-xs text-stone-400 font-light block">
                /{val.number}
              </span>
              <h3 className="font-serif text-2xl font-normal text-noir tracking-wide">
                {val.title}
              </h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed tracking-wider">
                {val.description}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
