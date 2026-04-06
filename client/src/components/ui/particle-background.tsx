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
  count = 12,
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
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: `radial-gradient(circle at center, ${particle.color} 10%, transparent 80%)`,
          }}
          animate={{
            opacity: [particle.opacity * 0.5, particle.opacity * 1.5, particle.opacity * 0.5],
          }}
          transition={{
            duration: particle.duration * 1.5,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
