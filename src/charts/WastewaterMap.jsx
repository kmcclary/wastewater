// ProSidebar imports for the sidebar
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaMapMarkerAlt, FaChartPie, FaCog } from 'react-icons/fa';

// Data
import { sites, cityBoundaries } from './wastewater-sites';
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { AlertCircle, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Add these styles to your component
const mapStyles = `
  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 0.5rem;
  }
`;

const WastewaterMap = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [infoBarExpanded, setInfoBarExpanded] = useState(true);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);
  const boundaryLayerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);

  const getLevelColor = (level) => {
    switch (level) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const pathogenRegions = {
    'SARS-CoV-2': [
      // Central US - smaller region around Kansas/Missouri
      [[39.5, -98.0], [39.5, -94.0], [37.0, -94.0], [37.0, -98.0]]
    ],
    'RSV': [
      [[47.0, -124.0], [47.0, -116.0], [42.0, -116.0], [42.0, -124.0]], // Pacific Northwest
    ],
    'Influenza A': [
      [[36.0, -121.0], [36.0, -114.0], [32.0, -114.0], [32.0, -121.0]], // Southwest
    ],
    'Influenza B': [
      [[41.0, -76.0], [41.0, -72.0], [37.0, -72.0], [37.0, -76.0]]
    ],
    // Add more regions as needed
  };

  const handlePathogenClick = (pathogenName) => {
    // Remove existing region
    if (boundaryLayerRef.current) {
      boundaryLayerRef.current.remove();
      boundaryLayerRef.current = null;
    }

    // Draw new region if exists
    const regions = pathogenRegions[pathogenName];
    if (regions && mapRef.current) {
      boundaryLayerRef.current = L.polygon(regions, {
        color: getLevelColor('high'),
        weight: 2,
        fillOpacity: 0.2,
        dashArray: '5, 10',
      }).addTo(mapRef.current);

      // Fit map to show the region
      mapRef.current.fitBounds(boundaryLayerRef.current.getBounds(), {
        padding: [50, 50],
        animate: true,
        duration: 1
      });
    }
  };

  useEffect(() => {
    // Add our custom styles
    const style = document.createElement('style');
    style.textContent = mapStyles;
    document.head.appendChild(style);

    if (!mapRef.current && mapContainerRef.current) {
      console.log('Initializing map...');
      try {
        mapRef.current = L.map(mapContainerRef.current, {
          center: [39.8283, -98.5795],
          zoom: 4,
          zoomControl: false // We'll use our custom zoom controls
        });

        console.log('Adding tile layer...');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(mapRef.current);

        console.log('Adding markers...');
        markersRef.current = sites.map(site => {
          // If this site is a cluster
          if (site.cluster) {
            const icon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: #F59E0B;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              ">${site.clusterCount}</div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            const marker = L.marker([site.lat, site.lng], { icon }).addTo(mapRef.current);
            marker.on('click', () => {
              mapRef.current.setView([site.lat, site.lng], 8, { animate: true, duration: 1.5 });
              // Remove the cluster marker
              marker.remove();
              // Create child markers
              site.children.forEach(child => {
                const childIcon = L.divIcon({
                  className: 'custom-div-icon',
                  html: `<div style="
                    width: 16px;
                    height: 16px;
                    background-color: ${getLevelColor(child.level)};
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  "></div>`,
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                });
                const childMarker = L.marker([child.lat, child.lng], { icon: childIcon })
                  .addTo(mapRef.current)
                  .on('click', () => setSelectedSite(child));
                childMarker.bindPopup(`
                  <div class="text-sm">
                    <strong>${child.name}</strong><br/>
                    Level: ${child.level}<br/>
                    Capacity: ${child.capacity}<br/>
                    Last Updated: ${child.lastUpdated}
                  </div>
                `);
                markersRef.current.push(childMarker);
              });
            });
            return marker;
          }

          // Otherwise, it's a single site marker
          const icon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="
              width: 16px;
              height: 16px;
              background-color: ${getLevelColor(site.level)};
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          const marker = L.marker([site.lat, site.lng], { icon })
            .addTo(mapRef.current)
            .on('click', () => {
              setSelectedSite(site);
              mapRef.current.setView([site.lat, site.lng], 12, { animate: true, duration: 3 });

              // Remove any existing boundary layer
              if (boundaryLayerRef.current) {
                boundaryLayerRef.current.remove();
                boundaryLayerRef.current = null;
              }

              // If there's a polygon boundary for this site, draw it
              const boundaries = cityBoundaries[site.name];
              if (boundaries) {
                boundaryLayerRef.current = L.polygon(boundaries, {
                  color: 'blue',
                  weight: 2
                }).addTo(mapRef.current);
              }
            });

          marker.bindPopup(`
            <div class="text-sm">
              <strong>${site.name}</strong><br/>
              Level: ${site.level}<br/>
              Capacity: ${site.capacity}<br/>
              Last Updated: ${site.lastUpdated}
            </div>
          `);

          return marker;
        });

        // Force a resize to ensure the map fills its container
        setTimeout(() => {
          mapRef.current.invalidateSize();
        }, 100);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    return () => {
      if (mapRef.current) {
        console.log('Cleaning up map...');
        markersRef.current.forEach(marker => marker.remove());
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
      // Clean up added elements
      style.remove();
    };
  }, [sites]);

  useEffect(() => {
    if (mapRef.current) {
      // Trigger map resize immediately and after transition
      mapRef.current.invalidateSize();
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 300); // Match this with the transition duration
    }
  }, [infoBarExpanded]);

  useEffect(() => {
    // Create resize observer for the map container
    if (mapContainerRef.current && mapRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        mapRef.current.invalidateSize();
      });
      
      resizeObserverRef.current.observe(mapContainerRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const toggleInfoBar = () => {
    setInfoBarExpanded(prev => !prev);
  };

  return (
  <Card>
    <CardContent className="p-0"> {/* Remove default padding */}
      <div className="relative w-full h-[450px] flex overflow-hidden"> {/* Add overflow-hidden */}
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 flex flex-col bg-white z-10 border-r"> {/* Add flex-shrink-0 and border */}
          {/* Fixed Header */}
          <div className="p-2">
            <h3 className="text-xl font-semibold">Overview</h3>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <div className="space-y-3">
              {[
                {
                  name: 'SARS-CoV-2',
                  level: 'high',
                  description: 'Upward trend in the last 21 days and high concentration'
                },
                {
                  name: 'RSV',
                  level: 'high',
                  description: 'Upward trend in the last 21 days and high concentration'
                },
                {
                  name: 'Influenza A',
                  level: 'high',
                  description: 'Upward trend in the last 21 days and high concentration'
                },
                {
                  name: 'Influenza B',
                  level: 'low',
                  description: 'Pathogen is seasonal and not in onset'
                },
                {
                  name: 'Human Metapneumovirus',
                  level: 'low',
                  description: 'Pathogen is seasonal and not in onset'
                },
                {
                  name: 'Norovirus',
                  level: 'high',
                  description: 'Upward trend in the last 21 days and high concentration'
                },
                {
                  name: 'Mpox clade II',
                  level: 'low',
                  description: '0 out of 379 samples in the past 10 days were positive'
                },
                {
                  name: 'EVD68',
                  level: 'low',
                  description: 'Pathogen is seasonal and not in onset'
                },
                {
                  name: 'Candida auris',
                  level: 'low',
                  description: '18 out of 379 samples in the past 10 days were positive'
                },
                {
                  name: 'Hepatitis A',
                  level: 'low',
                  description: '38 out of 379 samples in the past 10 days were positive'
                }
              ].map((pathogen, index) => (
                <div
                  key={index}
                  onClick={() => handlePathogenClick(pathogen.name)}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold">{pathogen.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pathogen.level === 'high' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {pathogen.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{pathogen.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Container - updated styling */}
        <div 
          ref={mapContainerRef} 
          className={`flex-1 transition-all duration-300 ${
            infoBarExpanded ? '' : 'ml-[-16rem]'
          } rounded-r-lg overflow-hidden bg-gray-100`}
          style={{ minHeight: '400px' }}
        />
        
        {/* Update left positioning for controls */}
        <div className="absolute top-8 left-[280px] bg-white p-2 rounded-lg shadow-lg z-[1000]">
          <button 
                onClick={handleZoomIn}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
        </div>

        {/* Update left positioning for legend */}
        <div className="absolute bottom-8 left-[280px] bg-white p-2 rounded-lg shadow-lg z-[1000]">
          <h3 className="text-sm font-semibold mb-2">Pathogen Levels</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Low</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export default WastewaterMap;
