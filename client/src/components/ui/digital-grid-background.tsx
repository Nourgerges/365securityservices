import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface GridNode {
  id: number;
  x: number;
  y: number;
  pulseDelay: number;
  size: number;
  connectsTo: number[];
}

interface LineConnection {
  id: string;
  from: number;
  to: number;
  thickness: number;
  duration: number;
  delay: number;
}

interface DigitalGridBackgroundProps {
  className?: string;
  density?: number; // Controls node density (higher = more nodes)
  accentColor?: string;
  connectRadius?: number; // Distance within which nodes connect
}

export function DigitalGridBackground({
  className = '',
  density = 20, // Default density
  accentColor = '#a87c64',
  connectRadius = 30, // Default connection radius
}: DigitalGridBackgroundProps) {
  const [gridNodes, setGridNodes] = useState<GridNode[]>([]);
  const [connections, setConnections] = useState<LineConnection[]>([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Website color palette
  const colors = {
    primary: accentColor, // Main brand color (bronze/copper)
    secondary: '#FFFFFF', // White for contrast
    tertiary: '#555555', // Gray for subtle elements
    glow: `0 0 8px ${accentColor}80`,
    background: 'rgba(25, 25, 30, 0.8)', // Dark background
  };

  // Generate nodes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const generateNodes = () => {
      const gridCols = Math.ceil(dimensions.width / density);
      const gridRows = Math.ceil(dimensions.height / density);
      const totalNodes = Math.floor((gridCols * gridRows) / 8); // Reduce total number of nodes for simplicity
      
      const newNodes: GridNode[] = [];
      
      // Create nodes in a more structured grid
      for (let i = 0; i < totalNodes; i++) {
        // Create a structured grid with slight randomness
        const col = i % gridCols;
        const row = Math.floor(i / gridCols) % gridRows;
        
        const x = (col / gridCols) * 100 + (Math.random() * 3 - 1.5); // +/- 1.5% randomness
        const y = (row / gridRows) * 100 + (Math.random() * 3 - 1.5);
        
        newNodes.push({
          id: i,
          x,
          y,
          pulseDelay: Math.random() * 5, // Shorter random delays
          size: Math.random() < 0.2 ? 3 : 2, // Simpler size distribution
          connectsTo: [], // Will be filled in next
        });
      }
      
      // Connect nodes that are within connectRadius of each other
      const newConnections: LineConnection[] = [];
      for (let i = 0; i < newNodes.length; i++) {
        const node = newNodes[i];
        const maxConnections = 3; // Limit connections for simplicity
        let connectionCount = 0;
        
        for (let j = 0; j < newNodes.length; j++) {
          if (i !== j && connectionCount < maxConnections) {
            const targetNode = newNodes[j];
            const dx = (node.x - targetNode.x) / 100 * dimensions.width;
            const dy = (node.y - targetNode.y) / 100 * dimensions.height;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectRadius) {
              // Connect these nodes
              node.connectsTo.push(j);
              connectionCount++;
              
              // Create the line animation with faster speeds
              newConnections.push({
                id: `${i}-${j}`,
                from: i,
                to: j,
                thickness: 1, // Consistent thickness for simplicity
                duration: 1.5 + Math.random() * 2, // Faster animation (was 2-8s before)
                delay: Math.random() * 3, // Shorter delays
              });
            }
          }
        }
      }
      
      setGridNodes(newNodes);
      setConnections(newConnections);
    };
    
    generateNodes();
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions.width, dimensions.height, density, connectRadius, accentColor]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 z-0"></div>
      
      {/* Grid lines (subtle background grid) */}
      <div className="absolute inset-0 z-0 opacity-10"
           style={{
             backgroundImage: `
               linear-gradient(to right, ${colors.primary}30 1px, transparent 1px),
               linear-gradient(to bottom, ${colors.primary}30 1px, transparent 1px)
             `,
             backgroundSize: `${density * 2}px ${density * 2}px`
           }}>
      </div>
      
      {/* The nodes (connection points) */}
      {gridNodes.map((node) => (
        <motion.div
          key={`node-${node.id}`}
          className="absolute rounded-full z-10"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: node.size > 2 ? colors.primary : colors.secondary,
            boxShadow: node.size > 2 ? colors.glow : 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3, // Faster pulse animation
            delay: node.pulseDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Connection lines with "data transfer" animations */}
      <svg className="absolute inset-0 w-full h-full z-5 opacity-70">
        {connections.map((connection) => {
          if (!gridNodes[connection.from] || !gridNodes[connection.to]) return null;
          
          const fromNode = gridNodes[connection.from];
          const toNode = gridNodes[connection.to];
          
          return (
            <g key={`connection-${connection.id}`}>
              {/* Animated line */}
              <motion.line
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={colors.primary}
                strokeWidth={connection.thickness}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1],
                  opacity: [0.1, 0.4, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Moving data packet */}
              <motion.circle
                cx={`${fromNode.x}%`}
                cy={`${fromNode.y}%`}
                r={1.5}
                fill={colors.primary}
                initial={{ opacity: 0 }}
                animate={{
                  cx: [`${fromNode.x}%`, `${toNode.x}%`],
                  cy: [`${fromNode.y}%`, `${toNode.y}%`],
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: connection.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Simplified decoration elements - just one subtle glow */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30">
        <motion.div 
          className="absolute rounded-full"
          style={{
            top: '30%',
            left: '50%',
            width: '40vw',
            height: '40vw',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${colors.primary}20 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}