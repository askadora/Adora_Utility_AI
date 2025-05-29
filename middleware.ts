import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  console.log('Middleware: Executing for path:', request.nextUrl.pathname);

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            // ⛔ Ignore all cookies to avoid using existing session
            return [];
          },
          setAll() {
            // ⛔ Don’t persist any new cookies either
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('Middleware: Forced check result - user:', user?.id || 'No user', 'error:', error);

    const publicRoutes = ["/auth/signin"];
    const isPublicRoute = publicRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (!user && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin";
      console.log(`Middleware: Redirecting to /auth/signin from ${request.nextUrl.pathname}`);
      return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname === "/auth/signin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      console.log(`Middleware: Redirecting logged-in user from signin to dashboard`);
      return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname === "/auth/signin" && !user) {
      const referer = request.headers.get('referer');
      if (referer && !referer.startsWith('https://adorahq.com')) {
        const url = request.nextUrl.clone();
        url.href = "https://adorahq.com";
        console.warn(`Middleware: Redirecting invalid signin access from ${referer}`);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();

  } catch (e) {
    console.error("Middleware: Error in updateSession:", e);
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
};
