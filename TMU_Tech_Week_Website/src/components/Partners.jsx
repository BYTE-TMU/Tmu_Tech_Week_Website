import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
    { id: 1, name: 'Partner 1' },
    { id: 2, name: 'Partner 2' },
    { id: 3, name: 'Partner 3' },
    { id: 4, name: 'Partner 4' },
    { id: 5, name: 'Partner 5' },
];

const Partners = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="partners" className="relative py-32" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
                        Partners
                    </h2>
                </motion.div>

                {/* Partners Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="aspect-square glass rounded-2xl flex flex-col items-center justify-center p-6 group cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all">
                                <span className="text-2xl font-bold text-white/60 group-hover:text-white transition-colors">
                                    {partner.name.charAt(0)}
                                </span>
                            </div>
                            <span className="text-white/60 text-sm text-center group-hover:text-white transition-colors">
                                Logo
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
