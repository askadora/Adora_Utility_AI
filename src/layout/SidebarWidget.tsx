import React from "react";
import { handleGetStartedClick } from "@/utils/referrerUtils";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Want a Live Demo?
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        To Join a Live Demo, Learn more, or book a 1-on-1 meeting click...
      </p>
      <button 
        onClick={handleGetStartedClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}
