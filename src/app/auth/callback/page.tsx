'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Suspense } from 'react';

function AuthCallbackForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for OTP verification first
        const type = searchParams.get('type');
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (type && token) {
          console.log('Handling OTP verification:', { type, token });
          
          // Handle OTP verification
          const { error: otpError } = await supabase.auth.verifyOtp({
            email: email || '',
            token: token,
            type: type as any
          });

          if (otpError) {
            console.error('Error verifying OTP:', otpError);
            setError(otpError.message);
            return;
          }

          // After successful OTP verification, redirect based on type
          if (type === 'recovery') {
            console.log('Redirecting to update password page');
            router.push(`/auth/update-password?token=${token}&email=${email}`);
          } else if (type === 'email') {
            console.log('Email confirmed, redirecting to signin');
            router.push('/auth/signin?message=email_confirmed');
          }
          return;
        }

        // Handle OAuth callback
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError(sessionError.message);
          return;
        }

        if (!session) {
          console.log('No session found in callback');
          setError('No session found. Please try signing in again.');
          return;
        }

        const { user } = session;
        if (!user) {
          console.log('No user found in session');
          setError('No user found in session. Please try signing in again.');
          return;
        }

        // Handle Google sign-in specific logic
        if (user.app_metadata?.provider === 'google') {
          try {
            const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
            const names = fullName.split(' ');
            const firstName = names[0] || '';
            const lastName = names.slice(1).join(' ') || '';

            // Update user metadata in Supabase
            const { error: updateError } = await supabase.auth.updateUser({
              data: {
                firstName,
                lastName,
                full_name: fullName,
                name: fullName
              }
            });

            if (updateError) {
              console.error('Error updating user metadata:', updateError);
            }

            // Update custom User table
            const { error: updateUserTableError } = await supabase.rpc('update_user_name_for_google', {
              auth_user_id: user.id,
              first_name: firstName,
              last_name: lastName
            });

            if (updateUserTableError) {
              console.error('Error updating User table:', updateUserTableError);
            }
          } catch (error) {
            console.error('Error processing Google user data:', error);
          }
        }

        // Send welcome email
        try {
          console.log('Attempting to send welcome email');
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
          
          if (!response.ok) {
            console.error('Failed to send welcome email:', await response.text());
          } else {
            console.log('Welcome email sent successfully');
          }
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
        }

        // Redirect to home page
        router.push('/');
      } catch (error) {
        console.error('Error in callback handler:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
        {error && (
          <div className="mt-4">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => router.push('/auth/signin')}
              className="mt-2 text-sm text-sky-600 hover:text-sky-500"
            >
              Return to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackForm />
    </Suspense>
  );
} 