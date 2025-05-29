'use client';

import { Suspense } from 'react';
import SignUpContent from './SignUpContent'; // Import the client component

export default function SignUpPage() {
  return (
    // Wrap the client component that uses useSearchParams in Suspense
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}