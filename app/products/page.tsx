'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import ProductCard from '@/components/products/product-card';
import ProductFilters from '@/components/products/product-filters';
import ProductSort from '@/components/products/product-sort';
import { Input } from '@/components/ui/input';
import { getTopProducts, getFeaturedProducts } from '@/lib/products';
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Products | Boult.neu',
  description: 'Browse our collection of premium audio products.',
};

export default async function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [topProducts, featuredProducts] = await Promise.all([
    getTopProducts(),
    getFeaturedProducts()
  ]);

  const allProducts = [...topProducts, ...featuredProducts];
  
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">All Products</h1>
        
        {/* Search, Sort, and View Toggle */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ProductSort />
            
            <div className="hidden md:flex items-center gap-1 border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none",
                  viewMode === 'grid' && "bg-accent"
                )}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none",
                  viewMode === 'list' && "bg-accent"
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ProductFilters />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          {/* Filters Sidebar */}
          <aside className="hidden md:block">
            <ProductFilters />
          </aside>
          
          {/* Product Grid/List */}
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
          )}>
            {allProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                view={viewMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}