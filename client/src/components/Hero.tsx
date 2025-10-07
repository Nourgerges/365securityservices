import { motion } from "framer-motion";
import { useEffect } from "react";
import logoImage from "../assets/new-logo.png";
import { VideoBackground } from "@/components/VideoBackground";

export function Hero() {
  // Preload video resource when component mounts
  useEffect(() => {
    const videoSrc = "/videos/BGBG_Video.mp4";
    
    // Create a link element for preloading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = videoSrc;
    link.as = 'video';
    link.type = 'video/mp4';
    document.head.appendChild(link);
    
    // Clean up
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Video background with fallback animation */}
      <VideoBackground videoSrc="/videos/BGBG_Video.mp4" overlayOpacity={0.85} />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 z-20 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl mx-auto relative">          
          {/* Main Logo - adjusted positioning with more top padding */}
          <motion.div 
            className="mb-12 mt-20 relative" /* Increased top margin to lower the logo position */
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 60,
              damping: 25,
              duration: 2.5 
            }}
          >
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2.2 }}
            >
              <img src={logoImage} alt="365 Security Services Logo" className="h-60 sm:h-64" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 text-[#a87c64] font-orbitron relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.8, 
              delay: 1.2
            }}
          >
            <span>SHIELDING WHAT MATTERS</span>
          </motion.h2>
          
          
        </div>
      </div>
    </section>
  );
}
