'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          router.push('/auth/signin?error=session_error');
          return;
        }

        if (session) {
          console.log('Session found in callback:', session);
          const user = session.user;
          
          if (user) {
            console.log('User found in session:', user);
            router.push('/dashboard');
          }
        } else {
          console.log('No session found in callback');
          router.push('/auth/signin?error=no_session');
        }
      } catch (error) {
        console.error('Error in callback handler:', error);
        router.push('/auth/signin?error=callback_error');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Completing sign in...</p>
    </div>
  );
} 