'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { INITIAL_EXCHANGE_RATE } from '@/lib/data';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalIdr: number;
  shippingIdr: number;
  totalIdr: number;
  totalCny: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('redmandarin_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Default initial items as in PRD section 11
        setItems([
          {
            product: {
              id: 'prod-1',
              slug: 'china-universal-travel-adapter',
              name: 'Travel Adapter China Type A/I',
              category: 'Travel',
              priceIdr: 125000,
              priceCny: 54,
              rating: 4.8,
              reviewsCount: 128,
              stock: 45,
              image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
              description: 'Travel adapter untuk China.'
            },
            quantity: 1
          },
          {
            product: {
              id: 'prod-4',
              slug: 'premium-cabin-travel-backpack-waterproof',
              name: 'Travel Bag 35L',
              category: 'Travel',
              priceIdr: 300000,
              priceCny: 129,
              rating: 4.8,
              reviewsCount: 76,
              stock: 35,
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
              description: 'Tas ransel kabin travel.'
            },
            quantity: 1
          }
        ]);
      }
    } catch {
      // fallback
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('redmandarin_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalIdr = items.reduce(
    (sum, item) => sum + item.product.priceIdr * item.quantity,
    0
  );
  const shippingIdr = items.length > 0 ? 20000 : 0;
  const totalIdr = subtotalIdr + shippingIdr;
  const totalCny = Math.round(totalIdr / INITIAL_EXCHANGE_RATE);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalIdr,
        shippingIdr,
        totalIdr,
        totalCny,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
