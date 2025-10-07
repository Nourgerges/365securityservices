import { motion } from "framer-motion";
import { Shield, Settings, FileCheck, Headphones } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Licensed Professionals",
      description: "Fully licensed and certified security experts with extensive training.",
      icon: Shield
    },
    {
      id: 2,
      title: "Advanced Technology",
      description: "Cutting-edge security technology for maximum protection.",
      icon: Settings
    },
    {
      id: 3,
      title: "Customized Solutions",
      description: "Tailored security plans designed for your unique requirements.",
      icon: FileCheck
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Round-the-clock service and immediate response to concerns.",
      icon: Headphones
    }
  ];

  return (
    <section className="py-20 bg-dark-800 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#a87c64]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#a87c64]/3 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="relative text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Main text with gradient */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a87c64] via-[#d4af94] to-[#a87c64] relative z-10">
              WHY US
            </span>
            
            {/* Glowing background effect */}
            <span className="absolute inset-0 text-[#a87c64] opacity-20 blur-sm">
              WHY US
            </span>
            
            {/* Subtle shadow text */}
            <span className="absolute inset-0 text-[#a87c64] translate-x-1 translate-y-1 opacity-10">
              WHY US
            </span>
          </motion.h2>
          
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent rounded-full relative">
              {/* Glowing effect for the line */}
              <div className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent rounded-full blur-sm opacity-60"></div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 font-rajdhani leading-relaxed relative z-10">
              Our{" "}
              <span className="text-[#a87c64] font-semibold">commitment to excellence</span>{" "}
              and{" "}
              <span className="text-[#a87c64] font-semibold">proven expertise</span>{" "}
              sets us apart in the security industry
            </p>
            
            {/* Subtle background glow for text */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a87c64]/5 to-transparent rounded-lg blur-xl"></div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={feature.id}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Card glow effect on hover */}
                <div className="absolute inset-0 bg-[#a87c64]/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-dark-900 p-8 rounded-xl border border-[#a87c64]/20 h-full flex flex-col text-center group-hover:border-[#a87c64]/50 group-hover:bg-dark-900/90 transition-all duration-500 backdrop-blur-sm">
                  {/* Icon container with subtle background */}
                  <motion.div 
                    className="relative w-16 h-16 mx-auto mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-[#a87c64]/10 rounded-full group-hover:bg-[#a87c64]/20 transition-colors duration-300"></div>
                    <div className="relative w-full h-full flex items-center justify-center text-[#a87c64]">
                      <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white font-rajdhani mb-4 group-hover:text-[#a87c64] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Subtle bottom accent */}
                  <motion.div 
                    className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#a87c64]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Optional bottom section with stats or additional info */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-8 text-gray-400 font-rajdhani">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#a87c64]">20+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="w-px h-8 bg-[#a87c64]/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#a87c64]">400+</div>
              <div className="text-sm">Clients Protected</div>
            </div>
            <div className="w-px h-8 bg-[#a87c64]/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#a87c64]">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
