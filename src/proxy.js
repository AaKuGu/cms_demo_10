import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES = ["/login", "/register"];

export async function proxy(request) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Case 1: not logged in, trying to access a protected route → send to login
  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Case 2: already logged in, trying to access login/register → send to dashboard
  if (sessionCookie && isPublicRoute) {
    return NextResponse.redirect(new URL("/shops", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};