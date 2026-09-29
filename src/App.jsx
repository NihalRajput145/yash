import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { CartProvider, useCart } from './context/CartContext';
import { AccountProvider } from './context/AccountContext';
import { SearchProvider } from './context/SearchContext';

import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import SearchModal from './components/layout/SearchModal';
import ScrollToTop from './components/layout/ScrollToTop';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LookbookPage from './pages/LookbookPage';
import AboutPage from './pages/AboutPage';
import ClientServicesPage from './pages/ClientServicesPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toastMessage } = useCart();

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-noir selection:text-white">
      <ScrollToTop />

      {/* Global Navigation */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Search Overlay */}
      <SearchModal />

      {/* Shopping Bag Slide-out Drawer */}
      <CartDrawer />

      {/* Subtle Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-noir text-[#faf8f5] px-6 py-3 text-xs tracking-wider font-sans border border-white/10 shadow-2xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}
      </AnimatePresence>

      {/* Main Routed Content with Animated Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/product/:category/:id" element={<ProductDetailPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/lookbook" element={<LookbookPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ClientServicesPage defaultTab="concierge" />} />
            <Route path="/contact" element={<ClientServicesPage defaultTab="concierge" />} />
            <Route path="/faqs" element={<ClientServicesPage defaultTab="faqs" />} />
            <Route path="/orders" element={<ClientServicesPage defaultTab="orders" />} />
            <Route path="/account" element={<ClientServicesPage defaultTab="account" />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Luxury Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AccountProvider>
      <CartProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </CartProvider>
    </AccountProvider>
  );
}
