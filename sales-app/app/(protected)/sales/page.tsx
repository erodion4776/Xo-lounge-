// app/(protected)/sales/page.tsx
'use client';

import { useFormStatus, useFormState } from 'react-dom';
import { logSale } from '@/lib/actions';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/db';

const initialState = { error: null, message: null };

// Client Component to handle form submission state
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 rounded-md text-dark-bg bg-gold-accent hover:bg-gold-dark transition-colors disabled:opacity-50"
    >
      {pending ? 'Logging Sale...' : 'Log Sale'}
    </button>
  );
}

export default function SalesPage() {
  // Hook to handle Server Action response and state
  const [state, formAction] = useFormState(logSale, initialState);
  const [products, setProducts] = useState<Product[]>([]);
  const [staffName, setStaffName] = useState('Staff'); // Default name
  
  useEffect(() => {
    // Client-side fetch for products and current user's name
    async function fetchData() {
      const supabase = createClient();
      
      // Fetch Products
      const { data: productData } = await supabase
        .from('products')
        .select('*')
        .order('name')
        .returns<Product[]>();
      setProducts(productData || []);

      // Fetch Staff Name (using auth user's email as a simple name proxy)
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
          setStaffName(user.email.split('@')[0]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-8 p-6 bg-dark-card rounded-xl shadow-2xl border border-gold-dark/50">
      <h2 className="text-3xl font-bold text-gold-accent text-center">Log New Sale</h2>

      {/* Dynamic Feedback Banners */}
      {state.error && (
        <p className="p-3 bg-red-900/50 text-red-300 rounded-md border border-red-700">Error: {state.error}</p>
      )}
      {state.message && (
        <p className="p-3 bg-green-900/50 text-green-300 rounded-md border border-green-700">Success: {state.message}</p>
      )}

      {/* The form calls the logSale Server Action */}
      <form action={formAction} className="space-y-4">
        {/* Hidden field for staff name */}
        <input type="hidden" name="staff_name" value={staffName} />

        <div>
          <label htmlFor="product_id" className="block text-sm font-medium text-gold-light/80">Product Sold</label>
          <select
            id="product_id"
            name="product_id"
            required
            className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light focus:ring-gold-accent focus:border-gold-accent"
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.stock_quantity})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity_sold" className="block text-sm font-medium text-gold-light/80">Quantity Sold</label>
          <input
            id="quantity_sold"
            name="quantity_sold"
            type="number"
            required
            min="1"
            className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light focus:ring-gold-accent focus:border-gold-accent"
            placeholder="1"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
