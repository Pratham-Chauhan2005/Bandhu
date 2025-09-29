
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { MapItem } from '@/app/nearby-map/page';
import Image from 'next/image';

// --- Custom SVG Icons ---
const createIcon = (color: string) => {
  return L.divIcon({
    html: `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3C10.48 3 6 7.48 6 13C6 20.25 16 30 16 30C16 30 26 20.25 26 13C26 7.48 21.52 3 16 3Z" fill="${color}" stroke="white" stroke-width="1.5"/>
        <circle cx="16" cy="13" r="4" fill="white"/>
      </svg>
    `,
    className: '', // important to clear default styling
    iconSize: [32, 32],
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
  });
};

const icons = {
  homestay: createIcon('#2E8B57'), // SeaGreen
  food: createIcon('#FF6F00'),     // Vivid Orange
  event: createIcon('#6A5ACD'),      // SlateBlue
};

// --- Map Center Controller ---
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

interface NearbyMapProps {
  center: { lat: number; lng: number };
  items: MapItem[];
}

export default function NearbyMap({ center, items }: NearbyMapProps) {
  const position: [number, number] = [center.lat, center.lng];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}>
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User Location Marker */}
      <Marker position={position} icon={L.divIcon({
        html: `<div class="relative flex h-4 w-4"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-primary"></span></div>`,
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      })}>
          <Popup>You are here</Popup>
      </Marker>

      {items.map(item => (
        <Marker key={item.id} position={[item.latitude, item.longitude]} icon={icons[item.type]}>
          <Popup>
            <div className="w-48">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={100}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="font-bold text-md text-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
