export const sites = [
  // Original Data
  { id: 1, name: 'New York Treatment Plant', lat: 40.7128, lng: -74.0060, level: 'high', capacity: '500 MGD', lastUpdated: '2023-10-01' },
  {
    id: 'la-cluster',
    cluster: true,
    lat: 34.0522,
    lng: -118.2437,
    clusterCount: 3,
    children: [
      { id: 4, name: 'Los Angeles Treatment Plant', lat: 34.0522, lng: -118.2437, level: 'medium', capacity: '300 MGD', lastUpdated: '2023-09-15' },
      { id: 5, name: 'Long Beach Treatment Plant', lat: 33.7701, lng: -118.1937, level: 'low', capacity: '200 MGD', lastUpdated: '2023-09-10' },
      { id: 6, name: 'Irvine Treatment Plant', lat: 33.6846, lng: -117.8265, level: 'high', capacity: '250 MGD', lastUpdated: '2023-09-20' }
    ]
  },
  { id: 3, name: 'Chicago Treatment Plant', lat: 41.8781, lng: -87.6298, level: 'low', capacity: '400 MGD', lastUpdated: '2023-10-05' },
  // Additional Single Sites
  { id: 7, name: 'Houston Treatment Plant', lat: 29.7604, lng: -95.3698, level: 'medium', capacity: '450 MGD', lastUpdated: '2023-09-25' },
  { id: 8, name: 'Seattle Treatment Plant', lat: 47.6062, lng: -122.3321, level: 'low', capacity: '350 MGD', lastUpdated: '2023-09-30' },
  { id: 9, name: 'Denver Treatment Plant', lat: 39.7392, lng: -104.9903, level: 'medium', capacity: '300 MGD', lastUpdated: '2023-09-28' },
  { id: 10, name: 'Miami Treatment Plant', lat: 25.7617, lng: -80.1918, level: 'high', capacity: '500 MGD', lastUpdated: '2023-10-02' },
  { id: 11, name: 'Phoenix Treatment Plant', lat: 33.4484, lng: -112.0740, level: 'low', capacity: '350 MGD', lastUpdated: '2023-09-22' },
  { id: 12, name: 'Boston Treatment Plant', lat: 42.3601, lng: -71.0589, level: 'medium', capacity: '400 MGD', lastUpdated: '2023-09-18' },
  { id: 20, name: 'Kansas City Treatment Plant', lat: 39.0997, lng: -94.5786, level: 'medium', capacity: '350 MGD', lastUpdated: '2023-10-10' },
  { id: 21, name: 'Portland Treatment Plant', lat: 45.5155, lng: -122.6789, level: 'medium', capacity: '450 MGD', lastUpdated: '2023-10-12' },
  { id: 22, name: 'Boise Treatment Plant', lat: 43.6150, lng: -116.2023, level: 'low', capacity: '250 MGD', lastUpdated: '2023-10-12' },
  { id: 23, name: 'Wichita Treatment Plant', lat: 37.6872, lng: -97.3301, level: 'high', capacity: '300 MGD', lastUpdated: '2023-10-13' },
  // Florida Cluster
  {
    id: 'florida-cluster',
    cluster: true,
    lat: 27.9942,
    lng: -81.7603,
    clusterCount: 4,
    children: [
      { id: 13, name: 'Orlando Treatment Plant', lat: 28.5383, lng: -81.3792, level: 'low', capacity: '300 MGD', lastUpdated: '2023-09-12' },
      { id: 14, name: 'Tampa Treatment Plant', lat: 27.9506, lng: -82.4572, level: 'high', capacity: '450 MGD', lastUpdated: '2023-09-14' },
      { id: 15, name: 'Miami Treatment Plant', lat: 25.7617, lng: -80.1918, level: 'medium', capacity: '500 MGD', lastUpdated: '2023-10-02' },
      { id: 16, name: 'Jacksonville Treatment Plant', lat: 30.3322, lng: -81.6557, level: 'low', capacity: '350 MGD', lastUpdated: '2023-09-16' },
    ]
  },
  // Texas Cluster
  {
    id: 'texas-cluster',
    cluster: true,
    lat: 30.2672, lng: -97.7431,
    clusterCount: 3,
    children: [
      { id: 17, name: 'Dallas Treatment Plant', lat: 32.7767, lng: -96.7970, level: 'high', capacity: '500 MGD', lastUpdated: '2023-09-20' },
      { id: 18, name: 'San Antonio Treatment Plant', lat: 29.4241, lng: -98.4936, level: 'low', capacity: '300 MGD', lastUpdated: '2023-09-18' },
      { id: 19, name: 'Austin Treatment Plant', lat: 30.2672, lng: -97.7431, level: 'medium', capacity: '400 MGD', lastUpdated: '2023-09-22' }
    ]
  },
];

export const cityBoundaries = {
  'New York Treatment Plant': [
    [ [40.72, -74.02], [40.72, -74.00], [40.70, -74.00], [40.70, -74.02] ]
  ],
  'Los Angeles Treatment Plant': [
    [ [34.05, -118.25], [34.06, -118.24], [34.04, -118.22], [34.03, -118.24] ]
  ],
  // ...rest of the boundaries data...
};
