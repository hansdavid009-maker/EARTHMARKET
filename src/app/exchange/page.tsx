'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useExchange } from '@/context/ExchangeContext';
import { formatIdr, formatCny } from '@/lib/utils';
import { ArrowDownUp, CheckCircle, Clock, ShieldAlert, Sparkles, Building2, QrCode } from 'lucide-react';

function ExchangeContent() {
  const searchParams = useSearchParams();
  const paramAmount = searchParams.get('amount');
  const paramDirection = searchParams.get('direction') as 'IDR_TO_CNY' | 'CNY_TO_IDR' | null;

  const { rate, fee, transactions, addTransaction } = useExchange();

  const [direction, setDirection] = useState<'IDR_TO_CNY' | 'CNY_TO_IDR'>(paramDirection || 'IDR_TO_CNY');
  const [amountStr, setAmountStr] = useState(paramAmount || '1000000');
  const [accountName, setAccountName] = useState('Budi Pratama');
  const [accountNumber, setAccountNumber] = useState('Alipay: budi.cn26');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (paramAmount) setAmountStr(paramAmount);
    if (paramDirection) setDirection(paramDirection);
  }, [paramAmount, paramDirection]);

  const numericAmount = Math.max(0, Number(amountStr.replace(/\D/g, '')) || 0);

  let outputAmount = 0;
  if (direction === 'IDR_TO_CNY') {
    const netIdr = Math.max(0, numericAmount - fee);
    outputAmount = Math.floor(netIdr / rate);
  } else {
    outputAmount = Math.round(numericAmount * rate) + fee;
  }

  const toggleDirection = () => {
    if (direction === 'IDR_TO_CNY') {
      setDirection('CNY_TO_IDR');
      setAmountStr('430');
      setAccountNumber('BCA: 8820192837');
    } else {
      setDirection('IDR_TO_CNY');
      setAmountStr('1000000');
      setAccountNumber('Alipay: budi.cn26');
    }
  };

  const handleExchangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      addTransaction({
        fromCurrency: direction === 'IDR_TO_CNY' ? 'IDR' : 'CNY',
        toCurrency: direction === 'IDR_TO_CNY' ? 'CNY' : 'IDR',
        fromAmount: numericAmount,
        toAmount: outputAmount,
        rate: rate,
        fee: fee,
        status: 'Completed',
        accountName,
        accountNumber,
      });

      setIsProcessing(false);
      setSuccessMessage(
        `Penukaran ${direction === 'IDR_TO_CNY' ? formatIdr(numericAmount) : formatCny(numericAmount)} berhasil diproses! Hasil ${direction === 'IDR_TO_CNY' ? formatCny(outputAmount) : formatIdr(outputAmount)} telah dikirim ke ${accountNumber}.`
      );

      setTimeout(() => setSuccessMessage(null), 5000);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-dark tracking-tight">
          Penukaran Rupiah & Yuan (IDR ↔ CNY)
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Simulasi dan transaksi valuta asing dengan kurs resmi, biaya transparan, dan pencairan cepat ke Alipay / WeChat Pay / Bank.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. EXCHANGE CALCULATOR & FORM (PRD Section 14, 35) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-card">
        
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurs Resmi Terkini</span>
          </div>
          <h2 className="text-2xl font-extrabold text-dark">EXCHANGE CURRENCY</h2>
          <p className="text-xs text-gray-400 mt-1">
            Nilai tukar terbarukan: <strong>1 CNY = Rp {rate.toLocaleString('id-ID')}</strong> • Biaya Admin: <strong>Rp {fee.toLocaleString('id-ID')}</strong>
          </p>
        </div>

        <form onSubmit={handleExchangeSubmit} className="max-w-3xl mx-auto space-y-8">
          
          {/* Dual converter box */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            
            {/* From Input */}
            <div className="md:col-span-5 p-5 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:bg-white transition-all">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">
                {direction === 'IDR_TO_CNY' ? '🇮🇩 Anda Memberikan (IDR)' : '🇨🇳 Anda Memberikan (CNY)'}
              </span>
              <div className="flex items-center mt-2">
                <span className="text-xl font-bold text-gray-400 mr-2">
                  {direction === 'IDR_TO_CNY' ? 'Rp' : '¥'}
                </span>
                <input
                  type="text"
                  required
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full bg-transparent font-extrabold text-2xl text-dark focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center">
              <button
                type="button"
                onClick={toggleDirection}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-primary hover:scale-110 hover:border-primary transition-all"
                title="Tukar Arah Konversi"
              >
                <ArrowDownUp className="w-5 h-5" />
              </button>
            </div>

            {/* To Output */}
            <div className="md:col-span-5 p-5 bg-primary-light/60 rounded-2xl border border-red-200">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                {direction === 'IDR_TO_CNY' ? '🇨🇳 Anda Menerima (CNY)' : '🇮🇩 Anda Menerima (IDR)'}
              </span>
              <div className="flex items-center mt-2">
                <span className="font-extrabold text-2xl text-primary">
                  {direction === 'IDR_TO_CNY' ? formatCny(outputAmount) : formatIdr(outputAmount)}
                </span>
              </div>
            </div>

          </div>

          {/* Breakdown calculation card (PRD Section 35) */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-xs space-y-2.5">
            <h4 className="font-bold text-gray-800 uppercase tracking-wider mb-2">Rincian Perhitungan Transaksi:</h4>
            <div className="flex justify-between text-gray-600">
              <span>Nominal Dasar</span>
              <span className="font-semibold text-dark">
                {direction === 'IDR_TO_CNY' ? formatIdr(numericAmount) : formatCny(numericAmount)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Exchange Rate Acuan</span>
              <span className="font-semibold text-dark">1 CNY = Rp {rate.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Layanan (Exchange Fee)</span>
              <span className="font-semibold text-primary">Rp {fee.toLocaleString('id-ID')}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-dark">
              <span>Total yang Diterima (You receive)</span>
              <span className="text-primary">
                {direction === 'IDR_TO_CNY' ? formatCny(outputAmount) : formatIdr(outputAmount)}
              </span>
            </div>
          </div>

          {/* Account destination form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Nama Pemilik Rekening / Dompet
              </label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Budi Pratama"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                {direction === 'IDR_TO_CNY'
                  ? 'Akun Payout (Alipay / WeChat ID / No Rek)'
                  : 'Rekening Bank Tujuan (BCA/Mandiri/BRI)'}
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Alipay ID / Rekening Bank"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || numericAmount <= 0}
            className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-red-200 transition-all hover:scale-[1.01]"
          >
            {isProcessing ? 'Memproses Penukaran Valuta...' : 'Tukarkan Sekarang (Konfirmasi Penukaran)'}
          </button>

          {/* Compliance note (PRD Section 45) */}
          <div className="flex items-start gap-2.5 text-[11px] text-gray-400 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p>
              Simulasi dan penukaran mata uang ini beroperasi sesuai ketentuan AML & valuta asing. Semua kalkulasi fee dihitung secara transparan di sisi server untuk keamanan Anda.
            </p>
          </div>

        </form>

      </div>

      {/* 2. EXCHANGE HISTORY TABLE (PRD Section 16) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-dark">Riwayat Transaksi Exchange</h3>
            <p className="text-xs text-gray-500 mt-0.5">Daftar penukaran Rupiah dan Yuan yang telah Anda ajukan.</p>
          </div>
          <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            {transactions.length} Transaksi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Dari (From)</th>
                <th className="py-3 px-4">Jumlah Asal</th>
                <th className="py-3 px-4">Ke (To)</th>
                <th className="py-3 px-4">Tujuan / Akun</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-medium text-dark">{tx.date}</td>
                  <td className="py-4 px-4 font-bold text-gray-600">{tx.fromCurrency}</td>
                  <td className="py-4 px-4 font-bold text-dark">
                    {tx.fromCurrency === 'IDR' ? formatIdr(tx.fromAmount) : formatCny(tx.fromAmount)}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-primary font-chinese">
                    {tx.toCurrency === 'CNY' ? formatCny(tx.toAmount) : formatIdr(tx.toAmount)}
                  </td>
                  <td className="py-4 px-4 text-gray-500 font-mono text-[11px]">
                    {tx.accountNumber || '-'}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        tx.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : tx.status === 'Processing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tx.status === 'Completed' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{tx.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default function ExchangePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm font-semibold text-gray-500">
        Memuat kalkulator konversi valuta...
      </div>
    }>
      <ExchangeContent />
    </Suspense>
  );
}
