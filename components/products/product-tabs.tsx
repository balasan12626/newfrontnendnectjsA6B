'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');
  
  // Mocked specifications and reviews
  const specifications = [
    { name: 'Driver Size', value: '40mm' },
    { name: 'Frequency Response', value: '20Hz - 20kHz' },
    { name: 'Impedance', value: '32 Ohm' },
    { name: 'Battery Life', value: 'Up to 30 hours' },
    { name: 'Charging Time', value: '2 hours' },
    { name: 'Bluetooth Version', value: '5.2' },
    { name: 'Water Resistance', value: 'IPX5' },
    { name: 'Weight', value: '250g' }
  ];
  
  const reviews = [
    {
      id: 1,
      user: 'Alex Johnson',
      rating: 5,
      date: '2023-11-10',
      title: 'Exceptional sound quality',
      content: 'These are the best headphones I\'ve ever owned. The sound quality is incredible and the noise cancellation works perfectly. Battery life is also impressive!',
      helpful: 24,
      notHelpful: 2
    },
    {
      id: 2,
      user: 'Sarah Miller',
      rating: 4,
      date: '2023-10-28',
      title: 'Great but could be more comfortable',
      content: 'Sound quality is excellent and the battery lasts forever. My only complaint is that they get a bit uncomfortable after wearing them for several hours.',
      helpful: 15,
      notHelpful: 3
    },
    {
      id: 3,
      user: 'Mike Chen',
      rating: 5,
      date: '2023-10-15',
      title: 'Perfect for commuting',
      content: 'The noise cancellation is perfect for my daily commute on the subway. I can finally enjoy my music without cranking up the volume to dangerous levels.',
      helpful: 18,
      notHelpful: 0
    }
  ];
  
  return (
    <Tabs 
      defaultValue="description" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="mt-16"
    >
      <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent max-w-md">
        <TabsTrigger 
          value="description" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="specifications" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Reviews ({product.reviewCount})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="pt-6">
        <div className="prose dark:prose-invert max-w-none">
          <p>{product.description}</p>
          <p>
            Experience audio like never before with our premium sound technology. 
            Designed for audiophiles and casual listeners alike, these headphones 
            deliver crystal clear highs, rich mids, and deep, powerful bass.
          </p>
          <h3>Key Features:</h3>
          <ul>
            <li>Advanced noise cancellation technology</li>
            <li>High-resolution audio certified</li>
            <li>Extended battery life for all-day listening</li>
            <li>Comfortable, lightweight design</li>
            <li>Premium materials for durability</li>
            <li>Bluetooth 5.2 with multi-device connectivity</li>
          </ul>
          <p>
            Whether you're commuting, working out, or just relaxing at home, 
            these headphones provide the perfect soundscape for every moment.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="specifications" className="pt-6">
        <div className="overflow-hidden rounded-lg border">
          <table className="min-w-full divide-y">
            <tbody className="divide-y">
              {specifications.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                  <td className="px-6 py-4 font-medium">{spec.name}</td>
                  <td className="px-6 py-4">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="pt-6" id="reviews">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : i < product.rating
                          ? 'fill-primary/50 text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium">{product.rating.toFixed(1)}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  Based on {product.reviewCount} reviews
                </span>
              </div>
            </div>
            <Button>Write a Review</Button>
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{review.title}</h4>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">by {review.user}</span>
                </div>
                
                <p className="mt-3 text-muted-foreground">{review.content}</p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Was this review helpful?</span>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ThumbsUp className="h-4 w-4" /> 
                    <span>{review.helpful}</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ThumbsDown className="h-4 w-4" /> 
                    <span>{review.notHelpful}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}