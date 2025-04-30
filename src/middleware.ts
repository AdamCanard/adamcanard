import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const username = req.cookies.get("username");

  switch (req.nextUrl.pathname) {
    case "/desktop":
      if (username === undefined) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      } else {
        return NextResponse.rewrite(new URL("/desktop", req.url));
      }

    case "/auth/login":
      if (username !== undefined) {
        return NextResponse.redirect(new URL("/desktop", req.url));
      }
      break;

    default:
      return NextResponse.next();
  }
}
