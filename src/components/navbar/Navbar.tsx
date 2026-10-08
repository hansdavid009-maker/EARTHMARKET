'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowLeftRight, BookOpen, Package, User, Search, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Exchange', href: '/exchange', icon: ArrowLeftRight },
    { name: 'Mandarin', href: '/mandarin', icon: BookOpen },
    { name: 'Orders', href: '/orders', icon: Package },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
              <span className="font-bold text-xl font-chinese">红</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-dark flex items-center gap-1">
                Red<span className="text-primary">Mandarin</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
                China Trade & Culture Hub
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-primary bg-primary-light font-bold'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Cart, Account, Admin */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Quick search input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="hidden lg:flex items-center relative"
            >
              <Search className="w-4 h-4 absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk / kata..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:bg-white w-48 transition-all"
              />
            </form>

            {/* Shopping Cart button */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              title="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Dashboard / Profile */}
            <Link
              href="/dashboard"
              className={`p-2.5 rounded-xl transition-colors ${
                pathname === '/dashboard'
                  ? 'text-primary bg-primary-light'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
              title="User Dashboard"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Admin Console shortcut */}
            <Link
              href="/admin"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 transition-colors ${
                pathname === '/admin'
                  ? 'bg-dark text-white border-dark'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-dark'
              }`}
              title="Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Admin</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}
