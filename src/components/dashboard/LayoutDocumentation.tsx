"use client";
import React from "react";

export const LayoutDocumentation: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 
        DOCUMENTATION HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
      */}
      <header className="flex flex-col gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
          Layout Pattern Documentation
        </h2>
        <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
          This dashboard demonstrates best practices for responsive design using CSS Grid for 
          two-dimensional layouts and Flexbox for one-dimensional layouts. All patterns prioritize 
          clean, readable code and optimal user experience across devices.
        </p>
      </header>

      {/* 
        DOCUMENTATION SECTIONS - CSS Grid Layout (2D)
        - Mobile: Single column
        - Desktop: Two columns for better readability
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CSS GRID PATTERNS SECTION */}
        <section className="space-y-6">
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏗️</span>
              CSS Grid (2D Layouts)
            </h3>
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-white/90">When to Use Grid:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Main layout structure (header, sidebar, content)</li>
                  <li>Card grids and dashboard widgets</li>
                  <li>Complex two-dimensional arrangements</li>
                  <li>Responsive breakpoint layouts</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-white/90">Grid Patterns Used:</h4>
                <div className="space-y-2 ml-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <code className="text-xs text-purple-600 dark:text-purple-400">
                      grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                    </code>
                    <p className="text-xs mt-1">Responsive metric cards</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <code className="text-xs text-purple-600 dark:text-purple-400">
                      lg:grid-cols-12 lg:col-span-8
                    </code>
                    <p className="text-xs mt-1">12-column layout system</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <code className="text-xs text-purple-600 dark:text-purple-400">
                      lg:grid-cols-5 lg:col-span-3
                    </code>
                    <p className="text-xs mt-1">Asymmetric content areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLEXBOX PATTERNS SECTION */}
        <section className="space-y-6">
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4 flex items-center gap-2">
              <span className="text-2xl">📐</span>
              Flexbox (1D Layouts)
            </h3>
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-white/90">When to Use Flexbox:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Aligning items in a row or column</li>
                  <li>Centering elements vertically/horizontally</li>
                  <li>Distributing space between elements</li>
                  <li>Navigation bars and button groups</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-white/90">Flexbox Patterns Used:</h4>
                <div className="space-y-2 ml-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <code className="text-xs text-blue-600 dark:text-blue-400">
                      flex items-center justify-between
                    </code>
                    <p className="text-xs mt-1">Space-between alignment</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <code className="text-xs text-blue-600 dark:text-blue-400">
                      flex flex-col gap-4
                    </code>
                    <p className="text-xs mt-1">Vertical stacking with gap</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <code className="text-xs text-blue-600 dark:text-blue-400">
                      flex items-center justify-center
                    </code>
                    <p className="text-xs mt-1">Perfect centering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* RESPONSIVE BREAKPOINTS SECTION */}
      <section className="p-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6 flex items-center gap-2">
          <span className="text-2xl">📱</span>
          Responsive Breakpoint Strategy
        </h3>
        
        {/* 
          BREAKPOINT GRID - CSS Grid for organized display
          - Three columns on desktop, single column on mobile
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-white/90 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Mobile (0-768px)
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-5">
              <li>• Single column layouts</li>
              <li>• Stacked navigation</li>
              <li>• Touch-friendly spacing</li>
              <li>• Horizontal scroll tables</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-white/90 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Tablet (768-1024px)
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-5">
              <li>• Two column grids</li>
              <li>• Balanced content areas</li>
              <li>• Moderate spacing</li>
              <li>• Sidebar below content</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-white/90 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Desktop (1024px+)
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-5">
              <li>• Multi-column layouts</li>
              <li>• Asymmetric grids</li>
              <li>• Generous spacing</li>
              <li>• Sidebar positioning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SPACING STRATEGY SECTION */}
      <section className="p-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6 flex items-center gap-2">
          <span className="text-2xl">📏</span>
          Spacing Strategy
        </h3>
        
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-gray-800 dark:text-white/90">Gap Over Margin Principle:</h4>
            <p className="ml-4">
              We prioritize <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">gap</code> utilities 
              over <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">margin</code> for cleaner, 
              more predictable spacing. Gap automatically handles spacing between elements without margin collapse issues.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Preferred</h5>
              <code className="text-xs text-green-700 dark:text-green-300">
                &lt;div className="flex gap-4"&gt;<br/>
                &nbsp;&nbsp;&lt;div&gt;Item 1&lt;/div&gt;<br/>
                &nbsp;&nbsp;&lt;div&gt;Item 2&lt;/div&gt;<br/>
                &lt;/div&gt;
              </code>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Avoid</h5>
              <code className="text-xs text-red-700 dark:text-red-300">
                &lt;div className="flex"&gt;<br/>
                &nbsp;&nbsp;&lt;div className="mr-4"&gt;Item 1&lt;/div&gt;<br/>
                &nbsp;&nbsp;&lt;div&gt;Item 2&lt;/div&gt;<br/>
                &lt;/div&gt;
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 