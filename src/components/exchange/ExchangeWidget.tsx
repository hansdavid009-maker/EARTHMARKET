'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useExchange } from '@/context/ExchangeContext';
import { formatIdr, formatCny } from '@/lib/utils';
import { ArrowDownUp, Sparkles, ArrowRight } from 'lucide-react';

export function ExchangeWidget() {
  const { rate, fee } = useExchange();
  const [direction, setDirection] = useState<'IDR_TO_CNY' | 'CNY_TO_IDR'>('IDR_TO_CNY');
  const [inputValue, setInputValue] = useState<string>('1000000');

  const numericInput = Math.max(0, Number(inputValue.replace(/\D/g, '')) || 0);

  let resultOutput = 0;
  if (direction === 'IDR_TO_CNY') {
    const net = Math.max(0, numericInput - fee);
    resultOutput = Math.floor(net / rate);
  } else {
    resultOutput = Math.round(numericInput * rate) + fee;
  }

  const toggleDirection = () => {
    if (direction === 'IDR_TO_CNY') {
      setDirection('CNY_TO_IDR');
      setInputValue('430');
    } else {
      setDirection('IDR_TO_CNY');
      setInputValue('1000000');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <h3 className="font-bold text-dark text-sm tracking-wide uppercase">
            Currency Exchange
          </h3>
        </div>
        <button
          onClick={toggleDirection}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-1 text-xs font-semibold"
          title="Tukar Arah Mata Uang"
        >
          <ArrowDownUp className="w-3.5 h-3.5 text-primary" />
          <span>Balik</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Source Currency */}
        <div className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-100 focus-within:border-primary/50 focus-within:bg-white transition-all">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <span>{direction === 'IDR_TO_CNY' ? '🇮🇩 IDR (Rupiah)' : '🇨🇳 CNY (Yuan)'}</span>
            </span>
            <span>Jumlah</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold text-gray-400 mr-1.5">
              {direction === 'IDR_TO_CNY' ? 'Rp' : '¥'}
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent font-bold text-lg text-dark focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Switch indicator */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={toggleDirection}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-primary hover:scale-110 transition-transform"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Target Currency */}
        <div className="p-3.5 bg-primary-light/50 rounded-xl border border-red-100">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <span>{direction === 'IDR_TO_CNY' ? '🇨🇳 CNY (Yuan)' : '🇮🇩 IDR (Rupiah)'}</span>
            </span>
            <span className="text-primary font-semibold">Estimasi Diterima</span>
          </div>
          <div className="text-xl font-extrabold text-primary">
            {direction === 'IDR_TO_CNY' ? formatCny(resultOutput) : formatIdr(resultOutput)}
          </div>
        </div>

        {/* Rate info & Fee */}
        <div className="py-2 px-1 text-xs text-gray-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1 CNY ≈ Rp {rate.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-gray-400">
            Biaya: Rp {fee.toLocaleString('id-ID')}
          </span>
        </div>

        {/* CTA Button */}
        <Link
          href={`/exchange?amount=${numericInput}&direction=${direction}`}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Tukarkan Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
