import { motion } from "framer-motion";
import { Link } from "wouter";
import { VideoBackground } from "@/components/VideoBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { FiShield, FiFileText, FiAlertTriangle, FiActivity, FiLogOut, FiCpu } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import detailedSecurityImg from "@assets/Detailed Security_1749141765312.jpeg";
import threatRiskImg from "@assets/Threat and Risk_1749141765312.jpeg";
import evacuationImg from "@assets/Evacuation_1749141765312.jpeg";

interface ConsultancyService {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}

export default function SecurityConsultancyPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services: ConsultancyService[] = [
    {
      id: 1,
      title: "Detailed Safety & Security Surveys",
      slug: "detailed-safety-security-surveys",
      description: "Whether you're looking to assess the vulnerabilities of premises, adhere to industry standards, or enhance overall safety our Security Consultancy services are tailored to meet your unique needs. Our team of experts works with you, ensuring a thorough understanding of your concerns and objectives.",
      icon: <FiShield className="text-3xl" />,
      imageSrc: detailedSecurityImg
    },
    {
      id: 2,
      title: "Risk / Threat Assessment and Gap Analysis",
      slug: "risk-threat-assessment-gap-analysis",
      description: "Our comprehensive Risk/Threat Assessment and Gap Analysis services provide you with assessment of where you are, where you want to be, and how your organization can proactively address vulnerabilities. We integrate predictive modeling and advanced analytics, harnessing cutting-edge technologies and real-time data to provide a forward-looking perspective, empowering organizations to anticipate and prepare for potential threats while bridging gaps to a secure and resilient future.",
      icon: <FiFileText className="text-3xl" />,
      imageSrc: threatRiskImg
    },
    {
      id: 3,
      title: "Crisis and Evacuation Planning and Procedures",
      slug: "crisis-evacuation-planning-procedures",
      description: "This comprehensive offering is crafted to navigate the complexities of today's unpredictable world. We collaborate closely with clients, conducting thorough assessments and designing customized strategies for every potential crisis scenario. Our approach begins with meticulous assessment of physical space, emergency patterns, and potential risks, analyzing layout, occupancy patterns, and risks to formulate evacuation plans that prioritize effectiveness and efficiency. From natural disasters and cybersecurity incidents to emergency evacuations, our plans cover a spectrum of challenges while aligning with industry best practices and regulatory standards.",
      icon: <FiAlertTriangle className="text-3xl" />,
      imageSrc: evacuationImg
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
        <title>Expert Security Consultancy Services | Risk Assessment & Crisis Planning | 365 Security</title>
        <meta name="description" content="Professional security consultancy services including risk assessment, threat analysis, crisis planning, evacuation procedures, and security surveys. Expert security consulting in Lebanon." />
        <meta name="keywords" content="security consultancy, risk assessment, threat analysis, crisis planning, evacuation procedures, security surveys, security consulting, gap analysis, Lebanon security consultants" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://365securityservices.company/services/security-consultancy" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Expert Security Consultancy Services | 365 Security Services" />
        <meta property="og:description" content="Professional security consulting including risk assessment, threat analysis, crisis planning, and security surveys. Comprehensive security consultancy solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://365securityservices.company/services/security-consultancy" />
        <meta property="og:site_name" content="365 Security Services" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Expert Security Consultancy Services | 365 Security Services" />
        <meta name="twitter:description" content="Professional security consulting including risk assessment, threat analysis, crisis planning, and security surveys in Lebanon." />
        
        {/* Security Consultancy Service Schema - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Security Consultancy Services",
            "provider": {
              "@type": "SecurityService",
              "name": "365 Security Services",
              "url": "https://365securityservices.company"
            },
            "description": "Expert security consultancy services including detailed safety surveys, risk assessment, threat analysis, crisis planning, evacuation procedures, and security technology integration.",
            "serviceType": "Security Consulting",
            "areaServed": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Security Consultancy Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Detailed Safety & Security Surveys",
                    "description": "Comprehensive security assessments to evaluate vulnerabilities and enhance overall safety standards."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Risk/Threat Assessment and Gap Analysis",
                    "description": "Advanced risk analysis using predictive modeling and analytics to identify and address security vulnerabilities."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Crisis and Evacuation Planning",
                    "description": "Customized crisis management and evacuation procedures for various emergency scenarios and regulatory compliance."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Security Technology Integration",
                    "description": "Strategic integration of security technologies and systems for comprehensive protection solutions."
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
            
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6">Security Consultancy</h1>
            <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-8"></div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
              365 Security Services offers expert security consultancy, from detailed safety surveys to 
              comprehensive risk assessments. We provide threat analysis, crisis planning, evacuation procedures, 
              and tailored security design solutions for organizations of all sizes.
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
            <h2 className="text-3xl md:text-4xl font-bold font-rajdhani mb-6">Expert Security Consultation</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              365 Security Services provides industry-leading security consultancy services designed to identify, 
              assess, and mitigate risks across your organization. Our comprehensive approach ensures tailored 
              solutions that address your specific security challenges with precision and expertise.
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
                    <h3 className="text-xl font-bold text-white font-rajdhani mb-3 group-hover:text-[#a87c64] transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 flex-grow mb-6 text-sm">
                      {service.description}
                    </p>
                    
                    <div className="mt-auto">
                      <motion.button
                        className="inline-flex items-center text-[#a87c64] font-medium group-hover:text-white"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                      
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a87c64] group-hover:w-full transition-all duration-500"></div>
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
                <span className="text-[#a87c64]">Comprehensive </span> 
                Security Methodology
              </h2>
              
              <p className="text-gray-300 mb-6">
                Our consultancy services follow a structured methodology designed to provide thorough analysis and 
                actionable recommendations tailored to your specific security challenges and organizational needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">In-Depth Analysis</h3>
                    <p className="text-gray-400 text-sm">Comprehensive assessment of security posture through detailed on-site inspections and documentation review.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Strategic Planning</h3>
                    <p className="text-gray-400 text-sm">Development of detailed security strategies based on risk assessment findings and client objectives.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Implementation Support</h3>
                    <p className="text-gray-400 text-sm">Expert guidance throughout the implementation process to ensure seamless integration of security measures.</p>
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
                src="/images/security-methodology.jpg" 
                alt="Security consultancy methodology" 
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
                <p className="text-[#a87c64]">Global Financial Institution</p>
              </div>
            </div>
            
            <blockquote className="text-gray-300 italic mb-6">
              "The comprehensive security consultation provided by 365 Security Services transformed our approach to risk management. 
              Their detailed assessments and actionable recommendations allowed us to implement effective security measures across 
              our global operations, significantly reducing vulnerabilities and enhancing overall safety."
            </blockquote>
            
            <div className="font-medium text-white">
              Chief Security Officer, Global Financial Institution
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
              Ready to Enhance Your Security Strategy?
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our security consultants are ready to provide expert guidance tailored to your organization's unique challenges and goals.
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