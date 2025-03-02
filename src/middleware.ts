
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the protected routes that require authentication
const protectedRoutes = [
  '/courses',
  '/course',
  '/podcast',
  '/chatbot',
  '/games',
];

export function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get the user token from cookies
    const userData = request.cookies.get('user')?.value;
    let isAuthenticated = false;

    if (userData) {
      try {
        const user = JSON.parse(userData);
        isAuthenticated = user?.isAuthenticated;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.search = `?from=${encodeURIComponent(request.nextUrl.pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
