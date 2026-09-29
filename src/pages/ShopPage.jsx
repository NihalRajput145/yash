import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, Grid2X2, Grid3X3, LayoutGrid } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

const HERO_BANNERS = {
  all: {
    src: "/shop-hero.png",
    label: "Permanent & Seasonal Editions",
    title: "THE ENTIRE CATALOGUE",
    description: "21 handcrafted objects exploring tactile textures, sculptural knots, and the poetry of slow fashion."
  },
  bags: {
    src: "/bags-hero.png",
    label: "Artisanal Vessels",
    title: "HANDCRAFTED BAGS",
    description: "Sculptural forms woven continuously from unbleached and botanical-dyed cotton yarn."
  },
  tops: {
    src: "/tops-hero.png",
    label: "Kinetic Knitwear",
    title: "COUTURE TOPS",
    description: "Open-stitch lace, cardigans, and halters designed for effortless movement and organic drape."
  }
};

export default function ShopPage() {
  const { category: paramCategory } = useParams();
  const [activeCategory, setActiveCategory] = useState(paramCategory || 'all');
  const [sortBy, setSortBy] = useState('curated'); // curated, price-asc, price-desc, hours
  const [columns, setColumns] = useState(3); // 2: editorial, 3: studio grid

  // Sync category if URL params change
  useEffect(() => {
    if (paramCategory && ['bags', 'tops', 'all'].includes(paramCategory)) {
      setActiveCategory(paramCategory);
    } else if (!paramCategory) {
      setActiveCategory('all');
    }
  }, [paramCategory]);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'hours') {
      sorted.sort((a, b) => parseInt(b.craftHours) - parseInt(a.craftHours));
    }
    return sorted;
  }, [activeCategory, sortBy]);

  const banner = HERO_BANNERS[activeCategory] || HERO_BANNERS.all;

  return (
    <PageTransition className="pt-24 md:pt-28 pb-32 bg-[#faf8f5]">
      {/* Editorial Page Header & Campaign Banner */}
      <section className="relative w-full max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-16">
        <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden bg-noir">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={banner.src}
                alt={banner.title}
                className="w-full h-full object-cover object-center brightness-[0.82]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/30 to-noir/20" />
            </motion.div>
          </AnimatePresence>

          {/* Banner Overlay Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-14 text-[#faf8f5] max-w-3xl">
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/70 font-sans block mb-2">
              {banner.label}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight uppercase">
              {banner.title}
            </h1>
            <p className="text-xs md:text-sm text-white/80 font-serif italic mt-3 max-w-xl leading-relaxed">
              {banner.description}
            </p>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="mt-12 pb-6 border-b border-[#161514]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs-caps tracking-[0.24em] transition-all whitespace-nowrap rounded-none ${
                    isActive
                      ? 'bg-noir text-[#faf8f5] font-semibold'
                      : 'bg-transparent text-stone-600 hover:text-noir hover:bg-stone-200/50'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-2 font-mono text-[10px] ${isActive ? 'text-white/60' : 'text-stone-400'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Controls & Item Counter */}
          <div className="flex items-center justify-between md:justify-end gap-6 text-xs text-stone-600">
            <span className="text-[11px] tracking-wider uppercase font-sans">
              Showing <strong className="text-noir">{filteredProducts.length}</strong> objects
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-noir font-medium tracking-wider uppercase focus:outline-none cursor-pointer py-1 border-b border-stone-300"
                  aria-label="Sort pieces"
                >
                  <option value="curated">Curated Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="hours">Craft Hours: Longest</option>
                </select>
              </div>

              {/* View Layout Switcher (Gucci style: 2-col editorial vs 3-col studio) */}
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-stone-300">
                <button
                  onClick={() => setColumns(2)}
                  className={`p-1.5 transition-colors ${columns === 2 ? 'text-noir bg-stone-200/70' : 'text-stone-400 hover:text-noir'}`}
                  title="Editorial 2-Column View"
                  aria-label="Editorial 2-Column View"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setColumns(3)}
                  className={`p-1.5 transition-colors ${columns === 3 ? 'text-noir bg-stone-200/70' : 'text-stone-400 hover:text-noir'}`}
                  title="Studio 3-Column View"
                  aria-label="Studio 3-Column View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid (Editorial 2-column or 3-column with asymmetric cadence) */}
        <motion.div
          layout
          className={`grid ${
            columns === 2
              ? 'grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16'
          } pt-12`}
        >
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <ProductCard
                  product={product}
                  priority={idx < 6}
                  showSecondaryOnHover={true}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Minimal Footer Note */}
        <div className="mt-28 pt-12 border-t border-[#161514]/10 text-center">
          <p className="font-serif italic text-stone-600 text-lg">
            Every object is packed by hand in our signature archival linen box with an individualized atelier certificate.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
