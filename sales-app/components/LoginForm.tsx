'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from '@/lib/actions';

const initialState = {
  error: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-dark-bg bg-gold-accent hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-accent transition-colors"
    >
      {pending ? 'Logging In...' : 'Log In'}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(signIn as any, initialState);

  return (
    // The action is now handled by formAction, which correctly wraps the state logic
    <form className="space-y-4" action={formAction}>
      
      {/* Display Error Message */}
      {state?.error && (
        <p className="p-2 text-sm text-red-300 bg-red-900/50 rounded-md border border-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gold-light/80" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
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
          className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gold-dark rounded-md text-gold-light"
          placeholder="••••••••"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
