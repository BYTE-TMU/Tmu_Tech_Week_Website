import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Send } from 'lucide-react';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
            {/* Background Wave */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/20" />
                <svg
                    className="absolute bottom-0 left-0 w-full h-auto"
                    viewBox="0 0 1440 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        fill="url(#wave-gradient)"
                        fillOpacity="0.1"
                    />
                    <defs>
                        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
                            Let's connect.
                        </h2>
                        <p className="text-lg text-white/70 leading-relaxed mb-8">
                            Have a question, an idea, or want to get
                            involved with TMU Tech Week? We'd love
                            to hear from you. Whether you're a
                            student, organization, or industry
                            partner, this is the place to start.
                        </p>

                        {/* Email */}
                        <motion.a
                            href="mailto:tmutechweek@gmail.com"
                            className="inline-flex items-center gap-3 text-white hover:text-purple-400 transition-colors group"
                            whileHover={{ x: 5 }}
                        >
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-medium">tmutechweek@gmail.com</span>
                        </motion.a>
                    </motion.div>

                    {/* Right - Contact Form or Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="glass rounded-3xl p-8 relative overflow-hidden">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>

                                <form className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Your Message"
                                            rows={4}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
