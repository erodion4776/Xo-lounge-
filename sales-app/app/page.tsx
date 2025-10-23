import { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/components/LoginForm';

// Metadata for SEO and browser tab
export const metadata: Metadata = {
  title: 'Login - XO Sales Manager',
  description: 'Staff login portal for XO Sales Manager',
  robots: {
    index: false,
    follow: false,
  },
};

// Loading component for Suspense fallback
function LoginFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-700 rounded"></div>
      <div className="h-10 bg-gray-700 rounded"></div>
      <div className="h-10 bg-gray-700 rounded"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-dark-bg px-4 py-8 sm:px-6 lg:px-8">
      {/* Background gradient for visual enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-gold-dark/10 pointer-events-none" />
      
      {/* Login Card Container */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-dark/20 to-gold-accent/20 blur-xl" />
        
        <article className="relative w-full p-6 sm:p-8 space-y-6 bg-dark-card rounded-xl shadow-2xl border border-gold-dark/50 backdrop-blur-sm">
          {/* Header Section */}
          <header className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gold-accent tracking-tight">
              XO Sales Manager
            </h1>
            <p className="text-sm sm:text-base text-gold-light/70">
              Staff Login Portal
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-dark/50 to-transparent" />
          
          {/* Login Form with Suspense Boundary */}
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>
          
          {/* Footer Section */}
          <footer className="pt-4 border-t border-gold-dark/20">
            <p className="text-xs text-center text-gold-light/50">
              Protected area. Authorized personnel only.
            </p>
          </footer>
        </article>
      </div>
      
      {/* Accessibility: Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold-accent text-dark-bg px-4 py-2 rounded"
      >
        Skip to main content
      </a>
    </main>
  );
}
