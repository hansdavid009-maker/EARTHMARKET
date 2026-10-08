'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = ['All', 'Travel', 'Fashion', 'Gadget', 'Souvenir'];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.nameZh && product.nameZh.includes(searchTerm));
      
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesPrice = product.priceIdr <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceIdr - b.priceIdr;
      if (sortBy === 'price-desc') return b.priceIdr - a.priceIdr;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchTerm, selectedCategory, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMaxPrice(1000000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-dark tracking-tight">
          Katalog Produk China
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Perlengkapan perjalanan esensial, gadget bypass Great Firewall, dan suvenir otentik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTER (PRD Layout) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 font-bold text-dark text-sm">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span>FILTER PRODUK</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-primary flex items-center gap-1 transition-colors"
                title="Reset Filter"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">
                Pencarian
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nama produk / kata kunci..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2.5 uppercase tracking-wide">
                Kategori
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-light text-primary font-bold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] text-gray-400">
                      {cat === 'All'
                        ? INITIAL_PRODUCTS.length
                        : INITIAL_PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Harga Maksimal
                </label>
                <span className="text-xs font-bold text-primary">
                  Rp {maxPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Rp 100k</span>
                <span>Rp 1.000k</span>
              </div>
            </div>

          </div>
        </div>

        {/* MAIN PRODUCT GRID */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Sort & Count Bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium">
              Menampilkan <strong className="text-dark font-bold">{filteredProducts.length}</strong> produk
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-xs text-dark rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-primary"
              >
                <option value="featured">Paling Populer</option>
                <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <p className="text-base font-bold text-gray-700">Tidak ada produk yang sesuai dengan filter.</p>
              <p className="text-xs text-gray-400 mt-1">Coba ubah kata kunci atau rentang harga.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover"
              >
                Reset Semua Filter
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm font-semibold text-gray-500">
        Memuat katalog produk...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
