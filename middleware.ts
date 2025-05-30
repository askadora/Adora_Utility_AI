// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  console.log("Middleware: Processing path:", request.nextUrl.pathname);

  try {
    // 🔥 Remove all cookies manually
    request.cookies.getAll().forEach(cookie => {
      request.cookies.delete(cookie.name);
    });

    // 🔥 Strip Authorization header (optional but highly recommended)
    const headers = new Headers(request.headers);
    headers.delete("Authorization");
    headers.delete("authorization");

    // ✅ Supabase client that ignores session cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => [], // no session persistence
          setAll: () => {}  // no setting cookies
        }
      }
    );

    // 🔒 This will return null if no token in headers or cookies
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log("User:", user?.id ?? "Not signed in", "Error:", error?.message ?? "None");

    const publicRoutes = ["/auth/signin"];
    const isPublicRoute = publicRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    );

    // 🔁 Redirect to login if not signed in and trying to access protected routes
    if (!user && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin";
      console.log(`Redirecting unauthenticated user to /auth/signin`);
      return NextResponse.redirect(url);
    }

    // 🔁 Redirect logged-in users away from sign-in page
    if (user && request.nextUrl.pathname === "/auth/signin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      console.log(`Redirecting authenticated user to /dashboard`);
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
