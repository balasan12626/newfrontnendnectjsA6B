import { useState } from 'react';
import { Metadata } from 'next';
import ProductCard from '@/components/products/product-card';
import ProductFilters from '@/components/products/product-filters';
import ProductSort from '@/components/products/product-sort';
import { Input } from '@/components/ui/input';
import { getTopProducts, getFeaturedProducts } from '@/lib/products';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | Boult.neu',
  description: 'Browse our collection of premium audio products.',
};

export default async function ProductsPage() {
  const [topProducts, featuredProducts] = await Promise.all([
    getTopProducts(),
    getFeaturedProducts()
  ]);

  const allProducts = [...topProducts, ...featuredProducts];
  
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">All Products</h1>
        
        {/* Search and Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
            />
          </div>
          <ProductSort />
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          {/* Filters Sidebar */}
          <aside className="hidden md:block">
            <ProductFilters />
          </aside>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}