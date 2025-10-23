// app/(protected)/layout.tsx

import Sidebar from '@/components/Sidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check user session
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-dark-bg">
      {/* 1. Sidebar Component (The Navigation) */}
      <Sidebar />
      
      {/* 2. Main Content Area */}
      {/* For responsiveness: main content starts after the sidebar on desktop (md:ml-64) */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
