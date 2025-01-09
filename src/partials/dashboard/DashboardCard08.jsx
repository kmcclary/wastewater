import React from 'react';

function DashboardCard08() {
  const metrics = [
    {
      name: 'Sample Integrity',
      score: 98,
      change: 2,
      details: 'Based on 2,345 samples'
    },
    {
      name: 'Collection Timing',
      score: 94,
      change: -1,
      details: '15min avg deviation'
    },
    {
      name: 'Data Completeness',
      score: 96,
      change: 0,
      details: '98% fields populated'
    },
    {
      name: 'Analysis Accuracy',
      score: 99,
      change: 3,
      details: '0.01% margin of error'
    }
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Data Quality Metrics</h2>
      </header>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{metric.name}</h3>
                <span className={`text-xs font-semibold px-1.5 rounded-full ${
                  metric.change > 0 ? 'bg-green-100 text-green-700' :
                  metric.change < 0 ? 'bg-red-100 text-red-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {metric.score}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{metric.details}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard08;
