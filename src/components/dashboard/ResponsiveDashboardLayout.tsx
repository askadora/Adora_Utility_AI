"use client";
import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = "" }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg ${className}`}>
    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
      {title}
    </h3>
    {children}
  </div>
);

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
  <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-md">
    {/* 
      FLEXBOX (1D) - Row layout for icon and content alignment
      - Items-start aligns content to top
      - Gap provides consistent spacing between elements
    */}
    <div className="flex items-start gap-3">
      {/* Icon container with flexbox centering */}
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
        {icon}
      </div>
      
      {/* 
        FLEXBOX (1D) - Column layout for metric content
        - Flex-1 takes remaining space
        - Column direction stacks title, value, and change
      */}
      <div className="flex flex-col flex-1">
        <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
        <span className="text-xl font-bold text-gray-800 dark:text-white/90">{value}</span>
        
        {/* 
          FLEXBOX (1D) - Row layout for change indicator
          - Items-center aligns arrow and percentage
          - Gap provides spacing between arrow and text
        */}
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{isPositive ? '↗' : '↘'}</span>
          <span>{change}</span>
        </div>
      </div>
    </div>
  </div>
);

export const ResponsiveDashboardLayout: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        HERO METRICS SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
        - Using gap for consistent spacing across all breakpoints
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <MetricCard
          title="Total Revenue"
          value="$124,563"
          change="12.5%"
          isPositive={true}
          icon={<span className="text-green-600">💰</span>}
        />
        <MetricCard
          title="Active Users"
          value="8,549"
          change="8.2%"
          isPositive={true}
          icon={<span className="text-blue-600">👥</span>}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.24%"
          change="2.1%"
          isPositive={false}
          icon={<span className="text-purple-600">📈</span>}
        />
        <MetricCard
          title="Avg. Order Value"
          value="$89.32"
          change="5.7%"
          isPositive={true}
          icon={<span className="text-orange-600">🛒</span>}
        />
      </section>

      {/* 
        MAIN CONTENT AREA - CSS Grid Layout (2D)
        - Mobile: Single column (content stacks)
        - Tablet: 1fr 1fr (equal columns)
        - Desktop: 2fr 1fr (main content gets 2/3, sidebar gets 1/3)
        - This demonstrates asymmetric grid layouts for content hierarchy
      */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {/* 
          PRIMARY CONTENT AREA - Takes more space on desktop
          - Mobile/Tablet: Full width
          - Desktop: 2/3 of available space (col-span-2)
        */}
        <div className="lg:col-span-2 space-y-6">
          {/* 
            CHART CONTAINER - Full width within its grid area
            - Demonstrates how content fills its grid container
          */}
          <DashboardCard title="Revenue Analytics" className="h-80">
            <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              {/* 
                FLEXBOX (1D) - Centering placeholder content
                - Items-center and justify-center for perfect centering
              */}
              <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                <span className="text-4xl">📊</span>
                <span>Chart Component</span>
              </div>
            </div>
          </DashboardCard>

          {/* 
            ACTIVITY FEED - Demonstrates list layout with flexbox
          */}
          <DashboardCard title="Recent Activity">
            <div className="space-y-3">
              {/* 
                Each activity item uses FLEXBOX (1D) for horizontal layout
                - Items-center aligns avatar and content
                - Gap provides consistent spacing
              */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  {/* Avatar - Fixed size */}
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <span className="text-sm">👤</span>
                  </div>
                  
                  {/* 
                    Content area - FLEXBOX (1D) column layout
                    - Flex-1 takes remaining space
                    - Column direction stacks title and description
                  */}
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      User Action {item}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      2 minutes ago
                    </span>
                  </div>
                  
                  {/* Status indicator - Fixed position */}
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* 
          SIDEBAR AREA - Narrower column for secondary content
          - Mobile/Tablet: Full width, appears below main content
          - Desktop: 1/3 of available space (col-span-1)
        */}
        <div className="space-y-6">
          {/* 
            QUICK STATS - Compact metrics for sidebar
          */}
          <DashboardCard title="Quick Stats">
            <div className="space-y-4">
              {/* 
                Each stat uses FLEXBOX (1D) for space-between layout
                - Justify-between pushes label left, value right
              */}
              {[
                { label: "Today's Sales", value: "$2,847" },
                { label: "New Customers", value: "23" },
                { label: "Pending Orders", value: "12" },
                { label: "Support Tickets", value: "5" }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white/90">{stat.value}</span>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* 
            PROGRESS INDICATORS - Demonstrates vertical stacking
          */}
          <DashboardCard title="Goals Progress">
            <div className="space-y-4">
              {[
                { label: "Monthly Target", progress: 75, color: "bg-blue-500" },
                { label: "Customer Satisfaction", progress: 92, color: "bg-green-500" },
                { label: "Team Performance", progress: 68, color: "bg-yellow-500" }
              ].map((goal, index) => (
                <div key={index} className="space-y-2">
                  {/* 
                    FLEXBOX (1D) - Row layout for label and percentage
                    - Justify-between spreads content across full width
                  */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{goal.label}</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">{goal.progress}%</span>
                  </div>
                  
                  {/* Progress bar container */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${goal.color}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </section>

      {/* 
        BOTTOM SECTION - CSS Grid Layout (2D) for data tables and widgets
        - Mobile: Single column (stacked)
        - Tablet: 1fr 1fr (equal columns)
        - Desktop: 3fr 2fr (table gets more space, widget gets less)
        - Demonstrates content-aware responsive design
      */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
        {/* 
          DATA TABLE AREA - Needs more horizontal space
          - Mobile/Tablet: Full width
          - Desktop: 3/5 of available space for better table readability
        */}
        <div className="lg:col-span-3">
          <DashboardCard title="Recent Transactions">
            {/* 
              TABLE CONTAINER - Responsive table with horizontal scroll
              - Overflow-x-auto enables horizontal scrolling on small screens
              - Min-width ensures table doesn't compress too much
            */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    {/* 
                      TABLE HEADERS - Using flexbox-like behavior with table cells
                      - Text alignment and padding for consistent spacing
                    */}
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">ID</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Customer</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((row) => (
                    <tr key={row} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <td className="py-3 px-2 text-sm text-gray-800 dark:text-white/90">#00{row}</td>
                      <td className="py-3 px-2 text-sm text-gray-800 dark:text-white/90">Customer {row}</td>
                      <td className="py-3 px-2 text-sm text-gray-800 dark:text-white/90">${(Math.random() * 1000).toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          row % 2 === 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {row % 2 === 0 ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Dec {row}, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>

        {/* 
          WIDGET AREA - Compact supplementary information
          - Mobile/Tablet: Full width, appears below table
          - Desktop: 2/5 of available space
        */}
        <div className="lg:col-span-2">
          <DashboardCard title="Top Products">
            <div className="space-y-3">
              {[
                { name: "Premium Plan", sales: 234, color: "bg-blue-500" },
                { name: "Basic Plan", sales: 189, color: "bg-green-500" },
                { name: "Enterprise Plan", sales: 156, color: "bg-purple-500" },
                { name: "Starter Plan", sales: 98, color: "bg-orange-500" }
              ].map((product, index) => (
                <div key={index} className="space-y-2">
                  {/* 
                    FLEXBOX (1D) - Product info layout
                    - Space-between distributes name and sales count
                  */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">{product.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{product.sales}</span>
                  </div>
                  
                  {/* Visual progress bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${product.color}`}
                      style={{ width: `${(product.sales / 250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </section>
    </div>
  );
}; 