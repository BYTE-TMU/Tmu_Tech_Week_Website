import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Partners', href: '#partners' },
        { name: 'Calendar', href: '#calendar' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact Us', href: '#contact' },
    ];

    return (
        <footer className="relative py-16 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 items-start">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col leading-tight">
                            <span className="text-2xl font-bold text-white">TMU</span>
                            <span className="text-2xl font-bold text-white">Tech</span>
                            <span className="text-2xl font-bold text-white">Week</span>
                        </div>
                        <p className="text-white/50 text-sm">
                            © 2026 TMU Tech Week
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="text-white/60 hover:text-white transition-colors text-sm"
                                whileHover={{ x: 5 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Contact & Social */}
                    <div className="flex flex-col gap-6">
                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
                            <a
                                href="mailto:tmutechweek@gmail.com"
                                className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                tmutechweek@gmail.com
                            </a>
                        </div>

                        {/* Social */}
                        <div>
                            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                <motion.a
                                    href="#"
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Instagram className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
