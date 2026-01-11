import { useState } from 'react';
import partnerLogo1 from '../assets/images/partner-images/partner-logo-1.svg';
import partnerLogo2 from '../assets/images/partner-images/partner-logo-2.svg';
import partnerLogo3 from '../assets/images/partner-images/partner-logo-3.svg';
import partnerLogo4 from '../assets/images/partner-images/partner-logo-4.svg';
import partnerLogo5 from '../assets/images/partner-images/partner-logo-5.svg';

const Partners = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Partner logos array
  const logos = [
    { id: 1, src: partnerLogo1, alt: 'Partner 1' },
    { id: 2, src: partnerLogo2, alt: 'Partner 2' },
    { id: 3, src: partnerLogo3, alt: 'Partner 3' },
    { id: 4, src: partnerLogo4, alt: 'Partner 4' },
    { id: 5, src: partnerLogo5, alt: 'Partner 5' },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section id="partners" className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Partners
        </h2>

        {/* Carousel Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex gap-8 md:gap-10 animate-scroll"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:p-[2px] hover:bg-gradient-to-r hover:from-ttw-blue hover:via-ttw-fuchsia hover:to-ttw-orange hover:rounded-lg"
              >
                <div className="w-80 h-48 md:w-96 md:h-56 bg-black hover:rounded-lg flex items-center justify-center p-4">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
