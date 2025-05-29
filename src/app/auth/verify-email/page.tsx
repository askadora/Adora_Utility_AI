import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please go to your email to verify. Sign in will be available after email verification.
        </p>
        <div className="mt-6">
          <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Go to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
} 