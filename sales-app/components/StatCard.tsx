import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
  color: string; // Tailwind color class, e.g., 'text-gold-accent'
};

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-dark-card p-6 rounded-xl shadow-lg border border-gold-dark/30 flex items-center justify-between transition-shadow hover:shadow-gold-accent/20">
      <div>
        <p className="text-sm font-medium text-gold-light/70">{title}</p>
        {/* The 'color' prop defines the text color of the value */}
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      </div>
      <div className="text-4xl text-gold-accent/80 opacity-70">{icon}</div>
    </div>
  );
}
