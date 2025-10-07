import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, MotionValue, useTransform, useSpring } from "framer-motion";
import bgBgImage from "@assets/BG BG.png";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image?: string | null;
  expertise: string[];
  quote?: string;
  achievements?: string[];
  contactInfo?: {
    email?: string;
    linkedin?: string;
  };
}

export function TeamInteractive() {
  // Sample team members data - replace with actual team data from your database or API
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Mohammad Al-Sayegh",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in security operations, Mohammad founded 365 Security Services with a vision to transform the security landscape in Lebanon through innovation and excellence.",
      image: null,
      expertise: ["Strategic Planning", "Crisis Management", "Executive Protection"],
      quote: "Security is not just a service we provide—it's a commitment to protecting what matters most to our clients.",
      achievements: [
        "Built 365 Security Services from the ground up to become one of Lebanon's premier security firms",
        "Developed proprietary security protocols adopted by major financial institutions",
        "Former advisor to government security agencies"
      ]
    },
    {
      id: 2,
      name: "Sara Khoury",
      position: "Chief Operations Officer",
      bio: "Sara oversees all operational aspects of 365 Security Services, ensuring that our security protocols and service delivery meet the highest standards of efficiency and effectiveness.",
      image: null,
      expertise: ["Operations Management", "Quality Control", "Team Leadership"],
      quote: "Excellence in security comes from meticulous planning, rigorous training, and unwavering vigilance.",
      achievements: [
        "Streamlined operational processes, resulting in 30% increase in efficiency",
        "Implemented advanced quality assurance systems for security personnel",
        "Developed and executed training programs for over 200 security professionals"
      ]
    },
    {
      id: 3,
      name: "Adnan Nassar",
      position: "Head of Training",
      bio: "A former military special forces instructor, Adnan leads our comprehensive training programs, bringing tactical expertise and real-world experience to prepare security personnel for any situation.",
      image: null,
      expertise: ["Tactical Training", "Firearms Expertise", "Emergency Response"],
      quote: "In security, your training determines your performance when it matters most.",
      achievements: [
        "Served 12 years in special forces with specialized training in counter-terrorism",
        "Developed 365's advanced tactical response curriculum",
        "Certified instructor in multiple defensive disciplines"
      ]
    },
    {
      id: 4,
      name: "Hiba Khalil",
      position: "Security Consultant",
      bio: "Hiba specializes in designing tailored security solutions for corporate clients, with particular expertise in risk assessment, threat analysis, and security system integration.",
      image: null,
      expertise: ["Risk Assessment", "Security Planning", "Corporate Security"],
      quote: "Every security challenge has a solution—the key is understanding the unique elements of each situation.",
      achievements: [
        "Designed comprehensive security systems for 25+ corporate headquarters",
        "Published researcher in corporate security protocols",
        "Certified Risk Assessment Professional"
      ]
    },
    {
      id: 5,
      name: "Fadi Abboud",
      position: "Cash Transfer Operations Manager",
      bio: "Fadi manages our cash-in-transit services with precision and vigilance, coordinating complex logistics to ensure secure transportation of valuable assets.",
      image: null,
      expertise: ["Secure Logistics", "Route Planning", "Asset Protection"],
      quote: "Success in secure transport isn't measured by what happens, but by what doesn't happen.",
      achievements: [
        "Managed secure transportation of over $500 million in assets without incident",
        "Innovated route security algorithms that reduce risk exposure",
        "Former bank security chief with specialized training in asset protection"
      ]
    },
    {
      id: 6,
      name: "Rania Haddad",
      position: "Client Relations Director",
      bio: "Rania works closely with our clients to understand their needs and ensure that our security solutions are precisely aligned with their requirements and expectations.",
      image: null,
      expertise: ["Client Communication", "Needs Assessment", "Service Customization"],
      quote: "Building trust is at the heart of what we do—security is as much about relationships as it is about protection.",
      achievements: [
        "Maintained 95% client retention rate over five years",
        "Expanded client base into new sectors including healthcare and education",
        "Developed the company's client-centric service approach"
      ]
    }
  ];

  // State for the selected member
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [previousMember, setPreviousMember] = useState<TeamMember | null>(null);
  
  // State for the highlighted expertise area
  const [highlightedExpertise, setHighlightedExpertise] = useState<string | null>(null);
  
  // State for animation control
  const controls = useAnimation();
  const detailControls = useAnimation();
  
  // Refs for scroll functionality
  const teamGridRef = useRef<HTMLDivElement>(null);
  
  // Handle member selection
  const handleSelectMember = (member: TeamMember) => {
    if (activeMember && activeMember.id === member.id) {
      // If clicking the same member, close the detail view
      setPreviousMember(activeMember);
      setActiveMember(null);
      detailControls.start({ opacity: 0, y: 20 });
    } else {
      // If selecting a different member, update the active member
      setPreviousMember(activeMember);
      setActiveMember(member);
      
      // Reset animation controls for detail view
      detailControls.start({ opacity: 0, y: 20 }).then(() => {
        detailControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      });
      
      // Scroll to the detail section if mobile
      setTimeout(() => {
        const detailSection = document.getElementById('team-detail-section');
        if (detailSection && window.innerWidth < 768) {
          detailSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  // Generate a random style based on member id (for consistent but unique styling)
  const getMemberStyle = (id: number) => {
    const hues = [30, 45, 60, 15, 75, 90]; // Bronze/gold variations
    const baseHue = hues[id % hues.length];
    
    return {
      accentColor: `hsl(${baseHue}, 40%, 55%)`,
      glowColor: `hsl(${baseHue}, 50%, 50%, 0.3)`,
      patternRotation: `${(id * 37) % 360}deg`
    };
  };

  // Card hover effects
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
  
  // Detail panel animations
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
  
  // Background pattern animation for member cards
  const patternVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.1, transition: { duration: 1 } },
    hover: { opacity: 0.2, scale: 1.1, transition: { duration: 0.15 } }
  };

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background pattern */}
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
          className="text-center mb-16"
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

        {/* Team members grid */}
        <div className="mb-16" ref={teamGridRef}>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                animate="visible"
                className={`relative overflow-hidden rounded-xl bg-dark-800 border border-[#a87c64]/20 cursor-pointer transform transition-all duration-300 ${activeMember?.id === member.id ? 'ring-2 ring-[#a87c64] ring-opacity-70' : ''}`}
                onClick={() => handleSelectMember(member)}
              >
                {/* Background pattern with dynamic styling */}
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

                <div className="p-6 relative z-10">
                  {/* Circular avatar/placeholder */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-dark-900 border-2 border-[#a87c64]/30 flex items-center justify-center overflow-hidden"
                      whileHover={{ 
                        scale: 1.05, 
                        borderColor: getMemberStyle(member.id).accentColor,
                        boxShadow: `0 0 20px ${getMemberStyle(member.id).glowColor}`
                      }}
                    >
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#a87c64] text-5xl font-bold">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Member info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white font-orbitron mb-1">{member.name}</h3>
                    <p className="text-[#a87c64] mb-4 font-rajdhani">{member.position}</p>
                    
                    <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                      {member.bio}
                    </p>
                    
                    <motion.button
                      className="px-4 py-2 bg-dark-900 text-[#a87c64] border border-[#a87c64]/30 rounded-full text-sm font-medium hover:bg-[#a87c64]/10 transition-all duration-300"
                      whileHover={{ scale: 1.03, borderColor: getMemberStyle(member.id).accentColor }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeMember?.id === member.id ? 'Hide Details' : 'View Profile'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Detailed member view */}
        <AnimatePresence mode="wait">
          {activeMember && (
            <motion.div
              id="team-detail-section"
              key={`detail-${activeMember.id}`}
              className="bg-dark-800 rounded-xl overflow-hidden border border-[#a87c64]/20 mb-16 relative"
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
              
              <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10">
                {/* Left profile section */}
                <div className="p-8 lg:p-10 flex flex-col items-center lg:items-start lg:border-r border-[#a87c64]/10">
                  {/* Profile image/avatar */}
                  <motion.div
                    className="w-48 h-48 rounded-full bg-dark-900 border-2 border-[#a87c64]/30 flex items-center justify-center overflow-hidden mb-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.2 }
                    }}
                  >
                    {activeMember.image ? (
                      <img 
                        src={activeMember.image} 
                        alt={activeMember.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[#a87c64] text-6xl font-bold">
                        {activeMember.name.charAt(0)}
                      </span>
                    )}
                  </motion.div>
                  
                  <motion.h2 
                    className="text-2xl font-bold text-white font-orbitron mb-1 text-center lg:text-left"
                    variants={detailItemVariants}
                  >
                    {activeMember.name}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-[#a87c64] mb-6 font-rajdhani text-lg text-center lg:text-left"
                    variants={detailItemVariants}
                  >
                    {activeMember.position}
                  </motion.p>
                  
                  <motion.div
                    className="mb-6 w-full"
                    variants={detailItemVariants}
                  >
                    <h3 className="text-sm uppercase text-gray-400 mb-2 font-rajdhani text-center lg:text-left">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {activeMember.expertise.map((skill, index) => (
                        <motion.span 
                          key={index}
                          className="px-3 py-1 bg-dark-900 rounded-full text-sm text-[#a87c64] border border-[#a87c64]/20 cursor-pointer transition-all duration-300"
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: "rgba(168, 124, 100, 0.1)",
                            borderColor: "rgba(168, 124, 100, 0.5)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={() => setHighlightedExpertise(skill)}
                          onMouseLeave={() => setHighlightedExpertise(null)}
                          style={{ 
                            backgroundColor: highlightedExpertise === skill ? "rgba(168, 124, 100, 0.1)" : "",
                            borderColor: highlightedExpertise === skill ? "rgba(168, 124, 100, 0.5)" : ""
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  {activeMember.contactInfo && (
                    <motion.div 
                      className="w-full"
                      variants={detailItemVariants}
                    >
                      <h3 className="text-sm uppercase text-gray-400 mb-2 font-rajdhani text-center lg:text-left">Connect</h3>
                      <div className="flex gap-3 justify-center lg:justify-start">
                        {activeMember.contactInfo.email && (
                          <motion.a
                            href={`mailto:${activeMember.contactInfo.email}`}
                            className="p-2 bg-dark-900 rounded-full text-[#a87c64] hover:text-white hover:bg-[#a87c64] transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </motion.a>
                        )}
                        {activeMember.contactInfo.linkedin && (
                          <motion.a
                            href={activeMember.contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-dark-900 rounded-full text-[#a87c64] hover:text-white hover:bg-[#a87c64] transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Right content section */}
                <div className="p-8 lg:p-10 lg:col-span-2">
                  {/* Bio */}
                  <motion.div 
                    className="mb-8"
                    variants={detailItemVariants}
                  >
                    <h3 className="text-xl font-bold text-white font-rajdhani mb-3">Biography</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {activeMember.bio}
                    </p>
                  </motion.div>
                  
                  {/* Quote */}
                  {activeMember.quote && (
                    <motion.div 
                      className="mb-8 bg-dark-900/50 border-l-4 border-[#a87c64] p-4 rounded-r"
                      variants={detailItemVariants}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <blockquote className="text-gray-300 italic">
                        "{activeMember.quote}"
                      </blockquote>
                    </motion.div>
                  )}
                  
                  {/* Achievements */}
                  {activeMember.achievements && (
                    <motion.div
                      variants={detailItemVariants}
                    >
                      <h3 className="text-xl font-bold text-white font-rajdhani mb-3">Key Achievements</h3>
                      <ul className="space-y-2">
                        {activeMember.achievements.map((achievement, index) => (
                          <motion.li 
                            key={index}
                            className="text-gray-300 flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              transition: { delay: 0.3 + (index * 0.1) } 
                            }}
                          >
                            <span className="text-[#a87c64] mt-1 flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-dark-900/70 text-gray-400 hover:text-white z-20"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 124, 100, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectMember(activeMember)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {[
            { label: "Combined Experience", value: "75+", unit: "Years" },
            { label: "Security Personnel", value: "300+", unit: "Trained" },
            { label: "Client Satisfaction", value: "98%", unit: "Rating" },
            { label: "Service Areas", value: "12", unit: "Domains" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-dark-800 rounded-xl p-6 border border-[#a87c64]/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.5
                }
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                borderColor: "#a87c64"
              }}
            >
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-[#a87c64] font-orbitron mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.2 + (index * 0.1),
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400 font-rajdhani uppercase tracking-wider">{stat.label}</div>
              <div className="text-sm text-[#a87c64]">{stat.unit}</div>
            </motion.div>
          ))}
        </div>

        {/* Team values */}
        <motion.div
          className="bg-dark-800 rounded-xl p-8 md:p-10 border border-[#a87c64]/20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="absolute inset-0 z-0 opacity-5"
            style={{ 
              backgroundImage: `url(${bgBgImage})`,
              backgroundSize: "200%",
              filter: "brightness(1.2) contrast(1.1)"
            }}
          ></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white font-orbitron mb-6 text-center">Our Team Values</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Unwavering Integrity",
                  description: "We uphold the highest ethical standards in all our operations, ensuring transparency, honesty, and accountability."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                  title: "Constant Vigilance",
                  description: "We maintain an unwavering state of alertness, anticipating and addressing security challenges before they arise."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Collaborative Excellence",
                  description: "We work together seamlessly, combining our diverse skills and perspectives to deliver exceptional security solutions."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-dark-900 rounded-lg p-6 border border-[#a87c64]/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.2 + (index * 0.1),
                      duration: 0.5
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                    borderColor: "#a87c64"
                  }}
                >
                  <div className="text-[#a87c64] mb-4">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white font-rajdhani mb-2">{value.title}</h4>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}