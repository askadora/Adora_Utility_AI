"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CalendarRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to AdoraLink calendar view
    router.replace('/adoralink?view=calendar');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to calendar...</p>
      </div>
    </div>
  );
}
