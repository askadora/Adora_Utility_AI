import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors | Adora AI - Investor Relations Dashboard",
  description: "Manage investor relationships, track funding rounds, and monitor investor communications.",
};

export default function Investors() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Investor Relations
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Manage investor relationships, track funding activities, and maintain transparent 
          communication with stakeholders.
        </p>
      </header>

      {/* 
        INVOICE DETAILS SECTION - CSS Grid Layout (2D)
        - Mobile: Single column (stacked)
        - Desktop: 2 equal columns for from/to information
        - Responsive card design with proper spacing
      */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
          Invoice Details
        </h2>
        
        {/* 
          FROM/TO INFORMATION - CSS Grid Layout (2D)
          - Mobile: Single column (stacked)
          - Desktop: 2 equal columns
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
          {/* FROM SECTION */}
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">From</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-800 dark:text-white/90">Zain Geidt</p>
              <p>1280, Clair Street</p>
              <p>Massachusetts, New York - 02543</p>
            </div>
          </div>

          {/* TO SECTION */}
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">To</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-800 dark:text-white/90">Albert Ward</p>
              <p>355, Shobe Lane</p>
              <p>Colorado, Fort Collins - 80543</p>
            </div>
          </div>
        </div>

        {/* 
          INVOICE DATES - FLEXBOX (1D) Layout
          - Row direction for date information
          - Gap provides consistent spacing
        */}
        <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">Issued On:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">11 March, 2027</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">Due On:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">16 March, 2027</span>
          </div>
        </div>

        {/* 
          INVOICE TABLE - Responsive table with horizontal scroll
          - Overflow-x-auto enables horizontal scrolling on small screens
          - Min-width ensures table doesn't compress too much
        */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Unit Cost</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">TailGrids</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">1</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$48</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$48</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">GrayGrids</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">4</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$300</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$1,200</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">Uideck</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">2</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$800</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$1,600</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90">FormBold</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">2</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">$125</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-white/90 font-medium">$250</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 
          INVOICE TOTALS - FLEXBOX (1D) Layout
          - Column direction for stacking totals
          - Right alignment for professional invoice appearance
        */}
        <div className="flex flex-col gap-2 items-end mb-6">
          <div className="flex justify-between w-full max-w-xs gap-8">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sub Total:</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">$3,098</span>
          </div>
          <div className="flex justify-between w-full max-w-xs gap-8">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">VAT (10%):</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white/90">$312</span>
          </div>
          <div className="flex justify-between w-full max-w-xs gap-8 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-base font-semibold text-gray-800 dark:text-white/90">Total:</span>
            <span className="text-base font-semibold text-gray-800 dark:text-white/90">$3,410</span>
          </div>
        </div>

        {/* 
          ACTION BUTTONS - FLEXBOX (1D) Layout
          - Row direction for button alignment
          - Gap provides consistent spacing between buttons
          - Responsive stacking on mobile
        */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Proceed to Payment
          </button>
          <button className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Print Invoice
          </button>
        </div>
      </section>
    </div>
  );
} 