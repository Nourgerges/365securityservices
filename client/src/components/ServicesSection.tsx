import { ServiceCard } from "@/components/ServiceCard";
import { motion } from "framer-motion";
import pic1 from "@assets/Pic 1.jpg";
import pic2 from "@assets/Pic 2.jpg";
import pic3 from "@assets/Pic 3.jpg";
import pic4 from "@assets/Pic 4.jpg";

export function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Manned Services",
      description: "Our highly trained and experienced security guards stand ready to provide around-the-clock protection for your business, event, or personal security needs, ensuring your utmost safety and peace of mind.",
      imageSrc: pic1,
      imageAlt: "Security guard with radio"
    },
    {
      id: 2,
      title: "Security Consultancy",
      description: "Our expert security consultants analyze your unique security challenges and provide tailored solutions to address vulnerabilities. We help you implement comprehensive security protocols that protect your assets and people.",
      imageSrc: pic2,
      imageAlt: "Security consultation meeting"
    },
    {
      id: 3,
      title: "Cash Services",
      description: "We provide secure transportation and protection for your cash and valuables. Our team of armed guards ensures the safety of your assets throughout the entire process, from collection to delivery.",
      imageSrc: pic3,
      imageAlt: "Cash transfer armored vehicle"
    },
    {
      id: 4,
      title: "Security Training",
      description: "Train. Fight. Defend. \n\n365 Security Services offers elite security training in self-defense, crisis response, VIP protection, and emergency preparedness, equipping you with tactical skills to handle real-world threats with confidence.",
      imageSrc: pic4,
      imageAlt: "Security training at shooting range"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="services" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#a87c64] font-orbitron mb-3">
            SECURITY SOLUTIONS
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
              <span className="text-[#a87c64] font-semibold">Elite protection services</span>{" "}
              crafted for your{" "}
              <span className="text-[#a87c64] font-semibold">unique requirements</span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard 
                title={service.title} 
                description={service.description} 
                imageSrc={service.imageSrc} 
                imageAlt={service.imageAlt} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
