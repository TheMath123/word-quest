'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });

// Tipos
interface Waypoint {
  id: number;
  position: [number, number];
  label: string;
}

interface MovingMarker {
  id: number;
  position: [number, number];
  label: string;
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
}

// Componente do Mapa sem as importações do Leaflet
export function InteractiveMap({ center = [-23.5505, -46.6333], zoom = 13 }: MapProps) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [movingMarkers, setMovingMarkers] = useState<MovingMarker[]>([]);
  const [map, setMap] = useState<L.Map | null>(null);

  // Carregando os componentes do Leaflet apenas no cliente

  // Configuração do ícone
  // const icon = L.icon({
  //   iconUrl: '/images/marker-icon.png',
  //   iconRetinaUrl: '/images/marker-icon-2x.png',
  //   shadowUrl: '/images/marker-shadow.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // });

  // Função para adicionar waypoint
  const addWaypoint = (position: [number, number]) => {
    const newWaypoint: Waypoint = {
      id: Date.now(),
      position,
      label: `Waypoint ${waypoints.length + 1}`
    };
    setWaypoints([...waypoints, newWaypoint]);
  };

  // Handler para cliques no mapa
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    addWaypoint([e.latlng.lat, e.latlng.lng]);
  };

  // Efeito para configurar eventos do mapa
  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick);
      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [map]);

  // Simulação de movimento dos marcadores
  useEffect(() => {
    const interval = setInterval(() => {
      setMovingMarkers(prev => prev.map(marker => ({
        ...marker,
        position: [
          marker.position[0] + (Math.random() - 0.5) * 0.001,
          marker.position[1] + (Math.random() - 0.5) * 0.001
        ] as [number, number]
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {waypoints.map(waypoint => (
          <Marker
            key={waypoint.id}
            position={waypoint.position}
          // icon={icon}
          >
            <Popup>{waypoint.label}</Popup>
          </Marker>
        ))}

        {movingMarkers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
          // icon={icon}
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
