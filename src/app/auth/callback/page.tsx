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