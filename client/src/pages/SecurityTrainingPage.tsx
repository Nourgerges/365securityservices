import { motion } from "framer-motion";
import { Link } from "wouter";
import { VideoBackground } from "@/components/VideoBackground";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { FiShield, FiTarget, FiUsers, FiActivity, FiAward, FiBook } from "react-icons/fi";
import { Helmet } from "react-helmet";

interface TrainingService {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
}

export default function SecurityTrainingPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services: TrainingService[] = [
    {
      id: 1,
      title: "Threat Assessment Training",
      slug: "threat-assessment-training",
      description: "Comprehensive training programs designed to enhance threat identification and assessment capabilities. Our courses equip participants with the skills to recognize potential security risks, evaluate threat levels, and implement appropriate response measures in various environments.",
      icon: <FiTarget className="text-3xl" />,
      imageSrc: "/images/threat-assessment.jpg"
    },
    {
      id: 2,
      title: "Emergency Response Protocols",
      slug: "emergency-response-protocols",
      description: "Specialized training in emergency response procedures and crisis management. Participants learn to handle various emergency situations including evacuations, medical emergencies, fire safety, and coordinated response strategies for different threat scenarios.",
      icon: <FiActivity className="text-3xl" />,
      imageSrc: "/images/emergency-response.jpg"
    },
    {
      id: 3,
      title: "Self-Defense Techniques",
      slug: "self-defense-techniques",
      description: "Professional self-defense and personal protection training programs. Our experienced instructors teach practical defensive techniques, situational awareness, de-escalation strategies, and physical defense methods suitable for various skill levels and scenarios.",
      icon: <FiShield className="text-3xl" />,
      imageSrc: "/images/self-defense.jpg"
    },
    {
      id: 4,
      title: "First Aid & CPR Certification",
      slug: "first-aid-cpr-certification",
      description: "Certified first aid and CPR training programs meeting industry standards. Participants gain essential life-saving skills including emergency medical response, cardiopulmonary resuscitation, and basic medical care in emergency situations.",
      icon: <FiAward className="text-3xl" />,
      imageSrc: "/images/first-aid.jpg"
    },
    {
      id: 5,
      title: "Security Equipment Operation",
      slug: "security-equipment-operation",
      description: "Comprehensive training on modern security equipment and technology. Covers CCTV systems, access control, alarm systems, communication equipment, and other security technologies essential for effective security operations.",
      icon: <FiBook className="text-3xl" />,
      imageSrc: "/images/security-equipment.jpg"
    },
    {
      id: 6,
      title: "Customized Training Programs",
      slug: "customized-training-programs",
      description: "Tailored training solutions designed to meet specific organizational needs and requirements. We develop customized curricula that address unique security challenges and operational environments specific to your industry or facility.",
      icon: <FiUsers className="text-3xl" />,
      imageSrc: "/images/custom-training.jpg"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5 
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Professional Security Training & Certification Programs | 365 Security Lebanon</title>
        <meta name="description" content="Elite security training programs including threat assessment, emergency response, self-defense, first aid CPR certification, and specialized security courses. Professional security training in Lebanon." />
        <meta name="keywords" content="security training, threat assessment training, emergency response training, self-defense training, first aid CPR certification, security awareness, security education, professional security courses, Lebanon security training" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://365securityservices.company/services/security-training" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Professional Security Training & Certification Programs | 365 Security" />
        <meta property="og:description" content="Elite security training including threat assessment, emergency response, self-defense, and professional certification programs in Lebanon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://365securityservices.company/services/security-training" />
        <meta property="og:site_name" content="365 Security Services" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Security Training & Certification Programs" />
        <meta name="twitter:description" content="Elite security training including threat assessment, emergency response, self-defense, and professional certification programs in Lebanon." />
        
        {/* Security Training Service Schema - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Security Training & Certification Programs",
            "provider": {
              "@type": "SecurityService",
              "name": "365 Security Services",
              "url": "https://365securityservices.company"
            },
            "description": "Elite security training programs including threat assessment, emergency response protocols, self-defense techniques, first aid CPR certification, security awareness workshops, and specialized security certifications.",
            "serviceType": "Security Education & Training",
            "areaServed": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Security Training Programs",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Threat Assessment Training",
                    "description": "Comprehensive training programs designed to enhance threat identification and assessment capabilities with practical skills development."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Emergency Response Protocols",
                    "description": "Specialized training in emergency response procedures and crisis management for various emergency situations."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Self-Defense Techniques",
                    "description": "Professional self-defense and personal protection training programs with practical defensive techniques and situational awareness."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "First Aid & CPR Certification",
                    "description": "Certified first aid and CPR training programs meeting industry standards with essential life-saving skills development."
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
            
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6">Security Training</h1>
            <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-8"></div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
              <span className="text-[#a87c64] font-bold text-2xl">Train. Fight. Defend.</span>
              <br />
              365 Security Services offers elite security training in self-defense, crisis response, 
              VIP protection, and emergency preparedness, equipping you with tactical skills to handle 
              real-world threats with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Training Video Showcase */}
      <VideoShowcase 
        subtitle="Training Excellence"
        title="Professional Security Training in Action"
        description="Experience our comprehensive training methodologies designed to build elite security professionals. Our hands-on approach combines theoretical knowledge with practical skills to ensure readiness for real-world scenarios."
        videoSrc="/attached_assets/Video 2_1749142276592.mp4"
        variant="training"
      />
      
      {/* Service Overview Section */}
      <section className="py-16 bg-dark-900 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-rajdhani mb-6">Professional Security Training Programs</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Led by industry experts with extensive field experience, our training courses combine theoretical knowledge 
              with hands-on practice to ensure participants are well-prepared to handle various security situations 
              confidently and effectively.
            </p>
          </motion.div>
          
          {/* Service Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="bg-dark-800 rounded-xl p-6 border border-[#a87c64]/20 hover:border-[#a87c64]/50 transition-all duration-300 group hover:shadow-lg hover:shadow-[#a87c64]/20"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-[#a87c64] mr-3 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold font-orbitron text-white">{service.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <Link 
                  to={`/services/${service.slug}`}
                  className="inline-block px-5 py-2 rounded-full bg-transparent border border-[#a87c64] text-[#a87c64] font-rajdhani font-semibold hover:bg-[#a87c64]/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-[#a87c64]/20"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Benefits Section */}
      <section className="py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white font-orbitron mb-6">
                <span className="text-[#a87c64]">Elite Training </span> 
                for Real-World Preparedness
              </h2>
              
              <p className="text-gray-300 mb-6">
                Our comprehensive training programs are designed to enhance security awareness, improve emergency response 
                capabilities, and build confidence in handling various security scenarios.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Enhanced Security Awareness</h3>
                    <p className="text-gray-400 text-sm">Develop heightened situational awareness and threat recognition capabilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Improved Emergency Response</h3>
                    <p className="text-gray-400 text-sm">Master proven protocols for effective crisis management and emergency situations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[#a87c64] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Regulatory Compliance</h3>
                    <p className="text-gray-400 text-sm">Ensure compliance with industry standards and regulatory requirements.</p>
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
                src="https://images.unsplash.com/photo-1572181290641-3c9bc74e1d91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Security training session in progress" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
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
              Ready to Enhance Your Security Skills?
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Contact us to learn more about our comprehensive security training programs and how they can benefit your organization.
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
                transition={{ duration: 0.3 }}
              >
                Schedule Training
              </motion.a>
              
              <motion.a 
                href="tel:+1234567890" 
                className="px-8 py-3 border border-[#a87c64] text-[#a87c64] rounded-full font-rajdhani font-semibold hover:bg-[#a87c64]/10 transition duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Call Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}