import { motion } from "framer-motion";
import { Link } from "wouter";
import { VideoBackground } from "@/components/VideoBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { FiShield, FiEye, FiUsers, FiUser, FiNavigation2, FiAlertTriangle, FiTruck, FiVideo, FiCalendar } from "react-icons/fi";
import { IoAirplaneOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import meetGreetImg from "@assets/Meet and Greet_1749141765312.jpeg";
import responseTeamImg from "@assets/Response Team_1749141765312.jpeg";

// Import generic security image for hero section
import heroImage from "../assets/new-logo.png";

interface MannedService {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string; // Path to the service image
}

export default function MannedServicesPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services: MannedService[] = [
    {
      id: 1,
      title: "Static Guards",
      slug: "static-guards",
      description: "Offering specialized static guard services tailored for diverse organizations and commercial settings. With unwavering dedication, we ensure top-tier security and surveillance, guaranteeing safety and professionalism. Ideal for sensitive areas, we provide peace of mind with round-the-clock protection.",
      icon: <FiShield className="text-3xl" />,
      imageSrc: "/images/services/Static Guard.jpeg"
    },

    {
      id: 2,
      title: "Patrolling Supervisors",
      slug: "patrolling-supervisors",
      description: "Offering comprehensive patrolling supervisor services to oversee security operations effectively. Our supervisors conduct regular inspections, ensure vigilant monitoring, rapid response to incidents, and optimal safety protocols. With a focus on maintaining premises, they maintain order and enforce policies with precision and authority.",
      icon: <FiEye className="text-3xl" />,
      imageSrc: "/images/services/Patroling.jpeg"
    },
    {
      id: 3,
      title: "Close Protection",
      slug: "close-protection",
      description: "Delivering elite close protection services for high-profile individuals, executives, and VIPs. Our expert team provides personalized security and ensures safety in all situations. With meticulous threat assessment, secure travel planning, and maintaining confidentiality, we offer comprehensive protection tailored to your specific needs.",
      icon: <FiUser className="text-3xl" />,
      imageSrc: "/images/services/Close Protection.jpeg"
    },
    {
      id: 4,
      title: "Secure Journey Management",
      slug: "secure-journey-management",
      description: "Our expert personnel, equipped with advanced training and cutting-edge technology, ensure an all-encompassing security experience. From access control and surveillance to risk assessment and timely response, our dedicated team oversees every aspect of your journey.",
      icon: <FiNavigation2 className="text-3xl" />,
      imageSrc: "/images/journey-management.jpg"
    },
    {
      id: 5,
      title: "Airport Meet & Greet",
      slug: "airport-meet-greet",
      description: "Indulge in a seamless and luxurious airport experience with our bespoke Meet & Greet services. From the moment you step off the plane, our dedicated team is committed to ensuring that your journey is not just efficient but also imbued with a touch of sophistication.",
      icon: <IoAirplaneOutline className="text-3xl" />,
      imageSrc: meetGreetImg
    },
    {
      id: 6,
      title: "Emergency Response Teams",
      slug: "emergency-response-teams",
      description: "Our highly trained emergency response teams are ready to deploy at a moment's notice, providing rapid intervention during security incidents, medical emergencies, or natural disasters. With specialized training in crisis management, first aid, and tactical response, our teams work to minimize impact and restore safety quickly.",
      icon: <FiAlertTriangle className="text-3xl" />,
      imageSrc: responseTeamImg
    },
    {
      id: 7,
      title: "Security-Trained Drivers",
      slug: "security-trained-drivers",
      description: "Whether you're a corporate executive, a high-profile individual, or simply someone who values a secure transit experience, our drivers are committed to delivering a service that exceeds expectations. They are adept at navigating various scenarios, always maintaining a vigilant eye on the road and surroundings.",
      icon: <FiTruck className="text-3xl" />,
      imageSrc: "/images/services/Security Trained Driver.jpeg"
    },
    {
      id: 8,
      title: "CCTV Operator",
      slug: "cctv-operator",
      description: "Our professional CCTV operators provide continuous monitoring of surveillance systems, detecting potential security threats and suspicious activities in real-time. With specialized training in video analytics and incident response protocols, our operators ensure comprehensive visual security coverage for your premises.",
      icon: <FiVideo className="text-3xl" />,
      imageSrc: "/images/services/CCTV.jpeg"
    },
    {
      id: 9,
      title: "Events Security",
      slug: "events-security",
      description: "Our specialized event security teams ensure the safety and smooth operation of gatherings of all sizes. From crowd management and access control to emergency response and VIP protection, we provide comprehensive security solutions tailored to each event's unique requirements and risk profile.",
      icon: <FiCalendar className="text-3xl" />,
      imageSrc: "/images/services/Event Security.jpeg"
    },
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

  const cardVariant = {
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
        <title>Professional Manned Security Services | 365 Security Services Lebanon</title>
        <meta name="description" content="Expert manned security services including static guards, close protection, patrolling supervisors, emergency response teams, and VIP security. Professional security personnel across Lebanon." />
        <meta name="keywords" content="manned security services, security guards, static guards, close protection, patrolling supervisors, emergency response, VIP security, airport security, security personnel, Lebanon security guards" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://365securityservices.company/services/manned-services" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Professional Manned Security Services | 365 Security Services" />
        <meta property="og:description" content="Expert security personnel for static guarding, close protection, emergency response, and VIP security services across Lebanon. Professional manned security solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://365securityservices.company/services/manned-services" />
        <meta property="og:site_name" content="365 Security Services" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Manned Security Services | 365 Security Services" />
        <meta name="twitter:description" content="Expert security personnel for static guarding, close protection, emergency response, and VIP security services across Lebanon." />
        
        {/* Service Page Schema - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Manned Security Services",
            "provider": {
              "@type": "SecurityService",
              "name": "365 Security Services",
              "url": "https://365securityservices.company"
            },
            "description": "Professional manned security services including static guards, close protection, patrolling supervisors, emergency response teams, VIP security, and specialized security personnel.",
            "serviceType": "Security Services",
            "areaServed": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Manned Security Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Static Guards",
                    "description": "Professional static guard services for diverse organizations and commercial settings with round-the-clock protection."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Patrolling Supervisors",
                    "description": "Comprehensive patrolling supervisor services with regular inspections and rapid incident response."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Close Protection",
                    "description": "Elite close protection services for high-profile individuals, executives, and VIPs with personalized security."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Emergency Response Teams",
                    "description": "Professional emergency response teams for rapid crisis management and security incident handling."
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
            
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6">Manned Services</h1>
            <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-8"></div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
              365 Security Services delivers expert Manned Services with skilled personnel for static guarding, 
              armed/unarmed protection, and VIP security. We offer secure journey management, emergency response, 
              CCTV monitoring, and event security.
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
            <h2 className="text-3xl md:text-4xl font-bold font-rajdhani mb-6">Elite Security Personnel</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              365 Security Services provides fully vetted, extensively trained, and professionally equipped security personnel 
              for all your protection needs. Our manned services encompass a wide range of specialized security solutions, 
              each delivered with uncompromising dedication to excellence and client-centered focus.
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
                variants={cardVariant}
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
      
      {/* Training & Compliance Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white font-orbitron mb-6">
                <span className="text-[#a87c64]">Rigorously Trained </span> 
                Security Professionals
              </h2>
              
              <p className="text-gray-300 mb-6">
                Our security personnel undergo extensive training beyond industry standards, equipped with the knowledge and 
                skills to handle diverse security challenges with confidence and precision.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Advanced Certifications</h3>
                    <p className="text-gray-400 text-sm">All security personnel maintain current certifications exceeding regulatory requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Continuous Training</h3>
                    <p className="text-gray-400 text-sm">Regular skill enhancement through simulated scenarios and latest security methodologies.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Rigorous Vetting</h3>
                    <p className="text-gray-400 text-sm">Thorough background checks and assessment processes ensure only the highest caliber professionals.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Security training session" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Client Testimonial / Case Study Section */}
      <section className="py-16 bg-dark-900 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-dark-800 rounded-xl p-8 border border-[#a87c64]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="w-16 h-16 rounded-full bg-[#a87c64]/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white font-rajdhani">Client Success Story</h3>
                <p className="text-[#a87c64]">International Hotel Chain</p>
              </div>
            </div>
            
            <blockquote className="text-gray-300 italic mb-6">
              "365 Security Services transformed our approach to guest safety. Their professional security personnel integrate 
              seamlessly with our hospitality standards while maintaining vigilant protection. The peace of mind they provide 
              to both our staff and guests has been invaluable for our global reputation."
            </blockquote>
            
            <div className="font-medium text-white">
              Security Director, International Hotel Chain
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-black relative">
        <VideoBackground videoSrc="/videos/BGBG_Video.mp4" overlayOpacity={0.85} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-orbitron mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Enhance Your Security?
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our security experts are available to discuss your specific requirements and design a customized security solution.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.a 
                href="/contact" 
                className="px-8 py-3 bg-[#a87c64] text-dark-900 rounded-full font-rajdhani font-semibold hover:bg-[#a87c64]/90 transition duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(168, 124, 100, 0.5)"
                }}
                transition={{ duration: 0.2 }}
              >
                Request a Consultation
              </motion.a>
              
              <motion.a 
                href="tel:+96181365365" 
                className="px-8 py-3 bg-transparent border-2 border-[#a87c64] text-[#a87c64] rounded-full font-rajdhani font-semibold hover:bg-[#a87c64]/10 transition duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(168, 124, 100, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                Call: +961 81 365365
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}