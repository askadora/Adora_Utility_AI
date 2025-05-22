import React from 'react';

interface KpiSummaryCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

const KpiSummaryCard: React.FC<KpiSummaryCardProps> = ({ title, value, trend, trendDirection = 'neutral', icon }) => {
  const trendColor = trendDirection === 'up' ? 'text-green-500' : trendDirection === 'down' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</h3>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <p className={`text-xs ${trendColor} mt-1`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};

export default KpiSummaryCard; 