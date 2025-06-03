import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'headphones',
    name: 'Headphones',
    image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    count: 42
  },
  {
    id: 'earbuds',
    name: 'Earbuds',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    count: 27
  },
  {
    id: 'speakers',
    name: 'Speakers',
    image: 'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    count: 35
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    count: 19
  }
];

export default function FeaturedCategories() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products/categories/${category.id}`}
          className="group overflow-hidden rounded-lg border bg-card transition-colors hover:bg-card/80"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} products</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}