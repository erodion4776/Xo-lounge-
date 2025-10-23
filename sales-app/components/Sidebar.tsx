'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions'; // Import the Server Action

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/products', label: 'Products & Inventory', icon: '📦' },
  { href: '/sales', label: 'Log New Sale', icon: '💰' },
  { href: '/staff', label: 'Staff Management', icon: '🧑‍🤝‍🧑' },
  { href: '/reports', label: 'Reports & Analytics', icon: '📈' },
  { href: '/alerts', label: 'Low Stock Alerts', icon: '⚠️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-dark-card text-gold-light border-r border-gold-dark/20 p-4 w-64 fixed hidden md:flex z-10">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-gold-accent mb-8 border-b border-gold-dark/20 pb-4">
        XO Sales Manager
      </h1>
      
      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  pathname.startsWith(item.href)
                    ? 'bg-gold-dark/30 text-gold-accent font-semibold'
                    : 'hover:bg-dark-bg/50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Sign Out Button */}
      {/* Uses the Server Action in a form for sign out */}
      <form action={signOut} className="mt-auto">
        <button
          type="submit"
          className="w-full p-3 bg-red-800/50 hover:bg-red-700/70 rounded-lg text-gold-light transition-colors"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
