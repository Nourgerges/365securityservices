import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface VideoShowcaseProps {
  title?: string;
  subtitle?: string;
  description?: string;
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  showContent?: boolean;
  variant?: "home" | "training";
}

export function VideoShowcase({
  title,
  subtitle,
  description,
  videoSrc,
  posterSrc,
  className = "",
  showContent = true,
  variant = "home"
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Start video loading after a brief delay to prioritize other content
          setTimeout(() => setShouldLoadVideo(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isInView && shouldLoadVideo) {
      const handleCanPlay = () => {
        setIsLoaded(true);
        setHasError(false);
        video.play().catch(() => {
          // Autoplay might be blocked, which is fine
        });
      };

      const handleError = () => {
        console.error("Video failed to load:", videoSrc);
        setHasError(true);
        setIsLoaded(false);
      };

      const handleLoadedMetadata = () => {
        // Video metadata loaded, start playing for smoother experience
        video.play().catch(() => {
          // Autoplay might be blocked
        });
      };

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [isInView, shouldLoadVideo, videoSrc]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={containerRef} className={`py-16 md:py-24 bg-black relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #a87c64 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #a87c64 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`grid grid-cols-1 ${variant === "home" ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-12 items-center`}
        >
          {/* Content Section */}
          {showContent && (
            <motion.div variants={itemVariants} className={variant === "training" ? "text-center mb-8" : ""}>
              {subtitle && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-0.5 bg-[#a87c64]"></div>
                  <span className="text-[#a87c64] font-rajdhani font-medium tracking-wide uppercase text-sm">
                    {subtitle}
                  </span>
                  <div className="w-12 h-0.5 bg-[#a87c64]"></div>
                </div>
              )}
              
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-white mb-6 leading-tight">
                  {title}
                </h2>
              )}
              
              {description && (
                <p className="text-gray-300 text-lg leading-relaxed font-rajdhani max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </motion.div>
          )}

          {/* Video Section */}
          <motion.div 
            variants={itemVariants}
            className={`relative ${variant === "training" ? "max-w-4xl mx-auto" : ""}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              {/* Poster image - shows immediately when in view */}
              {posterSrc && isInView && !isLoaded && (
                <motion.img
                  src={posterSrc}
                  alt="Video preview"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/9" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
              )}

              {/* Loading placeholder for video */}
              {!isLoaded && shouldLoadVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-3 border-[#a87c64] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[#a87c64] text-sm font-rajdhani">Loading video...</span>
                  </div>
                </div>
              )}

              {/* Error state */}
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">Video unavailable</div>
                    <button 
                      onClick={() => {
                        setHasError(false);
                        setShouldLoadVideo(true);
                      }}
                      className="text-[#a87c64] hover:text-[#a87c64]/80 transition-colors"
                    >
                      Retry loading
                    </button>
                  </div>
                </div>
              )}
              
              {/* Video element - loads when shouldLoadVideo is true */}
              {shouldLoadVideo && !hasError && (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={posterSrc}
                  className={`w-full h-auto transition-opacity duration-700 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ aspectRatio: "16/9" }}
                />
              )}
              
              {/* Elegant overlay border */}
              <div className="absolute inset-0 border border-[#a87c64]/20 rounded-2xl pointer-events-none"></div>
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#a87c64]"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#a87c64]"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#a87c64]"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#a87c64]"></div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#a87c64]/20 via-transparent to-[#a87c64]/20 rounded-3xl blur-xl opacity-50 -z-10"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}