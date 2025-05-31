import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Exchange the code for a session
    const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (sessionError) {
      return NextResponse.redirect(`${requestUrl.origin}/auth/signin?error=${sessionError.message}`);
    }

    if (session?.user) {
      // Get the user's profile from Google
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        return NextResponse.redirect(`${requestUrl.origin}/auth/signin?error=${userError.message}`);
      }

      if (user?.user_metadata) {
        // Update the user's metadata with their name
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            firstName: user.user_metadata.firstName || '',
            lastName: user.user_metadata.lastName || '',
            full_name: `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim(),
            name: `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim()
          }
        });

        if (updateError) {
          console.error('Error updating user metadata:', updateError);
        }
      }
    }

    // Redirect to the dashboard
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${requestUrl.origin}/auth/signin?error=No code provided`);
} 