import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth"; // Adjust import path

const protectedRoutes = ["/add-movie", "/edit-movie"];

export default async function middleware(req: NextRequest) {
  // Check if current route is protected
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((pPath: any) => path.startsWith(pPath));

  // Get sesion
  const session = await getSession();

  // If user is on protected route and has no session redirect to login page.
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // No need to be on login page if user is already authenticated
  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
