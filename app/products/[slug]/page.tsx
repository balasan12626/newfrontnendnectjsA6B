import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getTopProducts, getFeaturedProducts } from '@/lib/products';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductTabs from '@/components/products/product-tabs';
import RelatedProducts from '@/components/products/related-products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const [topProducts, featuredProducts] = await Promise.all([
    getTopProducts(),
    getFeaturedProducts()
  ]);

  const allProducts = [...topProducts, ...featuredProducts];
  
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Boult.neu',
      description: 'The requested product could not be found.',
    };
  }
  
  return {
    title: `${product.name} | Boult.neu`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], alt: product.name }],
      type: 'website'
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li>
            <Link 
              href={`/products/categories/${product.categoryId}`} 
              className="text-muted-foreground hover:text-foreground capitalize"
            >
              {product.categoryId}
            </Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li className="truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            
            {/* Product Badges */}
            {(product.isNew || product.discountPercentage > 0) && (
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="default\" className="bg-primary text-primary-foreground">New</Badge>
                )}
                {product.discountPercentage > 0 && (
                  <Badge variant="destructive">-{product.discountPercentage}%</Badge>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square cursor-pointer overflow-hidden rounded-md border hover:border-primary">
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : i < product.rating
                        ? 'fill-primary/50 text-primary'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <Link href="#reviews" className="text-sm text-muted-foreground hover:text-foreground">
                {product.reviewCount} reviews
              </Link>
              <span className="text-muted-foreground">|</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                {product.stock > 0 ? 'In stock' : 'Out of stock'}
              </span>
            </div>
          </div>
          
          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-green-600 dark:text-green-400">
                You save: ${(product.originalPrice - product.price).toFixed(2)} ({product.discountPercentage}% off)
              </p>
            )}
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground">{product.description}</p>
          
          {/* Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-32 border">
                <button className="flex w-10 items-center justify-center border-r hover:bg-muted">-</button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  className="w-full border-0 bg-transparent text-center focus:outline-none focus:ring-0"
                />
                <button className="flex w-10 items-center justify-center border-l hover:bg-muted">+</button>
              </div>
              
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon" aria-label="Add to wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon" aria-label="Share product">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <Button variant="secondary" className="w-full">Buy Now</Button>
          </div>
          
          {/* Features */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium">Free shipping</span>
              <span className="text-sm text-muted-foreground">on orders over $99</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium">In stock</span>
              <span className="text-sm text-muted-foreground">ready to ship</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium">2-year warranty</span>
              <span className="text-sm text-muted-foreground">on all Boult.neu products</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs: Description, Specifications, Reviews */}
      <ProductTabs product={product} />
      
      {/* Related Products */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
        <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
      </section>
    </div>
  );
}