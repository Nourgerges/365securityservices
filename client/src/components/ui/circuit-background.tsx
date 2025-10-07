import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

// Define interface for nodes (CPU connection points)
interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  pulseDelay: number;
}

// Define interface for connections between nodes
interface Connection {
  id: string;
  from: number;
  to: number;
  activated: boolean;
  activationDelay: number;
}

interface CircuitBackgroundProps {
  nodeCount?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  color?: string;
}

export function CircuitBackground({
  nodeCount = 15, // Reduced count for better performance
  minSize = 3,
  maxSize = 6,
  className = "",
  color = "#a87c64" // Website's bronze accent color
}: CircuitBackgroundProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  // Reference to animation frame for cleanup
  const animationFrameRef = useRef<number | null>(null);

  // Create nodes at specific points like a CPU architecture
  const generateNodes = useCallback(() => {
    const newNodes: Node[] = [];
    
    // Create a grid-like structure for nodes
    const gridSize = Math.sqrt(nodeCount);
    const rows = Math.ceil(gridSize);
    const cols = Math.ceil(nodeCount / rows);
    
    // Add some randomization to make it look more organic
    for (let i = 0; i < nodeCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      // Calculate base position in grid
      const baseX = (col / (cols - 1)) * 90 + 5; // 5-95% width
      const baseY = (row / (rows - 1)) * 90 + 5; // 5-95% height
      
      // Add slight randomization
      const randomOffset = 6; // How much randomness to add
      const x = baseX + (Math.random() * randomOffset - randomOffset/2);
      const y = baseY + (Math.random() * randomOffset - randomOffset/2);
      
      newNodes.push({
        id: i,
        x,
        y,
        size: Math.random() * (maxSize - minSize) + minSize,
        pulseDelay: Math.random() * 3
      });
    }
    
    setNodes(newNodes);
    return newNodes;
  }, [nodeCount, minSize, maxSize]);
  
  // Create connections between nodes
  const generateConnections = useCallback((nodes: Node[]) => {
    if (nodes.length === 0) return [];
    
    const newConnections: Connection[] = [];
    const connectionCount = nodes.length * 1.5; // 1.5 connections per node on average
    
    // Create a adjacency matrix-like structure for nodes
    for (let i = 0; i < connectionCount; i++) {
      const fromNode = Math.floor(Math.random() * nodes.length);
      let toNode;
      
      // Find a different node that's somewhat close to connect to
      do {
        toNode = Math.floor(Math.random() * nodes.length);
      } while (
        toNode === fromNode || 
        // Prevent connections that span the entire screen
        Math.abs(nodes[fromNode].x - nodes[toNode].x) > 40 ||
        Math.abs(nodes[fromNode].y - nodes[toNode].y) > 40
      );
      
      newConnections.push({
        id: `connection-${fromNode}-${toNode}-${i}`, // Ensure unique ID with the connection index
        from: fromNode,
        to: toNode,
        activated: Math.random() > 0.5, // Some start activated
        activationDelay: Math.random() * 5
      });
    }
    
    setConnections(newConnections);
    return newConnections;
  }, []);

  useEffect(() => {
    // Initialize nodes and connections
    const nodes = generateNodes();
    generateConnections(nodes);
    
    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      // Regenerate when window size changes
      const newNodes = generateNodes();
      generateConnections(newNodes);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [generateNodes, generateConnections]);

  // Creates geometric connection lines (direct or angled)
  const renderConnection = (connection: Connection) => {
    const fromNode = nodes[connection.from];
    const toNode = nodes[connection.to];
    
    if (!fromNode || !toNode) return null;
    
    // Create geometric, non-direct connections with possible midpoints for more angular/triangle paths
    // Determine if this connection should be direct or use angular paths
    const useAngularPath = Math.random() > 0.4; // 60% chance of angular path
    
    if (useAngularPath) {
      // Create an intermediate point for angular connection
      const midX = (fromNode.x + toNode.x) / 2 + (Math.random() * 10 - 5); // Add some randomness
      const midY = (fromNode.y + toNode.y) / 2 + (Math.random() * 10 - 5);
      
      // First segment - from start to midpoint
      const dx1 = (midX - fromNode.x) * dimensions.width / 100;
      const dy1 = (midY - fromNode.y) * dimensions.height / 100;
      const angle1 = Math.atan2(dy1, dx1) * (180 / Math.PI);
      const length1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      // Second segment - from midpoint to end
      const dx2 = (toNode.x - midX) * dimensions.width / 100;
      const dy2 = (toNode.y - midY) * dimensions.height / 100;
      const angle2 = Math.atan2(dy2, dx2) * (180 / Math.PI);
      const length2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      return (
        <div key={connection.id}>
          {/* First segment */}
          <motion.div
            key={`${connection.id}-part1`}
            className="absolute pointer-events-none origin-left"
            style={{
              left: `${fromNode.x}%`,
              top: `${fromNode.y}%`,
              width: `${length1}px`,
              height: '1px',
              backgroundColor: color,
              transform: `rotate(${angle1}deg)`,
              opacity: 0.15, // Reduced brightness
              zIndex: 1
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0.08, 0.3, 0.08], // Reduced opacity values
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: connection.activationDelay,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 2
            }}
          />
          
          {/* Second segment */}
          <motion.div
            key={`${connection.id}-part2`}
            className="absolute pointer-events-none origin-left"
            style={{
              left: `${midX}%`,
              top: `${midY}%`,
              width: `${length2}px`,
              height: '1px',
              backgroundColor: color,
              transform: `rotate(${angle2}deg)`,
              opacity: 0.15, // Reduced brightness
              zIndex: 1
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0.08, 0.3, 0.08], // Reduced opacity values
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: connection.activationDelay + 0.2, // Slight delay for sequential activation
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 2
            }}
          />
        </div>
      );
    } else {
      // Calculate direct line for some connections
      const dx = (toNode.x - fromNode.x) * dimensions.width / 100;
      const dy = (toNode.y - fromNode.y) * dimensions.height / 100;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const length = Math.sqrt(dx * dx + dy * dy);
      
      return (
        <motion.div
          key={connection.id}
          className="absolute pointer-events-none origin-left"
          style={{
            left: `${fromNode.x}%`,
            top: `${fromNode.y}%`,
            width: `${length}px`,
            height: '1px',
            backgroundColor: color,
            transform: `rotate(${angle}deg)`,
            opacity: 0.15, // Reduced brightness
            zIndex: 1
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0.08, 0.3, 0.08], // Reduced opacity values
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: connection.activationDelay,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 2
          }}
        />
      );
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Render the connections first (so they appear behind nodes) */}
      {connections.map(renderConnection)}
      
      {/* Render the nodes on top of connections */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: color,
            marginLeft: `-${node.size / 2}px`,
            marginTop: `-${node.size / 2}px`,
            zIndex: 2
          }}
          animate={{
            boxShadow: [
              `0 0 0px ${color}`,
              `0 0 5px ${color}`, // Reduced glow effect
              `0 0 0px ${color}`
            ],
            scale: [1, 1.15, 1], // Slightly reduced scale animation too
          }}
          transition={{
            duration: 3,
            delay: node.pulseDelay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
}