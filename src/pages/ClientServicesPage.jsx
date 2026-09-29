import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  Instagram,
  Check,
  ArrowRight,
  Package,
  HelpCircle,
  User,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  LogOut
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import { useAccount } from '../context/AccountContext';

const TABS = [
  { id: 'concierge', label: 'Concierge & Commissions', icon: Mail },
  { id: 'faqs', label: 'Client Care & FAQs', icon: HelpCircle },
  { id: 'orders', label: 'Order Tracking', icon: Package },
  { id: 'account', label: 'Patron Registry', icon: User }
];

const STAGES = [
  { label: "Commission Confirmed", desc: "Specifications queued in atelier" },
  { label: "Handcrafting in Progress", desc: "18–28 hours of needle knotting" },
  { label: "Archival Inspection", desc: "Tension check & wax seal affixed" },
  { label: "Express Dispatch", desc: "Insured courier transit" }
];

const FAQ_SECTIONS = [
  {
    category: "Ordering & Storefront Experience",
    items: [
      {
        q: "How do I place an order for a SELENE creation?",
        a: "Select your desired piece from our catalogue, choose your sizing preference, and add it to your shopping bag. You can then proceed through our luxury checkout. This interactive atelier storefront stores your commission in your private browser memory for real-time tracking."
      },
      {
        q: "Are financial transactions or card payments required in this preview?",
        a: "No. This digital boutique is an artisanal interactive showcase demonstrating our 21-piece catalog, aesthetic curation, and order tracking. No real payment is deducted, and sensitive financial credentials are never requested."
      },
      {
        q: "How do I track an order after checkout?",
        a: "Navigate to the Order Tracking tab in this Client Services suite. You will see real-time simulated atelier production stages from yarn knotting to archival linen boxing."
      }
    ]
  },
  {
    category: "Craft, Materials & Custom Sizing",
    items: [
      {
        q: "Are SELENE pieces genuinely crocheted by hand?",
        a: "Yes. Every single bag and top is crocheted stitch-by-stitch by hand using ergonomic wooden hooks and continuous botanical-dyed yarn. Mechanical crochet does not exist in industrial textile production; each knot is a tangible human creation."
      },
      {
        q: "Can I commission custom measurements or special hues?",
        a: "Our atelier welcomes made-to-measure commissions. You can send your bespoke measurements using the Concierge form in this suite or email contact@selenefashion.in directly."
      },
      {
        q: "What fibers do you utilize in your creations?",
        a: "We work strictly with GOTS-certified combed cotton, unbleached flax linen, and organic botanical dyes. We deliberately refuse synthetic polyester and acrylic yarns."
      }
    ]
  },
  {
    category: "Archival Care & Textile Preservation",
    items: [
      {
        q: "How should I wash and care for my crochet pieces?",
        a: "We recommend gentle spot cleaning or hand washing in cold water with an organic silk detergent. Never wring or twist. Always press excess water gently between clean towels and dry completely flat."
      },
      {
        q: "How should I store my sculptural bag when not in use?",
        a: "Store your bag resting upright inside the provided archival linen dust bag, lightly stuffed with acid-free tissue paper to maintain its natural curve and handle arch."
      }
    ]
  },
  {
    category: "White-Glove Packaging & Delivery",
    items: [
      {
        q: "How are SELENE orders packaged?",
        a: "Every piece arrives housed within our bespoke signature rigid linen box, wrapped in delicate tissue paper, sealed with an embossed wax emblem, and accompanied by a signed atelier certification card."
      },
      {
        q: "What is your standard fulfillment timeline?",
        a: "Because each piece is crafted slowly, in-stock studio pieces dispatch within 48 hours via express courier. Custom commissions require 10–14 days of dedicated artisan handcrafting."
      }
    ]
  }
];

export default function ClientServicesPage({ defaultTab = 'concierge' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(() => {
    if (queryTab && TABS.some(t => t.id === queryTab)) return queryTab;
    return defaultTab;
  });

  // Sync tab if defaultTab or query changes
  useEffect(() => {
    if (queryTab && TABS.some(t => t.id === queryTab)) {
      setActiveTab(queryTab);
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, queryTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Concierge Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bespoke Commission',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // FAQs State
  const [openFaqs, setOpenFaqs] = useState({ "0-0": true, "1-0": true });
  const toggleFaq = (key) => {
    setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Account State
  const { account, isLoggedIn, login, logout, orders } = useAccount();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [authMessage, setAuthMessage] = useState(null);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    if (authMode === 'register' && !loginName.trim()) {
      setAuthMessage({ type: 'error', text: 'Please provide your full name.' });
      return;
    }
    login(loginEmail.trim().toLowerCase(), loginName.trim() || 'Client Privilégié');
    setAuthMessage({ type: 'success', text: 'Welcome to your private client portal.' });
  };

  return (
    <PageTransition className="pt-24 md:pt-32 pb-32 bg-[#faf8f5] text-noir">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-8">

        {/* Gucci-Style Editorial Header */}
        <SectionReveal className="max-w-4xl mb-12 md:mb-16 space-y-4">
          <div className="flex items-center gap-2 text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
            <span className="text-[10px] uppercase tracking-[0.35em] font-sans">
              The Atelier Private Suite
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-noir tracking-tight uppercase leading-[1.02]">
            CLIENT SERVICES &<br />
            <span className="italic font-normal">CONCIERGE.</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-serif italic max-w-2xl leading-relaxed">
            Personal assistance, bespoke commissions, order tracking, and archival garment care—curated into a single dedicated maison suite.
          </p>
        </SectionReveal>

        {/* Luxury Tab Navigation Bar */}
        <div className="border-b border-[#161514]/15 mb-14 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 md:gap-8 min-w-max pb-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2.5 py-4 px-3 md:px-5 text-xs uppercase tracking-[0.24em] font-sans transition-all relative ${
                    isActive
                      ? 'text-noir font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 stroke-[1.5] ${isActive ? 'text-noir' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                  {tab.id === 'orders' && orders.length > 0 && (
                    <span className="font-mono text-[10px] bg-stone-200 text-noir px-1.5 py-0.2 rounded-full">
                      {orders.length}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-noir"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Concierge & Bespoke Commissions */}
        {activeTab === 'concierge' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
          >
            {/* Left: Contact Info & Channels */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans block">
                  Direct Assistance
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-noir uppercase">
                  AT YOUR SERVICE.
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-serif italic leading-relaxed">
                  Our private client advisors and master artisans are available to guide your commission, answer sizing queries, or schedule a bespoke consultation.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <a
                  href="mailto:contact@selenefashion.in"
                  className="group flex items-start gap-4 p-5 bg-[#f5f2eb] hover:bg-stone-200/80 transition-colors border border-stone-200/60"
                >
                  <Mail className="w-4 h-4 text-stone-700 mt-1" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 block">
                      Electronic Correspondence
                    </span>
                    <strong className="text-sm font-medium text-noir group-hover:underline block mt-0.5">
                      contact@selenefashion.in
                    </strong>
                    <p className="text-[11px] text-stone-500 mt-1">Written replies dispatched within 24 hours</p>
                  </div>
                </a>

                <a
                  href="tel:+918796365349"
                  className="group flex items-start gap-4 p-5 bg-[#f5f2eb] hover:bg-stone-200/80 transition-colors border border-stone-200/60"
                >
                  <Phone className="w-4 h-4 text-stone-700 mt-1" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 block">
                      Direct Atelier Telephone
                    </span>
                    <strong className="font-mono text-sm font-medium text-noir group-hover:underline block mt-0.5">
                      +91 8796365349
                    </strong>
                    <p className="text-[11px] text-stone-500 mt-1">Monday – Saturday, 10:00 – 19:00 IST</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/theselene.fashion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 bg-[#f5f2eb] hover:bg-stone-200/80 transition-colors border border-stone-200/60"
                >
                  <Instagram className="w-4 h-4 text-stone-700 mt-1" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 block">
                      Visual Archives & Live Inquiries
                    </span>
                    <strong className="text-sm font-medium text-noir group-hover:underline block mt-0.5">
                      @theselene.fashion
                    </strong>
                    <p className="text-[11px] text-stone-500 mt-1">Direct messaging and behind-the-scenes knotting</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Bespoke Inquiry Form */}
            <div className="lg:col-span-7 bg-[#f7f5ef] p-8 md:p-12 border border-[#161514]/10">
              {formSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-noir text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-3xl font-serif font-light text-noir uppercase">
                    Inquiry Entrusted to the Atelier.
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-serif italic max-w-md mx-auto">
                    Thank you, {formData.name || 'valued patron'}. Our master artisan will review your specifications and reply to {formData.email} promptly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 text-xs-caps tracking-[0.25em] text-stone-600 underline hover:text-noir"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-sans block mb-1">
                      Bespoke Inquiry
                    </span>
                    <h2 className="text-2xl font-serif font-light text-noir uppercase tracking-wide">
                      Compose Your Message
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@domain.com"
                        className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                        Telephone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91..."
                        className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                        Subject
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Bespoke Commission">Bespoke Couture Commission</option>
                        <option value="Sizing & Fit Consultation">Sizing & Custom Fit Consultation</option>
                        <option value="Existing Order Status">Existing Order Inquiry</option>
                        <option value="Archival Care & Repair">Archival Care & Repair Request</option>
                        <option value="Editorial & Press Loans">Editorial & Press Loans</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                      Message / Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your desired silhouette, custom measurements, or timeline..."
                      className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.28em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Transmit To Atelier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Client Care & FAQs */}
        {activeTab === 'faqs' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl space-y-14"
          >
            {FAQ_SECTIONS.map((sec, secIdx) => (
              <div key={sec.category} className="space-y-6">
                <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-noir pb-2 border-b border-[#161514]/15">
                  {sec.category}
                </h2>

                <div className="divide-y divide-[#161514]/10">
                  {sec.items.map((item, itemIdx) => {
                    const itemKey = `${secIdx}-${itemIdx}`;
                    const isOpen = !!openFaqs[itemKey];

                    return (
                      <div key={item.q} className="py-5">
                        <button
                          onClick={() => toggleFaq(itemKey)}
                          className="w-full flex items-center justify-between text-left gap-4 font-serif text-xl md:text-2xl font-light text-noir hover:text-stone-600 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span>{item.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 flex-shrink-0 text-stone-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 flex-shrink-0 text-stone-500" />
                          )}
                        </button>

                        {isOpen && (
                          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed tracking-wide pr-6">
                            {item.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-[#161514]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-2xl font-light text-noir">Have a specific question?</h3>
                <p className="text-xs text-stone-500 font-sans mt-1">Our concierge is ready to assist with individual inquiries.</p>
              </div>
              <button
                onClick={() => handleTabChange('concierge')}
                className="px-6 py-3 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors"
              >
                Inquire With Concierge
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Order Tracking & Archival Status */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl space-y-12"
          >
            {orders.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-[#f7f5ef] p-10 border border-[#161514]/10">
                <Package className="w-12 h-12 text-stone-400 mx-auto stroke-[1]" />
                <h2 className="text-2xl font-serif font-light uppercase">No Orders Logged Yet</h2>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">
                  Select pieces from our 21 handcrafted creations and proceed through checkout to generate an interactive atelier order.
                </p>
                <Link
                  to="/shop"
                  className="inline-block mt-4 px-8 py-3.5 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors"
                >
                  Explore The Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-10">
                {orders.map((order, orderIdx) => {
                  const currentStage = order.stage || 2;

                  return (
                    <div
                      key={order.id}
                      className="bg-[#f7f5ef] p-6 md:p-10 border border-[#161514]/10 space-y-8"
                    >
                      {/* Order Card Header */}
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#161514]/10 pb-6">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-semibold tracking-wider text-noir">
                              {order.id}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.25em] bg-[#faf8f5] text-stone-700 px-2.5 py-0.5 border border-[#161514]/10 font-sans">
                              {order.status || 'Handcrafted in Atelier'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1 font-sans">
                            Placed on {order.date} · Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block font-sans">
                            Commission Total
                          </span>
                          <strong className="font-mono text-xl font-medium text-noir">
                            ₹{Number(order.total || 0).toLocaleString('en-IN')}
                          </strong>
                        </div>
                      </div>

                      {/* Production Timeline Progress */}
                      <div className="py-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-sans block mb-6">
                          Atelier Production Progress
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {STAGES.map((stg, sIdx) => {
                            const isComplete = sIdx < currentStage;
                            const isCurrent = sIdx === currentStage - 1;

                            return (
                              <div key={stg.label} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono transition-colors ${
                                      isComplete
                                        ? 'bg-noir text-white'
                                        : isCurrent
                                        ? 'border-2 border-noir text-noir bg-white font-bold'
                                        : 'border border-stone-300 text-stone-400'
                                    }`}
                                  >
                                    {isComplete ? '✓' : `0${sIdx + 1}`}
                                  </div>
                                  <div className={`h-[1px] flex-1 ${isComplete ? 'bg-noir' : 'bg-stone-300'}`} />
                                </div>
                                <div>
                                  <h4 className={`text-xs font-serif ${isCurrent ? 'text-noir font-bold' : 'text-stone-700'}`}>
                                    {stg.label}
                                  </h4>
                                  <p className="text-[10px] text-stone-400 font-sans mt-0.5">
                                    {stg.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Items List */}
                      <div className="pt-4 border-t border-[#161514]/10 space-y-4">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-sans block">
                          Included Objects ({order.items.length})
                        </span>
                        <div className="divide-y divide-[#161514]/5">
                          {order.items.map((item, iIdx) => (
                            <div key={iIdx} className="py-3 flex items-center justify-between text-xs font-sans">
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-14 object-cover border border-stone-200"
                                />
                                <div>
                                  <p className="font-serif text-sm font-medium text-noir">{item.name}</p>
                                  <p className="text-[11px] text-stone-500 font-sans">
                                    Fit: {item.size || 'One Size'} · Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-mono text-stone-900">{item.formattedPrice || `₹${item.price}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 4: Patron Registry & Profile */}
        {activeTab === 'account' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl"
          >
            {isLoggedIn && account ? (
              <div className="bg-[#f7f5ef] p-8 md:p-12 border border-[#161514]/10 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans block">
                      Private Patron Status
                    </span>
                    <h2 className="text-3xl font-serif text-noir uppercase font-light mt-1">
                      {account.name || 'Client Privilégié'}
                    </h2>
                    <p className="text-xs text-stone-500 font-sans mt-0.5">{account.email}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-noir text-white flex items-center justify-center font-serif text-lg">
                    {account.name ? account.name[0].toUpperCase() : 'S'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#161514]/10 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Commissions</span>
                    <strong className="font-mono text-base text-noir mt-1 block">{orders.length} Orders</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Atelier Tier</span>
                    <strong className="font-serif italic text-base text-noir mt-1 block">Patron d'Honneur</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleTabChange('orders')}
                    className="flex-1 py-3.5 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors text-center"
                  >
                    View My Orders ({orders.length})
                  </button>
                  <button
                    onClick={logout}
                    className="px-6 py-3.5 border border-stone-300 hover:border-noir text-xs-caps tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#f7f5ef] p-8 md:p-12 border border-[#161514]/10 space-y-6">
                <div className="flex border-b border-[#161514]/10 pb-4 gap-8 text-xs uppercase tracking-[0.25em] font-sans">
                  <button
                    onClick={() => { setAuthMode('login'); setAuthMessage(null); }}
                    className={`pb-2 transition-colors ${authMode === 'login' ? 'border-b-2 border-noir font-semibold text-noir' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    Client Sign In
                  </button>
                  <button
                    onClick={() => { setAuthMode('register'); setAuthMessage(null); }}
                    className={`pb-2 transition-colors ${authMode === 'register' ? 'border-b-2 border-noir font-semibold text-noir' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    Register Profile
                  </button>
                </div>

                {authMessage && (
                  <div className={`p-3 text-xs font-sans ${authMessage.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
                    {authMessage.text}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-5">
                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="patron@domain.com"
                      className="w-full bg-[#faf8f5] border-b border-stone-300 focus:border-noir py-2.5 px-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <p className="text-[11px] text-stone-400 font-serif italic pt-1">
                    This client registry is preserved on this device. No password is required.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-4 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.25em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{authMode === 'login' ? 'Enter Client Portal' : 'Create Patron Profile'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </PageTransition>
  );
}
