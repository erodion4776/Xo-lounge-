import { createClient } from '@/lib/supabase/server';
import StatCard from '@/components/StatCard';
import { AlertBanner } from '@/components/AlertBanner';
import { Product, StaffSale } from '@/types/db';
import dynamic from 'next/dynamic';

// Dynamically import the Chart component because Chart.js needs a browser environment.
// This is required when using a Server Component (this page) with a Client Component (the chart).
const ProfitChart = dynamic(() => import('@/components/Chart').then(mod => mod.ProfitChart), { 
  ssr: false, // DO NOT render on the server
  loading: () => <div className="p-4 text-gold-light/60">Loading profit chart...</div>
});

export default async function DashboardPage() {
  const supabase = createClient();

  // --- 1. Fetch Low Stock Products ---
  const { data: lowStockProducts } = await supabase
    .from('products')
    .select('*')
    .lte('stock_quantity', 'low_stock_alert')
    .order('stock_quantity', { ascending: true })
    .returns<Product[]>();

  // --- 2. Fetch Daily Sales/Profit ---
  // Calculates the start of the current day in ISO format (e.g., '2025-10-23')
  const today = new Date().toISOString().split('T')[0]; 
  const { data: dailySales } = await supabase
    .from('staff_sales')
    .select('total_sale_amount, profit')
    .gte('created_at', today)
    .returns<Pick<StaffSale, 'total_sale_amount' | 'profit'>[]>();
    
  // --- 3. Aggregate Data ---
  const totalDailySales = dailySales?.reduce((sum, sale) => sum + sale.total_sale_amount, 0) || 0;
  const totalDailyProfit = dailySales?.reduce((sum, sale) => sum + sale.profit, 0) || 0;
  const lowStockCount = lowStockProducts?.length || 0;

  // --- 4. Mock Weekly Data for Chart (Replace with actual Supabase query later) ---
  const weeklyProfitData = [
    { day: 'Mon', profit: 450 },
    { day: 'Tue', profit: 600 },
    { day: 'Wed', profit: 320 },
    { day: 'Thu', profit: 710 },
    { day: 'Fri', profit: 950 },
    { day: 'Sat', profit: 1200 },
    { day: 'Sun', profit: 880 },
  ];


  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-gold-accent">Admin Dashboard</h2>

      {/* Low Stock Alert Banner */}
      {/* Renders only if there are low stock items */}
      {lowStockCount > 0 && (
        <AlertBanner products={lowStockProducts!} />
      )}

      {/* Stat Cards Section (Responsive Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Daily Sales"
          value={`$${totalDailySales.toFixed(2)}`}
          icon="💸"
          color="text-gold-accent"
        />
        <StatCard
          title="Daily Profit"
          value={`$${totalDailyProfit.toFixed(2)}`}
          icon="✨"
          color="text-green-500"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockCount}
          icon="⚠️"
          color="text-red-500"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-dark-card p-6 rounded-xl shadow-lg border border-gold-dark/30">
        <h3 className="text-xl font-bold text-gold-light mb-4">Last 7 Days Profit Trend</h3>
        {/* The client-side chart component is rendered here */}
        <ProfitChart data={weeklyProfitData} />
      </div>

    </div>
  );
}
