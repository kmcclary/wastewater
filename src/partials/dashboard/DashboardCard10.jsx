import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faWater, faVials, faFlask, faPumpMedical } from '@fortawesome/free-solid-svg-icons';

function DashboardCard10() {
  // Example data for wastewater sampling sites
  const samplingSites = [
    {
      id: '0',
      icon: faIndustry,
      siteName: 'Main City WTP (A1)',
      lastSampleDate: '2025-01-07',
      pathogens: 'SARS-CoV-2, Influenza',
      concentration: 'High (230,000 copies/L)',
      location: 'Atlanta, GA, USA',
    },
    {
      id: '1',
      icon: faWater,
      siteName: 'Lakeside Facility (B4)',
      lastSampleDate: '2025-01-06',
      pathogens: 'RSV',
      concentration: 'Moderate (75,000 copies/L)',
      location: 'Chicago, IL, USA',
    },
    {
      id: '2',
      icon: faVials,
      siteName: 'Eastern Treatment Plant (E2)',
      lastSampleDate: '2025-01-05',
      pathogens: 'SARS-CoV-2',
      concentration: 'Low (15,000 copies/L)',
      location: 'Boston, MA, USA',
    },
    {
      id: '3',
      icon: faFlask,
      siteName: 'Hilltop Research Facility',
      lastSampleDate: '2025-01-04',
      pathogens: 'Influenza',
      concentration: 'Moderate (60,000 copies/L)',
      location: 'Rome, IT',
    },
    {
      id: '4',
      icon: faPumpMedical,
      siteName: 'Riverbend WTP',
      lastSampleDate: '2025-01-03',
      pathogens: 'Norovirus, SARS-CoV-2',
      concentration: 'High (190,000 copies/L)',
      location: 'Berlin, DE',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      {/* Card header */}
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Sampling Sites Overview
        </h2>
      </header>

      {/* Card body */}
      <div className="p-3">
        {/* Table wrapper */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Site Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Last Sample Date</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Pathogens Detected</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Concentration Level</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Location</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {samplingSites.map((site) => {
                return (
                  <tr key={site.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3 flex items-center justify-center">
                          <FontAwesomeIcon 
                            icon={site.icon} 
                            className="text-gray-500 dark:text-gray-400 text-xl"
                          />
                        </div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          {site.siteName}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{site.lastSampleDate}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{site.pathogens}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {site.concentration}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{site.location}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
