import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({
  product,
  priority = false,
  showSecondaryOnHover = true,
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes ? product.sizes[0] : "One Size", 1);
  };

  return (
    <article
      className={`group relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Luxury Zoom & Reveal */}
      <Link
        to={`/product/${product.category}/${product.index}`}
        className="relative aspect-[3/4] bg-[#f0ece1] overflow-hidden block"
        aria-label={`View ${product.name}`}
      >
        {/* Primary Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered && showSecondaryOnHover ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
          }`}
        />

        {/* Optional Secondary Lifestyle / Detail Image on Hover */}
        {showSecondaryOnHover && product.editorialImage && product.editorialImage !== product.image && (
          <img
            src={product.editorialImage}
            alt={`${product.name} lifestyle`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out pointer-events-none ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Subtle Luxury Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="text-[9px] uppercase tracking-[0.25em] bg-noir/80 text-[#faf8f5] px-2 py-0.5 backdrop-blur-sm font-sans font-medium">
              New Drop
            </span>
          )}
          {product.featured && (
            <span className="text-[9px] uppercase tracking-[0.25em] bg-[#faf8f5]/85 text-noir px-2 py-0.5 backdrop-blur-sm font-sans font-medium">
              Atelier Pick
            </span>
          )}
        </div>

        {/* Hover Quick Action Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-2 bg-gradient-to-t from-noir/80 via-noir/40 to-transparent ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#faf8f5] text-noir text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Plus className="w-3 h-3 stroke-[2]" />
            <span>Quick Bag</span>
          </button>
        </div>
      </Link>

      {/* Minimal Product Information */}
      <div className="pt-4 pb-2 flex flex-col justify-between">
        <div className="flex items-baseline justify-between gap-3">
          <Link
            to={`/product/${product.category}/${product.index}`}
            className="font-serif text-lg md:text-xl font-normal text-noir tracking-wide hover:underline line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="font-mono text-xs md:text-sm text-stone-900 font-medium whitespace-nowrap">
            {product.formattedPrice}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1 text-[11px] text-stone-500 tracking-wider">
          <span className="uppercase font-sans">{product.category}</span>
          <span className="font-sans italic text-stone-400 text-[10px]">
            {product.craftHours.split(' ')[0]}h craft
          </span>
        </div>
      </div>
    </article>
  );
}
