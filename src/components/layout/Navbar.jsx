import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import { useAccount } from '../../context/AccountContext';

const ANNOUNCEMENTS = [
  "COMPLIMENTARY ARCHIVAL BOX & INSURED SHIPPING ON ALL COMMISSIONS",
  "HAND-CROCHETED IN THE ATELIER · 18–28 HOURS OF DEVOTED ARTISANAL KNOTTING",
  "PRIVATE ATELIER CONSULTATIONS & BESPOKE COMMISSIONS AVAILABLE"
];

export default function Navbar({ onOpenMobileMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const location = useLocation();
  const { itemsCount, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useSearch();
  const { isLoggedIn, account } = useAccount();

  const isHome = location.pathname === '/';

  // Rotate announcement ticker every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar appearance:
  const isLightText = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isLightText
          ? 'bg-transparent text-white border-b border-white/10'
          : 'bg-[#faf8f5]/95 backdrop-blur-md text-[#161514] border-b border-[#161514]/8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
      }`}
    >
      {/* Gucci-Style Top Announcement Ticker Bar */}
      <div
        className={`w-full py-1.5 px-4 text-center text-[9px] md:text-[10px] tracking-[0.28em] uppercase transition-colors duration-500 overflow-hidden font-sans border-b ${
          isLightText
            ? 'bg-black/35 text-white/90 border-white/10'
            : 'bg-[#121110] text-[#faf8f5] border-white/5'
        }`}
      >
        <div className="max-w-[1720px] mx-auto flex items-center justify-center h-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={tickerIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="truncate"
            >
              {ANNOUNCEMENTS[tickerIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 h-18 md:h-20 flex items-center justify-between">
        {/* Brand / Logo on Left */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="group flex flex-col items-start tracking-[0.32em] font-serif transition-opacity duration-300 hover:opacity-75"
            aria-label="SELENE — Home"
          >
            <span className="text-xl md:text-2xl font-light tracking-[0.35em] uppercase">SELENE</span>
            <span className={`text-[8px] tracking-[0.4em] uppercase transition-colors duration-500 font-sans ${
              isLightText ? 'text-white/60' : 'text-[#161514]/50'
            }`}>
              HAUTE CROCHET
            </span>
          </Link>
        </div>

        {/* Desktop Centered Navigation (Gucci Style) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 tracking-[0.24em] text-[11px] uppercase font-medium">
          <Link
            to="/shop"
            className={`link-underline transition-colors duration-300 py-1 ${
              location.pathname === '/shop'
                ? isLightText ? 'text-white border-b border-white' : 'text-noir border-b border-noir'
                : isLightText ? 'text-white/80 hover:text-white' : 'text-[#161514]/75 hover:text-noir'
            }`}
          >
            Collections
          </Link>
          <Link
            to="/shop/bags"
            className={`link-underline transition-colors duration-300 py-1 ${
              location.pathname === '/shop/bags'
                ? isLightText ? 'text-white border-b border-white' : 'text-noir border-b border-noir'
                : isLightText ? 'text-white/80 hover:text-white' : 'text-[#161514]/75 hover:text-noir'
            }`}
          >
            Handbags
          </Link>
          <Link
            to="/shop/tops"
            className={`link-underline transition-colors duration-300 py-1 ${
              location.pathname === '/shop/tops'
                ? isLightText ? 'text-white border-b border-white' : 'text-noir border-b border-noir'
                : isLightText ? 'text-white/80 hover:text-white' : 'text-[#161514]/75 hover:text-noir'
            }`}
          >
            Ready-To-Wear
          </Link>
          <Link
            to="/lookbook"
            className={`link-underline transition-colors duration-300 py-1 ${
              location.pathname === '/lookbook'
                ? isLightText ? 'text-white border-b border-white' : 'text-noir border-b border-noir'
                : isLightText ? 'text-white/80 hover:text-white' : 'text-[#161514]/75 hover:text-noir'
            }`}
          >
            Lookbook
          </Link>
          <Link
            to="/about"
            className={`link-underline transition-colors duration-300 py-1 ${
              location.pathname === '/about'
                ? isLightText ? 'text-white border-b border-white' : 'text-noir border-b border-noir'
                : isLightText ? 'text-white/80 hover:text-white' : 'text-[#161514]/75 hover:text-noir'
            }`}
          >
            The Atelier
          </Link>
          <Link
            to="/services"
            className={`link-underline transition-colors duration-300 py-1 ${
              location.pathname === '/services' || location.pathname === '/contact' || location.pathname === '/faqs' || location.pathname === '/orders' || location.pathname === '/account'
                ? isLightText ? 'text-white border-b border-white' : 'text-noir border-b border-noir'
                : isLightText ? 'text-white/80 hover:text-white' : 'text-[#161514]/75 hover:text-noir'
            }`}
          >
            Client Services
          </Link>
        </nav>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-4 md:gap-7">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70 focus:outline-none p-1.5`}
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4 stroke-[1.25]" />
            <span className="hidden xl:inline text-xs-caps">Search</span>
          </button>

          {/* Client Concierge / Account */}
          <Link
            to="/services?tab=orders"
            className={`flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70 p-1.5`}
            aria-label="Client Concierge & Orders"
          >
            <User className="w-4 h-4 stroke-[1.25]" />
            <span className="hidden xl:inline text-xs-caps">
              {isLoggedIn ? (account?.name ? account.name.split(' ')[0] : 'Patron') : 'Concierge'}
            </span>
          </Link>

          {/* Shopping Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70 focus:outline-none p-1.5`}
            aria-label={`Shopping Bag with ${itemsCount} items`}
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.25]" />
            <span className="text-xs-caps">Bag</span>
            <span className={`inline-flex items-center justify-center text-[10px] w-4 h-4 rounded-full font-mono transition-colors ${
              isLightText
                ? 'bg-white text-noir font-bold'
                : 'bg-noir text-[#faf8f5] font-semibold'
            }`}>
              {itemsCount}
            </span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 flex items-center gap-2 tracking-[0.2em] text-[11px] uppercase focus:outline-none hover:opacity-70"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 stroke-[1.25]" />
            <span className="text-2xs font-medium tracking-widest hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
