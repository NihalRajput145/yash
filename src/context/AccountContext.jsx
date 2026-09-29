import React, { createContext, useContext, useState, useEffect } from 'react';

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    try {
      const stored = localStorage.getItem('seleneAccount');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('seleneLoggedIn') === '1';
    } catch {
      return false;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('seleneOrders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      // Initial sample luxury orders for presentation
      return [
        {
          id: "SEL-849201",
          date: "14 Sep 2026, 17:30",
          status: "Handcrafted in Atelier",
          stage: 2, // 1: Order Confirmed, 2: Handcrafted, 3: Quality Stamped, 4: Dispatched
          total: 5280,
          trackingNumber: "SEL-IND-77829-EXP",
          packaging: "Signature SELENE Archival Linen Box",
          shippingAddress: "14 Rue de Tournon, Saint-Germain-des-Prés, Paris",
          items: [
            {
              id: "bags-0",
              name: "Bow Crochet Bag",
              category: "bags",
              price: 2490,
              qty: 1,
              size: "One Size",
              image: "/bags/bag1.jpeg"
            },
            {
              id: "bags-2",
              name: "Midnight Shoulder Bag",
              category: "bags",
              price: 2790,
              qty: 1,
              size: "One Size",
              image: "/bags/bag3.jpeg"
            }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (account) {
        localStorage.setItem('seleneAccount', JSON.stringify(account));
      }
      localStorage.setItem('seleneLoggedIn', isLoggedIn ? '1' : '0');
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [account, isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('seleneOrders', JSON.stringify(orders));
    } catch (e) {
      console.warn("Orders storage error", e);
    }
  }, [orders]);

  const login = (email, name = "Client Privilégié") => {
    const profile = { email, name };
    setAccount(profile);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('seleneLoggedIn');
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: `SEL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Artisanal Commission Confirmed",
      stage: 1,
      trackingNumber: `SEL-IND-${Math.floor(10000 + Math.random() * 90000)}-EXP`,
      packaging: orderData.packaging || "Signature SELENE Archival Linen Box",
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        isLoggedIn,
        login,
        logout,
        orders,
        createOrder
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
