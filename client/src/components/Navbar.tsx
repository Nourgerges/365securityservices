import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logoImage from "../assets/365_nav_logo.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "wouter";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // More comprehensive touch device detection
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || 
                      navigator.maxTouchPoints > 0 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Also check if device width suggests mobile
      const isMobileWidth = window.innerWidth <= 768;
      
      setIsTouchDevice(hasTouch || isMobileWidth);
    };
    
    checkTouchDevice();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkTouchDevice);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkTouchDevice);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Services menu items
  const serviceItems = [
    { name: "Manned Services", href: "/services/manned-services" },
    { name: "Security Training", href: "/services/security-training" },
    { name: "Security Consultancy", href: "/services/security-consultancy" },
    { name: "Cash Services", href: "/services/cash-services" },
  ];



  // Expertise menu items
  const expertiseItems = [
    { name: "Governmental", href: "/expertise/governmental" },
    { name: "Banking", href: "/expertise/banking" },
    { name: "Hospitality", href: "/expertise/hospitality" },
    { name: "Retail", href: "/expertise/retail" },
    { name: "Corporate", href: "/expertise/corporate" },
    { name: "Events", href: "/expertise/events" },
  ];
  
  const navItems = [
    { name: "Home", href: "/", dropdown: false },
    { name: "About Us", href: "/about", dropdown: false },
    { name: "Services", href: "/#services", dropdown: true, items: serviceItems },
    { name: "Expertise", href: "/#expertise", dropdown: true, items: expertiseItems },
    { name: "Clients", href: "/#clients", dropdown: false },
  ];

  return (
    <motion.nav 
      className={cn(
        "fixed w-full z-50 px-4 transition-all duration-300 bg-dark-800 bg-opacity-80 backdrop-blur-md border-b border-[#a87c64]/20",
        scrolled ? "py-1" : "py-2"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Area */}
        <motion.a 
          href="/"
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src={logoImage} alt="365 Security Services Logo" className="h-16" />
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            item.dropdown ? (
              <div key={item.name} className="relative group">
                <button
                  className="nav-item px-3 py-2 font-rajdhani font-medium text-white hover:text-[#a87c64] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#a87c64] hover:after:w-full flex items-center"
                  style={{
                    transition: 'all 0.2s ease',
                    transformOrigin: 'center'
                  }}
                >
                  {item.name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                
                {/* Simplified and optimized dropdown menu that opens on hover */}
                <div
                  className="absolute left-0 top-full min-w-[220px] bg-dark-800 rounded-md p-2 shadow-xl mt-1 border border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50"
                  style={{
                    transition: 'opacity 0.2s ease, visibility 0.2s ease',
                    transformOrigin: 'top left'
                  }}
                >
                  <div className="flex flex-col space-y-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="text-gray-200 hover:text-[#a87c64] hover:bg-dark-700 py-2 px-3 rounded-md block transition-colors font-rajdhani"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                  <div className="fill-dark-800 absolute -top-2 left-5 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-dark-800"></div>
                </div>
              </div>
            ) : (
              <a 
                key={item.name}
                href={item.href} 
                className="nav-item px-3 py-2 font-rajdhani font-medium text-white hover:text-[#a87c64] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#a87c64] hover:after:w-full"
                style={{
                  transition: 'all 0.2s ease',
                  transformOrigin: 'center'
                }}
              >
                {item.name}
              </a>
            )
          ))}
          
          <a 
            href="/contact" 
            className="ml-3 px-5 py-2 rounded-full bg-[#a87c64] text-dark-900 font-rajdhani font-semibold hover:opacity-90 hover:shadow-md hover:shadow-[#a87c64]/20"
            style={{
              transition: 'all 0.2s ease',
              transformOrigin: 'center'
            }}
          >
            Request a Consultation
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden flex items-center text-[#a87c64] hover:opacity-80" 
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 bg-dark-800 mt-2 rounded-lg">
              {/* Home Link */}
              <motion.a 
                href="/" 
                className={cn(
                  "mobile-nav-item block px-3 py-2 font-rajdhani font-medium text-white rounded-lg",
                  !isTouchDevice && "desktop-hover"
                )}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                {...(!isTouchDevice && { whileHover: { x: 5 } })}
              >
                Home
              </motion.a>
              
              {/* About Us Section */}
              <motion.a
                href="/about"
                className={cn(
                  "mobile-nav-item block px-3 py-2 font-rajdhani font-medium text-gray-300 rounded-lg",
                  !isTouchDevice && "desktop-hover"
                )}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                {...(!isTouchDevice && { whileHover: { x: 5 } })}
              >
                About Us
              </motion.a>
              
              {/* Services Section with sub-items */}
              <div className="space-y-1">
                <div className="px-3 py-2 font-rajdhani font-medium text-[#a87c64]">Services</div>
                {serviceItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "mobile-nav-item block pl-6 pr-3 py-2 font-rajdhani font-medium text-gray-300 rounded-lg",
                      !isTouchDevice && "desktop-hover"
                    )}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    {...(!isTouchDevice && { whileHover: { x: 5 } })}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
              
              {/* Expertise Section with sub-items */}
              <div className="space-y-1">
                <div className="px-3 py-2 font-rajdhani font-medium text-[#a87c64]">Expertise</div>
                {expertiseItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "mobile-nav-item block pl-6 pr-3 py-2 font-rajdhani font-medium text-gray-300 rounded-lg",
                      !isTouchDevice && "desktop-hover"
                    )}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.05) }}
                    {...(!isTouchDevice && { whileHover: { x: 5 } })}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
              
              {/* Clients Link */}
              <motion.a 
                href="/#clients" 
                className={cn(
                  "mobile-nav-item block px-3 py-2 font-rajdhani font-medium text-white rounded-lg",
                  !isTouchDevice && "desktop-hover"
                )}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                {...(!isTouchDevice && { whileHover: { x: 5 } })}
              >
                Clients
              </motion.a>

              {/* Contact Us Button */}
              <motion.a 
                href="/contact" 
                className={cn(
                  "mobile-nav-item block px-3 py-2 font-rajdhani font-medium bg-[#a87c64] text-dark-900 rounded-lg",
                  !isTouchDevice && "desktop-hover"
                )}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                {...(!isTouchDevice && { whileHover: { x: 5, opacity: 0.9 } })}
              >
                Request a Consultation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
