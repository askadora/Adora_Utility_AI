'use client';

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { storeTokenInLocalStorage } from "@/lib/auth-utils";

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("Session data:", session); // Debug log
      storeTokenInLocalStorage(session);
    }
  }, [status, session]);

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        console.error("Sign in error:", result.error);
      } else {
        console.log("Sign in successful:", result); // Debug log
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
} 