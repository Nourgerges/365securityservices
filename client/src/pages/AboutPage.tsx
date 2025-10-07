import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoBackground } from "@/components/VideoBackground";
import { FiUser, FiMail, FiLinkedin, FiShield, FiAward, FiTarget, FiX, FiChevronRight, FiStar, FiClock, FiInstagram } from "react-icons/fi";
import bgBgImage from "@/assets/BG BG.png";
import georgesImage from "@assets/Georges_1749125238708.jpeg";
import alainImage from "@assets/Alain Khoury_1749125238708.jpeg";
import vincentImage from "@assets/Vincent_1749125238708.jpeg";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  title: string;
  bio: string;
  expertise: string[];
  achievements: string[];
  quote?: string;
  image?: string;
  contactInfo?: {
    email?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Georges Gerges",
    position: "Key Founder & Chief Executive Officer",
    title: "CEO & Founder",
    bio: "Distinguished security and protection expert with over 20 years of specialized experience in close protection and executive security. Georges has served as a close protection officer and security team leader for foreign diplomats and VIPs, while also engineering and executing comprehensive security plans for corporate clients and high-profile events. His extensive network spans decision makers across Africa and the Middle East, positioning him as a key connector in international security circles. Armed with a Master's in Business Administration, Georges leads with unwavering principles of integrity, accountability, and a determined can-do attitude that he instills in every team member.",
    expertise: ["Close Protection Operations", "Diplomatic Security", "Corporate Security Planning", "VIP Protection", "International Relations", "Executive Leadership"],
    achievements: [
      "20+ years of close protection experience with foreign diplomats and VIPs",
      "Engineered and executed security plans for major corporate clients and events",
      "Extensive network with decision makers across Africa and the Middle East",
      "Master's degree in Business Administration",
      "Founded 365 Security Services with focus on integrity and excellence"
    ],
    quote: "Integrity, accountability, and a can-do attitude are the foundations of exceptional security services.",
    image: georgesImage,
    contactInfo: {
      email: "georges@365securityservices.company",
      linkedin: "https://www.linkedin.com/in/georges-gerges-849000321/"
    }
  },
  {
    id: 2,
    name: "Vincent Lyn",
    position: "Chief International Director",
    title: "International Director",
    bio: "International business expert specializing in global security operations and cross-border strategic partnerships. Vincent leads our international expansion and ensures seamless service delivery across multiple jurisdictions.",
    expertise: ["International Operations", "Global Strategy", "Cross-Cultural Management", "Regulatory Compliance", "Partnership Development"],
    achievements: [
      "Established operations in 15+ countries",
      "Expert in international security regulations",
      "Built strategic partnerships with global security leaders",
      "Fluent in 5 languages for international coordination"
    ],
    quote: "Security knows no borders—our commitment to excellence is universal.",
    image: "/images/team/vincent-lee-original.jpg",
    contactInfo: {
      email: "vincent@365security.com",
      linkedin: "vincent-lee-international",
      instagram: "https://www.instagram.com/vincent.lyn.50/?hl=en"
    }
  },
  {
    id: 3,
    name: "Alain Khoury",
    position: "Chief Operations Officer",
    title: "COO",
    bio: "Highly skilled security and close protection expert with over 25 years of distinguished service in diplomatic and corporate security environments. Alain's extensive career includes serving as a Diplomatic Security Service agent with the US Embassy in Lebanon, team leader with the EU Commission, and team leader with G4S. His expertise spans close protection operations, firearms training, and operational leadership across diverse security challenges. With a robust background in both field operations and corporate environments, Alain has successfully executed numerous high-stakes missions protecting foreign diplomats and VIPs. His comprehensive training and decorated martial arts expertise complement his operational excellence.",
    expertise: ["Close Protection Operations", "Diplomatic Security Service", "Firearms Training", "Team Leadership", "VIP Protection", "Martial Arts", "Tactical Operations"],
    achievements: [
      "25+ years with US Embassy Lebanon as Diplomatic Security Service agent",
      "Team Leader experience with EU Commission and G4S",
      "SF101 Basic Firearms Officer Course certificate from Diplomatic Security Service",
      "Modern Warrior Police Defensive Tactics certificate from Defensive Tactics Institute",
      "Martial Arts Training certificate from US Marine Corps Training and Advisory Group",
      "Shooting Instructor certificate from Ray's Universe EU",
      "Multiple G4S close protection course certifications",
      "Numerous awards for outstanding service",
      "Decorated martial arts expert"
    ],
    quote: "The only way forward is through.",
    image: alainImage,
    contactInfo: {
      email: "Alain@365Securityservices.company",
      linkedin: "https://www.linkedin.com/in/instructor-alain-khoury-855b90230/"
    }
  },
  {
    id: 4,
    name: "Nour Gerges",
    position: "Chief Technology Officer & Business Development Manager",
    title: "CTO & Business Development",
    bio: "Technology innovator and business strategist driving digital transformation in security services. Nour combines cutting-edge technology with strategic business development to position 365 Security at the forefront of industry innovation.",
    expertise: ["Technology Strategy", "Digital Innovation", "Business Development", "Systems Integration", "Data Analytics"],
    achievements: [
      "Implemented AI-powered security monitoring systems",
      "Led digital transformation initiatives",
      "Secured partnerships with major technology providers",
      "Developed proprietary security management platforms"
    ],
    quote: "Technology amplifies human expertise—together they create unbreachable security.",
    image: "/images/team/nour-gerges.jpg",
    contactInfo: {
      email: "Nour@365securityservices.company",
      linkedin: "https://www.linkedin.com/in/nour-gerges/"
    }
  },
  {
    id: 5,
    name: "Cpt. Adolf Eid",
    position: "Head of Nuclear Safety and Radiation Safety",
    title: "Nuclear & Radiation Safety Director",
    bio: "Chief of the Central Alarm Radiation Station (CAS) in the Lebanese Customs (2007-2017). Certified Nuclear Security & Radiation Safety Expert with great CBRN agents' detection skills and a unique ability to identify, deter, and detect the crossing of CBRN agents and contrabands across international borders. Adolf holds First and Second Level Master's Degrees in protection against CBRNe events and Emergency Response for First Responders and Advisors from the University of Rome Tor Vergata. He is also a martial arts expert.",
    expertise: [
      "Nuclear Security & Radiation Safety",
      "CBRN Agents Detection",
      "Border Security & Contraband Detection",
      "CBRNe Emergency Response",
      "HazMat & TIM Operations",
      "Chemical Weapons Detection & Decontamination",
      "Martial Arts"
    ],
    achievements: [
      "Former Chief of Central Alarm Radiation Station (CAS) - Lebanese Customs (2007-2017)",
      "Member of the DIDACTIC BOARD-Master CBRNe, University of Rome Tor Vergata, Italy (2020)",
      "CBRN consultant for EU-funded project 'Technical Assistance for CBRN Risk's Mitigation in Lebanon' (2021)",
      "IAEA consultant in worldwide R/N Security training and workshops (2013-2016)",
      "OPCW Chemical Module (CWA & TICs) certification - The Hague, Netherlands (2019)",
      "First and Second Level Master's Degrees - University of Rome Tor Vergata",
      "Expert in detection, protection, and decontamination operations"
    ],
    quote: "In nuclear security, there is no margin for error—precision and expertise save lives.",
    contactInfo: {
      email: "adolf@365security.com",
      linkedin: "adolf-eid-nuclear"
    }
  },
  {
    id: 6,
    name: "Charbel Khoury",
    position: "Chief Strategy Officer",
    title: "CSO",
    bio: "C-suite Marketing and Management Director and skilled Business Strategist with advanced entrepreneurial and business acumen. Rich knowledge of the media landscape and deep understanding of Middle East and Africa marketing trends. Charbel boasts over 20 years of Marketing and Management experience from both agency and client-side roles. He led MTN business across 6 countries including Sudan, Yemen and Afghanistan, with a solid record of setting up offices in emerging markets. He also led the esports business at MBC GROUP as Senior Marketing Director Group and Emerging media, and is the mastermind and key-founder at ESTAZ esports. Charbel is a fitness fan and advanced scuba diver.",
    expertise: [
      "Strategic Planning & Business Strategy",
      "Brand Leadership & Marketing Plans",
      "Middle East & Africa Marketing Trends",
      "Emerging Markets Development",
      "Esports & Gaming Business",
      "Media Landscape & Digital Marketing",
      "Business Development & Entrepreneurship"
    ],
    achievements: [
      "Led MTN business operations across 6 countries (Sudan, Yemen, Afghanistan)",
      "Senior Marketing Director Group and Emerging Media at MBC GROUP",
      "Co-founder and mastermind at ESTAZ esports - leading GCC gaming consultancy",
      "Successfully established offices in emerging markets across MEA region",
      "Engineering diploma from Saint Joseph University",
      "Executive MBA from ESCP Europe (top 10 global business school)",
      "Over 20 years of marketing and management experience",
      "10+ years working in GCC and 3 years in Africa"
    ],
    quote: "Alis Grave Nil - Nothing is too heavy for those who have wings.",
    contactInfo: {
      email: "charbel@365security.com",
      linkedin: "charbel-khoury-strategy"
    }
  }
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleMemberSelect = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleCloseMember = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <Helmet>
        <title>About Us | 365 Security Services</title>
        <meta name="description" content="Learn about 365 Security Services, our mission, vision, and the dedicated leadership team behind our premium security solutions." />
      </Helmet>
      
      <Navbar />
      <div className="min-h-screen bg-dark-900 pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <VideoBackground
            videoSrc="/videos/BGBG_Video.mp4"
            overlay={true}
            overlayOpacity={0.8}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-8 text-white font-orbitron leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a87c64] via-[#d4b896] to-[#a87c64]">
                  About 365 Security Services
                </span>
              </motion.h1>
              
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent"></div>
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 font-rajdhani leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-semibold">
                  Where Protection Meets Precision
                </span>
                <br />
                <span className="text-lg text-gray-200 mt-2 block">
                  Delivering comprehensive security solutions with innovation, excellence, 
                  and unwavering commitment to our clients' success
                </span>
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { number: "20+", label: "Years of Excellence", icon: FiAward },
                  { number: "500+", label: "Clients Protected", icon: FiShield },
                  { number: "24/7", label: "Availability", icon: FiClock }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-dark-800/50 rounded-xl border border-[#a87c64]/20 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(168, 124, 100, 0.5)",
                      boxShadow: "0 10px 30px -10px rgba(168, 124, 100, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="h-8 w-8 text-[#a87c64] mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-[#a87c64] font-orbitron mb-2">{stat.number}</h3>
                    <p className="text-gray-300 font-rajdhani">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#a87c64] font-orbitron mb-4">Our Foundation</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto">
                Built on principles of excellence, integrity, and innovation
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#a87c64]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-dark-800/80 backdrop-blur-sm p-10 rounded-2xl border border-[#a87c64]/30 group-hover:border-[#a87c64]/50 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <FiTarget className="h-10 w-10 text-[#a87c64] mr-4" />
                    <h3 className="text-3xl font-bold text-white font-orbitron">Our Mission</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed font-rajdhani">
                    To provide unparalleled security services that safeguard our clients' assets, personnel, and peace of mind. 
                    We are committed to excellence, integrity, and continuous improvement in all aspects of our operations, 
                    delivering tailored security solutions that exceed expectations and set new industry standards.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-[#a87c64]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-dark-800/80 backdrop-blur-sm p-10 rounded-2xl border border-[#a87c64]/30 group-hover:border-[#a87c64]/50 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <FiShield className="h-10 w-10 text-[#a87c64] mr-4" />
                    <h3 className="text-3xl font-bold text-white font-orbitron">Our Vision</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed font-rajdhani">
                    To be recognized as the leading security services provider in Lebanon and beyond, setting the industry standard for 
                    professionalism, innovation, and client satisfaction. We aspire to expand our global footprint while maintaining 
                    our commitment to excellence and the personalized approach that distinguishes us in the market.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="py-20 bg-dark-800" id="team">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#a87c64] font-orbitron mb-4">Leadership Team</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#a87c64] to-transparent mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto">
                Meet the visionary leaders who guide 365 Security Services with expertise, 
                innovation, and unwavering commitment to excellence
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleMemberSelect(member)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#a87c64]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <motion.div 
                    className="relative bg-dark-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#a87c64]/20 group-hover:border-[#a87c64]/50 transition-all duration-500"
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px -10px rgba(168, 124, 100, 0.3)"
                    }}
                  >
                    {/* Profile Image */}
                    <div className="h-64 bg-gradient-to-br from-dark-700 to-dark-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent z-10"></div>
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className={`absolute inset-0 w-full h-full z-0 ${
                            member.name === "Georges Gerges" ? "object-cover scale-125" :
                            member.name === "Alain Khoury" ? "object-cover scale-125" :
                            member.name === "Vincent Lyn" ? "object-cover object-center scale-75" :
                            "object-cover object-center"
                          }`}
                          style={{
                            ...(member.name === "Vincent Lyn" ? { backgroundColor: "#000" } : {}),
                            ...(member.name === "Georges Gerges" ? { objectPosition: "center 20%" } : {}),
                            ...(member.name === "Alain Khoury" ? { objectPosition: "center 15%" } : {})
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#a87c64]/30 z-0">
                          <FiUser className="h-32 w-32" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-[#a87c64]/90 to-[#a87c64]/20 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="text-center text-white">
                          <FiChevronRight className="h-8 w-8 mx-auto mb-2" />
                          <p className="font-rajdhani font-semibold">View Profile</p>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white font-orbitron mb-2 group-hover:text-[#a87c64] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-[#a87c64] font-rajdhani text-sm mb-3 opacity-90">
                        {member.position}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                      
                      {/* Expertise Preview */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-[#a87c64]/20 text-[#a87c64] text-xs rounded-full border border-[#a87c64]/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 2 && (
                          <span className="px-3 py-1 bg-dark-700 text-gray-400 text-xs rounded-full">
                            +{member.expertise.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Member Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseMember}
            >
              <motion.div
                className="bg-dark-800 rounded-2xl border border-[#a87c64]/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseMember}
                  className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 rounded-full text-gray-400 hover:text-white hover:bg-dark-900 transition-all duration-300"
                >
                  <FiX className="h-6 w-6" />
                </button>

                {/* Header */}
                <div className="p-8 border-b border-[#a87c64]/20">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-dark-700 to-dark-900 rounded-full flex items-center justify-center border-4 border-[#a87c64]/30 overflow-hidden">
                      {selectedMember.image ? (
                        <img 
                          src={selectedMember.image} 
                          alt={selectedMember.name}
                          className={`w-full h-full ${
                            selectedMember.name === "Georges Gerges" ? "object-cover scale-125" :
                            selectedMember.name === "Alain Khoury" ? "object-cover scale-125" :
                            selectedMember.name === "Vincent Lyn" ? "object-cover object-center scale-75" :
                            "object-cover object-center"
                          }`}
                          style={{
                            ...(selectedMember.name === "Vincent Lyn" ? { backgroundColor: "#000" } : {}),
                            ...(selectedMember.name === "Georges Gerges" ? { objectPosition: "center 20%" } : {}),
                            ...(selectedMember.name === "Alain Khoury" ? { objectPosition: "center 15%" } : {})
                          }}
                        />
                      ) : (
                        <FiUser className="h-16 w-16 text-[#a87c64]" />
                      )}
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <h2 className="text-3xl font-bold text-white font-orbitron mb-2">{selectedMember.name}</h2>
                      <p className="text-[#a87c64] font-rajdhani text-lg mb-3">{selectedMember.position}</p>
                      {selectedMember.quote && (
                        <blockquote className="text-gray-300 italic font-rajdhani text-lg border-l-4 border-[#a87c64]/50 pl-4">
                          "{selectedMember.quote}"
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Bio */}
                  <div>
                    <h3 className="text-xl font-bold text-[#a87c64] font-orbitron mb-4 flex items-center">
                      <FiUser className="h-5 w-5 mr-2" />
                      Biography
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-rajdhani">
                      {selectedMember.bio}
                    </p>
                  </div>

                  {/* Areas of Expertise */}
                  <div>
                    <h3 className="text-xl font-bold text-[#a87c64] font-orbitron mb-4 flex items-center">
                      <FiTarget className="h-5 w-5 mr-2" />
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedMember.expertise.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-[#a87c64]/20 text-[#a87c64] text-sm rounded-full border border-[#a87c64]/30 font-rajdhani"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-[#a87c64] font-orbitron mb-4 flex items-center">
                      <FiAward className="h-5 w-5 mr-2" />
                      Key Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMember.achievements.map((achievement, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-4 bg-dark-900/50 rounded-lg border border-[#a87c64]/10"
                        >
                          <FiStar className="h-5 w-5 text-[#a87c64] mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300 font-rajdhani">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  {selectedMember.contactInfo && (
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-bold text-[#a87c64] font-orbitron mb-4">Contact Information</h3>
                      <div className="flex gap-4">
                        {selectedMember.contactInfo.email && (
                          <a 
                            href={`mailto:${selectedMember.contactInfo.email}`}
                            className="flex items-center gap-2 px-4 py-2 bg-[#a87c64]/20 text-[#a87c64] rounded-full border border-[#a87c64]/30 hover:bg-[#a87c64]/30 transition-all duration-300"
                          >
                            <FiMail className="h-4 w-4" />
                            <span className="font-rajdhani">Email</span>
                          </a>
                        )}
                        {selectedMember.contactInfo.linkedin && (
                          <a 
                            href={selectedMember.contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#a87c64]/20 text-[#a87c64] rounded-full border border-[#a87c64]/30 hover:bg-[#a87c64]/30 transition-all duration-300"
                          >
                            <FiLinkedin className="h-4 w-4" />
                            <span className="font-rajdhani">LinkedIn</span>
                          </a>
                        )}
                        {selectedMember.contactInfo.instagram && (
                          <a 
                            href={selectedMember.contactInfo.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#a87c64]/20 text-[#a87c64] rounded-full border border-[#a87c64]/30 hover:bg-[#a87c64]/30 transition-all duration-300"
                          >
                            <FiInstagram className="h-4 w-4" />
                            <span className="font-rajdhani">Instagram</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
          <VideoBackground
            videoSrc="/videos/BGBG_Video.mp4"
            overlay={true}
            overlayOpacity={0.85}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white font-orbitron mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Ready to Experience Premium Security?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 font-rajdhani mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Join hundreds of satisfied clients who trust 365 Security Services 
                for their most critical security needs
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/contact">
                  <motion.button 
                    className="px-8 py-4 bg-[#a87c64] text-dark-900 font-rajdhani font-bold text-lg rounded-full hover:bg-[#b89274] transition-all duration-300 shadow-lg"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 10px 30px -5px rgba(168, 124, 100, 0.5)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get In Touch
                  </motion.button>
                </Link>
                
                <Link to="/services">
                  <motion.button 
                    className="px-8 py-4 bg-transparent text-[#a87c64] font-rajdhani font-bold text-lg rounded-full border-2 border-[#a87c64] hover:bg-[#a87c64] hover:text-dark-900 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(168, 124, 100, 0.3)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Our Services
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}