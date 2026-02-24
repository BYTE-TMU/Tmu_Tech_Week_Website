import { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaUsers, FaChartLine, FaBolt, FaStar, FaCode, FaTrophy, FaBriefcase } from 'react-icons/fa';
import impactData from '../data/impactData.json';

// Map icon keys to react-icons components
const iconMap = {
    calendar: FaCalendarAlt,
    users: FaUsers,
    trending: FaChartLine,
    zap: FaBolt,
    star: FaStar,
    code: FaCode,
    trophy: FaTrophy,
    briefcase: FaBriefcase,
};

// Collage items — order is locked to match the designed masonry grid (no shuffle)
const collageItems = impactData.collageImages.map((item) => ({
    src: item.src,
    desktopSize: item.desktopSize,
    mobileSize: item.mobileSize,
    objectPosition: item.objectPosition || 'center',
}));

const ImpactReport = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [visibleImages, setVisibleImages] = useState({});
    const sectionRef = useRef(null);
    const imageRefs = useRef([]);

    // Section fade-in observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.05 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Individual image fade-in observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.getAttribute('data-index');
                        setVisibleImages((prev) => ({ ...prev, [index]: true }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        imageRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            imageRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [collageItems]);

    const StatIcon = ({ iconKey, className }) => {
        const Icon = iconMap[iconKey];
        return Icon ? <Icon className={className} /> : null;
    };

    return (
        <section ref={sectionRef} id="calendar" className="py-6 md:py-24 bg-black">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div
                    className={`text-center mb-6 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <div className="relative inline-block mb-2 md:mb-6">
                        <h2 className="text-2xl md:text-5xl font-bold font-headline">Impact Report</h2>
                        <div className="absolute left-0 right-0 bottom-[-4px] md:bottom-[-8px] h-0.5 md:h-1 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue"></div>
                    </div>
                    <p className="text-white/60 font-text text-base md:text-lg mt-3 md:mt-4 max-w-2xl mx-auto">
                        A look back at what the TMU tech community accomplished together.
                    </p>
                </div>

                {/* Stats Grid */}
                <div
                    className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    {impactData.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative p-[1.5px] rounded-xl bg-gradient-to-br from-ttw-orange/60 via-ttw-fuchsia/60 to-ttw-blue/60 hover:from-ttw-orange hover:via-ttw-fuchsia hover:to-ttw-blue transition-all duration-500"
                            style={{ animation: isVisible ? `fadeSlideIn 0.6s ease-out ${index * 120}ms both` : 'none' }}
                        >
                            <div className="bg-black rounded-xl p-4 md:p-6 text-center h-full flex flex-col items-center justify-center gap-2 md:gap-3">
                                <StatIcon
                                    iconKey={stat.icon}
                                    className="w-6 h-6 md:w-8 md:h-8 text-ttw-fuchsia group-hover:scale-110 transition-transform duration-300"
                                />
                                <span className="text-3xl md:text-5xl font-bold font-headline text-white">
                                    {stat.value}
                                </span>
                                <span className="text-sm md:text-base font-text text-white/60">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Highlights */}
                <div
                    className={`mb-8 md:mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h3 className="text-xl md:text-3xl font-bold font-headline text-white mb-4 md:mb-8 text-center">
                        Week Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                        {impactData.highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="relative flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                                style={{ animation: isVisible ? `fadeSlideIn 0.6s ease-out ${400 + index * 100}ms both` : 'none' }}
                            >
                                {/* Gradient left accent */}
                                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-ttw-orange via-ttw-fuchsia to-ttw-blue"></div>
                                <div className="pl-2">
                                    <StatIcon
                                        iconKey={highlight.icon}
                                        className="w-5 h-5 md:w-6 md:h-6 text-ttw-orange flex-shrink-0 mt-0.5"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base md:text-lg font-bold font-headline text-white mb-1">
                                        {highlight.title}
                                    </h4>
                                    <p className="text-sm md:text-base font-text text-white/60 leading-relaxed">
                                        {highlight.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Clubs Carousel */}
                <div
                    className={`mb-8 md:mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h3 className="text-xl md:text-3xl font-bold font-headline text-white mb-4 md:mb-8 text-center">
                        Participating Clubs & Organizations
                    </h3>
                    <div className="relative overflow-hidden">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent z-10"></div>

                        {/* Scrolling track */}
                        <div className="flex animate-scroll-clubs">
                            {/* Triple the items for seamless infinite scroll */}
                            {[...impactData.clubs, ...impactData.clubs, ...impactData.clubs].map((club, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 mx-3 md:mx-5 group"
                                >
                                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-300 flex items-center justify-center p-2">
                                        <img
                                            src={`${import.meta.env.BASE_URL}${club.logo.replace(/^\//, '')}`}
                                            alt={club.name}
                                            className="w-full h-full object-contain rounded-lg"
                                            onError={(e) => {
                                                e.currentTarget.parentElement.innerHTML = `<span class="text-white/50 font-text text-xs text-center">${club.name}</span>`;
                                            }}
                                        />
                                    </div>
                                    <p className="text-center text-xs md:text-sm font-text text-white/50 mt-2 max-w-[80px] md:max-w-[112px] truncate">
                                        {club.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Photo Collage */}
                <div className="mb-8 md:mb-16">
                    <h3 className="text-xl md:text-3xl font-bold font-headline text-white mb-4 md:mb-8 text-center">
                        Moments from the Week
                    </h3>

                    {/* Collage: 2×2 landscapes on left + portrait on right */}
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Left: 2×2 grid of landscapes */}
                        <div className="grid grid-cols-2 gap-3 flex-1">
                            <div className="aspect-[3/2] rounded-xl overflow-hidden">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/collage/real/dsc03984.jpg`}
                                    alt="Event moment"
                                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="aspect-[3/2] rounded-xl overflow-hidden">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/collage/real/impact_dsc03897.jpg`}
                                    alt="Event moment"
                                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="aspect-[3/2] rounded-xl overflow-hidden">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/collage/real/impact_dsc04031.jpg`}
                                    alt="Event moment"
                                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="aspect-[3/2] rounded-xl overflow-hidden">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/collage/real/impact_img1679.jpg`}
                                    alt="Event moment"
                                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        {/* Right: portrait photo */}
                        <div className="md:w-[33%] aspect-[2/3] md:aspect-auto rounded-xl overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}images/collage/real/impact_portrait.png`}
                                alt="Event portrait"
                                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Closing Message */}
                <div
                    className={`text-center py-6 md:py-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <p className="text-lg md:text-2xl font-text text-white/70 leading-relaxed max-w-3xl mx-auto">
                        {impactData.closingMessage}
                    </p>
                    <div className="mt-4 md:mt-6 h-0.5 w-24 mx-auto bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default ImpactReport;
