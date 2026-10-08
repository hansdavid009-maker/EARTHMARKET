'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { ExchangeProvider } from '@/context/ExchangeContext';
import { SavedWordsProvider } from '@/context/SavedWordsContext';
import { OrderProvider } from '@/context/OrderContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ExchangeProvider>
      <CartProvider>
        <SavedWordsProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </SavedWordsProvider>
      </CartProvider>
    </ExchangeProvider>
  );
}
