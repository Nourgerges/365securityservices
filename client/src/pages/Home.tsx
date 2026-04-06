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
import trainingShowcaseVideo from "../../../attached_assets/Video 2_1749142276592.mp4";

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
        <title>365 Security Services - Leading Lebanese Security Company | Dekwaneh, Lebanon</title>
        <meta name="description" content="365 Security Services is Lebanon's trusted security company based in Dekwaneh. We provide professional manned security guards, secure cash transportation, security consultancy, and training across Beirut and all of Lebanon. 24/7 protection." />
        <meta name="keywords" content="Lebanese security services, security company Lebanon, security guards Lebanon, manned security Beirut, cash transportation Lebanon, security training Lebanon, security consultancy Lebanon, close protection Lebanon, Dekwaneh security, private security Lebanon, armed guards Lebanon, corporate security Beirut, event security Lebanon, 365 security services" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://365securityservices.company/" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="365 Security Services - Leading Lebanese Security Company" />
        <meta property="og:description" content="Lebanon's trusted security company. Professional manned security, cash transportation, security consultancy, and training across Beirut and Lebanon. 24/7 protection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://365securityservices.company/" />
        <meta property="og:site_name" content="365 Security Services" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="365 Security Services - Leading Lebanese Security Company" />
        <meta name="twitter:description" content="Lebanon's trusted security company. Manned security, cash transportation, consultancy, and training across Beirut and Lebanon." />

        {/* Local Business Schema - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SecurityService",
            "name": "365 Security Services",
            "alternateName": "365 Security",
            "description": "Leading Lebanese security company providing professional manned security guards, secure cash transportation, security consultancy, and training services across Beirut and Lebanon.",
            "url": "https://365securityservices.company",
            "logo": "https://365securityservices.company/favicon.png",
            "telephone": "+961-81-365365",
            "email": "info@365securityservices.company",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+961-81-365365",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+961-01-511365",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"]
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "3rd Floor, Boulevard Heights, Sin Fil Highway",
              "addressLocality": "Dekwaneh",
              "addressRegion": "Mount Lebanon",
              "addressCountry": "LB"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 33.8861258,
              "longitude": 35.5494234
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            ],
            "serviceArea": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "areaServed": [
              { "@type": "City", "name": "Beirut" },
              { "@type": "City", "name": "Dekwaneh" },
              { "@type": "Country", "name": "Lebanon" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Lebanese Security Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Manned Security Services in Lebanon",
                    "description": "Professional security guards, static guards, patrolling supervisors, close protection, and crowd control services across Beirut and Lebanon."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cash Transportation Services in Lebanon",
                    "description": "Secure cash transportation, ATM outsourcing, bank escort services, and valuable item transportation across Lebanon."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Security Consultancy in Lebanon",
                    "description": "Risk assessment, threat analysis, security surveys, and crisis management planning for Lebanese businesses and institutions."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Security Training in Lebanon",
                    "description": "Professional security training, threat assessment, emergency response, and certification programs in Lebanon."
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
        videoSrc={trainingShowcaseVideo}
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
