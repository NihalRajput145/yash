import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Mail, Phone, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#100f0e] text-[#faf8f5] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Atelier Watermark */}
      <div className="absolute right-[-4%] bottom-[10%] text-[18vw] font-serif font-light text-white/[0.015] pointer-events-none select-none uppercase tracking-widest leading-none">
        SELENE
      </div>

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-3xl md:text-4xl font-serif tracking-[0.35em] uppercase font-light">
                SELENE
              </span>
              <span className="block text-[9px] tracking-[0.45em] uppercase text-white/40 mt-1 font-sans">
                Haute Crochet · Limited Atelier Editions
              </span>
            </Link>
            <p className="text-sm text-white/60 font-serif italic text-balance leading-relaxed max-w-md pt-2">
              “Your imagination, our crochet hook. An artisanal design house honoring tactile textures, slow craft, and the kinetic poetry of fiber.”
            </p>
            <div className="pt-2 text-xs text-white/50 space-y-1 font-mono">
              <p>Atelier Inquiries: <a href="mailto:contact@selenefashion.in" className="hover:text-white transition-colors underline underline-offset-4">contact@selenefashion.in</a></p>
              <p>Direct Concierge: <a href="tel:+918796365349" className="hover:text-white transition-colors">+91 8796365349</a></p>
            </div>
          </div>

          {/* Minimalist Newsletter Form */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="max-w-xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2 font-sans">
                The Atelier Gazette
              </p>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">
                Receive private notices of bespoke editions & seasonal drops.
              </h3>

              <form onSubmit={handleSubscribe} className="relative mt-4">
                <div className="flex border-b border-white/20 focus-within:border-white transition-colors py-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for private notices"
                    className="bg-transparent text-sm md:text-base text-white placeholder-white/30 focus:outline-none w-full pr-10 font-sans tracking-wide"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 text-xs-caps text-white/80 hover:text-white transition-colors whitespace-nowrap pl-4"
                    aria-label="Subscribe to newsletter"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5 font-serif italic">
                    <Check className="w-3.5 h-3.5" /> Welcome to the SELENE Registry.
                  </p>
                )}
              </form>
              <p className="text-[10px] text-white/40 mt-3 tracking-wider font-sans">
                Zero spam. You may withdraw authorization at any moment.
              </p>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 text-xs text-white/60 tracking-wider">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-white">
              Collections
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All (21 Objects)</Link></li>
              <li><Link to="/shop/bags" className="hover:text-white transition-colors">Sculptural Bags</Link></li>
              <li><Link to="/shop/tops" className="hover:text-white transition-colors">Couture Tops</Link></li>
              <li><Link to="/lookbook" className="hover:text-white transition-colors">Editorial Lookbook</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-white">
              The Atelier
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li><Link to="/about" className="hover:text-white transition-colors">Artisanal Philosophy</Link></li>
              <li><Link to="/about#process" className="hover:text-white transition-colors">Technique & Knotting</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Bespoke Commissions</Link></li>
              <li><Link to="/about#materials" className="hover:text-white transition-colors">Conscious Fibers</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-white">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li><Link to="/services?tab=orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/services?tab=faqs" className="hover:text-white transition-colors">Client FAQs</Link></li>
              <li><Link to="/services?tab=faqs" className="hover:text-white transition-colors">Textile Preservation & Care</Link></li>
              <li><Link to="/services?tab=concierge" className="hover:text-white transition-colors">Consult an Artisan</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-white">
              Connect
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <a
                  href="https://www.instagram.com/theselene.fashion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram @theselene.fashion</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@selenefashion.in"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>contact@selenefashion.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918796365349"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 8796365349</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/40 tracking-[0.2em] uppercase font-sans">
          <p>© {new Date().getFullYear()} SELENE FASHION. ALL RIGHTS RESERVED.</p>
          <p className="font-serif italic normal-case tracking-normal text-xs text-white/60">
            Handcrafted with devotion in limited edition batches.
          </p>
          <div className="flex items-center gap-6">
            <span>Currency: INR (₹)</span>
            <Link to="/faqs" className="hover:text-white transition-colors">Legal & Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
