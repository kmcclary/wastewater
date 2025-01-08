export const sites = [
    // Original Data
    { id: 1, name: 'Treatment Plant A', lat: 40.7128, lng: -74.0060, level: 'high' },
    {
      id: 'la-cluster',
      cluster: true,
      lat: 34.0522,
      lng: -118.2437,
      clusterCount: 3,
      children: [
        { id: 4, name: 'Los Angeles', lat: 34.0522, lng: -118.2437, level: 'medium' },
        { id: 5, name: 'Long Beach', lat: 33.7701, lng: -118.1937, level: 'low' },
        { id: 6, name: 'Irvine', lat: 33.6846, lng: -117.8265, level: 'high' }
      ]
    },
    { id: 3, name: 'Treatment Plant C', lat: 41.8781, lng: -87.6298, level: 'low' },
  
    // Additional Single Sites
    { id: 7, name: 'Treatment Plant D', lat: 29.7604, lng: -95.3698, level: 'medium' },
    { id: 8, name: 'Treatment Plant E', lat: 47.6062, lng: -122.3321, level: 'low' },
    { id: 9, name: 'Treatment Plant F', lat: 39.7392, lng: -104.9903, level: 'medium' },
    { id: 10, name: 'Treatment Plant G', lat: 25.7617, lng: -80.1918, level: 'high' },
    { id: 11, name: 'Treatment Plant H', lat: 33.4484, lng: -112.0740, level: 'low' },
    { id: 12, name: 'Treatment Plant I', lat: 42.3601, lng: -71.0589, level: 'medium' },
  
    // Florida Cluster
    {
      id: 'florida-cluster',
      cluster: true,
      lat: 27.9942,
      lng: -81.7603,
      clusterCount: 4,
      children: [
        { id: 13, name: 'Orlando', lat: 28.5383, lng: -81.3792, level: 'low' },
        { id: 14, name: 'Tampa', lat: 27.9506, lng: -82.4572, level: 'high' },
        { id: 15, name: 'Miami', lat: 25.7617, lng: -80.1918, level: 'medium' },
        { id: 16, name: 'Jacksonville', lat: 30.3322, lng: -81.6557, level: 'low' },
      ]
    },
  
    // Texas Cluster
    {
      id: 'texas-cluster',
      cluster: true,
      lat: 31.9686,
      lng: -99.9018,
      clusterCount: 3,
      children: [
        { id: 17, name: 'Dallas', lat: 32.7767, lng: -96.7970, level: 'high' },
        { id: 18, name: 'San Antonio', lat: 29.4241, lng: -98.4936, level: 'low' },
        { id: 19, name: 'Austin', lat: 30.2672, lng: -97.7431, level: 'medium' }
      ]
    },
  ];
  
  export const cityBoundaries = {
    'Treatment Plant A': [
      [ [40.72, -74.02], [40.72, -74.00], [40.70, -74.00], [40.70, -74.02] ]
    ],
    'Los Angeles': [
      [ [34.05, -118.25], [34.06, -118.24], [34.04, -118.22], [34.03, -118.24] ]
    ],
    // ...rest of the boundaries data...
  };
  