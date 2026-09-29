import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Sparkles, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAccount } from '../context/AccountContext';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

export default function CheckoutPage() {
  const { cart, subtotal, formattedSubtotal, clearCart, isFreeShipping } = useCart();
  const { createOrder } = useAccount();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    packaging: 'Signature SELENE Archival Linen Box with Ribbon',
    giftNote: '',
    paymentMethod: 'Artisanal Preview Transfer'
  });

  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <PageTransition className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-serif">Your shopping bag is empty.</h2>
        <Link to="/shop" className="mt-4 inline-block text-xs-caps tracking-[0.25em] underline">
          Discover the Collection
        </Link>
      </PageTransition>
    );
  }

  const shippingCost = isFreeShipping ? 0 : 150;
  const orderTotal = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: [...cart],
      total: orderTotal,
      packaging: formData.packaging,
      clientName: `${formData.firstName} ${formData.lastName}`.trim(),
      clientEmail: formData.email,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}`
    };

    setTimeout(() => {
      const created = createOrder(orderData);
      setConfirmedOrder(created);
      clearCart();
      setLoading(false);
    }, 1200);
  };

  return (
    <PageTransition className="pt-24 md:pt-32 pb-32 bg-[#faf8f5] text-noir">
      <div className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-8">
        {confirmedOrder ? (
          <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-noir text-white flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500 font-sans block">
              Commission Recorded
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light uppercase tracking-tight">
              Order {confirmedOrder.id} Entrusted to the Atelier.
            </h1>
            <p className="text-sm text-stone-600 font-serif italic max-w-lg mx-auto">
              Your preview order has been successfully logged on this device. No financial transaction occurred. Your pieces have been saved to your local order history.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/orders"
                className="px-8 py-4 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.28em] hover:bg-stone-800 transition-colors w-full sm:w-auto"
              >
                Track In My Orders
              </Link>
              <Link
                to="/shop"
                className="px-8 py-4 border border-stone-300 text-stone-700 hover:border-noir text-xs-caps tracking-[0.2em] transition-colors w-full sm:w-auto"
              >
                Return to Catalogue
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-12">
              <Link to="/shop" className="text-xs uppercase tracking-wider text-stone-500 hover:text-noir flex items-center gap-2 mb-4">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Shopping</span>
              </Link>
              <h1 className="text-4xl sm:text-5xl font-serif font-light text-noir tracking-tight uppercase">
                CHECKOUT PREVIEW.
              </h1>
              <p className="text-xs text-stone-500 font-sans uppercase tracking-[0.25em] mt-1">
                Complimentary Archival Packaging & Insured Delivery
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Form Column */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-noir pb-2 border-b border-[#161514]/10">
                    01 · Recipient Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Telephone / WhatsApp *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4">
                  <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-noir pb-2 border-b border-[#161514]/10">
                    02 · Delivery Destination
                  </h2>
                  <input
                    type="text"
                    required
                    placeholder="Street Address, Apartment or Suite *"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="City *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Postal Code / PIN *"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Archival Packaging Selection */}
                <div className="space-y-4">
                  <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-noir pb-2 border-b border-[#161514]/10">
                    03 · Archival Packaging
                  </h2>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-4 bg-[#f7f5ef] border border-stone-200 cursor-pointer">
                      <input
                        type="radio"
                        name="packaging"
                        checked={formData.packaging.includes('Archival Linen')}
                        onChange={() => setFormData({ ...formData, packaging: 'Signature SELENE Archival Linen Box with Ribbon' })}
                        className="mt-1"
                      />
                      <div className="text-xs">
                        <strong className="font-serif text-sm font-medium text-noir block">
                          Signature SELENE Archival Linen Box (Complimentary)
                        </strong>
                        <p className="text-stone-500 mt-0.5">
                          Rigid embossed keepsake box, silk grosgrain tie, acid-free tissue, and atelier wax stamp.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 bg-[#f7f5ef] border border-stone-200 cursor-pointer">
                      <input
                        type="radio"
                        name="packaging"
                        checked={formData.packaging.includes('Eco Minimal')}
                        onChange={() => setFormData({ ...formData, packaging: 'Eco Minimal Linen Dust Bag' })}
                        className="mt-1"
                      />
                      <div className="text-xs">
                        <strong className="font-serif text-sm font-medium text-noir block">
                          Eco Minimalist Cloth Dust Bag
                        </strong>
                        <p className="text-stone-500 mt-0.5">
                          Lightweight reusable raw cotton pouch for minimum cardboard usage.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Optional Gift Note */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-stone-600 font-sans block">
                    Complimentary Handwritten Calligraphy Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Inscribe a personal message to be written with fountain pen by the atelier..."
                    value={formData.giftNote}
                    onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                    className="w-full bg-[#f7f5ef] border border-stone-200 focus:border-noir p-3 text-sm focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-noir text-[#faf8f5] text-xs-caps tracking-[0.28em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-2xl"
                >
                  {loading ? 'Entrusting Order to Atelier...' : `Confirm Commission · ₹${orderTotal.toLocaleString('en-IN')}`}
                </button>
              </form>

              {/* Order Summary Column */}
              <div className="lg:col-span-5 bg-[#f7f5ef] p-6 md:p-10 border border-[#161514]/10 space-y-6 lg:sticky lg:top-28">
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans block">
                  Commission Review ({cart.length})
                </span>

                <div className="divide-y divide-[#161514]/5 max-h-[380px] overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.key} className="py-3 first:pt-0 flex gap-4 items-center">
                      <div className="w-14 h-18 bg-stone-200 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-base text-noir line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] text-stone-500 uppercase tracking-wider">
                          {item.size} · Qty: {item.qty}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-stone-900">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#161514]/10 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Artisanal Subtotal</span>
                    <span className="font-mono">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Insured Courier</span>
                    <span>{isFreeShipping ? 'Complimentary' : '₹150'}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Signature Archival Box</span>
                    <span className="font-serif italic">Complimentary</span>
                  </div>
                  <div className="pt-3 border-t border-[#161514]/10 flex justify-between items-baseline text-base font-medium">
                    <span className="text-xs uppercase tracking-[0.2em] font-sans">Total</span>
                    <span className="font-mono text-xl font-bold text-noir">
                      ₹{orderTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-stone-500 tracking-wider space-y-1">
                  <p>✓ All applicable craft taxes included</p>
                  <p>✓ Archival authenticity certificate signed by hand</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
