'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatIdr, formatCny } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-gray-700 shadow-sm">
          {product.category}
        </div>
        {product.nameZh && (
          <div className="absolute bottom-2 right-2 bg-dark/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-chinese">
            {product.nameZh}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
          </div>

          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-50">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-base font-bold text-dark">{formatIdr(product.priceIdr)}</p>
              <p className="text-xs font-semibold text-red-600 font-chinese">{formatCny(product.priceCny)}</p>
            </div>
            <span className="text-[11px] text-gray-400">
              Stok: <strong className="text-gray-600">{product.stock}</strong>
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Dimasukkan!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>+ Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
