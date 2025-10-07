import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: any;
    initMap: () => void;
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

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const initGoogleMap = () => {
      try {
        const map = new (window as any).google.maps.Map(mapRef.current!, {
          center: { lat: businessLocation.lat, lng: businessLocation.lng },
          zoom: 15,
          styles: [
            {
              "featureType": "all",
              "elementType": "all",
              "stylers": [
                { "saturation": -100 },
                { "gamma": 0.5 },
                { "lightness": 10 }
              ]
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
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
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

        // Open directions when map is clicked
        map.addListener('click', () => {
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${businessLocation.plusCode}`, '_blank');
        });

        setMapLoaded(true);
        console.log('Google Maps loaded successfully');
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setMapError(true);
      }
    };

    // Load Google Maps script if not already loaded
    if (typeof (window as any).google === 'undefined' || !(window as any).google.maps) {
      console.log('Loading Google Maps API...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('Google Maps script loaded');
        initGoogleMap();
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
        setMapError(true);
      };
      
      document.head.appendChild(script);
    } else {
      console.log('Google Maps already available');
      initGoogleMap();
    }
  }, []);

  if (mapError) {
    return (
      <motion.div 
        className="w-full h-full rounded-lg overflow-hidden border border-[#a87c64]/20 bg-dark-900 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center p-8">
          <h3 className="text-[#a87c64] text-lg mb-4">Our Location</h3>
          <p className="text-gray-300 mb-4">{businessLocation.name}</p>
          <p className="text-gray-400 text-sm mb-6">{businessLocation.address}</p>
          <button
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${businessLocation.plusCode}`, '_blank')}
            className="bg-[#a87c64] hover:bg-[#8a6b56] text-white px-6 py-3 rounded transition-colors duration-200"
          >
            Get Directions
          </button>
        </div>
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
      <div 
        ref={mapRef}
        className="w-full h-full min-h-[400px]"
      />
      
      {!mapLoaded && (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a87c64] mx-auto mb-4"></div>
            <p className="text-gray-300">Loading map...</p>
          </div>
        </div>
      )}
      
      {/* Overlay with business info */}
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