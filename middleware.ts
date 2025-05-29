import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
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

    const { data: { user } } = await supabase.auth.getUser();

    // Define your protected routes here. For example, anything starting with /dashboard
    const protectedRoutes = ["/dashboard"]; // <-- **DEFINE YOUR PROTECTED ROUTES HERE**

    const isProtectedRoute = protectedRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    );

    // If the user is not logged in and trying to access a protected route, redirect to sign-in
    if (!user && isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signin"; // <-- **ADJUST YOUR SIGN-IN PATH HERE**
      return NextResponse.redirect(url);
    }

    // If the user is logged in and trying to access a public auth route (like sign-in/sign-up), redirect to dashboard
    // This prevents logged-in users from seeing auth pages again.
    const publicAuthRoutes = ["/auth/signin", "/auth/signup", "/auth/forgot-password", "/auth/reset-password"]; // <-- **ADJUST YOUR PUBLIC AUTH ROUTES HERE**

    const isPublicAuthRoute = publicAuthRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (user && isPublicAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard"; // <-- **ADJUST YOUR DASHBOARD PATH HERE**
        return NextResponse.redirect(url);
    }


    // Continue as normal if the route is public or the user is authenticated for a protected route
    return NextResponse.next();
  } catch (e) {
    // If a Supabase client could not be created, return the request as is.
    // This could happen if environment variables are not set.
    console.error("Error in middleware:", e);
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
     * - The /api routes (if you have any public APIs)
     *
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
}; 