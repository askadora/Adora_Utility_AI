"use client";

import AskAdoraHeader from "@/layout/AskAdoraHeader";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AskAdoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log("[Ask Adora Layout Debug] Auth State:", {
      hasUser: !!user,
      isLoading,
      timestamp: new Date().toISOString()
    });

    if (!isLoading && !user) {
      console.log("[Ask Adora Layout Debug] No user found, redirecting to signin");
      router.replace('/auth/signin');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, don't render the layout
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Simplified Header */}
      <AskAdoraHeader />
      
      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
