'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/types';
import { INITIAL_ORDERS } from '@/lib/data';

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('redmandarin_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('redmandarin_orders', JSON.stringify(orders));
    }
  }, [orders, isInitialized]);

  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>
  ): Order => {
    const timestamp = new Date();
    const formattedDate = timestamp.toISOString().slice(0, 10) + ' ' + timestamp.toTimeString().slice(0, 5);
    const invoiceNum = `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: invoiceNum,
      createdAt: formattedDate,
      status: 'Completed', // direct mock completion for instant experience
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id || o.orderNumber === id);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id || o.orderNumber === id ? { ...o, status } : o))
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
