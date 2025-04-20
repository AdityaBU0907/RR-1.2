import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Truck, Package, Navigation } from 'lucide-react';
import { TruckLocation } from '../../types/truck';

// Using a public token for development - replace with your own token from mapbox.com
// In production, this should be stored in an environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNqcHZhbjZwdTAwNGQzeW13N3EwdHR5ZW0ifQ.eUoFcv36L0UQ5NNfXRXBGQ';

interface MapViewProps {
  truckLocations: TruckLocation[];
  centerLocation?: [number, number];
  showPopups?: boolean;
  height?: string;
}

const MapView: React.FC<MapViewProps> = ({ 
  truckLocations, 
  centerLocation = [-96, 38], // Default to US center
  showPopups = true,
  height = '100%',
}) => {
  const mapRef = useRef(null);
  const [selectedTruck, setSelectedTruck] = useState<TruckLocation | null>(null);
  const [viewState, setViewState] = useState({
    longitude: centerLocation[0],
    latitude: centerLocation[1],
    zoom: 3.5
  });

  useEffect(() => {
    if (centerLocation) {
      setViewState({
        longitude: centerLocation[0],
        latitude: centerLocation[1],
        zoom: centerLocation[0] !== -96 ? 12 : 3.5, // Zoom in if it's a specific location
      });
    }
  }, [centerLocation]);

  return (
    <div style={{ height, width: '100%' }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        
        {truckLocations.map(truck => (
          <Marker
            key={truck.id}
            longitude={truck.coordinates[0]}
            latitude={truck.coordinates[1]}
            anchor="center"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedTruck(truck);
            }}
          >
            <div className={`marker ${truck.status === 'active' ? 'marker-pulse' : ''}`}>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Truck size={12} />
              </div>
            </div>
          </Marker>
        ))}
        
        {showPopups && selectedTruck && (
          <Popup
            longitude={selectedTruck.coordinates[0]}
            latitude={selectedTruck.coordinates[1]}
            anchor="bottom"
            onClose={() => setSelectedTruck(null)}
            closeButton={true}
            closeOnClick={false}
            className="z-10"
            offset={25}
          >
            <div className="p-1">
              <h3 className="font-medium text-sm">{selectedTruck.name}</h3>
              <p className="text-xs text-gray-500">{selectedTruck.driver}</p>
              
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center text-xs">
                  <Navigation size={12} className="mr-1 text-primary-500" />
                  <span className="text-gray-700">{selectedTruck.location}</span>
                </div>
                
                <div className="flex items-center text-xs">
                  <Package size={12} className="mr-1 text-accent-500" />
                  <span className="text-gray-700">
                    {selectedTruck.load}/{selectedTruck.capacity} tons
                  </span>
                </div>
                
                <div className="mt-2 w-full h-1.5 bg-gray-200 rounded-full">
                  <div 
                    className={`h-1.5 rounded-full ${
                      (selectedTruck.load / selectedTruck.capacity) > 0.9 
                        ? 'bg-danger-500' 
                        : (selectedTruck.load / selectedTruck.capacity) > 0.75 
                          ? 'bg-accent-500' 
                          : 'bg-secondary-500'
                    }`}
                    style={{ width: `${(selectedTruck.load / selectedTruck.capacity) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="mt-2 flex justify-end">
                <button className="text-xs text-primary-600 hover:text-primary-800">
                  View Details
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapView;