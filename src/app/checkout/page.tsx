'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { formatIdr, formatCny } from '@/lib/utils';
import { CheckCircle2, CreditCard, Building2, Smartphone, QrCode, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalIdr, shippingIdr, totalIdr, totalCny, clearCart } = useCart();
  const { createOrder } = useOrders();

  // Form states
  const [customerName, setCustomerName] = useState('Budi Pratama');
  const [customerEmail, setCustomerEmail] = useState('budi.pratama@example.com');
  const [customerPhone, setCustomerPhone] = useState('081234567890');
  const [shippingAddress, setShippingAddress] = useState('Jl. Sudirman No. 45, Tower Indah Lt. 12');
  const [shippingCity, setShippingCity] = useState('Jakarta Selatan');
  const [postalCode, setPostalCode] = useState('12190');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'E-Wallet (GoPay/OVO)' | 'Credit Card' | 'WeChat Pay / Alipay'>('Bank Transfer');

  // Success state for Section 13
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        priceIdr: item.product.priceIdr,
        priceCny: item.product.priceCny,
        image: item.product.image,
      }));

      const newOrder = createOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        shippingCity,
        postalCode,
        paymentMethod,
        items: orderItems,
        subtotalIdr,
        shippingIdr,
        totalIdr,
        totalCny,
      });

      clearCart();
      setIsSubmitting(false);
      setCreatedOrderNumber(newOrder.orderNumber);
    }, 800);
  };

  // Section 13: Order Success View
  if (createdOrderNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-card">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Pembayaran Diterima
          </span>
          <h1 className="text-3xl font-extrabold text-dark tracking-tight mb-2">
            Order berhasil dibuat!
          </h1>
          <p className="text-sm font-semibold text-gray-500 mb-6">
            Order <span className="text-primary font-bold">#{createdOrderNumber}</span>
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 max-w-sm mx-auto mb-8 space-y-2">
            <div className="text-xs text-gray-500 uppercase font-medium">Total Pembayaran</div>
            <div className="text-2xl font-extrabold text-dark">{formatIdr(totalIdr)}</div>
            <div className="text-sm font-bold text-red-600 font-chinese">≈ {formatCny(totalCny)}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/orders"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md transition-all"
            >
              Lihat Pesanan
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-dark font-bold text-xs transition-all"
            >
              Kembali Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-dark mb-2">Keranjang Anda Kosong</h2>
        <p className="text-xs text-gray-500 mb-6">Pilih produk sebelum melakukan proses checkout.</p>
        <Link
          href="/shop"
          className="inline-flex px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl"
        >
          Lihat Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Keranjang</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-dark tracking-tight">CHECKOUT</h1>
        <p className="text-xs text-gray-500 mt-1">Lengkapi alamat pengiriman dan pilih metode pembayaran resmi.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Details (PRD Section 12) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Address Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
              Alamat Pengiriman (Shipping Address)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nama Penerima</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Alamat Lengkap</label>
              <textarea
                required
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Kota</label>
                <input
                  type="text"
                  required
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Kode Pos</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
              Metode Pembayaran (Payment Method)
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 'Bank Transfer',
                  label: 'Bank Transfer (BCA, Mandiri, BRI, BNI)',
                  icon: Building2,
                  desc: 'Konfirmasi otomatis via Virtual Account 24 jam.',
                },
                {
                  id: 'E-Wallet (GoPay/OVO)',
                  label: 'E-Wallet (GoPay, OVO, Dana, ShopeePay)',
                  icon: Smartphone,
                  desc: 'Scan QRIS instan dari aplikasi dompet digital.',
                },
                {
                  id: 'Credit Card',
                  label: 'Kartu Kredit / Debit (Visa / Mastercard)',
                  icon: CreditCard,
                  desc: 'Enkripsi aman 3D-Secure 256-bit.',
                },
                {
                  id: 'WeChat Pay / Alipay',
                  label: 'WeChat Pay / Alipay (微信支付 / 支付宝)',
                  icon: QrCode,
                  desc: 'Pembayaran langsung mata uang Yuan/RMB untuk kemudahan lintas negara.',
                },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary-light/40 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={isSelected}
                      onChange={() => setPaymentMethod(m.id as any)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
                        <span className={`text-xs font-bold ${isSelected ? 'text-dark' : 'text-gray-700'}`}>
                          {m.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: ORDER SUMMARY (PRD Section 12) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-card sticky top-28 space-y-6">
          <h2 className="text-base font-extrabold text-dark uppercase tracking-wider pb-3 border-b border-gray-100">
            ORDER SUMMARY
          </h2>

          {/* Items breakdown */}
          <div className="space-y-3 divide-y divide-gray-50">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                <div className="flex-1 pr-3">
                  <span className="font-bold text-gray-800 line-clamp-1">{product.name}</span>
                  <span className="text-gray-400 text-[11px] font-medium">x {quantity}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-dark block">{formatIdr(product.priceIdr * quantity)}</span>
                  <span className="text-[10px] text-red-600 font-chinese font-semibold">{formatCny(product.priceCny * quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-dark">{formatIdr(subtotalIdr)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-bold text-dark">{formatIdr(shippingIdr)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-dark text-sm uppercase">TOTAL</span>
              <span className="text-2xl font-extrabold text-primary">{formatIdr(totalIdr)}</span>
            </div>
            <div className="flex justify-end text-xs font-bold text-gray-500 font-chinese">
              ≈ {formatCny(totalCny)}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-md shadow-red-200 transition-all hover:scale-[1.01]"
          >
            {isSubmitting ? (
              <span>Memproses Pesanan...</span>
            ) : (
              <>
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Garansi Keamanan Transaksi SSL 256-Bit</span>
          </div>

        </div>

      </form>

    </div>
  );
}
