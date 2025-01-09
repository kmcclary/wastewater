import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities (used if you have tailwindConfig, hexToRGB, etc.)
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard01() {
  const chartData = {
    labels: [
      '12-01-2022',
      '01-01-2023',
      '02-01-2023',
      '03-01-2023',
      '04-01-2023',
      '05-01-2023',
      '06-01-2023',
      '07-01-2023',
      '08-01-2023',
      '09-01-2023',
      '10-01-2023',
      '11-01-2023',
      '12-01-2023',
      '01-01-2024',
      '02-01-2024',
      '03-01-2024',
      '04-01-2024',
      '05-01-2024',
      '06-01-2024',
      '07-01-2024',
      '08-01-2024',
      '09-01-2024',
      '10-01-2024',
      '11-01-2024',
      '12-01-2024',
      '01-01-2025',
    ],
    datasets: [

      // South region
      {
        label: 'South',
        data: [
          589, 302, 622, 334, 656, 579, 788, 302, 712, 398, 582, 368, 659,
          342, 532, 545, 662, 378, 592, 402, 712, 432, 742, 450, 642, 432,
        ],
        fill: false,
        borderColor: tailwindConfig().theme.colors.yellow[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.yellow[500],
        tension: 0.2,
      },
      // Midwest region
      {
        label: 'Midwest',
        data: [
          445, 512, 478, 601, 523, 689, 534, 567, 634, 645, 678, 589, 634,
          567, 489, 523, 478, 545, 589, 612, 645, 678, 701, 645, 589, 556,
        ],
        fill: false,
        borderColor: tailwindConfig().theme.colors.green[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        tension: 0.2,
      },
      // Northwest region
      {
        label: 'Northwest',
        data: [
          512, 489, 556, 523, 589, 612, 645, 589, 634, 601, 567, 545, 578,
          601, 634, 656, 689, 712, 678, 645, 612, 589, 567, 545, 523, 501,
        ],
        fill: false,
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        tension: 0.2,
      },
      // Southeast region
      {
        label: 'Southeast',
        data: [
          478, 512, 545, 578, 601, 634, 667, 689, 712, 678, 645, 612, 589,
          567, 545, 523, 501, 478, 456, 434, 412, 389, 367, 345, 323, 301,
        ],
        fill: false,
        borderColor: tailwindConfig().theme.colors.pink[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.pink[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.pink[500],
        tension: 0.2,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    plugins: {
      // ADD LEGEND (TOP-RIGHT CORNER)
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
          color: tailwindConfig().theme.colors.gray[500],
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            // e.g. "Northeast: 532 gc/mL"
            return `${context.dataset.label}: ${context.parsed.y} gc/mL`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          // Show "gc/mL" instead of any currency format
          callback: (value) => `${value} gc/mL`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Regional Viral Load Trends
          </h2>
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          National Average
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            542 gc/mL
          </div>
          <div className="text-sm font-medium text-blue-700 px-1.5 bg-blue-500/20 rounded-full">
            +8%
          </div>
        </div>
      </div>
      <div className="grow max-sm:max-h-[148px] xl:max-h-[148px]">
        <LineChart
          data={chartData}
          width={389}
          height={148}
          options={chartOptions}
        />
      </div>
    </div>
  );
}

export default DashboardCard01;
