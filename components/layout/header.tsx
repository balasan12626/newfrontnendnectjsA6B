'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  User,
  Search,
  Heart,
  Menu,
  X,
  Headphones,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            <span className="text-xl font-bold">Boult.neu</span>
          </Link>
        </div>

        <nav
          className={cn(
            'absolute left-0 right-0 top-16 bg-background md:static md:flex md:items-center md:space-x-4',
            mobileMenuOpen ? 'block border-b p-4' : 'hidden'
          )}
        >
          <ul className="flex flex-col space-y-2 md:flex-row md:space-x-6 md:space-y-0">
            <li>
              <Link
                href="/products"
                className="block py-2 transition-colors hover:text-primary md:py-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="block py-2 transition-colors hover:text-primary md:py-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/deals"
                className="block py-2 transition-colors hover:text-primary md:py-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 transition-colors hover:text-primary md:py-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/auth/register">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}