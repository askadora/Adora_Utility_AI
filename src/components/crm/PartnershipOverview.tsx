  <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-0 dark:bg-white/[0.03]">
    <h2 className="text-xl font-semibold text-black dark:text-white/90 mb-4">Partnership Overview</h2>
    
    {/* Partnership Stats */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {partnershipMetrics.map((metric, index) => (
        <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors duration-200">
          <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-black dark:text-white/90">{metric.value}</span>
            {metric.trend && (
              <span className={`text-sm ${metric.trendDirection === 'up' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {metric.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Partnership Health */}
    <div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Partnership Health</h3>
      <div className="grid grid-cols-2 gap-2">
        {partnershipHealth.map((health, index) => (
          <div key={index} className={`text-center p-2 rounded-lg ${health.bgColor} transition-colors duration-200`}>
            <p className={`text-2xl font-bold ${health.color}`}>{health.percentage}%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{health.status}</p>
          </div>
        ))}
      </div>
    </div>
  </div> 