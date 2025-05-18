import { NextResponse } from "next/server";

// A simple middleware that doesn't rely on Clerk's specific middleware functions
export default function middleware(request) {
  // For now, just let all requests pass through
  // The authentication will be handled by the MainLayout component for protected routes
  return NextResponse.next();
}

// Exclude static files and API routes from middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
