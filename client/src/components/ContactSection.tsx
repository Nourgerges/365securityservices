import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: any;
    initContactMap: () => void;
  }
}

// Business location coordinates from Google Maps
const businessLocation = {
  lat: 33.8861258,
  lng: 35.5494234,
  name: '365 Security Services',
  address: 'Dekwaneh, Lebanon',
  googleMapsUrl: 'https://www.google.com/maps/place/365+Security+Services/@33.8861258,35.5494234,601m/data=!3m2!1e3!4b1!4m6!3m5!1s0x151f17f15614ae21:0x795ce8b34b2a17f7!8m2!3d33.8861258!4d35.5494234!16s%2Fg%2F11x2crdcp4?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D'
};

export function ContactSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const initGoogleMap = () => {
      try {
        const map = new (window as any).google.maps.Map(mapRef.current!, {
          center: { lat: businessLocation.lat, lng: businessLocation.lng },
          zoom: 16,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{"color": "#212121"}]
            },
            {
              "elementType": "labels.icon",
              "stylers": [{"visibility": "off"}]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#212121"}]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#9e9e9e"}]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [{"visibility": "off"}]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#bdbdbd"}]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [{"color": "#181818"}]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#616161"}]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#1b1b1b"}]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [{"color": "#2c2c2c"}]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#8a8a8a"}]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [{"color": "#373737"}]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [{"color": "#3c3c3c"}]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [{"color": "#4e4e4e"}]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#616161"}]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{"color": "#000000"}]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#3d3d3d"}]
            }
          ],
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false
        });

        const marker = new (window as any).google.maps.Marker({
          position: { lat: businessLocation.lat, lng: businessLocation.lng },
          map: map,
          title: businessLocation.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="60" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
                  </filter>
                  <linearGradient id="pinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="30%" style="stop-color:#e0e0e0;stop-opacity:1" />
                    <stop offset="70%" style="stop-color:#a87c64;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8a6b56;stop-opacity:1" />
                  </linearGradient>
                  <linearGradient id="innerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#cccccc;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <!-- Pin shadow -->
                <ellipse cx="20" cy="56" rx="6" ry="2.5" fill="#000000" opacity="0.3"/>
                <!-- Sharp pin body -->
                <path d="M20 3C13 3 7.5 8.5 7.5 15.5c0 11 12.5 40.5 12.5 40.5s12.5-29.5 12.5-40.5C32.5 8.5 27 3 20 3z" 
                      fill="url(#pinGradient)" 
                      stroke="#333333" 
                      stroke-width="1.5" 
                      filter="url(#shadow)"/>
                <!-- Inner circle -->
                <circle cx="20" cy="15.5" r="6" fill="url(#innerGradient)" stroke="#666666" stroke-width="1"/>
                <!-- Inner dot -->
                <circle cx="20" cy="15.5" r="3" fill="#a87c64"/>
                <!-- Metallic shine -->
                <ellipse cx="17" cy="12" rx="2" ry="1.5" fill="#ffffff" opacity="0.6"/>
                <!-- Sharp tip highlight -->
                <circle cx="20" cy="53" r="1" fill="#ffffff" opacity="0.3"/>
              </svg>
            `),
            scaledSize: new (window as any).google.maps.Size(40, 60),
            anchor: new (window as any).google.maps.Point(20, 56)
          }
        });

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="color: #333; font-family: Arial, sans-serif; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #a87c64;">${businessLocation.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px;">${businessLocation.address}</p>
              <button 
                onclick="window.open('${businessLocation.googleMapsUrl}', '_blank')"
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
          window.open(businessLocation.googleMapsUrl, '_blank');
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setMapError(true);
      }
    };

    if (typeof (window as any).google === 'undefined' || !(window as any).google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-orbitron">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-rajdhani">
            Ready to enhance your security? Contact us for a consultation and discover how 365 Security Services can protect what matters most to you.
          </p>
        </motion.div>

        {/* Contact Form and Information */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div 
            className="bg-dark-900 p-8 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white font-rajdhani">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a87c64] focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a87c64] focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a87c64] focus:border-transparent text-white placeholder-gray-400"
                    placeholder="+961 XX XXX XXX"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a87c64] focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a87c64] focus:border-transparent text-white placeholder-gray-400 resize-none"
                  placeholder="Tell us about your security needs..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full bg-[#a87c64] hover:bg-[#8a6b56] text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {formStatus === "success" && (
                <motion.div 
                  className="text-green-400 mt-4 text-center p-4 bg-green-400/10 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Your message has been sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {formStatus === "error" && (
                <div className="text-red-400 mt-4 text-center">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="bg-dark-800 p-5 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-3 text-white font-rajdhani">Contact Information</h3>

            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="bg-[#a87c64]/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-200 mb-1">Office Address</h3>
                  <p className="text-gray-400 text-sm">
                    {businessLocation.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#a87c64]/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-200 mb-1">Phone</h3>
                  <p className="text-gray-400 text-sm">+961 01 511 365</p>
                  <p className="text-gray-400 text-sm">+961 81 365 365</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#a87c64]/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-200 mb-1">Email</h3>
                  <a href="mailto:info@365securityservices.company" className="text-gray-400 text-sm hover:text-[#a87c64] transition-colors">info@365securityservices.company</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#a87c64]/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-200 mb-1">Business Hours</h3>
                  <p className="text-gray-400 text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-400 text-sm">24/7 Emergency Services Available</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-600">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-[#a87c64]/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-200 mb-2">Connect With Us</h3>
                </div>
                <div className="flex space-x-3">
                  <a 
                    href="https://www.linkedin.com/company/365-security-services" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-[#a87c64]/10 hover:bg-[#a87c64]/20 p-2 rounded-full transition duration-300"
                  >
                    <svg className="w-4 h-4 text-[#a87c64]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/365securityservices/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-[#a87c64]/10 hover:bg-[#a87c64]/20 p-2 rounded-full transition duration-300"
                  >
                    <svg className="w-4 h-4 text-[#a87c64]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full Width Google Map Section */}
        <motion.div 
          className="overflow-hidden shadow-xl h-[450px] -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-24 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div 
            ref={mapRef}
            className="w-full h-full"
          />
          
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a87c64] mx-auto mb-4"></div>
                <p className="text-gray-300">Loading map...</p>
              </div>
            </div>
          )}
          
          {mapError && (
            <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-[#a87c64] text-lg mb-4">Our Location</h3>
                <p className="text-gray-300 mb-4">{businessLocation.name}</p>
                <p className="text-gray-400 text-sm mb-6">{businessLocation.address}</p>
                <button
                  onClick={() => window.open(businessLocation.googleMapsUrl, '_blank')}
                  className="bg-[#a87c64] hover:bg-[#8a6b56] text-white px-6 py-3 rounded transition-colors duration-200"
                >
                  Get Directions
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}