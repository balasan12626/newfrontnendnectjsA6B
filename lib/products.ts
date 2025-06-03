import { Product } from '@/types/product';

// This is a mock implementation - in a real app, this would connect to an API or database
export async function getTopProducts(): Promise<Product[]> {
  // Simulate a server delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: '1',
      name: 'Boult AirBass X1 Pro True Wireless Earbuds',
      slug: 'boult-airbass-x1-pro',
      description: 'True wireless earbuds with 32-hour battery life and deep bass.',
      price: 59.99,
      originalPrice: 79.99,
      discountPercentage: 25,
      rating: 4.5,
      reviewCount: 128,
      images: [
        'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: true,
      stock: 24,
      categoryId: 'earbuds'
    },
    {
      id: '2',
      name: 'Boult ProBass Flow X Over-Ear Headphones',
      slug: 'boult-probass-flow-x',
      description: 'Over-ear headphones with active noise cancellation and premium sound.',
      price: 129.99,
      originalPrice: 149.99,
      discountPercentage: 13,
      rating: 4.7,
      reviewCount: 86,
      images: [
        'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: true,
      stock: 12,
      categoryId: 'headphones'
    },
    {
      id: '3',
      name: 'Boult AudioBass Home 500 Bluetooth Speaker',
      slug: 'boult-audiobass-home-500',
      description: 'Powerful Bluetooth speaker with 20W output and 12-hour battery life.',
      price: 89.99,
      originalPrice: 89.99,
      discountPercentage: 0,
      rating: 4.3,
      reviewCount: 54,
      images: [
        'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: false,
      stock: 18,
      categoryId: 'speakers'
    },
    {
      id: '4',
      name: 'Boult ProCharge X Fast Charging Cable',
      slug: 'boult-procharge-x',
      description: '3m long USB-C to USB-C braided cable with 100W fast charging support.',
      price: 19.99,
      originalPrice: 24.99,
      discountPercentage: 20,
      rating: 4.8,
      reviewCount: 212,
      images: [
        'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: false,
      stock: 42,
      categoryId: 'accessories'
    }
  ];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate a server delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: '5',
      name: 'Boult AudioZen Pro Noise Cancelling Headphones',
      slug: 'boult-audiozen-pro',
      description: 'Premium wireless headphones with adaptive noise cancellation.',
      price: 199.99,
      originalPrice: 249.99,
      discountPercentage: 20,
      rating: 4.9,
      reviewCount: 76,
      images: [
        'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: true,
      stock: 8,
      categoryId: 'headphones'
    },
    {
      id: '6',
      name: 'Boult BassX Mini Portable Bluetooth Speaker',
      slug: 'boult-bassx-mini',
      description: 'Ultra-portable waterproof Bluetooth speaker with punchy bass.',
      price: 49.99,
      originalPrice: 49.99,
      discountPercentage: 0,
      rating: 4.4,
      reviewCount: 102,
      images: [
        'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: false,
      stock: 32,
      categoryId: 'speakers'
    },
    {
      id: '7',
      name: 'Boult ProSound X5 True Wireless Earbuds',
      slug: 'boult-prosound-x5',
      description: 'Premium earbuds with aptX HD support and transparency mode.',
      price: 79.99,
      originalPrice: 99.99,
      discountPercentage: 20,
      rating: 4.6,
      reviewCount: 89,
      images: [
        'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: true,
      stock: 15,
      categoryId: 'earbuds'
    },
    {
      id: '8',
      name: 'Boult AudioStation 1000 Wireless Charger',
      slug: 'boult-audiostation-1000',
      description: '15W fast wireless charger with headphone stand functionality.',
      price: 39.99,
      originalPrice: 49.99,
      discountPercentage: 20,
      rating: 4.5,
      reviewCount: 64,
      images: [
        'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      isNew: false,
      stock: 28,
      categoryId: 'accessories'
    }
  ];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // In a real application, this would fetch from an API or database
  const allProducts = [
    ...(await getTopProducts()),
    ...(await getFeaturedProducts())
  ];
  
  return allProducts.find(product => product.slug === slug) || null;
}