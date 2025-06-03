'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isHovered && product.images.length > 1 ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Secondary Image on Hover */}
        {product.images.length > 1 && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - alternate view`}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        
        {/* Quick Action Buttons */}
        <div 
          className={cn(
            "absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Product Badges */}
        {(product.isNew || product.discountPercentage > 0) && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="default\" className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.discountPercentage > 0 && (
              <Badge variant="destructive">-{product.discountPercentage}%</Badge>
            )}
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
        </div>
        
        <Link href={`/products/${product.slug}`} className="mb-2 line-clamp-2 flex-1 font-medium hover:underline">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}