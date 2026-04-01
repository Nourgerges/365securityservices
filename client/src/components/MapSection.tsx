import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: any;
    initMap: () => void;
    gm_authFailure?: () => void;
  }
}

// Business location using Plus Code VGPX+FQ Dekwaneh
const businessLocation = {
  lat: 33.8863,
  lng: 35.5494,
  name: '365 Security Services',
  address: 'Dekwaneh, Lebanon',
  plusCode: 'VGPX+FQ Dekwaneh'
};

const mapEmbedUrl = `https://www.google.com/maps?q=${businessLocation.lat},${businessLocation.lng}&z=15&output=embed`;

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!mapRef.current) return;

    if (!apiKey || ['undefined', 'null'].includes(apiKey) || apiKey.includes('YOUR_') || apiKey.includes('REPLACE_')) {
      setMapError(true);
      return;
    }

    const previousAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      setMapError(true);
      setMapLoaded(false);
      if (typeof previousAuthFailure === 'function') {
        previousAuthFailure();
      }
    };

    const initGoogleMap = () => {
      try {
        const map = new (window as any).google.maps.Map(mapRef.current!, {
          center: { lat: businessLocation.lat, lng: businessLocation.lng },
          zoom: 15,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { gamma: 0.5 }, { lightness: 10 }]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false
        });

        const marker = new (window as any).google.maps.Marker({
          position: { lat: businessLocation.lat, lng: businessLocation.lng },
          map: map,
          title: businessLocation.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' +
              encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#a87c64" stroke="#ffffff" stroke-width="2"/>
                <circle cx="20" cy="20" r="8" fill="#ffffff"/>
              </svg>
            `),
            scaledSize: new (window as any).google.maps.Size(40, 40),
            anchor: new (window as any).google.maps.Point(20, 20)
          }
        });

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="color: #333; font-family: Arial, sans-serif; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #a87c64;">${businessLocation.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px;">${businessLocation.address}</p>
              <button 
                onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${businessLocation.plusCode}', '_blank')"
                style="background: #a87c64; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;"
              >
                Get Directions
              </button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        map.addListener('click', () => {
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${businessLocation.plusCode}`, '_blank');
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setMapError(true);
      }
    };

    if (typeof (window as any).google === 'undefined' || !(window as any).google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        initGoogleMap();
      };

      script.onerror = () => {
        setMapError(true);
      };

      document.head.appendChild(script);
    } else {
      initGoogleMap();
    }

    return () => {
      window.gm_authFailure = previousAuthFailure;
    };
  }, [apiKey]);

  if (mapError) {
    return (
      <motion.div
        className="w-full h-full rounded-lg overflow-hidden border border-[#a87c64]/20 bg-dark-900 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <iframe
          title="365 Security Services location"
          src={mapEmbedUrl}
          className="w-full h-full min-h-[400px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full rounded-lg overflow-hidden border border-[#a87c64]/20 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />

      {!mapLoaded && (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a87c64] mx-auto mb-4"></div>
            <p className="text-gray-300">Loading map...</p>
          </div>
        </div>
      )}

      <motion.div
        className="absolute top-4 left-4 bg-dark-900/95 backdrop-blur-sm p-4 rounded-lg border border-[#a87c64]/30 max-w-xs z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <strong className="block text-[#a87c64] text-lg mb-2">{businessLocation.name}</strong>
        <span className="text-sm text-gray-300 block mb-3">{businessLocation.address}</span>
        <button
          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${businessLocation.plusCode}`, '_blank')}
          className="bg-[#a87c64] hover:bg-[#8a6b56] text-white text-sm px-3 py-2 rounded transition-colors duration-200"
        >
          Get Directions
        </button>
      </motion.div>
    </motion.div>
  );
}
