// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('access_token')?.value;
//   if (!token) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

//   // return NextResponse.next();
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//       Apply everywhere EXCEPT:
//       - /
//       - /login
//       - /sign-up
//       - _next static files
//       - api routes (optional)
//     */
//     '/((?!_next/|api/|login|sign-up$|$).*)',
//   ],
// };
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (req.nextUrl.pathname.startsWith('/dashboard') && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname === '/login' && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}