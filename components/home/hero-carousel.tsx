'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "Experience Superior Sound",
    description: "Our new noise-cancelling headphones deliver unmatched audio clarity",
    image: "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: { text: "Shop Now", link: "/products/categories/headphones" }
  },
  {
    id: 2,
    title: "Wireless Freedom",
    description: "True wireless earbuds with 24-hour battery life",
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: { text: "Explore", link: "/products/categories/earbuds" }
  },
  {
    id: 3,
    title: "Limited Edition Colors",
    description: "New season, new colors - Exclusive collection available now",
    image: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cta: { text: "View Collection", link: "/products/collections/limited-edition" }
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };
  
  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };
  
  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [currentSlide]);
  
  return (
    <section className="relative h-[70vh] max-h-[600px] min-h-[400px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-500",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/30" />
          </div>
          
          {/* Content */}
          <div className="container relative flex h-full items-center">
            <div className="max-w-lg">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mb-6 text-lg md:text-xl text-muted-foreground">
                {slide.description}
              </p>
              <Button size="lg" asChild>
                <Link href={slide.cta.link}>
                  {slide.cta.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/20 hover:bg-background/40"
        onClick={prevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/20 hover:bg-background/40"
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-8 rounded-full transition-colors",
              index === currentSlide ? "bg-primary" : "bg-primary/30"
            )}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}