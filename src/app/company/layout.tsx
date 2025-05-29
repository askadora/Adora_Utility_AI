"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  /* 
    RESPONSIVE SIDEBAR MARGIN CALCULATION
    - Mobile: No margin (ml-0) - sidebar overlays content
    - Desktop: Dynamic margin based on sidebar state
      - Expanded/Hovered: 290px margin for full sidebar
      - Collapsed: 90px margin for icon-only sidebar
    - Smooth transitions for better UX
  */
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

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
        <main className="p-4 md:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* 
            CONTENT WRAPPER - Centered container with max width
            - Max-w-7xl (1280px) prevents content from becoming too wide on large screens
            - Mx-auto centers the content horizontally
            - W-full ensures content takes full available width up to max-width
            - This creates optimal reading width while maintaining responsiveness
          */}
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 