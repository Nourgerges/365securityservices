import { motion } from "framer-motion";
import { useState } from "react";

interface ExpertiseArea {
  id: number;
  title: string;
  icon: string;
  description: string;
  gradient: string;
}

export function ExpertiseSection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const expertiseAreas: ExpertiseArea[] = [
    {
      id: 1,
      title: "Governmental Institutions",
      icon: "fas fa-landmark",
      description: "High-security solutions for government facilities",
      gradient: "from-gray-800/30 to-gray-900/20"
    },
    {
      id: 2,
      title: "Banking & Financial",
      icon: "fas fa-university",
      description: "Advanced protocols for financial institutions",
      gradient: "from-gray-800/30 to-gray-900/20"
    },
    {
      id: 3,
      title: "Hospitality Industry",
      icon: "fas fa-hotel",
      description: "Guest safety and property protection",
      gradient: "from-gray-800/30 to-gray-900/20"
    },
    {
      id: 4,
      title: "Corporate Facilities",
      icon: "fas fa-building",
      description: "Comprehensive corporate security solutions",
      gradient: "from-gray-800/30 to-gray-900/20"
    },
    {
      id: 5,
      title: "Healthcare Institutions",
      icon: "fas fa-hospital",
      description: "Specialized medical facility security",
      gradient: "from-gray-800/30 to-gray-900/20"
    },
    {
      id: 6,
      title: "Retail & Commercial",
      icon: "fas fa-store",
      description: "Loss prevention and customer safety",
      gradient: "from-gray-800/30 to-gray-900/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    }
  };

  const cardVariants = {
    idle: {
      scale: 1,
      y: 0,
      rotateX: 0,
      boxShadow: "0 4px 20px rgba(168, 124, 100, 0.1)"
    },
    hover: {
      scale: 1.05,
      y: -8,
      rotateX: 5,
      boxShadow: "0 20px 40px rgba(168, 124, 100, 0.3)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="expertise" className="py-16 bg-dark-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#a87c64]/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#a87c64]/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#a87c64] font-orbitron mb-3">
            AREAS OF EXPERTISE
          </h2>
          <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-4"></div>
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 font-rajdhani leading-relaxed relative z-10">
              <span className="text-[#a87c64] font-semibold">Specialized security solutions</span>{" "}
              for various{" "}
              <span className="text-[#a87c64] font-semibold">sectors and industries</span>
            </p>
            
            {/* Subtle background glow for text */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a87c64]/5 to-transparent rounded-lg blur-xl"></div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.id}
              className="group relative flex flex-col items-center text-center"
              variants={itemVariants}
              onHoverStart={() => setHoveredItem(area.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              {/* Icon */}
              <motion.div 
                className="mb-4"
                animate={{
                  y: hoveredItem === area.id ? -8 : 0
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full bg-dark-800 border-2 border-[#a87c64]/30 flex items-center justify-center text-[#a87c64] text-3xl cursor-pointer"
                  whileHover={{ 
                    boxShadow: "0 0 25px rgba(168, 124, 100, 0.4)",
                    scale: 1.05,
                    backgroundColor: "#a87c64",
                    color: "#121212",
                    borderColor: "#a87c64",
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  animate={{
                    boxShadow: hoveredItem === area.id 
                      ? "0 0 20px rgba(168, 124, 100, 0.3)" 
                      : "0 4px 15px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <i className={area.icon}></i>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="text-lg font-bold text-white font-rajdhani cursor-pointer"
                animate={{
                  color: hoveredItem === area.id ? "#a87c64" : "#ffffff"
                }}
                transition={{ duration: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {area.title}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
}