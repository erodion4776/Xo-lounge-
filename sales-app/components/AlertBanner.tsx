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
            <span className="font-semibold">{p.name}</span>: Only **{p.stock_quantity}** left (Alert: {p.low_stock_alert})
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
}```

---

## 4. Chart Component (`components/Chart.tsx`)

This component integrates Chart.js. It *must* be a **Client Component** to work with the browser's canvas element.

### `components/Chart.tsx`

```tsx
'use client';

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

type ChartDataPoint = {
  [key: string]: string | number;
};

type ProfitChartProps = {
  data: ChartDataPoint[];
  labelKey?: string; // Key for the X-axis label (e.g., 'day')
  dataKey?: string; // Key for the Y-axis data (e.g., 'profit')
  type?: 'bar' | 'line';
};

export function ProfitChart({ data, labelKey = 'day', dataKey = 'profit', type = 'bar' }: ProfitChartProps) {
  
  const chartData = {
    labels: data.map(d => d[labelKey]),
    datasets: [
      {
        label: 'Profit ($)',
        data: data.map(d => d[dataKey]),
        backgroundColor: type === 'bar' ? 'rgba(255, 215, 0, 0.7)' : 'transparent', // Gold Accent
        borderColor: type === 'line' ? '#FFD700' : 'transparent',
        borderWidth: 2,
        tension: 0.4, // For line chart smoothing
        pointBackgroundColor: '#FFD700',
        fill: type === 'line' ? 'start' : false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e1e1e', // dark-card
        titleColor: '#FFD700', // gold-accent
        bodyColor: '#FFFACD', // gold-light
        borderColor: '#B8860B', // gold-dark
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profit ($)',
          color: '#FFFACD',
        },
        ticks: {
          color: '#FFFACD',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(255, 250, 205, 0.1)', // Light gold with low opacity
        }
      },
      x: {
        ticks: {
          color: '#FFFACD',
        },
        grid: {
          display: false
        }
      },
    },
  };

  if (type === 'line') {
    return <div className="h-80"><Line data={chartData} options={options} /></div>;
  }
  return <div className="h-80"><Bar data={chartData} options={options} /></div>;
  }
