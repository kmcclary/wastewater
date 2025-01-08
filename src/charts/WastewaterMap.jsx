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
    width: 75%;
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
              mapRef.current.setView([site.lat, site.lng], 8);
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
                    Level: ${child.level}
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
              mapRef.current.setView([site.lat, site.lng], 12);

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
              Level: ${site.level}
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
    <Card className="w-full">

      <CardContent>
        <div className="relative w-full h-[450px] flex">
          {/* Info Bar */}
          <div className={`absolute h-full w-64 transition-transform duration-300 transform ${
            infoBarExpanded ? 'translate-x-0' : '-translate-x-full'
          } bg-white p-4 shadow-lg z-[1000]`}>

            <div className="flex gap-2">
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
            <h3 className="text-sm font-semibold mb-2">Information</h3>
            <div className="space-y-2">
              <p className="text-sm">Additional information can go here.</p>
            </div>
          </div>

          {/* Map Container */}
          <div 
            ref={mapContainerRef} 
            className={`absolute inset-0 transition-all duration-300 ${
              infoBarExpanded ? 'left-64' : 'left-0'
            } rounded-lg overflow-hidden bg-gray-100`}
            style={{ minHeight: '400px' }}
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
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

          {/* Site Information Panel */}
          {selectedSite && (
            <div className="absolute top-4 right-4 w-64 bg-white p-4 rounded-lg shadow-lg z-[1000]">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{selectedSite.name}</h3>
                <button 
                  onClick={() => setSelectedSite(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
  
            </div>
          )}


        </div>
      </CardContent>
    </Card>
  );
};

export default WastewaterMap;
