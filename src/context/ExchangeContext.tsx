'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExchangeTransaction } from '@/types';
import { INITIAL_EXCHANGE_RATE, DEFAULT_EXCHANGE_FEE_IDR, INITIAL_EXCHANGES } from '@/lib/data';

interface ExchangeContextType {
  rate: number;
  fee: number;
  setRate: (rate: number) => void;
  setFee: (fee: number) => void;
  transactions: ExchangeTransaction[];
  addTransaction: (tx: Omit<ExchangeTransaction, 'id' | 'date'>) => ExchangeTransaction;
  updateTransactionStatus: (id: string, status: ExchangeTransaction['status']) => void;
}

const ExchangeContext = createContext<ExchangeContextType | undefined>(undefined);

export function ExchangeProvider({ children }: { children: React.ReactNode }) {
  const [rate, setRateState] = useState<number>(INITIAL_EXCHANGE_RATE);
  const [fee, setFeeState] = useState<number>(DEFAULT_EXCHANGE_FEE_IDR);
  const [transactions, setTransactions] = useState<ExchangeTransaction[]>(INITIAL_EXCHANGES);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedRate = localStorage.getItem('redmandarin_rate');
      const savedFee = localStorage.getItem('redmandarin_fee');
      const savedTx = localStorage.getItem('redmandarin_exchange_tx');
      if (savedRate) setRateState(Number(savedRate));
      if (savedFee) setFeeState(Number(savedFee));
      if (savedTx) setTransactions(JSON.parse(savedTx));
    } catch {
      // fallback
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('redmandarin_rate', rate.toString());
      localStorage.setItem('redmandarin_fee', fee.toString());
      localStorage.setItem('redmandarin_exchange_tx', JSON.stringify(transactions));
    }
  }, [rate, fee, transactions, isInitialized]);

  const setRate = (newRate: number) => setRateState(newRate);
  const setFee = (newFee: number) => setFeeState(newFee);

  const addTransaction = (txData: Omit<ExchangeTransaction, 'id' | 'date'>): ExchangeTransaction => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const newTx: ExchangeTransaction = {
      ...txData,
      id: `exc-${Date.now().toString().slice(-4)}`,
      date: today,
    };
    setTransactions((prev) => [newTx, ...prev]);
    return newTx;
  };

  const updateTransactionStatus = (id: string, status: ExchangeTransaction['status']) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <ExchangeContext.Provider
      value={{
        rate,
        fee,
        setRate,
        setFee,
        transactions,
        addTransaction,
        updateTransactionStatus,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}

export function useExchange() {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error('useExchange must be used within an ExchangeProvider');
  }
  return context;
}
