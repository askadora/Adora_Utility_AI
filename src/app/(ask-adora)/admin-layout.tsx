"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    console.log("[Admin Layout Debug] Auth State:", {
      hasUser: !!user,
      isLoading,
      timestamp: new Date().toISOString()
    });

    if (!isLoading && !user) {
      console.log("[Admin Layout Debug] No user found, redirecting to signin");
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

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  // Determine if we're in a Living Docs section or Synth Pro
  const isLivingDocs = pathname?.startsWith("/living-docs");
  const isSynthPro = pathname?.includes("/synth-pro");

  return (
    <div className="min-h-screen">
      {/* 
        SIDEBAR AND BACKDROP COMPONENTS
        - Sidebar: Fixed positioning for overlay behavior on mobile
        - Backdrop: Covers content when mobile sidebar is open
        - Both components handle their own responsive behavior
      */}
      <AppSidebar />
      <Backdrop />
      
      {/* 
        MAIN CONTENT CONTAINER - FLEXBOX (1D) Layout
        - Flex-1 takes remaining space after sidebar
        - Transition-all provides smooth margin changes
        - Duration-300 and ease-in-out for polished animations
      */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* 
          HEADER COMPONENT
          - Sticky positioning keeps header visible during scroll
          - Full width within the main content area
          - Contains navigation, search, and user controls
        */}
        <AppHeader />
        
        {/* 
          PAGE CONTENT AREA - Responsive padding strategy
          - Mobile (default): p-4 (16px all sides)
          - Tablet (md): p-6 (24px all sides) 
          - Desktop (lg): p-8 (32px all sides)
          - Max-width constraint prevents content from becoming too wide
          - Overflow-x-hidden prevents horizontal scroll issues
        */}
        <main className={isLivingDocs || isSynthPro ? "p-0 max-w-none h-[calc(100vh-64px)] overflow-hidden" : "p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden"}>
          {isLivingDocs || isSynthPro ? (
            <div className="w-full h-full">{children}</div>
          ) : (
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
