import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Calendar', href: '#calendar' },
    { name: 'Partners', href: '#partners' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.9);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-colors duration-300
          bg-black
          ${!isScrolled ? 'md:bg-transparent' : ''}
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Left side */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-shrink-0"
            >
              <img
                src="/images/logo-white.png"
                alt="TMU Tech Week"
                className="h-8 md:h-10 w-auto"
              />
            </a>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right side - Social Icons (Desktop) + Mobile (Social + Hamburger) */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/tmutechweek/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/tmu-tech-week"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>

              {/* Hamburger Menu - Mobile only */}
              <button
                className="md:hidden text-white p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose className="w-6 h-6" />
                ) : (
                  <RxHamburgerMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Dropdown from header, left-aligned links */}
        <div className={`md:hidden bg-black border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
          <nav className="px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block py-3 text-lg text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Social Media Links in Mobile Menu */}
            <div className="flex items-center gap-6 pt-6 mt-6 border-t border-white/10">
              <a
                href="https://www.instagram.com/tmutechweek/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/tmu-tech-week"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
