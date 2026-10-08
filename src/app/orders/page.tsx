'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOrders } from '@/context/OrderContext';
import { formatIdr, formatCny } from '@/lib/utils';
import { Package, Clock, CheckCircle, Truck, ArrowRight, ExternalLink } from 'lucide-react';

export default function OrdersPage() {
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Processing</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Shipped</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-dark tracking-tight">
            Pesanan Saya (Orders)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Lacak status pengiriman paket dan arsip transaksi pembelian Anda.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
        >
          <span>Belanja Produk Baru</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-dark">Belum Ada Riwayat Pesanan</h2>
          <p className="text-xs text-gray-400 mt-1 mb-6">
            Anda belum pernah membuat transaksi pembelian. Temukan barang kebutuhan Anda di katalog produk.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-card transition-all space-y-6"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-dark text-base">
                      #{order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-xs text-gray-400">
                    Dipesan pada: <strong className="text-gray-600">{order.createdAt}</strong> • Metode: <strong className="text-gray-600">{order.paymentMethod}</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-gray-400 font-medium block">Total Pembayaran</span>
                  <span className="text-xl font-extrabold text-dark">{formatIdr(order.totalIdr)}</span>
                  <span className="text-xs font-bold text-red-600 font-chinese ml-2">≈ {formatCny(order.totalCny)}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-dark line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.quantity} x {formatIdr(item.priceIdr)} <span className="font-chinese text-red-500">({formatCny(item.priceCny)})</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-xs text-dark block">{formatIdr(item.priceIdr * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping info footer */}
              <div className="pt-4 border-t border-gray-100 bg-gray-50/70 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-600 gap-2">
                <div>
                  <span className="font-bold text-dark">Alamat Pengiriman: </span>
                  <span>{order.customerName} ({order.customerPhone}) — {order.shippingAddress}, {order.shippingCity} {order.postalCode}</span>
                </div>
                <div className="text-emerald-700 font-semibold flex items-center gap-1 flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Resi Pengiriman Otomatis Aktif</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
