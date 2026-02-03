import { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const footerElement = document.querySelector('#footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  return (
    <footer
      id="footer"
      className={`
        bg-black text-white transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-24">
        {/* Desktop: 3 columns | Mobile: Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-32 lg:gap-40 items-center">

          {/* Left: Logo + Text side by side */}
          <div className="flex items-center gap-8 justify-center md:justify-start">
            <img
              src="/images/logo-transparent.png"
              alt="TMU Tech Week Logo"
              className="h-20 md:h-20 lg:h-24 w-auto flex-shrink-0"
            />
            <div className="flex flex-col font-notch text-white text-3xl md:text-3xl lg:text-4xl font-bold leading-none">
              <span>TMU</span>
              <span>Tech</span>
              <span>Week</span>
            </div>
          </div>

          {/* Center: Contact Us */}
          <div className="text-center space-y-5">
            <h3 className="text-white font-medium text-2xl md:text-2xl">Contact Us</h3>
            <a
              href="mailto:tmutechweek@gmail.com"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group relative text-lg md:text-lg"
            >
              <span className="relative">
                tmutechweek@gmail.com
                {/* Gradient underline */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
              <HiArrowUpRight className="w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right: Follow Us - Social Icons */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <h3 className="text-white font-medium text-2xl md:text-2xl">Follow Us</h3>
            <div className="flex gap-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/tmutechweek/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-8 h-8 md:w-9 md:h-9" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/tmu-tech-week"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-8 h-8 md:w-9 md:h-9" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-blue-500 via-fuchsia-500 to-orange-500 opacity-50"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6">
        <p className="text-white text-base md:text-sm text-center md:text-right">
          © 2026 TMU Tech Week
        </p>
      </div>
    </footer>
  );
};

export default Footer;
