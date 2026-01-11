import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-square rounded-3xl overflow-hidden glass">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-cyan-500/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <span className="text-6xl md:text-8xl font-bold gradient-text">TTW</span>
                                    <p className="mt-4 text-white/60">Event Poster/Logo</p>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl" />
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">
                            What is TMU Tech Week?
                        </h2>
                        <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                            <p>
                                TMU Tech Week is a campus-wide celebration of
                                technology, innovation, and creativity. It brings
                                together <span className="text-white font-semibold">student clubs, startups, and industry
                                    professionals</span> for a week of hands-on events,
                                hackathons, showcases, and networking.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
