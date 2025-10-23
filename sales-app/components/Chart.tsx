'use client';

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  PointElement, 
  LineElement 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  PointElement, 
  LineElement
);

type ChartDataPoint = {
  [key: string]: string | number;
};

type ProfitChartProps = {
  data: ChartDataPoint[];
  labelKey?: string;
  dataKey?: string;
  type?: 'bar' | 'line';
};

export function ProfitChart({ 
  data, 
  labelKey = 'day', 
  dataKey = 'profit', 
  type = 'bar' 
}: ProfitChartProps) {
  
  const chartData = {
    labels: data.map(d => d[labelKey]),
    datasets: [
      {
        label: 'Profit ($)',
        data: data.map(d => d[dataKey]),
        backgroundColor: type === 'bar' ? 'rgba(255, 215, 0, 0.7)' : 'transparent',
        borderColor: type === 'line' ? '#FFD700' : 'transparent',
        borderWidth: 2,
        tension: 0.4,
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
        backgroundColor: '#1e1e1e',
        titleColor: '#FFD700',
        bodyColor: '#FFFACD',
        borderColor: '#B8860B',
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
          color: 'rgba(255, 250, 205, 0.1)',
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
