import { useState, useEffect, useRef } from 'react';
import partnerLogo1 from '../assets/images/partner-images/partner-logo-1.svg';
import partnerLogo2 from '../assets/images/partner-images/partner-logo-2.svg';
import partnerLogo3 from '../assets/images/partner-images/partner-logo-3.svg';
import partnerLogo4 from '../assets/images/partner-images/partner-logo-4.svg';
import partnerLogo5 from '../assets/images/partner-images/partner-logo-5.svg';

const Partners = () => {
  // Toggle this to show/hide partners carousel
  const showPartners = false; // Set to true when partners are ready to display

  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.45 }
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

  // Partner logos array
  const logos = [
    { id: 1, src: partnerLogo1, alt: 'Partner 1' },
    { id: 2, src: partnerLogo2, alt: 'Partner 2' },
    { id: 3, src: partnerLogo3, alt: 'Partner 3' },
    { id: 4, src: partnerLogo4, alt: 'Partner 4' },
    { id: 5, src: partnerLogo5, alt: 'Partner 5' },
  ];

  const placeholderPartners = [
    { name: 'Faculty of Science', tier: 'Gold', logo: `${import.meta.env.BASE_URL}images/TMU_logo.png` },
    { name: 'Slalom', tier: 'Silver', logo: `${import.meta.env.BASE_URL}images/slalom-logo-blue.png` },
    { name: 'Shopify', tier: 'Silver', logo: `${import.meta.env.BASE_URL}images/shopify.svg` },
    { name: 'Backboard.ai', tier: 'Silver', logo: `${import.meta.env.BASE_URL}images/backboard_io_logo.jpg`, logoClass: 'w-28 h-16 rounded-xl' },
    { name: 'DMZ', tier: 'Bronze', logo: `${import.meta.env.BASE_URL}images/DMZ.jpg`, logoClass: 'w-28 h-16 rounded-xl' },
    { name: 'Nodalli', tier: 'Bronze', logo: `${import.meta.env.BASE_URL}images/nodalli.png`, logoClass: 'w-32 h-20 rounded-xl' },
    { name: 'Career and Co-op Office', tier: 'Bronze', logo: `${import.meta.env.BASE_URL}images/career and co-op TMU.jpg`, logoClass: 'w-28 h-16 rounded-xl' },
    { name: 'Poulet Rouge', tier: 'Bronze', logo: `${import.meta.env.BASE_URL}images/Poulet Rouge.png`, logoClass: 'w-36 h-24' },
      { name: 'BeaverKeys', tier: 'Bronze', logo: `${import.meta.env.BASE_URL}images/BeaverKey.jpg`, logoClass: 'w-36 h-24' },
      { name: 'Avznailz', tier: 'Bronze', logo: `${import.meta.env.BASE_URL}images/Avz_nails.jpeg`, logoClass: 'w-32 h-20 rounded-xl' },
  ];

  const goldPartners = placeholderPartners.filter((partner) => partner.tier === 'Gold');
  const silverPartners = placeholderPartners.filter((partner) => partner.tier === 'Silver');
  const otherPartners = placeholderPartners.filter((partner) => !['Gold', 'Silver'].includes(partner.tier));

  const getTierColor = (tier) => {
    if (tier === 'Gold') return 'text-[#D4AF37]';
    if (tier === 'Silver') return 'text-[#C0C0C0]';
    if (tier === 'Bronze') return 'text-[#B87333]';
    return 'text-white/70';
  };

  return (
    <section id="partners" className="bg-black py-24 overflow-hidden">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 2));
            }
          }

          .animate-scroll {
            animation: scroll 45s linear infinite;
            will-change: transform;
          }

          .animate-scroll.paused {
            animation-play-state: paused;
          }
        `}
      </style>
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {/* Title */}
        <h2 className="font-headline text-2xl md:text-5xl font-bold text-center mb-12 text-white relative inline-block w-full">
          <span className="relative inline-block">
            Partners
            <span className="absolute left-0 right-0 bottom-[-8px] h-1 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue"></span>
          </span>
        </h2>

        {showPartners ? (
          /* Carousel Container */
          <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex">
              <div
                className={`flex gap-6 md:gap-10 ${isPaused ? 'animate-scroll paused' : 'animate-scroll'
                  }`}
              >
                {/* Multiple sets of logos for seamless infinite scroll */}
                {[...Array(6)].map((_, setIndex) =>
                  logos.map((logo) => (
                    <div
                      key={`set-${setIndex}-${logo.id}`}
                      className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:p-[3px] hover:bg-gradient-to-r hover:from-ttw-blue hover:via-ttw-fuchsia hover:to-ttw-orange hover:rounded-xl"
                    >
                      <div className="w-80 h-50 md:w-96 md:h-56 bg-[#2a2a2a] hover:rounded-lg rounded-lg flex items-center justify-center px-4 py-2">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder Partners */
          <div className="space-y-10 md:space-y-14">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {goldPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="group relative p-[2px] rounded-2xl w-full max-w-xs transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(255,122,80,0.35),0_0_24px_rgba(217,70,239,0.25),0_2px_0_rgba(255,255,255,0.04)_inset]"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-ttw-orange/70 via-ttw-fuchsia/70 to-ttw-blue/70" />
                  <div className="relative bg-black rounded-2xl px-6 py-8 h-full flex flex-col items-center justify-center text-center">
                    {partner.logo ? (
                      <div className={`${partner.logoClass || 'w-28 h-16 rounded-lg'} mb-4 overflow-hidden`}>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <span className="font-headline text-lg text-white/80">
                          {partner.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <p className="font-headline text-xl md:text-2xl text-white">
                      {partner.name}
                    </p>
                    <p className={`font-text text-sm md:text-base mt-2 ${getTierColor(partner.tier)}`}>
                      {partner.tier}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {silverPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="group relative p-[2px] rounded-2xl w-full max-w-xs transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(255,122,80,0.35),0_0_24px_rgba(217,70,239,0.25),0_2px_0_rgba(255,255,255,0.04)_inset]"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-ttw-orange/70 via-ttw-fuchsia/70 to-ttw-blue/70" />
                  <div className="relative bg-black rounded-2xl px-6 py-8 h-full flex flex-col items-center justify-center text-center">
                    {partner.logo ? (
                      <div className={`${partner.logoClass || 'w-28 h-16 rounded-lg'} mb-4 overflow-hidden`}>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <span className="font-headline text-lg text-white/80">
                          {partner.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <p className="font-headline text-xl md:text-2xl text-white">
                      {partner.name}
                    </p>
                    <p className={`font-text text-sm md:text-base mt-2 ${getTierColor(partner.tier)}`}>
                      {partner.tier}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {otherPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="group relative p-[2px] rounded-2xl w-full max-w-xs transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(255,122,80,0.35),0_0_24px_rgba(217,70,239,0.25),0_2px_0_rgba(255,255,255,0.04)_inset]"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-ttw-orange/70 via-ttw-fuchsia/70 to-ttw-blue/70" />
                  <div className="relative bg-black rounded-2xl px-6 py-8 h-full flex flex-col items-center justify-center text-center">
                    {partner.logo ? (
                      <div className={`${partner.logoClass || 'w-28 h-16 rounded-lg'} mb-4 overflow-hidden`}>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <span className="font-headline text-lg text-white/80">
                          {partner.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <p className="font-headline text-xl md:text-2xl text-white">
                      {partner.name}
                    </p>
                    <p className={`font-text text-sm md:text-base mt-2 ${getTierColor(partner.tier)}`}>
                      {partner.tier}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
