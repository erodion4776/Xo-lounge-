'use client';

import { useFormStatus } from 'react-dom';
import { saveProduct } from '@/lib/actions';
import { Product } from '@/types/db';
import { useState } from 'react';

// A simple local state component to handle form submission status and reset
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2 px-4 rounded-md text-dark-bg bg-gold-accent hover:bg-gold-dark transition-colors disabled:opacity-50 mt-4"
    >
      {pending ? 'Saving Product...' : 'Save Product'}
    </button>
  );
}

// Reusable form for adding/editing a product
export default function ProductForm({ initialData }: { initialData?: Product }) {
  const [success, setSuccess] = useState(false);
  
  // Wrapper around the Server Action to handle success feedback
  const handleSubmit = async (formData: FormData) => {
    // If we have initial data (editing), add the ID to the form data
    if (initialData?.id) {
        formData.append('id', initialData.id);
    }

    const result = await saveProduct(formData);
    
    if (result && result.success) {
        setSuccess(true);
        // In a real app, you might reset the form or close a modal here.
        setTimeout(() => setSuccess(false), 3000);
    } else if (result && result.error) {
        // Handle error feedback (e.g., show a toast/alert)
        console.error("Product save failed:", result.error);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
        {success && (
            <div className="p-3 bg-green-900/50 text-green-300 rounded-md border border-green-700">
                Product saved successfully!
            </div>
        )}

        {/* Name */}
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gold-light/80">Product Name</label>
            <input
                id="name" name="name" type="text" required
                defaultValue={initialData?.name || ''}
                className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
                placeholder="XO Signature Gin"
            />
        </div>

        {/* Category */}
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gold-light/80">Category</label>
            <input
                id="category" name="category" type="text"
                defaultValue={initialData?.category || ''}
                className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
                placeholder="Liquor, Mixer, Appetizer, etc."
            />
        </div>

        {/* Prices and Stock (side by side on larger screens) */}
        <div className="grid grid-cols-2 gap-4">
            {/* Cost Price */}
            <div>
                <label htmlFor="cost_price" className="block text-sm font-medium text-gold-light/80">Cost Price ($)</label>
                <input
                    id="cost_price" name="cost_price" type="number" step="0.01" required
                    defaultValue={initialData?.cost_price || ''}
                    className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
                    placeholder="5.00"
                />
            </div>
            {/* Sale Price */}
            <div>
                <label htmlFor="sale_price" className="block text-sm font-medium text-gold-light/80">Sale Price ($)</label>
                <input
                    id="sale_price" name="sale_price" type="number" step="0.01" required
                    defaultValue={initialData?.sale_price || ''}
                    className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
                    placeholder="15.00"
                />
            </div>
        </div>

        {/* Stock and Alert */}
        <div className="grid grid-cols-2 gap-4">
            {/* Stock Quantity */}
            <div>
                <label htmlFor="stock_quantity" className="block text-sm font-medium text-gold-light/80">Stock Quantity</label>
                <input
                    id="stock_quantity" name="stock_quantity" type="number" required
                    defaultValue={initialData?.stock_quantity || 0}
                    className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
                    placeholder="100"
                />
            </div>
            {/* Low Stock Alert */}
            <div>
                <label htmlFor="low_stock_alert" className="block text-sm font-medium text-gold-light/80">Low Stock Alert</label>
                <input
                    id="low_stock_alert" name="low_stock_alert" type="number" required
                    defaultValue={initialData?.low_stock_alert || 10}
                    className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
                    placeholder="10"
                />
            </div>
        </div>
        
        <SubmitButton />
    </form>
  );
}
