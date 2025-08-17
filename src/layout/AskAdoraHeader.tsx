"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AskAdoraHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex items-center justify-between w-full px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            width={154}
            height={32}
            className="dark:hidden"
            src="/images/logo/adora-ai-dark-grey-logo.png"
            alt="Ask Adora Logo"
          />
          <Image
            width={154}
            height={32}
            className="hidden dark:block"
            src="/images/logo/adora-ai-white-logo.png"
            alt="Ask Adora Logo"
          />
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggleButton />
          
          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AskAdoraHeader;
