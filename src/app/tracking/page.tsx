'use client';

import { useState, useEffect } from 'react';
import { Loader2, MapPin, AlertTriangle } from 'lucide-react';

export default function TrackingPage() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [status, setStatus] = useState('loading'); // loading, success, error, denied

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setStatus('success');
        },
        (error) => {
          console.error('Geolocation error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setStatus('denied');
          } else {
            setStatus('error');
          }
        }
      );
    } else {
      setStatus('error');
    }
  }, []);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="font-semibold">Detecting your location...</p>
          </div>
        );
      case 'success':
        if (location) {
          const { latitude, longitude } = location;
          const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
          return (
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={mapSrc}
              className="rounded-lg shadow-md"
            ></iframe>
          );
        }
        return null; // Should not happen if status is success
      case 'denied':
        return (
          <div className="flex flex-col items-center justify-center text-destructive text-center space-y-4">
            <AlertTriangle className="h-8 w-8" />
            <p className="font-semibold">Location Access Denied</p>
            <p className="text-sm">Please enable location services in your browser settings to use this feature.</p>
          </div>
        );
      case 'error':
      default:
        return (
          <div className="flex flex-col items-center justify-center text-destructive text-center space-y-4">
            <AlertTriangle className="h-8 w-8" />
            <p className="font-semibold">Could not get your location</p>
            <p className="text-sm">Please check your connection and try again.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Your Current Location</h1>
      </div>
      <div className="w-full h-[60vh] rounded-lg bg-card border flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
