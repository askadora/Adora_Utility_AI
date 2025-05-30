// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  console.log("[Middleware Debug] Processing path:", path);

  try {
    // Create a new response
    const response = NextResponse.next();

    // Clear all cookies
    request.cookies.getAll().forEach(cookie => {
      response.cookies.delete(cookie.name);
    });

    // Add security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    // Strip all auth-related headers
    const headers = new Headers(request.headers);
    headers.delete("Authorization");
    headers.delete("authorization");
    headers.delete("x-supabase-auth");
    headers.delete("x-supabase-auth-token");

    // Create Supabase client with no session persistence
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: () => undefined,
          set: () => {},
          remove: () => {}
        }
      }
    );

    // Check auth status
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log("[Middleware Debug] Auth Check:", {
      hasUser: !!user,
      userId: user?.id,
      error: error?.message,
      path
    });

    // Define public and protected routes
    const publicRoutes = ["/auth/signin", "/auth/signup", "/auth/callback"];
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
    const isRootPath = path === "/";
    
    console.log("[Middleware Debug] Route Check:", { 
      path, 
      isPublicRoute,
      isRootPath
    });

    // If no user and trying to access protected route, redirect to signin
    if (!user && !isPublicRoute) {
      console.log("[Middleware Debug] No user found, redirecting to signin");
      const signinUrl = new URL('/auth/signin', request.url);
      signinUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(signinUrl);
    }

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (user && (path === "/auth/signin" || path === "/auth/signup")) {
      console.log("[Middleware Debug] User authenticated, redirecting to dashboard");
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is authenticated and on root path, redirect to dashboard
    if (user && isRootPath) {
      console.log("[Middleware Debug] User authenticated on root, redirecting to dashboard");
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log("[Middleware Debug] Proceeding with request");
    return response;

  } catch (error) {
    console.error("[Middleware Debug] Error:", error);
    // On error, redirect to signin to be safe
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
};

// Update matcher to include all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
};
