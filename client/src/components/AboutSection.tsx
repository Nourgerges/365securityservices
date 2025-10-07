import { motion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";

export function AboutSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Video background with darker overlay */}
      <VideoBackground videoSrc="/videos/BGBG_Video.mp4" overlayOpacity={0.85} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <motion.h2 
            className="relative text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main text with gradient */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a87c64] via-[#d4af94] to-[#a87c64] relative z-10">
              ABOUT 365 SECURITY SERVICES
            </span>
            
            {/* Glowing background effect */}
            <span className="absolute inset-0 text-[#a87c64] opacity-15 blur-sm">
              ABOUT 365 SECURITY SERVICES
            </span>
          </motion.h2>
          
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent rounded-full relative">
              <div className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent rounded-full blur-sm opacity-60"></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <motion.div
              className="relative mb-8"
              variants={fadeInUp}
            >
              <p className="text-xl md:text-2xl text-gray-300 font-rajdhani leading-relaxed text-center select-none relative z-10">
                At 365 Security Services, we believe that true security comes from precision planning and flawless execution. Our team of highly trained professionals provides{" "}
                <span className="text-[#a87c64] font-semibold">comprehensive security solutions</span>{" "}
                <span className="text-[#a87c64] font-semibold">tailored to your specific needs</span>.
              </p>
              
              {/* Subtle background glow for text */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a87c64]/5 to-transparent rounded-lg blur-xl"></div>
            </motion.div>
            <motion.p 
              className="text-gray-300 mb-10 font-rajdhani text-lg text-center select-none"
              variants={fadeInUp}
            >
              With years of experience in the industry, we've developed a reputation for excellence and reliability. We understand that security isn't just about physical protection—it's about creating peace of mind.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
              variants={staggerContainer}
            >
              <motion.div 
                className="bg-dark-800 p-6 rounded-lg border border-[#a87c64]/20 transform transition hover:translate-y-[-5px]"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(168, 124, 100, 0.25)",
                  borderColor: "#a87c64" 
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.15
                }}
              >
                <div className="text-[#a87c64] mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-rajdhani mb-2 text-center select-none">Trusted Protection</h3>
                <p className="text-gray-300 text-sm text-center select-none">Security solutions you can depend on, every day of the year.</p>
              </motion.div>
              
              <motion.div 
                className="bg-dark-800 p-6 rounded-lg border border-[#a87c64]/20 transform transition hover:translate-y-[-5px]"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(168, 124, 100, 0.25)",
                  borderColor: "#a87c64" 
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.15
                }}
              >
                <div className="text-[#a87c64] mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-rajdhani mb-2 text-center select-none">Expert Team</h3>
                <p className="text-gray-300 text-sm text-center select-none">Highly trained professionals with extensive experience.</p>
              </motion.div>
              
              <motion.div 
                className="bg-dark-800 p-6 rounded-lg border border-[#a87c64]/20 transform transition hover:translate-y-[-5px]"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(168, 124, 100, 0.25)",
                  borderColor: "#a87c64" 
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.15
                }}
              >
                <div className="text-[#a87c64] mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-rajdhani mb-2 text-center select-none">24/7 Service</h3>
                <p className="text-gray-300 text-sm text-center select-none">Round-the-clock protection when you need it most.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
