import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * A mock “longitudinal data” structure where each region has multiple pathogens,
 * each with an array of timestamps and concentration values.
 *
 * In a real application, you may retrieve this data from an API or your backend.
 */
const MOCK_DATA = {
  // Region 1 sample
  'North District': {
    pathogens: [
      {
        name: 'SARS-CoV-2',
        status: 'High',
        // Example time-series data (weeks or days)
        dataPoints: [
          { date: '2024-12-01', concentration: 120000 },
          { date: '2024-12-08', concentration: 250000 },
          { date: '2024-12-15', concentration: 220000 },
          { date: '2024-12-22', concentration: 300000 },
          { date: '2024-12-29', concentration: 280000 },
          { date: '2025-01-05', concentration: 320000 },
        ],
      },
      {
        name: 'Influenza A',
        status: 'Moderate',
        dataPoints: [
          { date: '2024-12-01', concentration: 50000 },
          { date: '2024-12-08', concentration: 75000 },
          { date: '2024-12-15', concentration: 80000 },
          { date: '2024-12-22', concentration: 100000 },
          { date: '2024-12-29', concentration: 90000 },
          { date: '2025-01-05', concentration: 95000 },
        ],
      },
      {
        name: 'Norovirus',
        status: 'Low',
        dataPoints: [
          { date: '2024-12-01', concentration: 10000 },
          { date: '2024-12-08', concentration: 12000 },
          { date: '2024-12-15', concentration: 15000 },
          { date: '2024-12-22', concentration: 9000 },
          { date: '2024-12-29', concentration: 8000 },
          { date: '2025-01-05', concentration: 10000 },
        ],
      },
    ],
  },
  // Region 2 sample
  'Lakeside City': {
    pathogens: [
      {
        name: 'SARS-CoV-2',
        status: 'Moderate',
        dataPoints: [
          { date: '2024-12-01', concentration: 70000 },
          { date: '2024-12-08', concentration: 60000 },
          { date: '2024-12-15', concentration: 100000 },
          { date: '2024-12-22', concentration: 130000 },
          { date: '2024-12-29', concentration: 90000 },
          { date: '2025-01-05', concentration: 110000 },
        ],
      },
      {
        name: 'Influenza A',
        status: 'Low',
        dataPoints: [
          { date: '2024-12-01', concentration: 30000 },
          { date: '2024-12-08', concentration: 25000 },
          { date: '2024-12-15', concentration: 20000 },
          { date: '2024-12-22', concentration: 15000 },
          { date: '2024-12-29', concentration: 20000 },
          { date: '2025-01-05', concentration: 22000 },
        ],
      },
      {
        name: 'Norovirus',
        status: 'High',
        dataPoints: [
          { date: '2024-12-01', concentration: 100000 },
          { date: '2024-12-08', concentration: 140000 },
          { date: '2024-12-15', concentration: 160000 },
          { date: '2024-12-22', concentration: 200000 },
          { date: '2024-12-29', concentration: 180000 },
          { date: '2025-01-05', concentration: 210000 },
        ],
      },
    ],
  },
  // Region 3 sample
  'Riverbend': {
    pathogens: [
      {
        name: 'SARS-CoV-2',
        status: 'Low',
        dataPoints: [
          { date: '2024-12-01', concentration: 15000 },
          { date: '2024-12-08', concentration: 20000 },
          { date: '2024-12-15', concentration: 22000 },
          { date: '2024-12-22', concentration: 30000 },
          { date: '2024-12-29', concentration: 28000 },
          { date: '2025-01-05', concentration: 25000 },
        ],
      },
      {
        name: 'Influenza A',
        status: 'High',
        dataPoints: [
          { date: '2024-12-01', concentration: 120000 },
          { date: '2024-12-08', concentration: 160000 },
          { date: '2024-12-15', concentration: 180000 },
          { date: '2024-12-22', concentration: 200000 },
          { date: '2024-12-29', concentration: 190000 },
          { date: '2025-01-05', concentration: 210000 },
        ],
      },
      {
        name: 'Norovirus',
        status: 'Moderate',
        dataPoints: [
          { date: '2024-12-01', concentration: 40000 },
          { date: '2024-12-08', concentration: 50000 },
          { date: '2024-12-15', concentration: 42000 },
          { date: '2024-12-22', concentration: 38000 },
          { date: '2024-12-29', concentration: 45000 },
          { date: '2025-01-05', concentration: 49000 },
        ],
      },
    ],
  },
};

/**
 * Utility function: returns a color based on pathogen name.
 * This is purely aesthetic—feel free to customize.
 */
function getColorByPathogen(pathogenName) {
  switch (pathogenName.toLowerCase()) {
    case 'sars-cov-2':
      return 'rgba(255, 99, 132, 0.6)'; // Red-ish
    case 'influenza a':
      return 'rgba(54, 162, 235, 0.6)'; // Blue-ish
    case 'norovirus':
      return 'rgba(255, 206, 86, 0.6)'; // Yellow-ish
    default:
      return 'rgba(153, 102, 255, 0.6)'; // Purple-ish as a fallback
  }
}

/**
 * Utility function: returns a color for the border stroke if needed.
 */
function getBorderColorByPathogen(pathogenName) {
  switch (pathogenName.toLowerCase()) {
    case 'sars-cov-2':
      return 'rgba(255, 99, 132, 1)'; 
    case 'influenza a':
      return 'rgba(54, 162, 235, 1)';
    case 'norovirus':
      return 'rgba(255, 206, 86, 1)';
    default:
      return 'rgba(153, 102, 255, 1)';
  }
}

function DashboardCardRegionTrends() {
  // List of regions from the keys of MOCK_DATA
  const regionList = Object.keys(MOCK_DATA);

  // State to hold selected region
  const [selectedRegion, setSelectedRegion] = useState(regionList[0]);

  // Build data for the summary table (Simple summary of pathogens & status)
  // and for the chart (longitudinal data).
  const [pathogenSummary, setPathogenSummary] = useState([]);
  const [chartData, setChartData] = useState({});

  /**
   * Builds a summary array like:
   * [
   *   { name: 'SARS-CoV-2', status: 'High' },
   *   { name: 'Influenza A', status: 'Moderate' },
   *   ...
   * ]
   *
   * Also prepares a Chart.js data object that shows lines for each pathogen’s concentration.
   */
  useEffect(() => {
    if (!selectedRegion) return;

    const regionData = MOCK_DATA[selectedRegion];
    if (!regionData) return;

    // Summary array
    const summaryArray = regionData.pathogens.map((path) => ({
      name: path.name,
      status: path.status,
    }));

    // Build Chart.js data
    const labels = regionData.pathogens[0]?.dataPoints.map((dp) => dp.date) || [];
    const datasets = regionData.pathogens.map((path) => {
      const color = getColorByPathogen(path.name);
      return {
        label: path.name,
        data: path.dataPoints.map((dp) => dp.concentration),
        fill: false,
        backgroundColor: color,
        borderColor: getBorderColorByPathogen(path.name),
        tension: 0.1, // Slight curve
      };
    });

    const newChartData = {
      labels,
      datasets,
    };

    setPathogenSummary(summaryArray);
    setChartData(newChartData);
  }, [selectedRegion]);

  /**
   * Chart.js configuration for line chart.
   */
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Concentration (copies/L)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Sampling Date',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#4B5563', // Gray-ish text
        },
      },
      title: {
        display: true,
        text: `Longitudinal Trends for ${selectedRegion}`,
        color: '#111827', // Dark text
        font: {
          size: 16,
        },
      },
    },
  };

  // Handler for changing selected region
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 space-y-6">
      {/* TITLE & DESCRIPTION */}
      <header className="border-b border-gray-100 dark:border-gray-700/60 pb-4">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
          Regional Pathogen Trends
        </h2>

      </header>

      {/* REGION SELECTOR */}
      <div>
        <label
          htmlFor="region-select"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Select a Region:
        </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={handleRegionChange}
          className="border border-gray-300 dark:border-gray-700/60 
                     text-gray-900 dark:text-gray-100 text-sm 
                     rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5
                     bg-gray-50 dark:bg-gray-700"
        >
          {regionList.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* SUMMARY OF PATHOGENS & STATUSES */}
      <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
        <h3 className="text-gray-700 dark:text-gray-200 text-sm uppercase font-semibold mb-3">
          Pathogen Status Summary
        </h3>
        <div className="space-y-2">
          {pathogenSummary.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-1 px-2 bg-white dark:bg-gray-800 rounded shadow-sm"
            >
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {item.name}
              </span>
              <span
                className={
                  item.status.toLowerCase() === 'high'
                    ? 'text-red-600 font-semibold'
                    : item.status.toLowerCase() === 'moderate'
                    ? 'text-yellow-600 font-semibold'
                    : 'text-green-600 font-semibold'
                }
              >
                {item.status}
              </span>
            </div>
          ))}
          {pathogenSummary.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No data available for the selected region.
            </p>
          )}
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div className="h-96 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
        {chartData?.datasets?.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300">
            No chart data available
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCardRegionTrends;
