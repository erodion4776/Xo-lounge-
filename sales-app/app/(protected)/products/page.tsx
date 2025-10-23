import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types/db';
import ProductForm from '@/components/ProductForm';
import { deleteProduct } from '@/lib/actions';

// This is a Server Component to fetch data
export default async function ProductsPage() {
  const supabase = createClient();
  
  // Fetch all products for the inventory list
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name')
    .returns<Product[]>();

  if (error) {
    console.error('Error fetching products:', error);
    return <p className="text-red-500">Failed to load inventory data.</p>;
  }

  // Bind the delete function to a server action for use in the form
  // We cannot define this inside the loop, so we define a helper wrapper
  // Note: deleteProduct is the Server Action from '@/lib/actions'

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-gold-accent">Product & Inventory Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add New Product Form */}
        <div className="lg:col-span-1 bg-dark-card p-6 rounded-xl border border-gold-dark/30 h-fit">
          <h3 className="text-xl font-bold text-gold-light mb-4">Add New Product</h3>
          <ProductForm /> 
        </div>

        {/* Right Column: Inventory List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gold-light">Current Inventory ({products?.length || 0})</h3>
          
          <div className="bg-dark-card rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gold-dark/20">
              <thead className="bg-dark-bg/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Sale Price</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-dark/20">
                {products?.map((product: Product) => (
                  <tr 
                    key={product.id} 
                    className={product.stock_quantity <= product.low_stock_alert ? 'bg-red-900/10' : 'hover:bg-dark-bg/50 transition-colors'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gold-light">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-light">
                      {product.stock_quantity}
                      {product.stock_quantity <= product.low_stock_alert && <span className="ml-2 text-xs text-red-400 font-bold">LOW</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-light">${product.sale_price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* THIS IS THE CORRECT SERVER ACTION BINDING */}
                      <form action={deleteProduct.bind(null, product.id)} className="inline-block">
                        <button 
                            type="submit" 
                            className="text-red-500 hover:text-red-300 ml-4 p-1 rounded-md"
                        >
                            Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
