'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
  view?: 'grid' | 'list';
}

export default function ProductCard({ product, className, view = 'grid' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const CardContent = () => (
    <>
      {/* Product Image */}
      <div className={cn(
        "relative overflow-hidden",
        view === 'grid' ? "aspect-square" : "aspect-[3/2] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[2/1]"
      )}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isHovered && product.images.length > 1 ? "opacity-0" : "opacity-100"
          )}
          sizes={view === 'grid' 
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : "100vw"
          }
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
            sizes={view === 'grid'
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              : "100vw"
            }
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
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Quick View</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm font-medium">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">
                      {product.reviewCount} reviews
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Product Badges */}
        {(product.isNew || product.discountPercentage > 0) && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                New
              </Badge>
            )}
            {product.discountPercentage > 0 && (
              <Badge variant="destructive">-{product.discountPercentage}%</Badge>
            )}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className={cn(
        "flex flex-col",
        view === 'grid' ? "p-4" : "flex-1 p-4"
      )}>
        <div className="mb-1 flex items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
        </div>
        
        <Link 
          href={`/products/${product.slug}`} 
          className={cn(
            "line-clamp-2 font-medium hover:underline",
            view === 'grid' ? "mb-2 flex-1" : "mb-4 text-xl"
          )}
        >
          {product.name}
        </Link>
        
        {view === 'list' && (
          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {product.description}
          </p>
        )}
        
        <div className={cn(
          "flex items-center",
          view === 'list' && "justify-between"
        )}>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {view === 'list' && (
            <div className="flex gap-2">
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
  return (
    <div 
      className={cn(
        "group relative flex overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md",
        view === 'grid' ? "flex-col" : "flex-row",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent />
    </div>
  );
}