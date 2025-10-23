import Sidebar from '@/components/Sidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// This layout wraps all protected pages (e.g., /dashboard, /products, etc.)
// It is a Server Component.

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  // Fetch user session for a final server-side check
  const { data: { user } } = await supabase.auth.getUser();

  // If the user is not found (though middleware should catch this first), redirect to login.
  if (!user) {
    redirect('/');
  }

  return (
    // The main container provides padding for the fixed sidebar on medium/large screens.
    // The 'min-h-screen' ensures the dark background covers the entire viewport.
    <div className="flex min-h-screen bg-dark-bg">
      
      {/* 1. Sidebar Component (The Navigation) */}
      <Sidebar />
      
      {/* 2. Main Content Area */}
      {/* md:ml-64 creates a space equal to the sidebar width for desktop layout */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
