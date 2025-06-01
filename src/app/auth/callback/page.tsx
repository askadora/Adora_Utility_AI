'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Adjust the import path if necessary

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // This useEffect will run when the page component mounts
    // Supabase client often automatically handles the session from the URL
    // parameters on page load for OAuth and some email confirmation flows.
    // We can simply wait for the session and then redirect.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // User is authenticated, redirect to dashboard

        // Check if the event is a sign-in to avoid sending email on every state change
        if (_event === 'SIGNED_IN') {
          const user = session.user;
          if (user) {
            (async () => {
              try {
                console.log('Attempting to send welcome email from callback with payload:', {
                  email: user.email,
                  name: user.user_metadata?.full_name || user.email,
                });
                const response = await fetch('https://tnbsoahieqhejtoewmbt.supabase.co/functions/v1/send-welcome-email', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: user.email,
                    name: user.user_metadata?.full_name || user.email,
                  }),
                });
                console.log('Callback welcome email fetch response status:', response.status);
                if (!response.ok) {
                  const errorText = await response.text();
                  console.error('Callback failed to send welcome email:', errorText);
                } else {
                  console.log('Callback welcome email sent successfully (hopefully)');
                }
              } catch (fetchError) {
                console.error('Error initiating welcome email fetch:', fetchError);
              }
            })();
          }
        }

        router.push('/dashboard');
      } else {
        // If no session, it might be an error or the callback didn't result in a session
        // You might want to redirect to an error page or the sign-in page
        // router.push('/auth/signin?error=authentication_failed');
         // Or simply do nothing and let the page render a loading/waiting state
      }
    });

    // Cleanup the subscription on component unmount
    return () => subscription.unsubscribe();

  }, [router]); // Depend on router to avoid lint warnings

  // You could render a loading spinner or a message here while waiting
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Loading...</p>
      {/* Add a spinner or more sophisticated loading indicator if desired */}
    </div>
  );
} 