import { motion } from "framer-motion";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string | any; // Allow imported images
  imageAlt: string;
}

export function ServiceCard({ title, description, imageSrc, imageAlt }: ServiceCardProps) {
  // Convert the service title to a URL-friendly format for the service detail page
  const serviceSlug = title.toLowerCase().replace(/\s+/g, '-');
  
  // Convert newlines in description to paragraphs
  const paragraphs = description.split('\n\n');
  
  return (
    <motion.div 
      className="bg-dark-900 rounded-xl overflow-hidden border border-[#a87c64]/20 group h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(168, 124, 100, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden h-52">
        <motion.img 
          src={imageSrc} 
          alt={imageAlt} 
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link 
            to={`/services/${serviceSlug}`}
            className="inline-block"
          >
            <h3 className="text-xl font-bold text-[#a87c64] font-rajdhani group-hover:text-white transition-colors duration-300 hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-gray-300 mb-6 overflow-auto flex-grow" style={{minHeight: "150px"}}>
          {paragraphs.map((paragraph, index) => (
            // Only apply special styling to the first paragraph of Security Training
            index === 0 && title === "Security Training" ? (
              <p key={index} className="text-[#a87c64] font-bold text-lg mb-2">{paragraph}</p>
            ) : (
              <p key={index} className={index > 0 ? "mt-2" : ""}>{paragraph}</p>
            )
          ))}
        </div>
        <div className="mt-auto">
          <Link 
            to={`/services/${serviceSlug}`}
            className="inline-block px-5 py-2 rounded-full bg-transparent border border-[#a87c64] text-[#a87c64] font-rajdhani font-semibold hover:bg-[#a87c64]/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-[#a87c64]/20"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
