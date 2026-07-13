import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Public Routes — No auth required ────────────────────────────────────────
const PUBLIC_ROUTES = [
  '/',
  '/restaurants',
  '/deals',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/help',
  '/partner',
  '/blog',
  '/careers',
];

// ─── Auth Routes — Redirect if already logged in ──────────────────────────────
const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/verify-otp',
  '/auth/reset-password',
];

// ─── Protected Routes By Role ─────────────────────────────────────────────────
const CUSTOMER_ROUTES = [
  '/profile',
  '/addresses',
  '/orders',
  '/checkout',
  '/cart',
  '/tracking',
  '/payment',
  '/favourites',
];

const RESTAURANT_ROUTES = ['/restaurant'];
const RIDER_ROUTES = ['/rider'];
const ADMIN_ROUTES = ['/admin'];

// ─── Helper — Check if pathname matches route list ────────────────────────────
const matchesRoute = (pathname: string, routes: string[]): boolean => {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

// ─── Helper — Check if pathname starts with any of the routes ─────────────────
const isPublicRoute = (pathname: string): boolean => {
  return (
    matchesRoute(pathname, PUBLIC_ROUTES) ||
    pathname.startsWith('/restaurants/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/fonts/')
  );
};

// ─── Middleware Function ───────────────────────────────────────────────────────
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ─── Skip static files and API routes ──────────────────────────────────
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // ─── Get auth info from cookies ─────────────────────────────────────────
  const accessToken = request.cookies.get('accessToken')?.value;
  const userRole = request.cookies.get('userRole')?.value ?? 'customer';
  const isAuthenticated = Boolean(accessToken);

  // ─── Role-based redirect destinations ───────────────────────────────────
  const roleHomeMap: Record<string, string> = {
    admin: '/admin/dashboard',
    restaurant_owner: '/restaurant/dashboard',
    rider: '/rider/dashboard',
    customer: '/',
  };

  const userHome = roleHomeMap[userRole] ?? '/';

  // ─── Redirect authenticated users away from auth pages ──────────────────
  if (isAuthenticated && matchesRoute(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL(userHome, request.url));
  }

  // ─── Protect customer routes ─────────────────────────────────────────────
  if (matchesRoute(pathname, CUSTOMER_ROUTES)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ─── Protect restaurant owner routes ─────────────────────────────────────
  if (matchesRoute(pathname, RESTAURANT_ROUTES)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== 'restaurant_owner' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // ─── Protect rider routes ─────────────────────────────────────────────────
  if (matchesRoute(pathname, RIDER_ROUTES)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== 'rider' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // ─── Protect admin routes ─────────────────────────────────────────────────
  if (matchesRoute(pathname, ADMIN_ROUTES)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // ─── Add security headers to all responses ────────────────────────────────
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  return response;
}

// ─── Middleware Matcher Config ────────────────────────────────────────────────
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|icons|fonts|og-image.png|site.webmanifest|apple-touch-icon.png|favicon-16x16.png|favicon-32x32.png).*)',
  ],
};
