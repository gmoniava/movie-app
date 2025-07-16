import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth"; // Adjust import path

const protectedRoutes = ["/add-movie", "/edit-movie"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((pPath: any) => path.startsWith(pPath));

  const session = await getSession();

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    {
      source: "/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)",
      missing: [
        // Exclude Server functions
        // Otherwise NextResponse.redirect used in the middleware does not work with requests initiated by Server functions
        { type: "header", key: "next-action" },
      ],
    },
  ],
};
