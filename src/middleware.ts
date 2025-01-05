import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  switch (req.nextUrl.pathname) {
    case "/desktop":
      const authToken = req.cookies.get("authToken");
      const userId = req.cookies.get("authToken");
      if (authToken === undefined || userId === undefined) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      } else {
        return NextResponse.rewrite(new URL("/desktop", req.url));
      }
    case "/mobile":
      return NextResponse.redirect(new URL("/mobile/info", req.url));
    case "/mobile/lists":
      return NextResponse.redirect(new URL("/mobile/lists/beers", req.url));

    default:
  }
}
