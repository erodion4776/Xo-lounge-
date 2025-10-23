// app/page.tsx
import { signIn } from '@/lib/actions';

// This is a Server Component, meaning it renders on the server for speed and security.
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark-card rounded-xl shadow-2xl border border-gold-dark/50">
        
        <h1 className="text-3xl font-bold text-center text-gold-accent">
          XO Sales Manager
        </h1>
        <p className="text-center text-gold-light/70">Staff Login</p>

        {/* 
          The form uses the 'action' prop to directly call the server function (signIn).
          This is a Next.js Server Action and requires no client-side JavaScript for submission!
        */}
        <form className="space-y-4" action={signIn}>
          <div>
            <label className="block text-sm font-medium text-gold-light/80" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md shadow-sm focus:ring-gold-accent focus:border-gold-accent text-gold-light"
              placeholder="staff@xo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gold-light/80" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md shadow-sm focus:ring-gold-accent focus:border-gold-accent text-gold-light"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark-bg bg-gold-accent hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-accent transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
