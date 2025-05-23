import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/users");

  // if ((req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/users')) && !accessToken) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
  // 🛡 Only block access if BOTH tokens are missing
  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') && accessToken) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }
  // Block logged-in users from accessing login/register
  if ((req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}