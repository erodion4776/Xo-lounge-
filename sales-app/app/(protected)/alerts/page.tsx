import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types/db';

export default async function AlertsPage() {
  const supabase = createClient();
  
  // Fetch ALL products where stock is at or below the alert level
  const { data: lowStockProducts, error } = await supabase
    .from('products')
    .select('*')
    .lte('stock_quantity', 'low_stock_alert')
    .order('stock_quantity', { ascending: false });

  if (error) {
    console.error('Error fetching alerts:', error);
    return <p className="text-red-500">Failed to load low stock alerts.</p>;
  }
  
  const alertCount = lowStockProducts?.length || 0;

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-red-500">Inventory Alerts</h2>
      <p className="text-lg text-gold-light/80">
        Currently, there are **{alertCount}** item(s) running low in stock.
      </p>

      {alertCount === 0 ? (
        <div className="p-10 bg-green-900/30 rounded-xl text-center text-green-300 border border-green-700">
          <p className="text-2xl font-bold">✅ All good! No low stock warnings.</p>
          <p className="mt-2 text-sm">Inventory levels are currently healthy.</p>
        </div>
      ) : (
        <div className="bg-dark-card rounded-xl overflow-hidden shadow-lg">
          <table className="min-w-full divide-y divide-gold-dark/20">
            <thead className="bg-red-900/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Alert Threshold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-dark/20">
              {lowStockProducts?.map((product: Product) => (
                <tr key={product.id} className="bg-red-900/10 hover:bg-dark-bg/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-300">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-400">{product.stock_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-light/80">{product.low_stock_alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
