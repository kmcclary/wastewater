import React from 'react';

function DashboardCard06() {
  const alerts = [
    {
      id: 1,
      severity: 'high',
      message: 'Significant SARS-CoV-2 increase detected in Region A',
      timestamp: '2h ago',
      details: '145% increase over baseline'
    },
    {
      id: 2,
      severity: 'medium',
      message: 'New variant identified in 3 locations',
      timestamp: '4h ago',
      details: 'Genetic sequencing in progress'
    },
    {
      id: 3,
      severity: 'low',
      message: 'RSV levels returning to seasonal baseline',
      timestamp: '6h ago',
      details: '23% decrease in concentration'
    }
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Alert System</h2>
        <span className="ml-2 px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">3 Active</span>
      </header>
      <div className="p-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`mb-3 p-3 rounded-lg border ${
            alert.severity === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
            alert.severity === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
            'border-green-200 bg-green-50 dark:bg-green-900/20'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-sm font-semibold ${
                alert.severity === 'high' ? 'text-red-800 dark:text-red-200' :
                alert.severity === 'medium' ? 'text-yellow-800 dark:text-yellow-200' :
                'text-green-800 dark:text-green-200'
              }`}>
                {alert.message}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{alert.timestamp}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{alert.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCard06;
