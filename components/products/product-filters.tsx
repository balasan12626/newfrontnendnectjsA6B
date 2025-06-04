'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const clearFilters = () => {
    setSelectedFilters([]);
    setPriceRange([0, 500]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {(selectedFilters.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 500) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map(filter => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
              <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      )}
      
      <Accordion type="multiple" className="w-full" defaultValue={['price', 'category']}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                step={10}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <div className="rounded-md border px-3 py-1">
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                </div>
                <div className="rounded-md border px-3 py-1">
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <FilterCheckbox 
                label="Headphones" 
                checked={selectedFilters.includes('Headphones')}
                onCheckedChange={() => handleFilterChange('Headphones')}
              />
              <FilterCheckbox 
                label="Earbuds"
                checked={selectedFilters.includes('Earbuds')}
                onCheckedChange={() => handleFilterChange('Earbuds')}
              />
              <FilterCheckbox 
                label="Speakers"
                checked={selectedFilters.includes('Speakers')}
                onCheckedChange={() => handleFilterChange('Speakers')}
              />
              <FilterCheckbox 
                label="Accessories"
                checked={selectedFilters.includes('Accessories')}
                onCheckedChange={() => handleFilterChange('Accessories')}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <FilterCheckbox 
                label="Noise Cancelling"
                checked={selectedFilters.includes('Noise Cancelling')}
                onCheckedChange={() => handleFilterChange('Noise Cancelling')}
              />
              <FilterCheckbox 
                label="Wireless"
                checked={selectedFilters.includes('Wireless')}
                onCheckedChange={() => handleFilterChange('Wireless')}
              />
              <FilterCheckbox 
                label="Built-in Mic"
                checked={selectedFilters.includes('Built-in Mic')}
                onCheckedChange={() => handleFilterChange('Built-in Mic')}
              />
              <FilterCheckbox 
                label="Water Resistant"
                checked={selectedFilters.includes('Water Resistant')}
                onCheckedChange={() => handleFilterChange('Water Resistant')}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <FilterCheckbox 
                label="4★ & above"
                checked={selectedFilters.includes('4★ & above')}
                onCheckedChange={() => handleFilterChange('4★ & above')}
              />
              <FilterCheckbox 
                label="3★ & above"
                checked={selectedFilters.includes('3★ & above')}
                onCheckedChange={() => handleFilterChange('3★ & above')}
              />
              <FilterCheckbox 
                label="2★ & above"
                checked={selectedFilters.includes('2★ & above')}
                onCheckedChange={() => handleFilterChange('2★ & above')}
              />
              <FilterCheckbox 
                label="1★ & above"
                checked={selectedFilters.includes('1★ & above')}
                onCheckedChange={() => handleFilterChange('1★ & above')}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface FilterCheckboxProps {
  label: string;
  checked?: boolean;
  onCheckedChange?: () => void;
}

function FilterCheckbox({ label, checked, onCheckedChange }: FilterCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={label} 
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}