import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoSrc?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  posterSrc?: string;
}

export function VideoBackground({
  videoSrc,
  overlay = true,
  overlayOpacity = 0.6,
  posterSrc
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  
  // Force absolute URL for video source if not already absolute
  const absoluteVideoSrc = videoSrc && !videoSrc.startsWith('http') && !videoSrc.startsWith('//') 
    ? new URL(videoSrc, window.location.origin).href 
    : videoSrc;

  // Detect user preference and connection for intelligent loading
  useEffect(() => {
    const shouldAutoLoad = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return false;
      
      // Check connection quality if available
      const connection = (navigator as any).connection;
      if (connection) {
        // Don't auto-load on slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          return false;
        }
        // Auto-load on fast connections
        if (connection.effectiveType === '4g') {
          return true;
        }
      }
      
      // Default to loading after a short delay to prioritize other content
      return true;
    };

    if (shouldAutoLoad()) {
      const timer = setTimeout(() => setShouldLoadVideo(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current || !videoSrc || !shouldLoadVideo) return;

    const video = videoRef.current;
    
    const handleCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    
    const handleError = (e: Event) => {
      console.error('Video loading failed:', absoluteVideoSrc);
      setHasError(true);
      setIsLoaded(false);
    };
    
    const handleLoadedMetadata = () => {
      // Start playing as soon as metadata is loaded for faster perceived loading
      video.play().catch(() => {
        // Autoplay failed, which is fine for background videos
      });
    };
    
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Check if video is already loaded
    if (video.readyState >= 3) {
      setIsLoaded(true);
    }
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [shouldLoadVideo, absoluteVideoSrc, videoSrc]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Placeholder gradient background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/80 to-dark-900"></div>
      
      {/* Poster image - shows immediately if provided */}
      {posterSrc && !isLoaded && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={posterSrc}
            alt="Video thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      )}

      {/* Video background - loads intelligently based on connection */}
      {videoSrc && shouldLoadVideo && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={absoluteVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}
      
      {/* Fallback when video fails to load */}
      {hasError && !posterSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      )}
      
      {/* Enhanced dark overlay with bronze tint to ensure text readability and make logo pop */}
      {overlay && (
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            opacity: overlayOpacity,
            background: "linear-gradient(to bottom, rgba(15, 15, 20, 0.95), rgba(15, 15, 20, 0.85), rgba(15, 15, 20, 0.95))",
            mixBlendMode: "multiply"
          }}
        ></div>
      )}
      
      {/* Bronze color overlay to match the site's theme */}
      {overlay && (
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            opacity: 0.15,
            backgroundColor: "#a87c64",
            mixBlendMode: "color"
          }}
        ></div>
      )}
      
      {/* Noise texture for added visual interest */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-20"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'multiply'
        }}
      ></div>
    </div>
  );
}