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
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12 text-white relative inline-block w-full">
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
          /* Coming Soon Message */
          <div className="flex items-center justify-center py-16">
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue">
              <div className="bg-black rounded-2xl px-12 py-8">
                <p className="font-headline text-2xl md:text-4xl font-bold text-white text-center">
                  Coming Soon
                </p>
                <p className="font-text text-base md:text-lg text-white/70 text-center mt-3">
                  Stay tuned for our amazing partners!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
