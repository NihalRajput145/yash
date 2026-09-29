import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('seleneBag');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(item => {
        const product = PRODUCTS.find(p => p.name === item.name || (p.category === item.category && p.index === item.index));
        return {
          ...product,
          ...item,
          qty: Math.max(1, Math.min(99, Number(item.qty) || 1)),
          size: item.size || (product?.sizes ? product.sizes[0] : "One Size"),
          key: item.key || `${item.category}-${item.index}-${item.size || "default"}`
        };
      }).filter(Boolean);
    } catch (e) {
      console.warn("Failed to load saved bag", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('seleneBag', JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save bag to localStorage", e);
    }
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, size = null, qty = 1) => {
    if (!product) return;
    const selectedSize = size || (product.sizes ? product.sizes[0] : "One Size");
    const itemKey = `${product.category}-${product.index}-${selectedSize}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: Math.min(99, updated[existingIndex].qty + qty)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            key: itemKey,
            size: selectedSize,
            qty: Math.min(99, qty)
          }
        ];
      }
    });

    showToast(`Added to your bag: ${product.name}`);
    setIsCartOpen(true);
  };

  const removeFromCart = (key) => {
    setCart(prev => prev.filter(item => item.key !== key));
  };

  const updateQuantity = (key, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.key === key) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: Math.min(99, newQty) } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;
  const freeShippingThreshold = 4000;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemsCount,
        subtotal,
        formattedSubtotal,
        toastMessage,
        freeShippingThreshold,
        freeShippingRemaining,
        isFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
