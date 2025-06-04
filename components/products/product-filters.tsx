'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filters</h3>
        <Accordion type="single" collapsible className="w-full">
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
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FilterCheckbox label="Headphones" />
                <FilterCheckbox label="Earbuds" />
                <FilterCheckbox label="Speakers" />
                <FilterCheckbox label="Accessories" />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="features">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FilterCheckbox label="Noise Cancelling" />
                <FilterCheckbox label="Wireless" />
                <FilterCheckbox label="Built-in Mic" />
                <FilterCheckbox label="Water Resistant" />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="rating">
            <AccordionTrigger>Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FilterCheckbox label="4★ & above" />
                <FilterCheckbox label="3★ & above" />
                <FilterCheckbox label="2★ & above" />
                <FilterCheckbox label="1★ & above" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function FilterCheckbox({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}