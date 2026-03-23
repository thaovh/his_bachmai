import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isNextAuth = req.nextUrl.pathname.startsWith("/api/auth");
  const isPublic = 
    req.nextUrl.pathname.startsWith("/login") || 
    req.nextUrl.pathname.startsWith("/manifest.json") ||
    req.nextUrl.pathname.match(/\.(png|jpg|jpeg|svg|ico)$/);

  if (!req.auth && !isNextAuth && !isPublic) {
    const url = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
