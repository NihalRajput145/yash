import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Check,
  Shield,
  Truck,
  Sparkles,
  ArrowLeft,
  Share2,
  Heart
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/shop/ProductCard';
import PageTransition from '../components/common/PageTransition';

export default function ProductDetailPage() {
  const { category, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Support both /product/:category/:id and /product/:id or query params
  const product = useMemo(() => {
    const cat = category || searchParams.get('category');
    const idx = id !== undefined ? Number(id) : Number(searchParams.get('id'));

    if (cat && !isNaN(idx)) {
      const match = PRODUCTS.find(p => p.category === cat && p.index === idx);
      if (match) return match;
    }

    if (id) {
      // Check if id matches product.id or slug or index
      return PRODUCTS.find(p => p.id === id || p.slug === id || String(p.index) === id) || PRODUCTS[0];
    }

    return PRODUCTS[0];
  }, [category, id, searchParams]);

  // Gallery state
  const images = useMemo(() => {
    if (!product) return [];
    const list = [product.image];
    if (product.editorialImage && product.editorialImage !== product.image) {
      list.push(product.editorialImage);
    }
    return list;
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(() => (product?.sizes ? product.sizes[0] : "One Size"));
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('details'); // details, composition, care, shipping

  if (!product) {
    return (
      <PageTransition className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-serif">Object not found in archive.</h2>
        <Link to="/shop" className="mt-4 inline-block text-xs-caps tracking-[0.25em] underline">
          Return to Collection
        </Link>
      </PageTransition>
    );
  }

  const handleAdd = () => {
    addToCart(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(prev => prev === section ? null : section);
  };

  // Curate related products from same category or complement
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <PageTransition className="pt-24 md:pt-32 pb-32 bg-[#faf8f5]">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Back Link & Breadcrumb */}
        <div className="pb-8 flex items-center justify-between text-xs tracking-wider text-stone-500 uppercase font-sans">
          <Link
            to={product.category === 'bags' ? '/shop/bags' : '/shop/tops'}
            className="flex items-center gap-2 hover:text-noir transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {product.category === 'bags' ? 'Handcrafted Bags' : 'Couture Tops'}</span>
          </Link>
          <span className="text-[10px] tracking-[0.3em] text-stone-400">
            Object Ref: {product.id}
          </span>
        </div>

        {/* Main Product Layout (Gallery on left, Sticky info on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary High-Resolution Display */}
            <div className="relative aspect-[3/4] bg-[#f0ece1] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={images[activeImageIndex] || product.image}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Craftsmanship Stamp Badge */}
              <div className="absolute top-6 left-6 bg-noir/80 text-[#faf8f5] px-3.5 py-1 text-[9px] uppercase tracking-[0.3em] backdrop-blur-sm font-sans font-medium">
                {product.craftHours}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-4 pt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 bg-stone-200 overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'ring-2 ring-noir opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Product Information */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            {/* Header info */}
            <div className="space-y-2 border-b border-[#161514]/10 pb-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block">
                {product.category} · Atelier Edition
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-noir tracking-tight uppercase leading-[1.08]">
                {product.name}
              </h1>
              <div className="pt-2 flex items-baseline justify-between">
                <span className="font-mono text-xl sm:text-2xl text-stone-900 font-medium">
                  {product.formattedPrice}
                </span>
                <span className="text-[11px] text-stone-500 tracking-wider">
                  Taxes & Archival Packaging Included
                </span>
              </div>
            </div>

            {/* Poetic description */}
            <p className="text-sm sm:text-base text-stone-700 font-serif italic leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs tracking-wider uppercase font-sans">
                  <span className="text-stone-600 font-medium">Select Size / Fit</span>
                  <span className="text-[10px] text-stone-400">Complimentary Custom Adjustments</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2.5 text-xs-caps tracking-[0.2em] transition-all rounded-none ${
                          isSelected
                            ? 'bg-noir text-[#faf8f5] font-semibold ring-1 ring-noir'
                            : 'bg-transparent border border-stone-300 text-stone-700 hover:border-noir'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to Bag CTA */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.28em] hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Selection</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <Link
                to="/services?tab=concierge"
                className="w-full py-3 border border-stone-300 hover:border-noir text-stone-700 hover:text-noir text-xs-caps tracking-[0.22em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Custom Fit / Atelier Consultation</span>
              </Link>

              <div className="flex items-center justify-between text-[10px] tracking-wider text-stone-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-stone-600" />
                  Made by hand in limited batches
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  Insured Express Delivery
                </span>
              </div>
            </div>

            {/* Luxury Accordions */}
            <div className="border-t border-[#161514]/10 divide-y divide-[#161514]/10 text-xs pt-2">
              {/* Accordion 1: Details & Key Elements */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-4 flex items-center justify-between text-left font-sans uppercase tracking-[0.2em] font-medium text-stone-800 hover:text-noir"
                >
                  <span>Atelier Specifications</span>
                  {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-5 space-y-2 text-stone-600 leading-relaxed font-sans">
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {product.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-stone-500 pt-1 font-mono">
                      Dimensions: {product.dimensions}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Materials & Yarn Composition */}
              <div>
                <button
                  onClick={() => toggleAccordion('composition')}
                  className="w-full py-4 flex items-center justify-between text-left font-sans uppercase tracking-[0.2em] font-medium text-stone-800 hover:text-noir"
                >
                  <span>Composition & Provenance</span>
                  {openAccordion === 'composition' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'composition' && (
                  <div className="pb-5 space-y-2 text-stone-600 leading-relaxed font-sans">
                    <p>{product.composition}</p>
                    <p className="text-[11px] text-stone-500 font-serif italic">
                      Zero synthetic polyfillers. Botanical dyes and non-toxic mordants selected for low ecological imprint.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Artisanal Care */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-4 flex items-center justify-between text-left font-sans uppercase tracking-[0.2em] font-medium text-stone-800 hover:text-noir"
                >
                  <span>Preservation & Care</span>
                  {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-5 text-stone-600 leading-relaxed font-sans">
                    <p>{product.care}</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Complimentary Delivery & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-left font-sans uppercase tracking-[0.2em] font-medium text-stone-800 hover:text-noir"
                >
                  <span>Delivery & Concierge</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-5 space-y-2 text-stone-600 leading-relaxed font-sans text-xs">
                    <p>
                      Each order is wrapped in bespoke tissue and housed in our archival linen-covered box with a signed certificate of authenticity.
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Domestic courier dispatch within 48 hours. Worldwide insured transit available upon request.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Atelier Consultation Note */}
            <div className="p-4 bg-[#f2efe9] text-xs text-stone-700 space-y-1">
              <p className="font-serif italic font-medium">Have a bespoke request?</p>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Our atelier can customize dimensions or yarn colorways. Contact us at{' '}
                <a href="mailto:contact@selenefashion.in" className="underline hover:text-noir">
                  contact@selenefashion.in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Related Creations Section */}
        <div className="mt-32 pt-20 border-t border-[#161514]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block mb-1">
                Atelier Recommendations
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-light text-noir tracking-tight uppercase">
                COMPLETE THE LOOK
              </h3>
            </div>
            <Link
              to="/shop"
              className="text-xs-caps tracking-[0.24em] text-stone-600 hover:text-noir link-underline py-1"
            >
              Explore Full Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {relatedProducts.map(piece => (
              <ProductCard key={piece.id} product={piece} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
