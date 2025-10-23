'use client';

import { useEffect } from 'react';

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Login page error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg px-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-dark-card rounded-xl shadow-2xl border border-red-500/50 text-center">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
        <p className="text-gold-light/70">
          We encountered an error while loading the login page.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-gold-accent text-dark-bg font-medium rounded-lg hover:bg-gold-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 focus:ring-offset-dark-bg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
