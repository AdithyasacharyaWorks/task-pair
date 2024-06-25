// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/callback";

    if (isAuthPage) {
      return NextResponse.next();
    }

    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/task',
    '/task/list',
    '/profile',
    '/home',
    '/requests',
  ],
};
// export default function middleware()
// {

// }