import { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet";

// Fix Leaflet icon issue
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <Helmet>
        <title>Contact Us | 365 Security Services</title>
        <meta name="description" content="Contact 365 Security Services for comprehensive security solutions. Our team of experts is ready to help with your security needs." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-orbitron">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a87c64] to-gray-300">
              Contact Us
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-rajdhani">
            Reach out to us to discuss your security needs. Our team of experts is ready to provide tailored security solutions for your organization.
          </p>
        </motion.div>

        {/* Contact Form and Information in a smaller layout */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white font-rajdhani text-center">Find Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Form */}
            <motion.div 
              className="bg-dark-800 p-5 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-3 text-white font-rajdhani">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name <span className="text-[#a87c64]">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-dark-900 border-dark-700 text-gray-200 focus:border-[#a87c64] focus:ring-[#a87c64]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email <span className="text-[#a87c64]">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-dark-900 border-dark-700 text-gray-200 focus:border-[#a87c64] focus:ring-[#a87c64]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-dark-900 border-dark-700 text-gray-200 focus:border-[#a87c64] focus:ring-[#a87c64]"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-dark-900 border-dark-700 text-gray-200 focus:border-[#a87c64] focus:ring-[#a87c64]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message <span className="text-[#a87c64]">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-dark-900 border-dark-700 text-gray-200 focus:border-[#a87c64] focus:ring-[#a87c64] w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={cn(
                    "w-full py-3 rounded-full bg-[#a87c64] hover:bg-[#97684f] text-dark-900 font-semibold text-lg",
                    formStatus === "submitting" && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </Button>

                {formStatus === "success" && (
                  <motion.div 
                    className="text-green-400 mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Your message has been sent successfully! We'll get back to you soon.
                  </motion.div>
                )}

                {formStatus === "error" && (
                  <div className="text-red-400 mt-4 text-center">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="bg-dark-800 p-5 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-bold mb-3 text-white font-rajdhani">Contact Information</h3>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a87c64]/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-200 mb-1">Office Address</h3>
                    <p className="text-gray-400 text-sm">
                      3rd Floor, Boulevard Heights<br />
                      Sin Fil Highway<br />
                      Lebanon
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#a87c64]/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-200 mb-1">Phone Number</h3>
                    <p className="text-gray-400 text-sm">+961 01 511 365</p>
                    <p className="text-gray-400 text-sm">+961 81 365 365</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#a87c64]/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-200 mb-1">Email Address</h3>
                    <p className="text-gray-400 text-sm">info@365securityservices.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#a87c64]/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a87c64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-200 mb-1">Working Hours</h3>
                    <p className="text-gray-400 text-sm">Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-semibold text-gray-200 mb-2">Connect With Us</h3>
                  <div className="flex space-x-3">
                    <a 
                      href="https://www.linkedin.com/company/365-security-services" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-[#a87c64]/10 hover:bg-[#a87c64]/20 p-2 rounded-full transition duration-300"
                    >
                      <svg className="w-4 h-4 text-[#a87c64]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/365securityservices/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-[#a87c64]/10 hover:bg-[#a87c64]/20 p-2 rounded-full transition duration-300"
                    >
                      <svg className="w-4 h-4 text-[#a87c64]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full Width Map Section */}
        <motion.div 
          className="overflow-hidden shadow-xl h-[500px] -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MapContainer 
            center={[33.8938, 35.5018]} // Coordinates for Sin El Fil, Lebanon
            zoom={15} 
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Monochrome map style
            />
            <Marker position={[33.8938, 35.5018]}>
              <Popup>
                365 Security Services<br />
                3rd Floor, Boulevard Heights<br />
                Sin Fil Highway, Lebanon
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </div>
  );
}