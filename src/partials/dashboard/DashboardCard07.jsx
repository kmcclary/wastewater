import React from 'react';

function DashboardCard07() {
  const processingStages = [
    {
      stage: 'Collection',
      complete: 234,
      inProgress: 12,
      percentComplete: 95,
      status: 'normal'
    },
    {
      stage: 'Pre-processing',
      complete: 189,
      inProgress: 45,
      percentComplete: 80,
      status: 'warning'
    },
    {
      stage: 'Analysis',
      complete: 156,
      inProgress: 78,
      percentComplete: 67,
      status: 'delay'
    },
    {
      stage: 'Sequencing',
      complete: 89,
      inProgress: 145,
      percentComplete: 38,
      status: 'critical'
    }
  ];

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Sample Processing Status</h2>
      </header>
      <div className="p-3">
        {processingStages.map((stage) => (
          <div key={stage.stage} className="flex flex-col mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{stage.stage}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {stage.complete} / {stage.complete + stage.inProgress}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
              <div 
                className={`h-2 rounded-full ${
                  stage.status === 'normal' ? 'bg-green-500' :
                  stage.status === 'warning' ? 'bg-yellow-500' :
                  stage.status === 'delay' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${stage.percentComplete}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCard07;
