'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { formatIdr, formatCny } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Star, ShieldCheck, Truck, ArrowLeft, Minus, Plus, ShoppingCart, Zap, Check } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const product = INITIAL_PRODUCTS.find((p) => p.slug === params.slug);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Produk</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Product Image */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
              {product.category}
            </div>
            {product.nameZh && (
              <div className="absolute bottom-4 right-4 bg-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-chinese">
                {product.nameZh}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-gray-600 block">Garansi Resmi</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
              <Truck className="w-4 h-4 text-primary mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-gray-600 block">Kirim Cepat</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
              <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-gray-600 block">Ready Stock</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mt-1 leading-snug">
                {product.name}
              </h1>
              {product.nameZh && (
                <p className="text-sm font-semibold text-gray-400 font-chinese mt-1">
                  {product.nameZh}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400">({product.reviewsCount} Ulasan Pembeli)</span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Stok Tersedia: {product.stock} unit
              </span>
            </div>

            {/* Pricing */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-gray-400 font-medium block">Harga Produk</span>
                <span className="text-3xl font-extrabold text-dark">{formatIdr(product.priceIdr)}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-400 font-medium block">Konversi Yuan</span>
                <span className="text-xl font-bold text-red-600 font-chinese">{formatCny(product.priceCny)}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Deskripsi Produk
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            {product.features && (
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Keunggulan
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specs && (
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Spesifikasi Teknis
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-400 block text-[10px]">{key}</span>
                      <span className="font-semibold text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Jumlah Pembelian
              </span>
              <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm w-6 text-center text-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-dark hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  added
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white border-primary text-primary hover:bg-red-50'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Berhasil Ditambahkan!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>+ Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 shadow-md shadow-red-200 transition-all hover:scale-[1.01]"
              >
                <span>Beli Sekarang (Buy Now)</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
