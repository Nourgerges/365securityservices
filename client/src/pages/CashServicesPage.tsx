import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { VideoBackground } from "@/components/VideoBackground";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { Footer } from "@/components/Footer";
import { FiTruck, FiCreditCard, FiShield, FiPackage, FiSend } from "react-icons/fi";
import { Helmet } from "react-helmet";

interface CashService {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}

export default function CashServicesPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services: CashService[] = [
    {
      id: 1,
      title: "Cash Transportation",
      slug: "cash-transportation",
      description: "Secure armored vehicle transportation services for banks, retail businesses, and financial institutions. Our trained personnel and state-of-the-art vehicles ensure your cash reaches its destination safely with full tracking and insurance coverage.",
      icon: <FiTruck className="text-3xl" />,
      imageSrc: "/images/cash-transportation.jpg"
    },
    {
      id: 2,
      title: "ATM Outsourcing",
      slug: "atm-outsourcing",
      description: "Comprehensive ATM management services including cash replenishment, maintenance, monitoring, and security. We handle the complete ATM lifecycle, ensuring optimal uptime and security while reducing operational costs for financial institutions.",
      icon: <FiCreditCard className="text-3xl" />,
      imageSrc: "/images/atm-services.jpg"
    },
    {
      id: 3,
      title: "Bank Escort Services",
      slug: "bank-escort-services",
      description: "Professional armed escort services for banking operations including cash deposits, withdrawals, and inter-branch transfers. Our certified security personnel provide discrete yet visible protection for high-value transactions and banking activities.",
      icon: <FiShield className="text-3xl" />,
      imageSrc: "/images/bank-escort.jpg"
    },
    {
      id: 4,
      title: "Valuable Escort Services",
      slug: "valuable-escort-services",
      description: "Specialized protection services for high-value items including jewelry, precious metals, artwork, and important documents. Our expert teams provide secure transportation with full insurance coverage and GPS tracking for complete peace of mind.",
      icon: <FiPackage className="text-3xl" />,
      imageSrc: "/images/Escort Services.png"
    },
    {
      id: 5,
      title: "Courier Services",
      slug: "courier-services",
      description: "Secure courier and delivery services for sensitive documents, contracts, legal papers, and confidential materials. Our bonded couriers ensure timely and secure delivery with chain of custody documentation and real-time tracking capabilities.",
      icon: <FiSend className="text-3xl" />,
      imageSrc: "/images/Courier Services.jpg"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 10,
        duration: 0.5 
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Secure Cash Transportation & Financial Security Services | 365 Security Lebanon</title>
        <meta name="description" content="Professional cash transportation, ATM outsourcing, bank escort services, and valuable item security. Armored vehicle services and financial security solutions across Lebanon." />
        <meta name="keywords" content="cash transportation, ATM services, bank escort, valuable escort, armored vehicle, financial security, cash management, ATM outsourcing, banking security, Lebanon cash services" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://365securityservices.company/services/cash-services" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Secure Cash Transportation & Financial Security Services | 365 Security" />
        <meta property="og:description" content="Professional cash transportation with armored vehicles, ATM management, bank escort services, and valuable item security across Lebanon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://365securityservices.company/services/cash-services" />
        <meta property="og:site_name" content="365 Security Services" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secure Cash Transportation & Financial Security Services" />
        <meta name="twitter:description" content="Professional cash transportation, ATM services, bank escort, and valuable item security with armored vehicles in Lebanon." />
        
        {/* Cash Services Schema - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Cash Services & Financial Security",
            "provider": {
              "@type": "SecurityService",
              "name": "365 Security Services",
              "url": "https://365securityservices.company"
            },
            "description": "Comprehensive cash handling and transportation solutions including armored vehicle services, ATM management, bank escort services, and valuable item transportation with advanced security protocols.",
            "serviceType": "Financial Security Services",
            "areaServed": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Cash Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cash Transportation",
                    "description": "Secure armored vehicle transportation services for banks and financial institutions with full tracking and insurance coverage."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "ATM Outsourcing",
                    "description": "Comprehensive ATM management including cash replenishment, maintenance, monitoring, and security services."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Bank Escort Services",
                    "description": "Professional armed escort services for banking operations including deposits, withdrawals, and inter-branch transfers."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Valuable Escort Services",
                    "description": "Specialized protection for high-value items including jewelry, precious metals, and important documents with GPS tracking."
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <VideoBackground videoSrc="/videos/BGBG_Video.mp4" overlayOpacity={0.85} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Link to="/#services" className="inline-flex items-center text-[#a87c64] mb-6 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6">Cash Services</h1>
            <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-8"></div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
              365 Security Services provides comprehensive cash handling and transportation solutions with armored vehicles, 
              trained personnel, and advanced security protocols. From ATM management to valuable escorts, we ensure the 
              highest level of protection for your financial assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Overview Section with Dynamic Design */}
      <section className="py-16 bg-dark-900 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-rajdhani mb-6">Secure Cash Management</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              365 Security Services provides comprehensive cash handling and transportation solutions with armored vehicles, 
              trained personnel, and advanced security protocols. From ATM management to valuable escorts, we ensure the 
              highest level of protection for your financial assets with complete transparency and accountability.
            </p>
          </motion.div>
          
          {/* Modern Service Grid with Rich Interactions */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border border-[#a87c64]/20 hover:border-[#a87c64]/50 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25), 0 0 10px rgba(168, 124, 100, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Service Image with Icon */}
                  <div className="relative h-48 mb-4 overflow-hidden">
                    {/* Actual service image */}
                    <div className="w-full h-full">
                      <img 
                        src={service.imageSrc} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Icon in lower left of image */}
                    <div className="absolute bottom-3 left-3 bg-black/80 p-2 rounded-full text-[#a87c64] z-10">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="px-6 pb-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white font-rajdhani mb-3 group-hover:text-[#a87c64] transition-colors duration-150">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 flex-grow mb-6 text-sm">
                      {service.description}
                    </p>
                    
                    <div className="mt-auto">
                      <motion.button
                        className="inline-flex items-center text-[#a87c64] font-medium group-hover:text-white"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.1 }}
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                      
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a87c64] group-hover:w-full transition-all duration-200"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white font-orbitron mb-6">
                <span className="text-[#a87c64]">Secure </span> 
                Cash Management Solutions
              </h2>
              
              <p className="text-gray-300 mb-6">
                Our cash services utilize state-of-the-art security protocols, armored vehicles, and highly trained 
                personnel to ensure the safe handling and transportation of your valuable assets with complete transparency 
                and accountability.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Armored Vehicle Fleet</h3>
                    <p className="text-gray-400">Modern armored vehicles equipped with GPS tracking and communication systems</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Trained Personnel</h3>
                    <p className="text-gray-400">Certified and bonded security professionals with specialized cash handling training</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Real-Time Monitoring</h3>
                    <p className="text-gray-400">24/7 command center monitoring with instant communication and emergency response</p>
                  </div>
                </div>
                
                
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#a87c64]/10 to-transparent p-8 rounded-lg border border-[#a87c64]/20">
                <h3 className="text-2xl font-bold text-white font-orbitron mb-4">Why Choose Our Cash Services?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-[#a87c64] mr-2">•</span>
                    Licensed and bonded security personnel
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#a87c64] mr-2">•</span>
                    State-of-the-art armored vehicle fleet
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#a87c64] mr-2">•</span>
                    24/7 GPS tracking and monitoring
                  </li>
                  
                  <li className="flex items-center">
                    <span className="text-[#a87c64] mr-2">•</span>
                    Customizable service schedules
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#a87c64] mr-2">•</span>
                    Emergency response protocols
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#a87c64]/10 to-black relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-orbitron mb-4">
              Ready to Secure Your <span className="text-[#a87c64]">Financial Assets?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your cash handling and transportation needs. 
              Our experts will design a customized security solution for your business.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-[#a87c64] text-white px-8 py-3 rounded-lg hover:bg-[#8a6850] transition-colors duration-300 font-semibold"
            >
              Get Free Consultation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}