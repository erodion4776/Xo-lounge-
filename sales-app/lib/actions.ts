'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server'; // Import server client
import { Product } from '@/types/db'; // Import types

// --- Auth Actions ---

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // In a production app, use a proper error logging/feedback mechanism
    console.error('Login Error:', error.message);
    return { error: 'Invalid credentials or login failed.' };
  }
  redirect('/dashboard');
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/');
}

// --- Sales Actions ---

type LogSaleState = { error: string | null; message: string | null; };

export async function logSale(
  prevState: LogSaleState,
  formData: FormData
): Promise<LogSaleState> {
  const supabase = createClient();
  const staff_name = formData.get('staff_name') as string;
  const product_id = formData.get('product_id') as string;
  const quantity_sold = parseInt(formData.get('quantity_sold') as string, 10);

  if (!staff_name || !product_id || isNaN(quantity_sold) || quantity_sold <= 0) {
    return { error: 'Invalid input.', message: null };
  }

  // 1. Fetch Product and Check Stock
  const { data: product } = await supabase
    .from('products')
    .select('cost_price, sale_price, stock_quantity')
    .eq('id', product_id)
    .single();

  if (!product || product.stock_quantity < quantity_sold) {
    return { error: 'Product not found or insufficient stock.', message: null };
  }

  // 2. Calculate Profit and Total Sale
  const total_sale_amount = product.sale_price * quantity_sold;
  const profit = (product.sale_price - product.cost_price) * quantity_sold;

  // 3. Log Sale
  const { error: saleError } = await supabase.from('staff_sales').insert({
    staff_name, product_id, quantity_sold, total_sale_amount, profit,
  });

  if (saleError) { return { error: `Failed to log sale: ${saleError.message}`, message: null }; }

  // 4. Update Stock (Auto-deduct)
  const new_stock = product.stock_quantity - quantity_sold;
  await supabase
    .from('products')
    .update({ stock_quantity: new_stock })
    .eq('id', product_id);
    
  // Revalidate the pages that display this data
  revalidatePath('/dashboard');
  revalidatePath('/sales');

  return { error: null, message: `Sale logged! Profit: $${profit.toFixed(2)}` };
}

// --- Product CRUD Actions ---

export async function saveProduct(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string | null;
  
  const data: Partial<Product> = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    cost_price: parseFloat(formData.get('cost_price') as string),
    sale_price: parseFloat(formData.get('sale_price') as string),
    stock_quantity: parseInt(formData.get('stock_quantity') as string, 10),
    low_stock_alert: parseInt(formData.get('low_stock_alert') as string, 10),
  };

  let error: any;

  if (id) {
    // Update existing product
    ({ error } = await supabase.from('products').update(data).eq('id', id));
  } else {
    // Insert new product
    ({ error } = await supabase.from('products').insert(data as Product[]));
  }

  if (error) {
    console.error('Product Save Error:', error.message);
    return { error: 'Failed to save product.' };
  }

  revalidatePath('/products');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Product Delete Error:', error.message);
    return { error: 'Failed to delete product.' };
  }

  revalidatePath('/products');
  return { success: true };
}
