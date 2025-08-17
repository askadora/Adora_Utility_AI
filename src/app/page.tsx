'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RootPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect to Ask Adora interface
        router.replace('/ask-adora');
      } else {
        // Redirect to sign in
        router.replace('/auth/signin');
      }
    }
  }, [user, isLoading, router]);

  // Show loading state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Ask Adora...</p>
      </div>
    </div>
  );
}
