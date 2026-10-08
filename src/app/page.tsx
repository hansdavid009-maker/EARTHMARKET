'use client';

import React from 'react';
import Link from 'next/link';
import { ExchangeWidget } from '@/components/exchange/ExchangeWidget';
import { ProductCard } from '@/components/product/ProductCard';
import { INITIAL_PRODUCTS, INITIAL_DICTIONARY } from '@/lib/data';
import { ArrowRight, ShoppingBag, ArrowLeftRight, BookOpen, Sparkles, Volume2, ShieldCheck, Zap, Globe2 } from 'lucide-react';

export default function HomePage() {
  const popularProducts = INITIAL_PRODUCTS.slice(0, 4);
  const quickWords = INITIAL_DICTIONARY.slice(0, 4);

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. HERO SECTION & CURRENCY WIDGET */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-12 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Belanja • Exchange • Mandarin</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark leading-[1.12]">
                Semua kebutuhanmu untuk <span className="text-primary underline decoration-red-200 decoration-wavy underline-offset-8">China</span>, dalam satu tempat.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Belanja perlengkapan perjalanan resmi, tukarkan Rupiah ke Yuan dengan kurs transparan, dan pelajari bahasa Mandarin praktis dengan bantuan asisten AI.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md shadow-red-200 flex items-center gap-2 transition-all hover:translate-y-[-1px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Mulai Belanja</span>
                </Link>

                <Link
                  href="/exchange"
                  className="px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-dark font-bold text-sm flex items-center gap-2 transition-all"
                >
                  <ArrowLeftRight className="w-4 h-4 text-primary" />
                  <span>Tukar Rupiah (Kurs CNY)</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 max-w-lg">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Produk Resmi CCC</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>eSIM & Kurs Instan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Globe2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Audio Mandarin Asli</span>
                </div>
              </div>
            </div>

            {/* Right Column: Currency Widget */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-70 -z-10" />
                <ExchangeWidget />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <span>Rekomendasi Terbaik</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
              Popular Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover group"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. LEARN MANDARIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white to-red-50/50 rounded-3xl p-8 sm:p-12 border border-red-100/60 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Kamus Kosakata Interaktif</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                Learn Mandarin
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Pelajari ungkapan penting sehari-hari yang sering dipakai saat bertransaksi dan bepergian di China.
              </p>
            </div>
            <Link
              href="/mandarin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-dark hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              <span>Buka Kamus Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickWords.map((word) => (
              <div
                key={word.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-red-200 hover:shadow-card transition-all group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                    {word.category}
                  </span>
                  <button
                    onClick={() => playSpeech(word.hanzi)}
                    className="p-1.5 rounded-lg bg-red-50 text-primary hover:bg-primary hover:text-white transition-colors"
                    title="Dengarkan Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-dark font-chinese group-hover:text-primary transition-colors">
                    {word.hanzi}
                  </span>
                  <p className="text-xs font-semibold text-primary mt-0.5">{word.pinyin}</p>
                </div>

                <p className="text-xs font-medium text-gray-700 line-clamp-1">{word.meaningId}</p>

                <div className="mt-3 pt-3 border-t border-gray-50 text-[11px] text-gray-500 italic line-clamp-1">
                  &ldquo;{word.exampleZh}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEED HELP / AI ASSISTANT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/20 blur-3xl pointer-events-none" />
          
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-red-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RedMandarin Intelligence</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Butuh Bantuan atau Rekomendasi?
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tanyakan langsung pada asisten AI kami mengenai rekomendasi produk, cek nilai tukar Yuan terkini, hingga panduan kosakata bahasa Mandarin.
            </p>
          </div>

          <button
            onClick={() => {
              // Click the floating chatbot button
              const chatBtn = document.querySelector('button[title="AI Assistant"]') as HTMLElement;
              if (chatBtn) chatBtn.click();
              else {
                // fallback toggle
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-all flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Chat with AI</span>
          </button>
        </div>
      </section>

    </div>
  );
}
