import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    itemsCount,
    subtotal,
    formattedSubtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping
  } = useCart();

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#faf8f5] text-[#161514] shadow-2xl flex flex-col justify-between border-l border-[#161514]/10"
            aria-label="Shopping bag drawer"
          >
            {/* Drawer Header */}
            <div className="p-6 md:p-8 border-b border-[#161514]/8 flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-sans block">
                  Artisanal Bag
                </span>
                <h2 className="text-xl font-serif font-light tracking-wide uppercase mt-0.5">
                  Your Selection ({itemsCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-500 hover:text-noir transition-colors focus:outline-none"
                aria-label="Close shopping bag"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-[#f2efe9] px-6 py-3 border-b border-[#161514]/5 text-xs text-stone-700">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-medium tracking-wide">Complimentary Insured Courier Applied</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-1 text-[11px] tracking-wider text-stone-600">
                    <span>Complimentary Express Delivery</span>
                    <span>Add ₹{freeShippingRemaining.toLocaleString('en-IN')} more</span>
                  </div>
                  <div className="w-full bg-stone-300 h-1 overflow-hidden">
                    <div
                      className="bg-noir h-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 divide-y divide-[#161514]/5">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="text-xs-caps text-stone-400">Atelier Archives</p>
                  <h3 className="text-2xl font-serif font-light text-stone-700">
                    Your bag is currently empty.
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Explore our handmade collection of sculptural bags and open-stitch tops.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block mt-4 px-6 py-3 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors"
                  >
                    Explore Pieces
                  </Link>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.key} className="pt-6 first:pt-0 flex gap-4">
                    {/* Item Image */}
                    <Link
                      to={`/product/${item.category}/${item.index}`}
                      onClick={() => setIsCartOpen(false)}
                      className="w-20 h-24 bg-stone-100 flex-shrink-0 overflow-hidden group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            to={`/product/${item.category}/${item.index}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-base tracking-wide hover:underline line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            className="text-stone-400 hover:text-red-800 transition-colors p-1"
                            title="Remove object"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 tracking-wider uppercase font-sans">
                          {item.size || "One Size"} · {item.category}
                        </p>
                        <p className="text-xs font-mono font-medium text-stone-800 mt-1">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#161514]/5">
                        <div className="flex items-center border border-[#161514]/20 text-xs">
                          <button
                            onClick={() => updateQuantity(item.key, -1)}
                            className="p-1 px-2 hover:bg-stone-200 transition-colors text-stone-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-mono text-xs">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.key, 1)}
                            className="p-1 px-2 hover:bg-stone-200 transition-colors text-stone-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-mono font-semibold">
                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Bottom / Subtotal & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-[#f4f1e9] border-t border-[#161514]/10 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Artisanal Subtotal</span>
                    <span className="font-mono text-stone-900 font-medium">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Atelier Packaging</span>
                    <span className="font-serif italic text-stone-800">Complimentary Archival Box</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Courier Service</span>
                    <span>{isFreeShipping ? 'Free Express' : '₹150 Domestic'}</span>
                  </div>
                  <div className="pt-2 border-t border-[#161514]/10 flex justify-between items-baseline text-sm font-medium">
                    <span className="uppercase tracking-[0.2em] font-sans text-xs">Total</span>
                    <span className="font-mono text-base font-semibold text-noir">
                      ₹{(subtotal + (isFreeShipping ? 0 : 150)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.28em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-center text-stone-500 tracking-wider">
                  Handmade with patience · Delivered in recyclable linen wrapping
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
