import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// Import client logos
import mashrou3CafeImage from "@assets/Mashroo Cafe-cMHZD4zA.png";
import MilanaLogo from '@assets/Milana.png';
import FWLogo from '@assets/FW.png';
import KarakandLogo from '@assets/Karakand.png';
import KultLogo from '@assets/KULT.png';
import ShabablakiLogo from '@assets/Shabablaki.png';
import FCS1Logo from '@assets/FCS1.png';
import CicadaLogo from '@assets/Cicada.png';
import AndaluciaLogo from '@assets/Andalucia.png';
import AvenuePlazaLogo from '@assets/Avenue_Plaza_01.jpg';

interface Client {
  id: number;
  name: string;
  logo?: string;
}

export function ClientsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPositionRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Client information with actual logos
  const clients: Client[] = [
    { id: 1, name: "Machrou3 Cafe", logo: mashrou3CafeImage },
    { id: 2, name: "Milana", logo: MilanaLogo },
    { id: 3, name: "FW", logo: FWLogo },
    { id: 4, name: "Karakand", logo: KarakandLogo },
    { id: 5, name: "Kult", logo: KultLogo },
    { id: 6, name: "Shabablaki", logo: ShabablakiLogo },
    { id: 7, name: "FCS1", logo: FCS1Logo },
    { id: 8, name: "Cicada", logo: CicadaLogo },
    { id: 9, name: "Andalucia", logo: AndaluciaLogo },
    { id: 10, name: "Avenue Plaza", logo: AvenuePlazaLogo }
  ];

  // Calculate dimensions
  const itemWidth = 160; // w-40 = 160px
  const gap = 32; // gap-8 = 32px
  const totalWidth = (itemWidth + gap) * clients.length;
  const speed = 50; // pixels per second

  // Smooth animation function
  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isPaused) {
      currentPositionRef.current -= (speed * deltaTime) / 1000;
      
      // Reset position for seamless loop
      if (currentPositionRef.current <= -totalWidth) {
        currentPositionRef.current = 0;
      }
      
      controls.set({ x: currentPositionRef.current });
    }

    animationIdRef.current = requestAnimationFrame(animate);
  }, [isPaused, totalWidth, speed, controls]);

  // Start animation
  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [animate]);

  // Handle mouse events
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    lastTimeRef.current = 0; // Reset timing
  }, []);

  // Handle wheel scrolling (both vertical and horizontal)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    // Handle both horizontal (deltaX) and vertical (deltaY) scrolling
    const scrollAmount = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 0.5;
    currentPositionRef.current -= scrollAmount;
    
    // Keep within bounds for seamless loop
    if (currentPositionRef.current > 0) {
      currentPositionRef.current = -totalWidth + 1;
    } else if (currentPositionRef.current <= -totalWidth) {
      currentPositionRef.current = 0;
    }
    
    controls.set({ x: currentPositionRef.current });
  }, [totalWidth, controls]);

  // Handle touch/swipe gestures for mobile
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX;
    const touchDelta = touchStartRef.current - touchEndRef.current;
    
    currentPositionRef.current -= touchDelta * 0.5;
    
    // Keep within bounds
    if (currentPositionRef.current > 0) {
      currentPositionRef.current = -totalWidth + 1;
    } else if (currentPositionRef.current <= -totalWidth) {
      currentPositionRef.current = 0;
    }
    
    controls.set({ x: currentPositionRef.current });
    touchStartRef.current = touchEndRef.current;
  }, [totalWidth, controls]);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsPaused(false), 300);
  }, []);

  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a87c64]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#a87c64]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[#a87c64] font-orbitron mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TRUSTED BY EXCELLENCE
          </motion.h2>

          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent to-[#a87c64] w-20"></div>
            <div className="w-3 h-3 border-2 border-[#a87c64] rotate-45"></div>
            <div className="h-px bg-gradient-to-l from-transparent to-[#a87c64] w-20"></div>
          </motion.div>


        </motion.div>

        {/* Enhanced Infinite Scroll Carousel */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-800 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-800 to-transparent z-20 pointer-events-none"></div>

          <div 
            className="overflow-hidden py-8 scrollbar-hide"
            onWheel={handleWheel}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div 
              ref={containerRef}
              className="flex gap-8 cursor-grab active:cursor-grabbing"
              animate={controls}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ userSelect: 'none' }}
            >
              {/* First set of logos */}
              {clients.map((client, index) => (
                <motion.div
                  key={`first-${client.id}`}
                  className="flex-shrink-0 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative w-32 h-24 md:w-40 md:h-28 bg-dark-900/60 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-[#a87c64]/30 group-hover:border-[#a87c64]/80 overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a87c64]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Logo container */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      {client.logo ? (
                        <img 
                          src={client.logo} 
                          alt={`${client.name} logo`} 
                          className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500 transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#a87c64]/20 to-[#a87c64]/10 rounded-lg flex items-center justify-center">
                          <span className="text-[#a87c64] font-bold text-lg">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a87c64]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>

                  {/* Client name always visible */}
                  <motion.p 
                    className="text-center mt-3 text-sm font-rajdhani font-medium text-gray-300 group-hover:text-[#a87c64] transition-colors duration-300"
                  >
                    {client.name}
                  </motion.p>
                </motion.div>
              ))}

              {/* Duplicate set for seamless scrolling */}
              {clients.map((client) => (
                <motion.div
                  key={`second-${client.id}`}
                  className="flex-shrink-0 group cursor-pointer"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative w-32 h-24 md:w-40 md:h-28 bg-dark-900/60 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-[#a87c64]/30 group-hover:border-[#a87c64]/80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a87c64]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      {client.logo ? (
                        <img 
                          src={client.logo} 
                          alt={`${client.name} logo`} 
                          className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500 transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#a87c64]/20 to-[#a87c64]/10 rounded-lg flex items-center justify-center">
                          <span className="text-[#a87c64] font-bold text-lg">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a87c64]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>

                  <motion.p 
                    className="text-center mt-3 text-sm font-rajdhani font-medium text-gray-300 group-hover:text-[#a87c64] transition-colors duration-300"
                  >
                    {client.name}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative inline-flex items-center gap-6 px-8 py-4 bg-dark-900/60 backdrop-blur-sm rounded-2xl border border-[#a87c64]/20">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#a87c64]/10 via-transparent to-[#a87c64]/10 rounded-2xl"
              animate={{ 
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="flex items-center gap-2 text-[#a87c64] font-rajdhani font-medium">
              <div className="w-2 h-2 bg-[#a87c64] rounded-full animate-pulse"></div>
              <span>Excellence</span>
            </div>

            <div className="w-px h-6 bg-[#a87c64]/30"></div>

            <div className="flex items-center gap-2 text-[#a87c64] font-rajdhani font-medium">
              <div className="w-2 h-2 bg-[#a87c64] rounded-full animate-pulse delay-1000"></div>
              <span>Trust</span>
            </div>

            <div className="w-px h-6 bg-[#a87c64]/30"></div>

            <div className="flex items-center gap-2 text-[#a87c64] font-rajdhani font-medium">
              <div className="w-2 h-2 bg-[#a87c64] rounded-full animate-pulse delay-2000"></div>
              <span>Security</span>
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}