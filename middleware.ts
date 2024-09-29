import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const user = req.cookies.get("token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/";

  if (!user) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL("/movies", req.url));
  }
}

export const config = {
  matcher: ["/", "/movies", "/[movieId]"],
};
