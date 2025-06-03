import { getTopProducts } from '@/lib/products';
import ProductCard from '@/components/products/product-card';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default async function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  // In a real app, you would fetch related products by category
  const allProducts = await getTopProducts();
  
  // Filter products in the same category, excluding the current product
  const relatedProducts = allProducts
    .filter(product => product.categoryId === categoryId && product.id !== currentProductId)
    .slice(0, 4);
  
  // If we don't have enough related products, add some from other categories
  if (relatedProducts.length < 4) {
    const otherProducts = allProducts
      .filter(product => product.id !== currentProductId && !relatedProducts.includes(product))
      .slice(0, 4 - relatedProducts.length);
    
    relatedProducts.push(...otherProducts);
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {relatedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}