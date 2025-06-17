'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          
          if (user) {
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
          window.location.href = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;
        } else {
          console.log('No session found in callback');
          window.location.href = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/signin?error=no_session`;
        }
      } catch (error) {
        console.error('Error in callback handler:', error);
        window.location.href = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/signin?error=callback_error`;
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Completing sign in...</p>
    </div>
  );
} 