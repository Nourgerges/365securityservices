import { ParticleBackground } from "@/components/ui/particle-background";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background particles */}
      <ParticleBackground count={30} minSize={2} maxSize={6} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-2xl p-10 md:p-16 border border-[#a87c64]/30 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-[#a87c64] font-orbitron mb-4">READY TO SECURE YOUR FUTURE?</h2>
              <p className="text-xl text-gray-300 font-rajdhani">
                Contact us today for a comprehensive security assessment and personalized protection plan.
              </p>
            </div>
            <div className="lg:w-1/3">
              <motion.a 
                href="/contact" 
                className="w-full block text-center px-8 py-4 rounded-full bg-[#a87c64] text-dark-900 font-rajdhani font-semibold hover:opacity-90 transition duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Request a Consultation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
