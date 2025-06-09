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

        if (type && token) {
          console.log('Handling OTP verification:', { type, token });
          
          // Handle OTP verification
          const { error: otpError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: type as any
          });

          if (otpError) {
            console.error('Error verifying OTP:', otpError);
            setError(otpError.message);
            // Show error on page instead of immediate redirect
            return;
          }

          // After successful OTP verification, redirect based on type
          if (type === 'recovery') {
            console.log('Redirecting to update password page');
            // Pass the token_hash instead of raw token
            router.push(`/auth/update-password?token=${token}`);
          } else if (type === 'email') {
            console.log('Email confirmed, redirecting to signin');
            router.push('/auth/signin?message=email_confirmed');
          }
          return;
        }

        // If no OTP, handle regular session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError(sessionError.message);
          // Show error on page instead of immediate redirect
          return;
        }

        if (session) {
          console.log('Session found in callback:', session);
          const user = session.user;
          
          if (user) {
            console.log('User found in session:', user);
            router.push('/');
          }
        } else {
          console.log('No session found in callback');
          setError('No session found. Please try signing in again.');
        }
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