import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

// Import images
import headerLogo from '../assets/images/header_logo_alt.png'; // Using the alt logo (Group_9_1081)
import iconInstagram from '../assets/images/icon_instagram.png';
import iconLinkedin from '../assets/images/icon_linkedin.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Calendar', href: '#calendar' },
        { name: 'Partners', href: '#partners' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact Us', href: '#contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 px-8 py-8"
        >
            <nav className="max-w-[1600px] mx-auto flex items-center justify-between relative">
                {/* Site Logo (Left) */}
                <motion.a
                    href="#"
                    className="flex-shrink-0 relative z-10"
                    whileHover={{ scale: 1.05 }}
                >
                    <img
                        src={headerLogo}
                        alt="TMU Tech Week"
                        className="h-10 w-auto object-contain"
                    />
                </motion.a>

                {/* Desktop Navigation (Absolute Center) */}
                <div className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="text-white hover:text-purple-400 transition-colors text-sm font-medium tracking-wide"
                            whileHover={{ y: -2 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                {/* Social Icons (Far Right) */}
                <div className="hidden md:flex items-center gap-6 relative z-10">
                    <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={iconInstagram} alt="Instagram" className="w-5 h-5 opacity-90 hover:opacity-100" />
                    </motion.a>
                    <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={iconLinkedin} alt="LinkedIn" className="w-5 h-5 opacity-90 hover:opacity-100" />
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 relative z-10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="md:hidden fixed inset-0 bg-[#050508] z-40 flex flex-col items-center justify-center gap-8"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white text-2xl font-light"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className="flex gap-8 mt-8">
                        <a href="#" className="opacity-80 hover:opacity-100">
                            <img src={iconInstagram} alt="Instagram" className="w-8 h-8" />
                        </a>
                        <a href="#" className="opacity-80 hover:opacity-100">
                            <img src={iconLinkedin} alt="LinkedIn" className="w-8 h-8" />
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};

export default Header;
