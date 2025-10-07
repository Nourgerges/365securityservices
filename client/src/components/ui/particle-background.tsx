import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export function ParticleBackground({
  count = 100,
  minSize = 2,
  maxSize = 10,
  className = ''
}: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Create a function to generate colors using a more powerful, security-focused palette
  const getRandomColor = () => {
    // More intense, security-focused colors
    const securityColors = [
      'rgba(168, 124, 100, 0.95)', // Main bronze accent - more intense
      'rgba(190, 30, 45, 0.85)', // Deep red for security/power
      'rgba(25, 118, 210, 0.9)', // Intense blue for technology
      'rgba(40, 40, 45, 0.95)', // Deep security black
      'rgba(190, 140, 40, 0.9)', // Gold for prestige/value
    ];
    return securityColors[Math.floor(Math.random() * securityColors.length)];
  };

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      // Create a more structured, security-focused grid pattern with some controlled randomness
      let x, y;
      
      // Decide between structured grid points (70%) and dynamic security elements (30%)
      if (Math.random() < 0.7) {
        // Grid pattern - more structured for a security/technology feel
        const gridSize = 6; // number of grid sections
        const cellX = Math.floor(Math.random() * gridSize);
        const cellY = Math.floor(Math.random() * gridSize);
        
        // Position within grid cell with slight variation
        x = (cellX / gridSize * 100) + (Math.random() * 5 - 2.5);
        y = (cellY / gridSize * 100) + (Math.random() * 5 - 2.5);
      } else {
        // Some dynamic "security patrol" elements that cover more space
        const side = Math.floor(Math.random() * 4); // 4 sides like a perimeter
        
        switch (side) {
          case 0: // top perimeter
            x = Math.random() * 100;
            y = Math.random() * 20;
            break;
          case 1: // right perimeter
            x = 80 + Math.random() * 20;
            y = Math.random() * 100;
            break;
          case 2: // bottom perimeter
            x = Math.random() * 100;
            y = 80 + Math.random() * 20;
            break;
          case 3: // left perimeter
            x = Math.random() * 20;
            y = Math.random() * 100;
            break;
          default:
            x = Math.random() * 100;
            y = Math.random() * 100;
        }
      }
      
      newParticles.push({
        id: i,
        x,
        y,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 4 + 3, // Even faster animation for more dynamic motion
        delay: Math.random() * 2, // Shorter delay for faster startup
        opacity: Math.random() * 0.5 + 0.1,
        color: getRandomColor()
      });
    }
    setParticles(newParticles);
  }, [count, minSize, maxSize]);

  useEffect(() => {
    generateParticles();

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      // Regenerate particles on resize for better distribution
      generateParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateParticles]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none backdrop-blur-[1px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: `radial-gradient(circle at center, ${particle.color} 10%, transparent 80%)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 0.5}px #fff`,
            filter: 'blur(0.5px)', // Slight blur for dynamic glow
            border: particle.size > 5 ? '1px solid rgba(255,255,255,0.1)' : 'none', // Tech border for larger particles
          }}
          animate={{
            // More direct, forceful movements like shields or scanning patterns
            ...(Math.random() > 0.5 
              ? { // Horizontal patrol motion - security scan pattern
                  x: ['-60px', '60px', '-60px'],
                  y: ['0px', '15px', '0px'],
                }
              : { // Vertical security scan pattern
                  y: ['-60px', '60px', '-60px'],
                  x: ['0px', '15px', '0px'],
                }
            ),
            scale: [0.9, 1.5, 0.9], // More pronounced power pulse
            opacity: [particle.opacity * 0.7, particle.opacity * 3, particle.opacity * 0.7], // Stronger contrast
          }}
          transition={{
            duration: particle.duration * 0.8, // Even faster for more power
            delay: particle.delay * 0.5, // Less delay, more immediate
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeOut", // More forceful movement - accelerate quickly then slow
            times: [0, 0.5, 1], // Simplified power curve
            stiffness: 300, // Higher stiffness for more snap
            damping: 15 // More controlled movements
          }}
        />
      ))}
    </div>
  );
}
