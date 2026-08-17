import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { routes } from "@/lib/routes/routes";

const AUTH_ROUTES = [routes.login, routes.register];
const PROTECTED_PREFIX = "/app";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN; // "livemystore.shop"

const RESERVED_TOP_LEVEL_SEGMENTS = new Set([
  "app",
  "login",
  "register",
  "api",
]);

function getSubdomain(hostname) {
  if (!ROOT_DOMAIN) return null;

  const rootHost = ROOT_DOMAIN.split(":")[0]; // "localhost" ya "livemystore.shop"
  const host = hostname.split(":")[0];        // incoming request se port hataya

  if (host === rootHost || host === `www.${rootHost}`) {
    return null;
  }

  if (host.endsWith(`.${rootHost}`)) {
    return host.replace(`.${rootHost}`, "");
  }

  return null;
}

export async function proxy(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const { pathname } = url;

  const subdomain = getSubdomain(hostname);

  if (subdomain) {
    // Avoid double-prefixing: if a link somewhere still points to
    // /<shopSlug>/... (old path-based links), don't rewrite to
    // /<shopSlug>/<shopSlug>/... — just treat it as already correct.
    const alreadyPrefixed =
      pathname === `/${subdomain}` || pathname.startsWith(`/${subdomain}/`);

    url.pathname = alreadyPrefixed ? pathname : `/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  const firstSegment = pathname.split("/")[1] || "";
  const looksLikeShopPath = firstSegment && !RESERVED_TOP_LEVEL_SEGMENTS.has(firstSegment);

  if (looksLikeShopPath && ROOT_DOMAIN) {
    const protocol = url.protocol;
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