import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-base font-chinese">
                红
              </div>
              <span className="text-lg font-bold text-dark">
                Red<span className="text-primary">Mandarin</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Platform terpadu untuk belanja kebutuhan China, simulasi penukaran Rupiah ke Yuan, dan kamus Bahasa Mandarin interaktif dengan asisten AI cerdas.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-dark uppercase tracking-wider mb-4">Fitur Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">Katalog Produk China</Link>
              </li>
              <li>
                <Link href="/exchange" className="hover:text-primary transition-colors">Kalkulator & Konversi Kurs IDR ↔ CNY</Link>
              </li>
              <li>
                <Link href="/mandarin" className="hover:text-primary transition-colors">Kamus Mandarin & Audio Hanzi</Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary transition-colors">Pelacakan Pesanan</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-dark uppercase tracking-wider mb-4">Pusat Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">Akun Saya</Link>
              </li>
              <li>
                <Link href="/exchange" className="hover:text-primary transition-colors">Panduan Pembayaran CNY</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">Admin Console</Link>
              </li>
              <li>
                <span className="text-gray-400">CS Hotline: +62 812-3456-7890</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-dark uppercase tracking-wider mb-2">Legal & Kepatuhan</h4>
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500 leading-relaxed border border-gray-100">
              <span className="font-semibold text-gray-700">Catatan Regulasi:</span> Layanan konversi mata uang mengikuti kurs pasar acuan. Pastikan mematuhi peraturan valuta asing & regulasi transaksi lintas batas.
            </div>
          </div>

        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} RedMandarin Inc. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Desktop-first Architecture</span>
            <span>•</span>
            <span>Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
