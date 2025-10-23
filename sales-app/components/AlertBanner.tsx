import { Product } from '@/types/db';
import Link from 'next/link';

export function AlertBanner({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  
  const totalAlerts = products.length;

  return (
    <div className="p-4 mb-6 bg-red-900/50 text-gold-light rounded-lg border border-red-700 shadow-xl">
      <p className="font-bold text-lg text-red-300">⚠️ LOW STOCK WARNING!</p>
      <p className="mt-1 text-sm">The following items are at or below their low stock alert threshold:</p>
      
      <ul className="mt-3 list-disc list-inside space-y-1">
        {/* Show a maximum of 3 items directly */}
        {products.slice(0, 3).map((p) => (
          <li key={p.id} className="text-gold-light/90">
            <span className="font-semibold">{p.name}</span>: Only <strong>{p.stock_quantity}</strong> left (Alert: {p.low_stock_alert})
          </li>
        ))}
        
        {/* Show a link if there are more than 3 */}
        {totalAlerts > 3 && (
          <li className="text-sm">
            And {totalAlerts - 3} more items... 
            <Link href="/alerts" className="underline font-medium text-gold-accent ml-1 hover:text-gold-light">
              View All Alerts
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
