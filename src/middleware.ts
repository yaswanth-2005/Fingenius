import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = [
  "/courses",
  "/course",
  "/podcast",
  "/chatbot",
  "/games",
];

export function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Get the user authentication data from cookies
  const userData = request.cookies.get("user")?.value;
  let isAuthenticated = false;

  if (userData) {
    try {
      const user = JSON.parse(userData);
      isAuthenticated = user?.isAuthenticated;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  // If accessing login/signup but already authenticated, redirect to home
  if (
    isAuthenticated &&
    ["/login", "/signup"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If accessing a protected route but not authenticated, redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
