import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Primary font configuration with fallbacks and optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

// Monospace font for code/numbers
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: false,
  weight: ['400', '500', '700'],
});

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFD700' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

// Comprehensive metadata for SEO and social sharing
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: 'XO Sales Manager',
    template: '%s | XO Sales Manager',
  },
  description: 'Professional Sales and Inventory Management System for XO Lounge - Track sales, manage inventory, and analyze performance in real-time.',
  keywords: ['sales management', 'inventory tracking', 'XO Lounge', 'business analytics', 'POS system'],
  authors: [{ name: 'XO Lounge Development Team' }],
  creator: 'XO Lounge',
  publisher: 'XO Lounge',
  
  // Robots and indexing
  robots: {
    index: false, // Set to true for public pages
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons and web app manifest
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://xo-sales.com',
    siteName: 'XO Sales Manager',
    title: 'XO Sales Manager - Professional Business Management',
    description: 'Streamline your business operations with our comprehensive sales and inventory management system.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XO Sales Manager Dashboard',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@xolounge',
    creator: '@xolounge',
    title: 'XO Sales Manager',
    description: 'Professional Sales and Inventory Management System',
    images: ['/twitter-image.png'],
  },
  
  // App-specific metadata
  applicationName: 'XO Sales Manager',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Verification for search engines (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  
  // Alternative languages/versions
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://xo-sales.com',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  
  // App links for mobile apps (if applicable)
  appLinks: {
    ios: {
      url: process.env.NEXT_PUBLIC_IOS_APP_URL || '',
      app_store_id: process.env.NEXT_PUBLIC_IOS_APP_STORE_ID || '',
    },
    android: {
      package: process.env.NEXT_PUBLIC_ANDROID_PACKAGE || '',
      app_name: 'XO Sales Manager',
    },
    web: {
      url: process.env.NEXT_PUBLIC_APP_URL || 'https://xo-sales.com',
      should_fallback: true,
    },
  },
};

// Types for component props
interface RootLayoutProps {
  children: React.ReactNode;
  params?: { [key: string]: string | string[] };
}

// Skip to content component for accessibility
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-gold-accent text-dark-bg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-dark-bg"
    >
      Skip to main content
    </a>
  );
}

// Noscript fallback
function NoScriptFallback() {
  return (
    <noscript>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gold-accent mb-4">
            JavaScript Required
          </h1>
          <p className="text-gold-light/80">
            This application requires JavaScript to function properly. 
            Please enable JavaScript in your browser settings and reload the page.
          </p>
        </div>
      </div>
    </noscript>
  );
}

// Environment indicator for development/staging
function EnvironmentIndicator() {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV;
  
  if (env === 'production') return null;
  
  return (
    <div className="fixed bottom-4 left-4 z-50 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full pointer-events-none">
      {env?.toUpperCase()}
    </div>
  );
}

// Main RootLayout component
export default function RootLayout({ children }: RootLayoutProps) {
  // Determine if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://vercel-analytics.com" />
        
        {/* Security headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* PWA capabilities */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Color scheme preference */}
        <meta name="color-scheme" content="dark light" />
        
        {/* Prevent automatic detection of phone numbers */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Custom theme color for browser UI */}
        <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#FFD700" media="(prefers-color-scheme: light)" />
      </head>
      
      <body 
        className={`
          ${inter.className} 
          font-sans
          bg-dark-bg 
          text-gold-light 
          antialiased
          min-h-screen
          overflow-x-hidden
          selection:bg-gold-accent/30 
          selection:text-gold-light
        `}
        data-theme="dark"
      >
        {/* Accessibility: Skip to main content */}
        <SkipToContent />
        
        {/* NoScript fallback */}
        <NoScriptFallback />
        
        {/* Environment indicator (dev/staging only) */}
        {isDevelopment && <EnvironmentIndicator />}
        
        {/* Main application wrapper */}
        <div id="app-root" className="relative min-h-screen flex flex-col">
          {/* Background gradient effect (optional) */}
          <div 
            className="fixed inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-gold-dark/5 pointer-events-none" 
            aria-hidden="true"
          />
          
          {/* Main content area */}
          <main id="main-content" className="relative flex-grow">
            {children}
          </main>
        </div>
        
        {/* Analytics (only in production) */}
        {!isDevelopment && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
        
        {/* Custom portal for modals/toasts */}
        <div id="modal-root" />
        <div id="toast-root" />
        
        {/* Development-only features */}
        {isDevelopment && (
          <div id="dev-tools" className="hidden">
            {/* Add development tools here */}
          </div>
        )}
      </body>
    </html>
  );
}
