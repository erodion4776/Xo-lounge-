import { createBrowserClient } from '@supabase/ssr';
// Assuming you have generated or created the Database type (which is good practice)
// import { Database } from './database.types'; 

// This client is safe to use in the browser/client components.
export const createClient = () =>
  // The ! tells TypeScript that these variables will definitely be present (from the .env.local or Netlify environment)
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
