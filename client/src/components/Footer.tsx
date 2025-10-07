import { Logo } from "./Logo";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-dark-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Logo size="x-large" />
            </div>
            <p className="text-gray-400 mb-6">
              Providing comprehensive security solutions with unmatched precision and reliability.
            </p>
            <div className="flex space-x-6 mt-2">
              <a 
                href="https://www.linkedin.com/company/365-security-services" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a87c64] hover:text-[#b89274] transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/365securityservices/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a87c64] hover:text-[#b89274] transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white font-rajdhani mb-6">Quick Links</h4>
            <ul className="space-y-3 mb-6">
              <li><a href="#home" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> Home</a></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> About Us</Link></li>
              <li><a href="#expertise" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> Areas of Expertise</a></li>
            </ul>
            
            <Link href="/contact" className="inline-block w-full">
              <button className="w-full bg-gradient-to-r from-[#a87c64] to-[#b89274] text-white font-rajdhani font-bold py-3 px-6 rounded-lg hover:from-[#b89274] hover:to-[#c9a385] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <i className="fas fa-phone mr-2"></i>
                Contact Us
              </button>
            </Link>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white font-rajdhani mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> Manned Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> Security Consultancy</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> Cash Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#a87c64] transition duration-300 flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-[#a87c64]"></i> Security Training</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white font-rajdhani mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and security insights.
            </p>
            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input type="email" placeholder="Your Email" className="flex-grow px-4 py-2 bg-dark-800 border border-[#a87c64]/30 rounded-l-lg focus:outline-none focus:border-[#a87c64] text-white" />
                <button type="submit" className="px-4 py-2 bg-[#a87c64] text-dark-900 font-rajdhani font-semibold rounded-r-lg hover:opacity-90 transition duration-300">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </div>
        
        <div className="border-t border-[#a87c64]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} 365 Security Services. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#a87c64] transition duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#a87c64] transition duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-[#a87c64] transition duration-300 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
