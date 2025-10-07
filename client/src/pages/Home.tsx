import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { VideoShowcase } from "@/components/VideoShowcase";
import { AboutSection } from "@/components/AboutSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ClientsCarousel } from "@/components/ClientsCarousel";
import { CallToAction } from "@/components/CallToAction";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet";

export default function Home() {
  const [scrollToTop, setScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Helmet>
        <title>365 Security Services - Premier Security Solutions | Where Protection Meets Precision</title>
        <meta name="description" content="365 Security Services provides comprehensive security solutions including manned security, cash services, security consultancy, and training. Professional protection services across Lebanon with 24/7 support." />
        <meta name="keywords" content="security services, manned security, cash transportation, security training, close protection, security consultancy, Lebanon security, 365 security, security guards, professional security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://365securityservices.company/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="365 Security Services - Premier Security Solutions" />
        <meta property="og:description" content="Professional security services including manned security, cash services, security consultancy, and training across Lebanon. 24/7 protection with cutting-edge technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://365securityservices.company/" />
        <meta property="og:site_name" content="365 Security Services" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="365 Security Services - Premier Security Solutions" />
        <meta name="twitter:description" content="Professional security services including manned security, cash services, security consultancy, and training across Lebanon." />
        
        {/* Local Business Schema - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SecurityService",
            "name": "365 Security Services",
            "alternateName": "365 Security",
            "description": "Professional security services company providing manned security, cash transportation, security consultancy, and training services across Lebanon.",
            "url": "https://365securityservices.company",
            "logo": "https://365securityservices.company/favicon.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+961-81-365365",
              "contactType": "customer service",
              "availableLanguage": ["English", "Arabic"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Lebanon"
            },
            "serviceArea": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Security Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Manned Security Services",
                    "description": "Professional security guards, static guards, patrolling supervisors, close protection, and crowd control services."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cash Services",
                    "description": "Secure cash transportation, ATM outsourcing, bank escort services, and valuable item transportation."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Security Consultancy",
                    "description": "Risk assessment, threat analysis, security surveys, and crisis management planning."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Security Training",
                    "description": "Professional security training, threat assessment, emergency response, and certification programs."
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            }
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <Hero />
      <ServicesSection />
      <VideoShowcase 
        subtitle="Professional Excellence"
        title="See Our Security Solutions in Action"
        description="Watch how 365 Security Services delivers comprehensive protection through cutting-edge technology, expert personnel, and proven methodologies. Our commitment to excellence ensures your peace of mind."
        videoSrc="/attached_assets/Video 2_1749142276592.mp4"
        variant="home"
      />
      <AboutSection />
      <ExpertiseSection />
      <ClientsCarousel />
      <FeaturesSection />
      <CallToAction />
      <ContactSection />
      <Footer />

      {/* Back to top button */}
      <button
        onClick={handleScrollToTop}
        className={cn(
          "fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#a87c64] text-dark-900 flex items-center justify-center z-50 hover:opacity-90 transition-all duration-150",
          scrollToTop ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
