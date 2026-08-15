// import { NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";
// import { routes } from "@/lib/routes/routes";

// const AUTH_ROUTES = [routes.login, routes.register];
// const PROTECTED_PREFIX = "/app";

// export async function proxy(request) {
//   const sessionCookie = getSessionCookie(request);
//   const { pathname } = request.nextUrl;

//   const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);
//   const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

//   // Case 1: not logged in, trying to access /app/* → send to login
//   if (!sessionCookie && isProtectedRoute) {
//     return NextResponse.redirect(new URL(routes.login, request.url));
//   }

//   // Case 2: already logged in, trying to access login/register → send to app
//   if (sessionCookie && isAuthRoute) {
//     return NextResponse.redirect(new URL(routes.shops, request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
// };

import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { routes } from "@/lib/routes/routes";

const AUTH_ROUTES = [routes.login, routes.register];
const PROTECTED_PREFIX = "/app";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN; // "livemystore.shop" — no protocol, no port

// Top-level path segments that belong to the main app, not a shop slug.
// Anything else hit on the root domain is assumed to be a shop slug and
// gets redirected to its subdomain.
const RESERVED_TOP_LEVEL_SEGMENTS = new Set([
  "app",
  "login",
  "register",
  "api",
]);

function getSubdomain(hostname) {
  if (!ROOT_DOMAIN) return null;

  const host = hostname.split(":")[0]; // strip port for local dev

  if (host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`) {
    return null;
  }

  if (host.endsWith(`.${ROOT_DOMAIN}`)) {
    return host.replace(`.${ROOT_DOMAIN}`, "");
  }
  

  return null;
}

export async function proxy(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const { pathname } = url;

  const subdomain = getSubdomain(hostname);

  // Case 0a: already on a shop subdomain — rewrite into (liveSite)/[shopSlug],
  // leave the browser URL untouched, skip auth logic (storefronts are public).
  if (subdomain) {
    url.pathname = `/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Case 0b: on the root domain, hitting what looks like a shop path
  // (e.g. livemystore.shop/bhaiyajicosmetics) — redirect to the canonical subdomain.
  const firstSegment = pathname.split("/")[1] || "";
  const looksLikeShopPath = firstSegment && !RESERVED_TOP_LEVEL_SEGMENTS.has(firstSegment);

  if (looksLikeShopPath && ROOT_DOMAIN) {
    const protocol = url.protocol; // "https:" in prod
    const targetUrl = `${protocol}//${firstSegment}.${ROOT_DOMAIN}${pathname.slice(firstSegment.length + 1)}`;
    return NextResponse.redirect(targetUrl);
  }

  const sessionCookie = getSessionCookie(request);

  const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL(routes.shops, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};