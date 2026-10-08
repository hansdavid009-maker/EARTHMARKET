'use client';

import React, { useState } from 'react';
import { useExchange } from '@/context/ExchangeContext';
import { useOrders } from '@/context/OrderContext';
import { useSavedWords } from '@/context/SavedWordsContext';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { formatIdr, formatCny } from '@/lib/utils';
import { ShieldCheck, ArrowLeftRight, Package, BookOpen, Layers, Check, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const { rate, fee, setRate, setFee, transactions } = useExchange();
  const { orders, updateOrderStatus } = useOrders();
  const { allWords, addCustomWord } = useSavedWords();

  const [activeTab, setActiveTab] = useState<'exchange' | 'orders' | 'products' | 'dictionary'>('exchange');

  // Exchange rate form state
  const [newRate, setNewRate] = useState(rate.toString());
  const [newFee, setNewFee] = useState(fee.toString());
  const [rateSaved, setRateSaved] = useState(false);

  // New dictionary word form
  const [hanzi, setHanzi] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [meaningId, setMeaningId] = useState('');
  const [category, setCategory] = useState<'Greetings' | 'Food' | 'Shopping' | 'Transportation' | 'Hotel' | 'Airport' | 'Conversation' | 'Money' | 'Emergency' | 'Business'>('Shopping');
  const [exampleZh, setExampleZh] = useState('');
  const [examplePinyin, setExamplePinyin] = useState('');
  const [exampleId, setExampleId] = useState('');
  const [wordSaved, setWordSaved] = useState(false);

  const handleUpdateExchangeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setRate(Number(newRate));
    setFee(Number(newFee));
    setRateSaved(true);
    setTimeout(() => setRateSaved(false), 2000);
  };

  const handleAddDictionaryWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hanzi || !meaningId) return;

    addCustomWord({
      id: `dict-${Date.now()}`,
      hanzi,
      pinyin,
      meaningId,
      category,
      exampleZh: exampleZh || hanzi,
      examplePinyin: examplePinyin || pinyin,
      exampleId: exampleId || meaningId,
    });

    setHanzi('');
    setPinyin('');
    setMeaningId('');
    setExampleZh('');
    setExamplePinyin('');
    setExampleId('');
    setWordSaved(true);
    setTimeout(() => setWordSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-dark text-white rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-red-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Admin Control Panel (Section 26)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">RedMandarin Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            Konfigurasi kurs valas (Exchange Rate), kelola transaksi pesanan pembeli, dan entri kamus Mandarin.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'exchange', label: '💱 Exchange Settings', icon: ArrowLeftRight },
          { id: 'orders', label: '📦 Orders Management', icon: Package },
          { id: 'products', label: '🛍 Products Catalog', icon: Layers },
          { id: 'dictionary', label: '📖 Dictionary Management', icon: BookOpen },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-dark'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. EXCHANGE SETTINGS TAB */}
      {activeTab === 'exchange' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
              Konfigurasi Kurs & Biaya Layanan
            </h2>

            <form onSubmit={handleUpdateExchangeSettings} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Exchange Rate (1 CNY = ? IDR)
                </label>
                <input
                  type="number"
                  required
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Nilai kurs saat ini: Rp {rate.toLocaleString('id-ID')}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Biaya Layanan Admin (Fee IDR)
                </label>
                <input
                  type="number"
                  required
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Biaya saat ini: Rp {fee.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {rateSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Kurs Berhasil Diperbarui!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Simpan Perubahan Kurs</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
              Audit Transaksi Valuta Asing ({transactions.length})
            </h2>
            <div className="divide-y divide-gray-100 text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-dark block">{tx.date} — {tx.accountName || 'Pengguna'}</span>
                    <span className="text-gray-400 font-mono text-[11px]">{tx.accountNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-primary">
                      {tx.fromCurrency === 'IDR' ? formatIdr(tx.fromAmount) : formatCny(tx.fromAmount)} → {tx.toCurrency === 'CNY' ? formatCny(tx.toAmount) : formatIdr(tx.toAmount)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold block">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
            Daftar Pesanan Masuk ({orders.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-3">Invoice</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Total (IDR / CNY)</th>
                  <th className="py-3 px-3">Metode</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-extrabold text-dark">#{o.orderNumber}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold block text-gray-800">{o.customerName}</span>
                      <span className="text-gray-400 text-[10px]">{o.shippingCity}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-dark">{formatIdr(o.totalIdr)}</span>
                      <span className="text-red-600 block font-chinese text-[10px]">{formatCny(o.totalCny)}</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{o.paymentMethod}</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">{o.status}</td>
                    <td className="py-3 px-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                        className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 font-medium"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-base font-extrabold text-dark uppercase tracking-wider">
              Katalog Produk Toko ({INITIAL_PRODUCTS.length})
            </h2>
            <span className="text-xs text-gray-400">Inventory Status: Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIAL_PRODUCTS.map((p) => (
              <div key={p.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <span className="font-extrabold text-dark block line-clamp-1">{p.name}</span>
                <span className="text-gray-400 block">{p.category} • Stok: {p.stock}</span>
                <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                  <span>{formatIdr(p.priceIdr)}</span>
                  <span className="text-red-600 font-chinese">{formatCny(p.priceCny)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DICTIONARY MANAGEMENT TAB */}
      {activeTab === 'dictionary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
              Tambah Kosakata Baru (Add Vocabulary)
            </h2>

            <form onSubmit={handleAddDictionaryWord} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Hanzi (Karakter Mandarin)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 再见"
                    value={hanzi}
                    onChange={(e) => setHanzi(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-chinese text-dark"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Pinyin (Nada Suara)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Zàijiàn"
                    value={pinyin}
                    onChange={(e) => setPinyin(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Arti Bahasa Indonesia</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sampai jumpa lagi"
                    value={meaningId}
                    onChange={(e) => setMeaningId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-dark"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-dark font-medium"
                  >
                    <option value="Greetings">Greetings</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Airport">Airport</option>
                    <option value="Conversation">Conversation</option>
                    <option value="Money">Money</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Contoh Kalimat (Hanzi)</label>
                <input
                  type="text"
                  placeholder="明天见，再见！"
                  value={exampleZh}
                  onChange={(e) => setExampleZh(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-chinese text-dark"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Pinyin Contoh</label>
                  <input
                    type="text"
                    placeholder="Míngtiān jiàn, zàijiàn!"
                    value={examplePinyin}
                    onChange={(e) => setExamplePinyin(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-dark"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Arti Contoh Kalimat</label>
                  <input
                    type="text"
                    placeholder="Sampai ketemu besok, selamat tinggal!"
                    value={exampleId}
                    onChange={(e) => setExampleId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-dark"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {wordSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Kata Berhasil Ditambahkan ke Kamus!</span>
                  </>
                ) : (
                  <span>+ Tambahkan ke Kamus</span>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
              Daftar Entri Kamus ({allWords.length})
            </h2>
            <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100 text-xs pr-2">
              {allWords.map((w) => (
                <div key={w.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-base font-chinese text-dark">{w.hanzi}</span>
                    <span className="text-primary font-medium ml-2">({w.pinyin})</span>
                    <p className="text-gray-600 text-[11px]">{w.meaningId}</p>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                    {w.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
