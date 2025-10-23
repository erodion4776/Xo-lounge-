import { createClient } from '@/lib/supabase/server';
import dynamic from 'next/dynamic';
import { StaffSale } from '@/types/db';

// Dynamic import for client-side Chart component
const ProfitChart = dynamic(() => import('@/components/Chart').then(mod => mod.ProfitChart), { ssr: false });

export default async function ReportsPage() {
  const supabase = createClient();
  
  // --- Sales Aggregation (Skeletal Query) ---
  // In a real application, you'd use a SQL function in Supabase to group and sum data.
  const { data: salesSummary } = await supabase
    .from('staff_sales')
    .select('profit, product_id, quantity_sold')
    .returns<Pick<StaffSale, 'profit' | 'product_id' | 'quantity_sold'>[]>();
    
  // Simple mock data for charts/reports
  const topSellingProducts = [
    { name: 'XO Special Cocktail', quantity: 500 },
    { name: 'Premium Whiskey Shot', quantity: 420 },
    { name: 'Draft Beer Pint', quantity: 380 },
  ];
  
  const profitTrends = [
    { day: 'W1', profit: 4500 },
    { day: 'W2', profit: 6000 },
    { day: 'W3', profit: 5500 },
    { day: 'W4', profit: 7100 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-gold-accent">Sales & Profit Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profit Trend Chart */}
        <div className="bg-dark-card p-6 rounded-xl border border-gold-dark/30">
          <h3 className="text-xl font-bold text-gold-light mb-4">Monthly Profit Trend</h3>
          <ProfitChart data={profitTrends} labelKey="day" dataKey="profit" type="line" />
        </div>

        {/* Top Selling Products */}
        <div className="bg-dark-card p-6 rounded-xl border border-gold-dark/30">
          <h3 className="text-xl font-bold text-gold-light mb-4">Top Selling Products</h3>
          <ul className="space-y-3">
            {topSellingProducts.map((p, index) => (
              <li key={p.name} className="flex justify-between items-center p-3 bg-dark-bg/50 rounded-lg">
                <span className="font-semibold text-gold-accent">{index + 1}. {p.name}</span>
                <span className="text-lg font-bold text-gold-light">{p.quantity} Sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
