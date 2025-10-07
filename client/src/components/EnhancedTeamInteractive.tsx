import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiLinkedin, FiMail, FiAward, FiStar, FiFeather, FiBookOpen, FiShield, FiUser, FiTrello } from "react-icons/fi";
import bgBgImage from "../assets/BG BG.png";

// Import team member photos
import teamPic1 from "../assets/team/Pic 1.jpg";
import teamPic2 from "../assets/team/Pic 2.jpg";
import teamPic3 from "../assets/team/Pic 3.jpg";
import teamPic4 from "../assets/team/Pic 4.jpg";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  expertise: string[];
  quote?: string;
  achievements?: string[];
  contactInfo?: {
    email?: string;
    linkedin?: string;
  };
}

export function EnhancedTeamInteractive() {
  // Team members data with actual images
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Mohammad Al-Sayegh",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in security operations, Mohammad founded 365 Security Services with a vision to transform the security landscape in Lebanon through innovation and excellence.",
      image: teamPic1,
      expertise: ["Strategic Planning", "Crisis Management", "Executive Protection"],
      quote: "Security is not just a service we provide—it's a commitment to protecting what matters most to our clients.",
      achievements: [
        "Built 365 Security Services from the ground up to become one of Lebanon's premier security firms",
        "Developed proprietary security protocols adopted by major financial institutions",
        "Former advisor to government security agencies"
      ],
      contactInfo: {
        email: "mohammad@365securityservices.company",
        linkedin: "https://www.linkedin.com/company/365-security-services"
      }
    },
    {
      id: 2,
      name: "Sara Khoury",
      position: "Chief Operations Officer",
      bio: "Sara oversees all operational aspects of 365 Security Services, ensuring that our security protocols and service delivery meet the highest standards of efficiency and effectiveness.",
      image: teamPic2,
      expertise: ["Operations Management", "Quality Control", "Team Leadership"],
      quote: "Excellence in security comes from meticulous planning, rigorous training, and unwavering vigilance.",
      achievements: [
        "Streamlined operational processes, resulting in 30% increase in efficiency",
        "Implemented advanced quality assurance systems for security personnel",
        "Developed and executed training programs for over 200 security professionals"
      ],
      contactInfo: {
        email: "sara@365securityservices.company"
      }
    },
    {
      id: 3,
      name: "Adnan Nassar",
      position: "Head of Training",
      bio: "A former military special forces instructor, Adnan leads our comprehensive training programs, bringing tactical expertise and real-world experience to prepare security personnel for any situation.",
      image: teamPic3,
      expertise: ["Tactical Training", "Firearms Expertise", "Emergency Response"],
      quote: "In security, your training determines your performance when it matters most.",
      achievements: [
        "Served 12 years in special forces with specialized training in counter-terrorism",
        "Developed 365's advanced tactical response curriculum",
        "Certified instructor in multiple defensive disciplines"
      ],
      contactInfo: {
        email: "adnan@365securityservices.company"
      }
    },
    {
      id: 4,
      name: "Hiba Khalil",
      position: "Security Consultant",
      bio: "Hiba specializes in designing tailored security solutions for corporate clients, with particular expertise in risk assessment, threat analysis, and security system integration.",
      image: teamPic4,
      expertise: ["Risk Assessment", "Security Planning", "Corporate Security"],
      quote: "Every security challenge has a solution—the key is understanding the unique elements of each situation.",
      achievements: [
        "Designed comprehensive security systems for 25+ corporate headquarters",
        "Published researcher in corporate security protocols",
        "Certified Risk Assessment Professional"
      ],
      contactInfo: {
        email: "hiba@365securityservices.company",
        linkedin: "https://www.linkedin.com/company/365-security-services"
      }
    }
  ];

  // State for the selected member and view modes
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // State for interactive elements
  const [highlightedExpertise, setHighlightedExpertise] = useState<string | null>(null);
  const [showingAchievements, setShowingAchievements] = useState(false);
  
  // Animation controls
  const controls = useAnimation();
  const detailControls = useAnimation();
  const carouselControls = useAnimation();
  
  // Refs for various UI elements
  const teamGridRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Spring animations for hover effects
  const springConfig = { stiffness: 300, damping: 30 };
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-5, 5]);
  const rotateSpring = useSpring(rotate, springConfig);

  // Handle member selection
  const handleSelectMember = (member: TeamMember) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (activeMember && activeMember.id === member.id) {
      // If clicking the same member, close the detail view
      detailControls.start({ opacity: 0, y: 20 }).then(() => {
        setActiveMember(null);
        setIsAnimating(false);
        setShowingAchievements(false);
      });
    } else {
      // If selecting a different member, update the active member
      if (activeMember) {
        // Transition between members
        detailControls.start({ opacity: 0, y: 20 }).then(() => {
          setActiveMember(member);
          setShowingAchievements(false);
          detailControls.start({ opacity: 1, y: 0 }).then(() => {
            setIsAnimating(false);
          });
        });
      } else {
        // Initial selection
        setActiveMember(member);
        detailControls.start({ opacity: 1, y: 0 }).then(() => {
          setIsAnimating(false);
        });
      }
      
      // Scroll to the detail section if mobile
      setTimeout(() => {
        const detailSection = document.getElementById('team-detail-section');
        if (detailSection && window.innerWidth < 768) {
          detailSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  // Carousel navigation
  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextIndex = (carouselIndex + 1) % teamMembers.length;
    carouselControls.start({ x: '-100%', opacity: 0 }).then(() => {
      setCarouselIndex(nextIndex);
      carouselControls.set({ x: '100%' });
      carouselControls.start({ x: 0, opacity: 1 }).then(() => {
        setIsAnimating(false);
      });
    });
  };
  
  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const prevIndex = (carouselIndex - 1 + teamMembers.length) % teamMembers.length;
    carouselControls.start({ x: '100%', opacity: 0 }).then(() => {
      setCarouselIndex(prevIndex);
      carouselControls.set({ x: '-100%' });
      carouselControls.start({ x: 0, opacity: 1 }).then(() => {
        setIsAnimating(false);
      });
    });
  };
  
  // Toggle between achievements and bio
  const toggleAchievements = () => {
    setShowingAchievements(!showingAchievements);
  };
  
  // Toggle view mode between grid and carousel
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'carousel' : 'grid');
    setActiveMember(null);
    setShowingAchievements(false);
  };

  // Generate a style based on member id (for consistent but unique styling)
  const getMemberStyle = (id: number) => {
    const hues = [30, 45, 60, 15, 75, 90]; // Bronze/gold variations
    const baseHue = hues[id % hues.length];
    
    return {
      accentColor: `hsl(${baseHue}, 40%, 55%)`,
      glowColor: `hsl(${baseHue}, 50%, 50%, 0.3)`,
      patternRotation: `${(id * 37) % 360}deg`
    };
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      } 
    },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      borderColor: "#a87c64",
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 25,
        duration: 0.1 
      } 
    },
    active: {
      scale: 1.02,
      borderColor: "#a87c64",
      boxShadow: "0 0 30px rgba(168, 124, 100, 0.4)",
      y: -5
    }
  };
  
  const detailVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        staggerChildren: 0.1
      } 
    },
    exit: { 
      opacity: 0, 
      y: 30, 
      transition: { 
        duration: 0.3
      } 
    }
  };
  
  const detailItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20
      } 
    }
  };
  
  const carouselVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: {
          duration: 0.3
        }
      };
    }
  };
  
  // Background pattern animation for cards
  const patternVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.1, transition: { duration: 1 } },
    hover: { opacity: 0.2, scale: 1.1, transition: { duration: 0.15 } }
  };
  
  // Expertise tag animations
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20
      } 
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#a87c64",
      color: "#000",
      transition: { 
        type: "spring", 
        stiffness: 600, 
        damping: 20,
        duration: 0.1
      }
    }
  };
  
  // Animation for quote marks
  const quoteMarkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 0.3, 
      x: 0,
      transition: { 
        delay: 0.5,
        duration: 0.5
      } 
    }
  };

  // Create a staggered animation effect for text
  const createTextAnimation = (text: string) => {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.015
        }
      }
    };
  };
  
  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark-900 opacity-90"></div>
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-15"
          style={{ 
            backgroundImage: `url(${bgBgImage})`,
            backgroundSize: "120%",
            transform: "rotate(45deg)",
            filter: "brightness(1.2) contrast(1.1)"
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#a87c64] font-orbitron mb-3">MEET OUR TEAM</h2>
          <div className="w-24 h-1 bg-[#a87c64] mx-auto mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto font-rajdhani text-lg">
            The dedicated professionals behind 365 Security Services bring decades of combined expertise to every security challenge
          </p>
        </motion.div>
        
        {/* View mode toggle */}
        <div className="flex justify-center mb-10">
          <motion.div 
            className="inline-flex bg-dark-800 rounded-full p-1 border border-[#a87c64]/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              className={`px-5 py-2 rounded-full font-rajdhani font-medium text-sm ${viewMode === 'grid' ? 'bg-[#a87c64] text-dark-900' : 'text-gray-300'}`}
              onClick={() => viewMode !== 'grid' && toggleViewMode()}
              whileHover={viewMode !== 'grid' ? { backgroundColor: 'rgba(168, 124, 100, 0.2)' } : {}}
              transition={{ duration: 0.2 }}
            >
              Gallery View
            </motion.button>
            <motion.button
              className={`px-5 py-2 rounded-full font-rajdhani font-medium text-sm ${viewMode === 'carousel' ? 'bg-[#a87c64] text-dark-900' : 'text-gray-300'}`}
              onClick={() => viewMode !== 'carousel' && toggleViewMode()}
              whileHover={viewMode !== 'carousel' ? { backgroundColor: 'rgba(168, 124, 100, 0.2)' } : {}}
              transition={{ duration: 0.2 }}
            >
              Carousel View
            </motion.button>
          </motion.div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="mb-16" ref={teamGridRef}>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate={activeMember?.id === member.id ? "active" : "visible"}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 border border-[#a87c64]/20 cursor-pointer h-full transform transition-all duration-300 ${activeMember?.id === member.id ? 'ring-2 ring-[#a87c64] ring-opacity-70' : ''}`}
                  onClick={() => handleSelectMember(member)}
                >
                  {/* Background pattern */}
                  <motion.div 
                    className="absolute inset-0 z-0 opacity-10"
                    variants={patternVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    style={{ 
                      backgroundImage: `url(${bgBgImage})`,
                      backgroundSize: "200%",
                      transform: `rotate(${getMemberStyle(member.id).patternRotation})`,
                      filter: "brightness(1.5) contrast(1.1)"
                    }}
                  ></motion.div>

                  <div className="p-6 relative z-10 h-full flex flex-col">
                    {/* Member image with animation */}
                    <div className="mb-5 overflow-hidden rounded-xl">
                      <motion.div
                        className="relative aspect-[4/5] w-full overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
                      </motion.div>
                    </div>
                    
                    {/* Member info */}
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-white font-orbitron mb-1">{member.name}</h3>
                      <p className="text-[#a87c64] mb-3 font-rajdhani">{member.position}</p>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {member.bio.substring(0, 100)}...
                      </p>
                      
                      <motion.div 
                        className="mt-auto"
                        whileHover={{ scale: 1.03 }}
                      >
                        <button
                          className="w-full px-4 py-2 border border-[#a87c64]/20 text-[#a87c64] rounded-lg text-sm font-medium hover:bg-[#a87c64]/10 transition-all duration-300 flex items-center justify-center"
                        >
                          <span>View Profile</span>
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 ml-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            animate={{ x: activeMember?.id === member.id ? 4 : 0 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 20, 
                              repeat: activeMember?.id === member.id ? 0 : Infinity, 
                              repeatType: "reverse", 
                              duration: 1 
                            }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </motion.svg>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        
        {/* Carousel View */}
        {viewMode === 'carousel' && (
          <div className="mb-16 relative" ref={carouselRef}>
            <div className="max-w-3xl mx-auto relative">
              <motion.div
                className="relative overflow-hidden rounded-xl aspect-[16/9]"
                animate={carouselControls}
                initial={{ opacity: 1, x: 0 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img 
                    src={teamMembers[carouselIndex].image} 
                    alt={teamMembers[carouselIndex].name} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <motion.h3 
                    className="text-3xl font-bold text-white font-orbitron mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {teamMembers[carouselIndex].name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-[#a87c64] mb-4 font-rajdhani text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {teamMembers[carouselIndex].position}
                  </motion.p>
                  
                  <motion.button
                    className="px-6 py-2 bg-[#a87c64] text-dark-900 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={() => handleSelectMember(teamMembers[carouselIndex])}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 124, 100, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Carousel navigation */}
              <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4">
                <motion.button 
                  className="w-10 h-10 rounded-full bg-dark-900/80 border border-[#a87c64]/20 flex items-center justify-center text-[#a87c64]"
                  onClick={goToPrevSlide}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 124, 100, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                <motion.button 
                  className="w-10 h-10 rounded-full bg-dark-900/80 border border-[#a87c64]/20 flex items-center justify-center text-[#a87c64]"
                  onClick={goToNextSlide}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 124, 100, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center mt-6">
                {teamMembers.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${carouselIndex === index ? 'bg-[#a87c64]' : 'bg-gray-600'}`}
                    onClick={() => setCarouselIndex(index)}
                    whileHover={{ scale: 1.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed member view */}
        <AnimatePresence mode="wait">
          {activeMember && (
            <motion.div
              id="team-detail-section"
              key={`detail-${activeMember.id}`}
              className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl overflow-hidden border border-[#a87c64]/20 mb-16 relative"
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layoutId={`member-detail-${activeMember.id}`}
            >
              {/* Background pattern */}
              <div 
                className="absolute inset-0 z-0 opacity-5"
                style={{ 
                  backgroundImage: `url(${bgBgImage})`,
                  backgroundSize: "300%",
                  transform: `rotate(${getMemberStyle(activeMember.id).patternRotation})`,
                  filter: "brightness(1.2) contrast(1.1)"
                }}
              ></div>
              
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-900/50 border border-[#a87c64]/20 flex items-center justify-center text-[#a87c64] z-20"
                onClick={() => handleSelectMember(activeMember)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 124, 100, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10">
                {/* Left profile section */}
                <div className="p-8 lg:p-10 flex flex-col items-center lg:items-start lg:border-r border-[#a87c64]/10">
                  {/* Profile image */}
                  <motion.div
                    className="relative w-64 h-72 rounded-xl overflow-hidden mb-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.2 }
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img 
                      src={activeMember.image} 
                      alt={activeMember.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-50"></div>
                  </motion.div>
                  
                  {/* Name and title with animated text */}
                  <motion.div 
                    className="text-center lg:text-left w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold text-white font-orbitron mb-2"
                      initial="hidden"
                      animate="visible"
                      variants={createTextAnimation(activeMember.name)}
                    >
                      {activeMember.name.split('').map((letter, index) => (
                        <motion.span key={index} variants={letterAnimation} className="inline-block">
                          {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                      ))}
                    </motion.h3>
                    
                    <motion.div 
                      className="text-[#a87c64] font-rajdhani text-xl mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {activeMember.position}
                    </motion.div>
                  </motion.div>
                  
                  {/* Expertise Tags */}
                  <motion.div 
                    className="w-full mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.h4 
                      className="text-white font-rajdhani font-bold mb-3 text-center lg:text-left"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Areas of Expertise
                    </motion.h4>
                    
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {activeMember.expertise.map((skill, index) => (
                        <motion.span
                          key={skill}
                          variants={tagVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          transition={{ delay: 0.6 + (index * 0.1) }}
                          className="px-3 py-1 bg-dark-800 text-[#a87c64] text-sm rounded-full border border-[#a87c64]/20"
                          onMouseEnter={() => setHighlightedExpertise(skill)}
                          onMouseLeave={() => setHighlightedExpertise(null)}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Contact Info */}
                  {activeMember.contactInfo && (
                    <motion.div 
                      className="w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h4 className="text-white font-rajdhani font-bold mb-3 text-center lg:text-left">Contact</h4>
                      
                      <div className="space-y-2">
                        {activeMember.contactInfo.email && (
                          <motion.a
                            href={`mailto:${activeMember.contactInfo.email}`}
                            className="flex items-center text-gray-300 hover:text-[#a87c64] transition-colors justify-center lg:justify-start"
                            whileHover={{ x: 5 }}
                          >
                            <FiMail className="mr-2" />
                            <span className="text-sm">{activeMember.contactInfo.email}</span>
                          </motion.a>
                        )}
                        
                        {activeMember.contactInfo.linkedin && (
                          <motion.a
                            href={activeMember.contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-[#a87c64] transition-colors justify-center lg:justify-start"
                            whileHover={{ x: 5 }}
                          >
                            <FiLinkedin className="mr-2" />
                            <span className="text-sm">LinkedIn Profile</span>
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Right side content section */}
                <div className="col-span-2 p-8 lg:p-10">
                  {/* Bio/Achievements Toggle */}
                  <div className="mb-8 flex justify-center lg:justify-start">
                    <motion.div 
                      className="inline-flex bg-dark-800 rounded-full p-1 border border-[#a87c64]/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        className={`px-5 py-2 rounded-full font-rajdhani font-medium text-sm ${!showingAchievements ? 'bg-[#a87c64] text-dark-900' : 'text-gray-300'}`}
                        onClick={() => showingAchievements && toggleAchievements()}
                        whileHover={showingAchievements ? { backgroundColor: 'rgba(168, 124, 100, 0.2)' } : {}}
                      >
                        <span className="flex items-center">
                          <FiUser className="mr-2" />
                          Biography
                        </span>
                      </motion.button>
                      <motion.button
                        className={`px-5 py-2 rounded-full font-rajdhani font-medium text-sm ${showingAchievements ? 'bg-[#a87c64] text-dark-900' : 'text-gray-300'}`}
                        onClick={() => !showingAchievements && toggleAchievements()}
                        whileHover={!showingAchievements ? { backgroundColor: 'rgba(168, 124, 100, 0.2)' } : {}}
                      >
                        <span className="flex items-center">
                          <FiAward className="mr-2" />
                          Achievements
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Biography */}
                  <AnimatePresence mode="wait">
                    {!showingAchievements && (
                      <motion.div
                        key="bio"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative mb-8">
                          <motion.div 
                            className="absolute -top-8 -left-4 text-8xl text-[#a87c64] opacity-20"
                            variants={quoteMarkVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            "
                          </motion.div>
                          
                          <motion.div
                            className="bg-dark-800/50 p-6 rounded-xl border border-[#a87c64]/10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <p className="text-gray-300 italic text-lg font-rajdhani">
                              {activeMember.quote}
                            </p>
                          </motion.div>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h3 className="text-white font-rajdhani font-bold text-xl mb-4 flex items-center">
                            <FiBookOpen className="mr-2 text-[#a87c64]" />
                            About {activeMember.name}
                          </h3>
                          
                          <motion.p 
                            className="text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            {activeMember.bio}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    )}
                    
                    {/* Achievements */}
                    {showingAchievements && (
                      <motion.div
                        key="achievements"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-white font-rajdhani font-bold text-xl mb-6 flex items-center">
                          <FiAward className="mr-2 text-[#a87c64]" />
                          Key Achievements
                        </h3>
                        
                        <motion.div 
                          className="space-y-4"
                          variants={detailVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {activeMember.achievements?.map((achievement, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-start bg-dark-800/50 p-4 rounded-lg border border-[#a87c64]/10"
                              variants={detailItemVariants}
                              whileHover={{ 
                                y: -5, 
                                boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.2)",
                                borderColor: "rgba(168, 124, 100, 0.3)"
                              }}
                              transition={{ delay: 0.2 + (index * 0.1) }}
                            >
                              <span className="text-[#a87c64] mr-3 mt-1 flex-shrink-0">
                                <FiStar />
                              </span>
                              <p className="text-gray-300">{achievement}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}