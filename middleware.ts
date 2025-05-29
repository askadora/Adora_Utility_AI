console.log('Middleware file is being processed.');

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  console.log('Middleware: Executing for path:', request.nextUrl.pathname); // Log the path immediately

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
          },
        },
      },
    );

    // Await the getUser call and log the result explicitly
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('Middleware: Supabase getUser result - user:', user ? user.id : 'No user', 'error:', userError);

    // Define your public routes here. Only '/auth/signin' is public.
    const publicRoutes = ["/auth/signin"]; // <-- **DEFINE YOUR PUBLIC ROUTES HERE**

    const isPublicRoute = publicRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    );
    console.log('Middleware: Is public route:', isPublicRoute);

    // If the user is not logged in and trying to access a non-public route, redirect to sign-in
    const shouldRedirectToSignIn = !user && !isPublicRoute;
    console.log('Middleware: Should redirect to sign-in =', shouldRedirectToSignIn);

    if (shouldRedirectToSignIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin"; // <-- **ADJUST YOUR SIGN-IN PATH HERE**
      console.log(`Middleware: Redirecting unauthorized access to ${request.nextUrl.pathname} to /auth/signin.`);
      return NextResponse.redirect(url);
    }

    // If the user is logged in and trying to access the public sign-in route, redirect to dashboard
    // This prevents logged-in users from seeing the sign-in page again.
    const shouldRedirectToDashboard = user && request.nextUrl.pathname === "/auth/signin";
    console.log('Middleware: Should redirect to dashboard =', shouldRedirectToDashboard);

    if (shouldRedirectToDashboard) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard"; // <-- **ADJUST YOUR DASHBOARD PATH HERE**
        console.log(`Middleware: Redirecting authenticated user from ${request.nextUrl.pathname} to /dashboard.`);
        return NextResponse.redirect(url);
    }

    // Special check for '/auth/signin' access source - only applies if not already redirected
    if (request.nextUrl.pathname === "/auth/signin" && !user) { // Only apply if not logged in
      const referer = request.headers.get('referer');
      console.log('Middleware: Checking referer for /auth/signin. Referer:', referer);
      // Check if referer exists and if it's not from adorahq.com
      if (referer && !referer.startsWith('https://adorahq.com')) {
        // Redirect if not coming from adorahq.com
        const url = request.nextUrl.clone();
        url.href = "https://adorahq.com"; // <-- **ADJUST REDIRECT FOR UNAUTHORIZED SIGN-IN ACCESS**
        console.warn(`Middleware: Unauthorized access attempt to /auth/signin from referer: ${referer}. Redirecting.`);
        return NextResponse.redirect(url);
      }
    }

    // Continue as normal
    console.log('Middleware: Continuing to next handler.');
    return NextResponse.next();

  } catch (e) {
    console.error("Middleware: Error in updateSession:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - The /api routes (if you have any public APIs that shouldn't be intercepted)
     *
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
}; 