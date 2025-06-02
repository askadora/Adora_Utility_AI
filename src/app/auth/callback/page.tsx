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
            try {
              console.log('Attempting to send welcome email from callback with payload:', {
                email: user.email,
                name: user.user_metadata?.full_name || user.email,
              });
              
              const response = await fetch('https://tnbsoahieqhejtoewmbt.supabase.co/functions/v1/send-welcome-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session.access_token}`,
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
                console.log('Callback welcome email sent successfully');
              }
            } catch (emailError) {
              console.error('Error sending welcome email:', emailError);
            }
          }
          
          // Redirect to dashboard after handling email
          router.push('/dashboard');
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