import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/product-card';
import HeroCarousel from '@/components/home/hero-carousel';
import FeaturedCategories from '@/components/home/featured-categories';
import { getTopProducts, getFeaturedProducts } from '@/lib/products';

export default async function Home() {
  // In a real application, these would fetch from an API
  const topProducts = await getTopProducts();
  const featuredProducts = await getFeaturedProducts();
  
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <HeroCarousel />
      
      {/* Featured Categories */}
      <section className="container">
        <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">Shop by Category</h2>
        <FeaturedCategories />
      </section>
      
      {/* New Arrivals */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">New Arrivals</h2>
          <Link href="/products?sort=newest" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Featured Banner */}
      <section className="bg-accent">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Premium Sound Experience</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Experience crystal clear audio with our flagship noise-cancelling headphones.
                Designed for audiophiles and everyday listeners alike.
              </p>
              <div>
                <Button size="lg" asChild>
                  <Link href="/products/categories/headphones">Shop Headphones</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3]">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium headphones"
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Products</h2>
          <Link href="/products?featured=true" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="bg-muted">
        <div className="container py-12">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-muted-foreground">
              Get updates on new products, exclusive offers, and audio tips delivered to your inbox.
            </p>
            <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}