import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken");
  const userId = req.cookies.get("authToken");
  switch (req.nextUrl.pathname) {
    case "/desktop":
      if (authToken === undefined || userId === undefined) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      } else {
        return NextResponse.rewrite(new URL("/desktop", req.url));
      }

    case "/auth/login":
      if (authToken !== undefined || userId !== undefined) {
        return NextResponse.redirect(new URL("/desktop", req.url));
      }
      break;

    default:
      return NextResponse.next();
  }
}
