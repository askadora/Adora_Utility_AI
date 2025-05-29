// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  console.log("Middleware: Processing path:", request.nextUrl.pathname);

  try {
    // Always clear cookies – do not allow session persistence
    request.cookies.getAll().forEach(cookie => {
      request.cookies.delete(cookie.name);
    });

    // Create Supabase client with NO session from cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => [], // Disable reading cookies
          setAll: () => {}  // Disable setting cookies
        }
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const publicRoutes = ["/auth/signin"];
    const isPublicRoute = publicRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (!user && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin";
      console.log(`Redirecting to /auth/signin from ${request.nextUrl.pathname}`);
      return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname === "/auth/signin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      console.log(`Redirecting authenticated user from signin to dashboard.`);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();

  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
};
