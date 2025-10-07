import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ParticleBackground } from "@/components/ui/particle-background";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

interface ServiceData {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string[];
  features: string[];
  benefits: string[];
  imageSrc: string;
  imageAlt: string;
}

export default function ServiceDetail() {
  const [service, setService] = useState<ServiceData | null>(null);
  const [_, params] = useRoute('/services/:slug');
  const slug = params?.slug;

  // Simulated service data - in a real app, this would come from an API
  const services: ServiceData[] = [
    {
      id: 1,
      title: "Manned Services",
      slug: "manned-services",
      description: "Our highly trained and experienced security guards stand ready to provide around-the-clock protection for your business, event, or personal security needs, ensuring your utmost safety and peace of mind.",
      longDescription: [
        "Our Manned Services division provides fully trained, licensed and professional security guards to protect your assets, personnel, and visitors. We understand that security is not just about physical presence, but about creating a secure environment through vigilance, attention to detail, and proactive measures.",
        "All our security personnel are thoroughly vetted, undergo rigorous training, and are equipped with the latest security equipment and communication tools. They are trained to handle various security situations, from routine patrols to emergency responses, ensuring comprehensive protection for your premises."
      ],
      features: [
        "24/7 Security Guard Coverage",
        "Fully Licensed & Insured Personnel",
        "Uniformed & Plain-clothes Options",
        "Advanced Security Training",
        "Immediate Emergency Response",
        "Detailed Security Reporting"
      ],
      benefits: [
        "Enhanced Security Presence",
        "Reduced Security Incidents",
        "Improved Staff & Customer Confidence",
        "Professional First Point of Contact",
        "Rapid Response to Emergencies",
        "Customized Security Protocols"
      ],
      imageSrc: "https://images.unsplash.com/photo-1603889863663-4650a4ff874a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Security guard monitoring premises"
    },
    {
      id: 2,
      title: "Security Consultancy",
      slug: "security-consultancy",
      description: "Our expert security consultants analyze your unique security challenges and provide tailored solutions to address vulnerabilities. We help you implement comprehensive security protocols that protect your assets and people.",
      longDescription: [
        "Our Security Consultancy service provides expert analysis and recommendations to identify and address security vulnerabilities in your organization. Our team of experienced consultants brings decades of combined expertise in risk assessment, security planning, and implementation strategies.",
        "We take a comprehensive approach to security consultancy, evaluating physical premises, digital infrastructure, operational procedures, and personnel training to create integrated security solutions that protect all aspects of your business."
      ],
      features: [
        "Comprehensive Security Audits",
        "Risk Assessment & Analysis",
        "Security System Design",
        "Emergency Response Planning",
        "Staff Security Training Programs",
        "Regular Security Reviews"
      ],
      benefits: [
        "Identification of Security Vulnerabilities",
        "Customized Security Strategies",
        "Cost-Effective Security Solutions",
        "Reduced Security Incidents",
        "Compliance with Security Regulations",
        "Peace of Mind from Expert Guidance"
      ],
      imageSrc: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Security consultation meeting"
    },
    {
      id: 3,
      title: "Cash Services",
      slug: "cash-services",
      description: "We provide secure transportation and protection for your cash and valuables. Our team of armed guards ensures the safety of your assets throughout the entire process, from collection to delivery.",
      longDescription: [
        "Our Cash Services provide secure and reliable solutions for the transportation, processing, and management of cash and valuable assets. We utilize specialized vehicles, trained personnel, and advanced tracking systems to ensure the highest level of security during transit.",
        "From retail businesses to financial institutions, our cash services are designed to minimize risk and maximize efficiency in handling cash operations. Our comprehensive approach includes secure pick-up, transportation, counting, and delivery services."
      ],
      features: [
        "Armored Vehicle Transportation",
        "Armed Security Personnel",
        "GPS Tracking Systems",
        "Secure Cash Counting",
        "ATM Servicing & Maintenance",
        "Secure Storage Solutions"
      ],
      benefits: [
        "Reduced Cash Handling Risks",
        "Decreased Internal Theft",
        "Improved Cash Flow Management",
        "Enhanced Employee Safety",
        "Insurance Compliance",
        "Professional Cash Management"
      ],
      imageSrc: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Secure armored vehicle for cash transport"
    },
    {
      id: 4,
      title: "Security Training",
      slug: "security-training",
      description: "We offer comprehensive security training programs for organizations and individuals. Our courses cover various essential topics including threat assessment, emergency response protocols, self-defense techniques, and first aid/CPR certification.",
      longDescription: [
        "Our Security Training programs provide comprehensive education and practical skills development for security personnel, corporate employees, and individuals seeking to enhance their security awareness and response capabilities.",
        "Led by industry experts with extensive field experience, our training courses combine theoretical knowledge with hands-on practice to ensure participants are well-prepared to handle various security situations confidently and effectively."
      ],
      features: [
        "Threat Assessment Training",
        "Emergency Response Protocols",
        "Self-Defense Techniques",
        "First Aid & CPR Certification",
        "Security Equipment Operation",
        "Customized Training Programs"
      ],
      benefits: [
        "Enhanced Security Awareness",
        "Improved Emergency Response",
        "Reduced Security Incidents",
        "Increased Staff Confidence",
        "Regulatory Compliance",
        "Comprehensive Security Preparedness"
      ],
      imageSrc: "https://images.unsplash.com/photo-1572181290641-3c9bc74e1d91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Security training session in progress"
    }
  ];

  useEffect(() => {
    // Find the service that matches the slug from the URL
    const foundService = services.find(s => s.slug === slug);
    if (foundService) {
      setService(foundService);
      // Scroll to top when service changes
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Stagger animation for lists
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#a87c64] mb-4">Service not found</h2>
          <p className="text-gray-300 mb-6">The service you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="px-6 py-2 bg-[#a87c64] text-black rounded-full font-semibold">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <ParticleBackground count={40} minSize={1} maxSize={4} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-full max-w-4xl text-center mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Link to="/#services" className="inline-flex items-center text-[#a87c64] mb-4 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Services
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-4">{service.title}</h1>
              <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 font-rajdhani">{service.description}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Service Image Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="relative rounded-xl overflow-hidden h-64 md:h-96 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={service.imageSrc} 
              alt={service.imageAlt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </motion.div>
        </div>
      </section>
      
      {/* Service Details Section */}
      <section className="py-12 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[#a87c64] font-rajdhani mb-6">About Our {service.title}</h2>
              
              <div className="space-y-4">
                {service.longDescription.map((paragraph, index) => (
                  <motion.p 
                    key={index} 
                    className="text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-white font-rajdhani mb-4">Key Features</h3>
                <motion.ul 
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {service.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start space-x-2"
                      variants={item}
                    >
                      <span className="text-[#a87c64] mt-1 flex-shrink-0">
                        <i className="fas fa-check-circle"></i>
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-dark-800 p-6 rounded-xl border border-[#a87c64]/20">
                <h3 className="text-xl font-bold text-white font-rajdhani mb-4">Benefits</h3>
                <motion.ul 
                  className="space-y-3"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {service.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start space-x-2"
                      variants={item}
                    >
                      <span className="text-[#a87c64] mt-1 flex-shrink-0">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="text-gray-300">{benefit}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <div className="mt-8 pt-6 border-t border-[#a87c64]/20">
                  <h3 className="text-xl font-bold text-white font-rajdhani mb-4">Interested in this service?</h3>
                  <p className="text-gray-300 mb-6">
                    Contact us today to learn more about our {service.title} and how we can tailor our solutions to meet your specific needs.
                  </p>
                  <motion.a 
                    href="#contact" 
                    className="block w-full py-3 px-6 bg-[#a87c64] text-dark-900 text-center font-rajdhani font-semibold rounded-lg hover:opacity-90 transition duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    Request a Consultation
                  </motion.a>
                </div>
              </div>
              
              <div className="mt-6 bg-dark-800 p-6 rounded-xl border border-[#a87c64]/20">
                <h3 className="text-xl font-bold text-white font-rajdhani mb-4">Other Services</h3>
                <ul className="space-y-3">
                  {services
                    .filter(s => s.id !== service.id)
                    .map(otherService => (
                      <li key={otherService.id}>
                        <Link 
                          to={`/services/${otherService.slug}`}
                          className="flex items-center space-x-2 text-gray-300 hover:text-[#a87c64] transition-colors duration-300"
                        >
                          <i className="fas fa-angle-right text-[#a87c64]"></i>
                          <span>{otherService.title}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a87c64]/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#a87c64]/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white font-orbitron mb-4">Ready to enhance your security?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Our team of security experts is ready to help you implement the perfect security solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a 
                href="#contact" 
                className="px-8 py-3 rounded-full bg-[#a87c64] text-dark-900 font-rajdhani font-semibold hover:opacity-90 transition duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Contact Us Now
              </motion.a>
              <motion.a 
                href="tel:+1555-123-4567" 
                className="px-8 py-3 rounded-full bg-transparent border-2 border-[#a87c64] text-[#a87c64] font-rajdhani font-semibold hover:bg-[#a87c64]/10 transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-phone-alt mr-2"></i> Call Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}