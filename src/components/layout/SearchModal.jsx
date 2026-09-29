import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

const QUICK_TAGS = ['Bags', 'Tops', 'Bow', 'Ivory', 'Midnight', 'Pearl', 'Halter', 'Cardigan'];

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, query, setQuery, searchResults, clearSearch } = useSearch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#0e0e0d]/90 backdrop-blur-md text-[#faf8f5] flex flex-col justify-start overflow-y-auto px-6 py-8 md:px-16 md:py-14"
        >
          {/* Header row */}
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-8 border-b border-white/10">
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-sans">
              Artisanal Catalog Search
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="flex items-center gap-2 text-xs-caps text-white/70 hover:text-white transition-colors"
              aria-label="Close search overlay"
            >
              <span>Close</span>
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="max-w-5xl mx-auto w-full pt-10">
            <div className="relative border-b-2 border-white/20 focus-within:border-white transition-colors pb-4 flex items-center gap-4">
              <Search className="w-6 h-6 text-white/40 stroke-[1.2]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bags, cardigans, textures, colors..."
                className="w-full bg-transparent text-xl md:text-3xl font-serif font-light text-white placeholder-white/30 focus:outline-none tracking-wide"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="text-xs text-white/50 hover:text-white uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggestions / Filter Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <span className="text-[11px] text-white/40 tracking-wider mr-2 uppercase">Keywords:</span>
              {QUICK_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-xs tracking-wider text-white/80 rounded-none transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="max-w-5xl mx-auto w-full py-12">
            {query.trim() === '' ? (
              <div className="text-center py-16 text-white/40">
                <p className="font-serif italic text-lg text-white/60">
                  Begin typing to explore our hand-crocheted archive.
                </p>
                <p className="text-xs uppercase tracking-[0.25em] mt-2">
                  21 Distinct Haute Silhouettes
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-16 text-white/40">
                <p className="font-serif italic text-xl text-white/70">
                  No handcrafted pieces matching "{query}"
                </p>
                <p className="text-xs uppercase tracking-[0.25em] mt-2">
                  Try exploring "bag", "top", or "ivory"
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-8">
                  {searchResults.length} {searchResults.length === 1 ? 'Piece' : 'Pieces'} Discovered
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.category}/${product.index}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex gap-4 p-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                      <div className="w-20 h-24 bg-stone-900 flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 block">
                            {product.category}
                          </span>
                          <h4 className="font-serif text-lg text-white group-hover:underline mt-0.5">
                            {product.name}
                          </h4>
                          <p className="text-xs text-white/60 line-clamp-1 mt-1 font-sans">
                            {product.tagline}
                          </p>
                        </div>
                        <span className="font-mono text-sm text-gold-subtle font-medium">
                          {product.formattedPrice}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
