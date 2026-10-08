'use client';

import React from 'react';
import Link from 'next/link';
import { useOrders } from '@/context/OrderContext';
import { useExchange } from '@/context/ExchangeContext';
import { useSavedWords } from '@/context/SavedWordsContext';
import { formatIdr, formatCny } from '@/lib/utils';
import { Package, ArrowLeftRight, BookOpen, User, ShoppingBag, CheckCircle, Clock, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  const { orders } = useOrders();
  const { transactions } = useExchange();
  const { savedWords } = useSavedWords();

  const totalCnyExchanged = transactions.reduce((sum, tx) => {
    return sum + (tx.toCurrency === 'CNY' ? tx.toAmount : 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary font-extrabold text-2xl font-chinese">
            红
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
              Welcome back 👋 Budi Pratama
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Member Prioritas RedMandarin • budi.pratama@example.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-hover transition-colors"
          >
            + Mulai Belanja
          </Link>
          <Link
            href="/exchange"
            className="px-5 py-2.5 rounded-xl bg-gray-100 text-dark text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            Tukar Rupiah
          </Link>
        </div>
      </div>

      {/* 3 Metric Cards (PRD Section 25) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Orders Card */}
        <Link href="/orders" className="group">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-card transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Orders
              </span>
              <div className="p-2.5 bg-red-50 text-primary rounded-xl group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-dark">
              {orders.length}
            </div>
            <p className="text-xs text-gray-400 flex items-center justify-between">
              <span>Pesanan terdaftar</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>

        {/* Exchange Card */}
        <Link href="/exchange" className="group">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-card transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Exchange
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-primary font-chinese">
              ¥ {totalCnyExchanged.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 flex items-center justify-between">
              <span>{transactions.length} transaksi penukaran</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>

        {/* Vocabulary Card */}
        <Link href="/mandarin" className="group">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-card transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Saved Vocabulary
              </span>
              <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-dark">
              {savedWords.length} words
            </div>
            <p className="text-xs text-gray-400 flex items-center justify-between">
              <span>Kosakata tersimpan</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>

      </div>

      {/* Recent Orders Section (PRD Section 25) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-dark">Recent Orders</h2>
              <p className="text-xs text-gray-400">Daftar pesanan terbaru di RedMandarin.</p>
            </div>
            <Link
              href="/orders"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Semua Pesanan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="py-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-dark text-sm block">#{order.orderNumber}</span>
                  <span className="text-gray-400">{order.createdAt} • {order.items.length} item</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-dark block">{formatIdr(order.totalIdr)}</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                      order.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Vocabulary Preview */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-dark">My Vocabulary</h2>
              <p className="text-xs text-gray-400">Kata favorit yang sering Anda pelajari.</p>
            </div>
            <Link
              href="/mandarin"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Buka</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {savedWords.slice(0, 4).map((w) => (
              <div key={w.id} className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-base font-chinese text-dark block">{w.hanzi}</span>
                  <span className="text-[11px] text-primary font-medium">{w.pinyin}</span>
                </div>
                <span className="text-xs text-gray-600 font-semibold text-right max-w-[120px] truncate">
                  {w.meaningId}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
