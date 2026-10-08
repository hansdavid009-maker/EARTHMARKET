'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatIdr, formatCny } from '@/lib/utils';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalIdr,
    shippingIdr,
    totalIdr,
    totalCny,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-dark mb-2">Keranjang Belanja Masih Kosong</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
          Temukan perlengkapan perjalanan ke China, kartu data eSIM tanpa blokir VPN, dan produk berkualitas lainnya.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Mulai Belanja Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-dark tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-gray-500 mt-1">
            Periksa rincian barang belanjaan Anda sebelum melanjutkan ke proses pembayaran.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-red-600 transition-colors"
        >
          Kosongkan Keranjang
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="divide-y divide-gray-100">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Product details */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                      {product.category}
                    </span>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="font-bold text-dark text-sm hover:text-primary transition-colors line-clamp-1 mt-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5">
                      {formatIdr(product.priceIdr)} <span className="text-red-500 font-chinese">({formatCny(product.priceCny)})</span>
                    </p>
                  </div>
                </div>

                {/* Controls: Quantity & Subtotal */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                  <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-dark transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-xs w-6 text-center text-dark">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-dark transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="text-sm font-extrabold text-dark">
                      {formatIdr(product.priceIdr * quantity)}
                    </p>
                    <p className="text-[11px] font-bold text-red-600 font-chinese">
                      {formatCny(product.priceCny * quantity)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Hapus Barang"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary (Section 11) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-card sticky top-28 space-y-6">
          <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
            Ringkasan Belanja
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-dark">{formatIdr(subtotalIdr)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ongkos Kirim (Shipping)</span>
              <span className="font-semibold text-dark">{formatIdr(shippingIdr)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-dark text-base uppercase">TOTAL</span>
              <span className="text-xl font-extrabold text-primary">{formatIdr(totalIdr)}</span>
            </div>
            <div className="flex justify-end text-xs font-bold text-gray-500 font-chinese">
              ≈ {formatCny(totalCny)}
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2 shadow-md shadow-red-200 transition-all hover:scale-[1.01]"
          >
            <span>Lanjut ke Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            Pembayaran aman didukung Transfer Bank, GoPay/OVO, Kartu Kredit, atau WeChat/Alipay.
          </p>
        </div>

      </div>

    </div>
  );
}
