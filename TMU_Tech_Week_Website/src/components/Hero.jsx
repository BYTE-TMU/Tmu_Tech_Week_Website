import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Import assets
import heroLogoGraphic from '../assets/images/hero_logo_graphic.png';
import heroBeamFull from '../assets/images/hero_beam_full.png';
import heroStarPoint from '../assets/images/hero_star_point.png';
import heroBackground from '../assets/images/background.png';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center pt-32 pb-16 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* 1. Gradient Behind Logo (Top Center) */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vh] h-[60vh] md:w-[800px] md:h-[800px] bg-gradient-radial from-orange-500/20 via-purple-900/20 to-transparent blur-[100px] z-0 pointer-events-none mix-blend-screen" />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4">

                {/* Main Logo Composition */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-6 mb-12 relative"
                >
                    {/* Logo Graphic */}
                    <img
                        src={heroLogoGraphic}
                        alt="TMU Tech Week Logo"
                        className="w-20 md:w-28 h-auto object-contain drop-shadow-[0_0_25px_rgba(236,72,153,0.4)]"
                    />

                    {/* Logo Text */}
                    <div className="flex flex-col justify-center leading-[0.9] text-left">
                        <span className="text-5xl md:text-7xl font-bold text-white tracking-tight font-sans">TMU</span>
                        <span className="text-5xl md:text-7xl font-bold text-white tracking-tight font-sans">Tech</span>
                        <span className="text-5xl md:text-7xl font-bold text-white tracking-tight font-sans">Week</span>
                    </div>
                </motion.div>

                {/* Tagline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl md:text-4xl font-normal text-white mb-2 tracking-wide text-center"
                >
                    Innovation lives here.
                </motion.h1>

                {/* Star & Beam Section */}
                <div className="relative w-full flex flex-col items-center mt-8 md:mt-12 h-[50vh] min-h-[400px]">

                    {/* The Star Point (Diamond) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative z-20 mb-[-10px] md:mb-[-20px]"
                    >
                        <img
                            src={heroStarPoint}
                            alt="Star"
                            className="w-16 md:w-24 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                        />
                    </motion.div>

                    {/* The Beam Graphic (Going Down) */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative z-10 w-full max-w-6xl flex justify-center"
                    >
                        <img
                            src={heroBeamFull}
                            alt="Innovation Beam"
                            className="w-full h-auto object-cover opacity-80 mix-blend-screen"
                            style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                        />
                    </motion.div>

                    {/* "Do you?" Text - Inside Beam */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute top-[25%] md:top-[20%] text-center z-30"
                    >
                        <h2 className="text-3xl md:text-5xl font-medium text-white drop-shadow-md">
                            Do you?
                        </h2>
                    </motion.div>
                </div>

                {/* Bottom Content (Dates, Button) */}
                <div className="absolute bottom-16 md:bottom-12 flex flex-col items-center gap-6 z-40 w-full">
                    {/* Dates */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-center space-y-1"
                    >
                        <p className="text-2xl md:text-3xl font-bold text-white">February 15–22, 2026</p>
                        <p className="text-lg md:text-xl font-light text-white/80">Toronto Metropolitan University</p>
                    </motion.div>

                    {/* Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <motion.a
                            href="#calendar"
                            className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <div className="relative px-8 py-3 bg-black rounded-[11px] flex items-center gap-2">
                                <span className="text-lg text-white font-medium">View the Calendar</span>
                            </div>
                        </motion.a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="mt-4 flex flex-col items-center gap-2 text-white/50"
                    >
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
                    </motion.div>
                </div>

            </div>

            {/* 2. Fade Out at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black via-black/90 to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default Hero;
