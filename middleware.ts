import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simplified middleware for demonstration purposes
// In a real application, you would use a proper authentication library
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user-token')?.value;
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/orders',
    '/checkout',
    '/wishlist',
    '/admin',
  ];
  
  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  // If trying to access a protected route without being logged in, redirect to login
  if (isProtectedRoute && !currentUser) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If trying to access login/register while logged in, redirect to profile
  if (
    (request.nextUrl.pathname.startsWith('/auth/login') || 
     request.nextUrl.pathname.startsWith('/auth/register')) && 
    currentUser
  ) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
  
  // Admin routes protection
  if (
    request.nextUrl.pathname.startsWith('/admin') && 
    currentUser && 
    !isAdmin(currentUser)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// This is a placeholder function - in a real app, you would decode and verify the JWT
function isAdmin(token: string): boolean {
  // In a real application, this would decode the JWT and check the user's role
  return false;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/profile/:path*',
    '/orders/:path*',
    '/checkout/:path*',
    '/wishlist/:path*',
    '/admin/:path*',
    '/auth/login',
    '/auth/register',
  ],
};