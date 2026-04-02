import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Get the location data from the Vercel Headers
  const country = request.headers.get('x-vercel-ip-country') || 'AE';
  const city = request.headers.get('x-vercel-ip-city') || 'Dubai';
  const region = request.headers.get('x-vercel-ip-country-region') || 'DXB';

  // 2. Attach this data to the URL so the website can read it
  const url = request.nextUrl.clone();
  url.searchParams.set('user_city', city);
  url.searchParams.set('user_country', country);
  url.searchParams.set('user_region', region);

  return NextResponse.rewrite(url);
}

// Only run this on the home page and dashboard
export const config = {
  matcher: ['/', '/index.html', '/dashboard.html'],
};

