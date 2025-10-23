import './globals.css'; // Import the global styles (which include Tailwind)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Configure a font (Inter is commonly used and good for performance)
const inter = Inter({ subsets: ['latin'] });

// Metadata for SEO (Search Engine Optimization)
export const metadata: Metadata = {
  title: 'XO Sales Manager',
  description: 'Sales and Inventory Management Web App for XO Lounge.',
};

// The RootLayout component is a Server Component and wraps the entire application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        Apply the dark background and default gold-light text color 
        using Tailwind classes on the body element.
      */}
      <body className={`${inter.className} bg-dark-bg text-gold-light`}>
        {children}
      </body>
    </html>
  );
}
