import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
// import { Database } from './database.types'; 

// This client is safe to use in Server Components and Server Actions.
export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          // This ensures the server client can update cookies in Server Actions
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `cookies().set()` can only be called in a Server Action or Route Handler.
            // If called in a normal Server Component, we ignore the error.
          }
        },
        remove: (name: string, options: any) => {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Ignore error
          }
        },
      },
    }
  );
};
