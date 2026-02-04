import { useState, useEffect, useRef } from 'react';
import speakers from '../data/speakers.json';
import defaultAvatar from '../assets/images/speakers/default-avatar.svg';

const Speakers = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);





  return (
    <section id="speakers" className="bg-black py-24 overflow-hidden">

      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12 text-white relative w-full leading-tight">
          <span className="relative inline-block max-w-xl mx-auto text-center whitespace-normal">
            Speakers
            <span className="absolute left-0 right-0 bottom-[-8px] h-1 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue"></span>
          </span>
        </h2>

        <div
          ref={containerRef}
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <style>
            {`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-100% / 2)); }
              }

              .animate-scroll {
                animation: scroll 175s linear infinite;
                will-change: transform;
              }

              .animate-scroll.paused {
                animation-play-state: paused;
              }
            `}
          </style>

          <div className="flex">
            <div className={`flex gap-6 md:gap-10 py-2 ${isPaused ? 'animate-scroll paused' : 'animate-scroll'}`}>
              {[...Array(6)].map((_, setIndex) =>
                speakers.map((sp, i) => (
                  <div key={`set-${setIndex}-${i}`} className="flex-shrink-0 transition-all duration-300 hover:scale-105">
                    <div className="w-72 md:w-80 h-40 md:h-48 bg-[#2a2a2a] rounded-xl p-4 flex items-center gap-4 md:gap-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 bg-[#1f1f1f]">
                        {sp.linkedin_url ? (
                          <a href={sp.linkedin_url} target="_blank" rel="noreferrer">
                            <img src={sp.image ? `${import.meta.env.BASE_URL}${sp.image.replace(/^\//, '')}` : defaultAvatar} alt={sp.speaker_name} className="w-full h-full object-cover" />
                          </a>
                        ) : (
                          <img src={sp.image ? `${import.meta.env.BASE_URL}${sp.image.replace(/^\//, '')}` : defaultAvatar} alt={sp.speaker_name} className="w-full h-full object-cover" />
                        )}
                      </div>

                      <div className="text-white min-w-0">
                        {sp.linkedin_url ? (
                          <a href={sp.linkedin_url} target="_blank" rel="noreferrer" className="block">
                            <div className="font-semibold text-sm md:text-base whitespace-normal break-words">{sp.speaker_name}</div>
                          </a>
                        ) : (
                          <div className="font-semibold text-sm md:text-base whitespace-normal break-words">{sp.speaker_name}</div>
                        )}

                        <div className="mt-0.5 text-transparent bg-clip-text bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue font-bold md:text-lg whitespace-normal break-words">{sp.organization}</div>
                        <div className="text-sm text-gray-300 mt-1 whitespace-normal">{sp.title}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Speakers;
