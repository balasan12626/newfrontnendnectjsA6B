import Link from 'next/link';
import { Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Headphones className="h-6 w-6" />
              <span className="text-xl font-bold">Boult.neu</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium audio products to elevate your sound experience.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-foreground">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-foreground">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-muted-foreground hover:text-foreground">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-muted-foreground hover:text-foreground">
                  Warranty Information
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Boult.neu. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-foreground">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}