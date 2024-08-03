import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";





// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // getToken will work with both JWT and OAuth
  const session = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET
  })
  
  const path = request.nextUrl.pathname;

  const publicPath = [ "/callback","/homepage","/auth/login","/auth/signup"];
  let isPublicPath = false;

  for (const publicPathItem of publicPath) {
    if (path.includes(publicPathItem)) {
      isPublicPath = true;
      break;
    }
  }

  // if user is in restricted pages , but no token , redirect user to auth/login
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }

  // if user is in public pages, but have token, redirect user to / (app)
  if (isPublicPath && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next()
}


export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|logo.svg|next.svg|vercel.svg|pictures|favicon.ico).*)",
  ],
};