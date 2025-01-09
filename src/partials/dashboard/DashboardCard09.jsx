import React from 'react';
import Tooltip from '../../components/Tooltip';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard09() {
  const updates = [
    {
      id: 1,
      type: 'update',
      title: 'System Update',
      description: 'New variant detection algorithm deployed',
      timestamp: '10 minutes ago',
      icon: '🔄'
    },
    {
      id: 2,
      type: 'alert',
      title: 'High Priority Alert',
      description: 'Unusual spike in pathogen levels detected',
      timestamp: '1 hour ago',
      icon: '⚠️'
    },
    {
      id: 3,
      type: 'info',
      title: 'Daily Report',
      description: 'All sites reported data successfully',
      timestamp: '2 hours ago',
      icon: '📊'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Scheduled Maintenance',
      description: 'System maintenance completed',
      timestamp: '4 hours ago',
      icon: '🔧'
    }
  ];

  return (
    <div className="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Updates</h2>
      </header>
      <div className="p-3">
        {updates.map((update) => (
          <div key={update.id} className="flex items-start mb-4 last:mb-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">{update.icon}</span>
            </div>
            <div className="grow">
              <header className="flex justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{update.title}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{update.timestamp}</span>
              </header>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{update.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCard09;
