import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // CRITICAL: This is where 'get' comes from

// This client is used by all Server Components and Server Actions
export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Correct way to read the cookie store
        get: (name: string) => cookieStore.get(name)?.value, 
        
        // Logic for setting/removing cookies in Server Actions
        set: (name: string, value: string, options: any) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // This is expected if 'set' is called in a read-only context (like a server component)
            // We ignore it, as it will only truly work in Server Actions/Route Handlers.
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
