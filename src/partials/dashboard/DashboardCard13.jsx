import React from 'react';
import { Tooltip } from 'react-tooltip'; // Example tooltip library (optional)

function DashboardCard13() {
  // Example array of pathogen detection events
  // Each object includes details about the event:
  // - pathogen: Name of the pathogen
  // - variant: Variant info (if relevant)
  // - severity: 'alert', 'warning', 'normal', etc.
  // - dateTime: Timestamp of the detection
  // - concentration: Measured concentration or load
  // - location: Sampling site name or region
  // - detailsLink: Link to more information about this event or pathogen
  // - iconPath: SVG path or icon content for custom icons
  const pathogenEvents = [
    {
      id: 1,
      pathogen: 'SARS-CoV-2',
      variant: 'Omicron (BA.2.75)',
      severity: 'alert',
      dateTime: '2025-01-08 10:15 AM',
      concentration: 'High (250,000 copies/L)',
      location: 'Main City WTP (A1)',
      detailsLink: '#0',
      iconPath: (
        <path d="M18 9v12m0 3v.01M5.314 30h25.372c1.735 0 2.43-2.197 1.06-3.31L19.434 7.75a2 2 0 00-2.868 0L4.254 26.69C2.883 27.803 3.579 30 5.314 30z" />
      ),
    },
    {
      id: 2,
      pathogen: 'Influenza A',
      variant: '',
      severity: 'normal',
      dateTime: '2025-01-08 09:47 AM',
      concentration: 'Normal (20,000 copies/L)',
      location: 'Lakeside Facility (B4)',
      detailsLink: '#0',
      iconPath: (
        <path d="M18 12l-8 12h16l-8-12z" />
      ),
    },
    {
      id: 3,
      pathogen: 'Norovirus',
      variant: '',
      severity: 'warning',
      dateTime: '2025-01-08 08:30 AM',
      concentration: 'Moderate (80,000 copies/L)',
      location: 'Riverbend WTP',
      detailsLink: '#0',
      iconPath: (
        <path d="M18 17c3 0 6 1 6 4 0 3-3 5-6 5s-6-2-6-5c0-3 3-4 6-4z M18 10a4 4 0 110-8 4 4 0 010 8z" />
      ),
    },
    {
      id: 4,
      pathogen: 'SARS-CoV-2',
      variant: 'Delta (B.1.617.2)',
      severity: 'alert',
      dateTime: '2025-01-07 04:10 PM',
      concentration: 'High (220,000 copies/L)',
      location: 'Eastern Treatment Plant (E2)',
      detailsLink: '#0',
      iconPath: (
        <path d="M18 9v12m0 3v.01M5.314 30h25.372c1.735 0 2.43-2.197 1.06-3.31L19.434 7.75a2 2 0 00-2.868 0L4.254 26.69C2.883 27.803 3.579 30 5.314 30z" />
      ),
    },
    {
      id: 5,
      pathogen: 'RSV',
      variant: '',
      severity: 'normal',
      dateTime: '2025-01-06 03:00 PM',
      concentration: 'Low (10,000 copies/L)',
      location: 'Hilltop Research Facility',
      detailsLink: '#0',
      iconPath: (
        <path d="M18 12l-8 12h16l-8-12z" />
      ),
    },
  ];

  // Helper function to choose icon background color based on severity
  const getIconBgColor = (severity) => {
    switch (severity) {
      case 'alert':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'normal':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  // Helper function to choose text label based on severity
  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'alert':
        return 'Alert';
      case 'warning':
        return 'Warning';
      case 'normal':
        return 'Normal';
      default:
        return 'Status';
    }
  };

  // Split events into sections based on date/time (for demonstration)
  // In a real app, you might dynamically group by day/week, etc.
  const todayEvents = pathogenEvents.filter((evt) =>
    evt.dateTime.startsWith('2025-01-08')
  );
  const yesterdayEvents = pathogenEvents.filter((evt) =>
    evt.dateTime.startsWith('2025-01-07')
  );
  const earlierEvents = pathogenEvents.filter((evt) =>
    evt.dateTime.startsWith('2025-01-06')
  );

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      {/* Card header */}
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Pathogen Detection Events
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Recent and noteworthy pathogen detection updates from all monitored
          sites.
        </p>
      </header>

      {/* Card body */}
      <div className="p-3 space-y-6">
        {/* 
          OPTIONAL Tooltip Initialization (if using a tooltip library)
          <Tooltip id="tooltip" />
        */}

        {/* "Today" events */}
        {todayEvents.length > 0 && (
          <div>
            <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Today’s Updates
            </header>
            <ul className="my-1">
              {todayEvents.map((event) => (
                <li className="flex px-2" key={event.id}>
                  {/* Icon container */}
                  <div
                    className={`w-9 h-9 rounded-full shrink-0 my-2 mr-3 flex items-center justify-center ${getIconBgColor(
                      event.severity
                    )}`}
                  >
                    <svg
                      className="w-5 h-5 fill-current text-white"
                      viewBox="0 0 36 36"
                    >
                      {event.iconPath}
                    </svg>
                  </div>

                  {/* Event details */}
                  <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                    <div className="grow flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          <a
                            className="hover:underline"
                            href={event.detailsLink}
                            // data-tip={`Variant: ${event.variant || 'N/A'}`}
                            // data-for="tooltip"
                          >
                            {event.pathogen}
                          </a>
                          {event.variant && (
                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                              ({event.variant})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">
                          {`${event.location} • ${event.concentration}`}
                        </div>
                      </div>
                      <div className="flex flex-col items-end mt-2 sm:mt-0 sm:ml-2">
                        <span
                          className={`font-medium ${
                            event.severity === 'alert'
                              ? 'text-red-600'
                              : event.severity === 'warning'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {getSeverityLabel(event.severity)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {event.dateTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* "Yesterday" events */}
        {yesterdayEvents.length > 0 && (
          <div>
            <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Yesterday
            </header>
            <ul className="my-1">
              {yesterdayEvents.map((event) => (
                <li className="flex px-2" key={event.id}>
                  {/* Icon container */}
                  <div
                    className={`w-9 h-9 rounded-full shrink-0 my-2 mr-3 flex items-center justify-center ${getIconBgColor(
                      event.severity
                    )}`}
                  >
                    <svg
                      className="w-5 h-5 fill-current text-white"
                      viewBox="0 0 36 36"
                    >
                      {event.iconPath}
                    </svg>
                  </div>

                  {/* Event details */}
                  <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                    <div className="grow flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          <a
                            className="hover:underline"
                            href={event.detailsLink}
                          >
                            {event.pathogen}
                          </a>
                          {event.variant && (
                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                              ({event.variant})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">
                          {`${event.location} • ${event.concentration}`}
                        </div>
                      </div>
                      <div className="flex flex-col items-end mt-2 sm:mt-0 sm:ml-2">
                        <span
                          className={`font-medium ${
                            event.severity === 'alert'
                              ? 'text-red-600'
                              : event.severity === 'warning'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {getSeverityLabel(event.severity)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {event.dateTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* "This Week" or older events */}
        {earlierEvents.length > 0 && (
          <div>
            <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Earlier This Week
            </header>
            <ul className="my-1">
              {earlierEvents.map((event) => (
                <li className="flex px-2" key={event.id}>
                  {/* Icon container */}
                  <div
                    className={`w-9 h-9 rounded-full shrink-0 my-2 mr-3 flex items-center justify-center ${getIconBgColor(
                      event.severity
                    )}`}
                  >
                    <svg
                      className="w-5 h-5 fill-current text-white"
                      viewBox="0 0 36 36"
                    >
                      {event.iconPath}
                    </svg>
                  </div>

                  {/* Event details */}
                  <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                    <div className="grow flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          <a
                            className="hover:underline"
                            href={event.detailsLink}
                          >
                            {event.pathogen}
                          </a>
                          {event.variant && (
                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                              ({event.variant})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">
                          {`${event.location} • ${event.concentration}`}
                        </div>
                      </div>
                      <div className="flex flex-col items-end mt-2 sm:mt-0 sm:ml-2">
                        <span
                          className={`font-medium ${
                            event.severity === 'alert'
                              ? 'text-red-600'
                              : event.severity === 'warning'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {getSeverityLabel(event.severity)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {event.dateTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* If no events are found */}
        {todayEvents.length === 0 &&
          yesterdayEvents.length === 0 &&
          earlierEvents.length === 0 && (
            <div className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">
              No recent events detected.
            </div>
          )}
      </div>
    </div>
  );
}

export default DashboardCard13;
