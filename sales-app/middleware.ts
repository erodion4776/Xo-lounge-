import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './lib/supabase/server'; // Assumes your server client setup is here

export async function middleware(request: NextRequest) {
  // We use the Next.js `createServerClient` to check the user's session from cookies
  const supabase = createClient();

  // The `getUser()` call will check the Supabase auth cookie for a valid session.
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Define all routes that should be protected (i.e., require a login)
  const protectedRoutes = ['/dashboard', '/products', '/sales', '/staff', '/reports', '/alerts'];
  
  // Check if the current path is one of the protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // If the route is protected but no user is found, redirect to the login page (root '/')
    if (!user) {
      // Create a new URL for the root ('/')
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access to all other pages (including the root login page if user is logged out)
  return NextResponse.next();
}

export const config = {
  // The matcher specifies which paths the middleware should run on.
  // This pattern matches everything except:
  // - API routes (/api)
  // - Next.js static files (_next/static, _next/image)
  // - Static assets (favicon.ico, .png, etc.)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
