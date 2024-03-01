import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const authToken = await request.cookies.get("next-auth.session-token")?.value;
  if (
    request.nextUrl.pathname === "/dashboard" ||
    request.nextUrl.pathname === "/add-task" ||
    request.nextUrl.pathname === "/show-task"
  ) {
    if (authToken) {
      return; // Allows
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/register") {
    if (authToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

// middleware function gets executed for the url whose url matches in the config function
export const config = {
  matcher: ["/dashboard", "/register", "/add-task", "/show-task"],
};
