// components/InteractiveMap.tsx
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Corrigir o problema dos ícones do Leaflet no Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Tipo para os waypoints
interface Waypoint {
  id: number;
  position: [number, number];
  label: string;
}

// Tipo para os marcadores móveis
interface MovingMarker {
  id: number;
  position: [number, number];
  label: string;
}

// Componente principal do mapa
export function InteractiveMap() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [movingMarkers, setMovingMarkers] = useState<MovingMarker[]>([]);

  // Função para adicionar waypoint
  const addWaypoint = (position: [number, number]) => {
    const newWaypoint: Waypoint = {
      id: Date.now(),
      position,
      label: `Waypoint ${waypoints.length + 1}`
    };
    setWaypoints([...waypoints, newWaypoint]);
  };

  // Função para simular movimento de um marcador
  const simulateMarkerMovement = (markerId: number) => {
    setMovingMarkers(prev => {
      return prev.map(marker => {
        if (marker.id === markerId) {
          // Simular movimento aleatório
          const newLat = marker.position[0] + (Math.random() - 0.5) * 0.001;
          const newLng = marker.position[1] + (Math.random() - 0.5) * 0.001;
          return {
            ...marker,
            position: [newLat, newLng] as [number, number]
          };
        }
        return marker;
      });
    });
  };

  // Componente para lidar com cliques no mapa
  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      map.on('click', (e) => {
        addWaypoint([e.latlng.lat, e.latlng.lng]);
      });
    }, [map]);

    return null;
  };

  // Simular movimento dos marcadores a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      movingMarkers.forEach(marker => {
        simulateMarkerMovement(marker.id);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [movingMarkers]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[-23.5505, -46.6333]} // São Paulo
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Renderizar waypoints */}
        {waypoints.map(waypoint => (
          <Marker
            key={waypoint.id}
            position={waypoint.position}
            icon={icon}
          >
            <Popup>{waypoint.label}</Popup>
          </Marker>
        ))}

        {/* Renderizar marcadores móveis */}
        {movingMarkers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={icon}
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}

        <MapEvents />
      </MapContainer>
    </div>
  );
};
