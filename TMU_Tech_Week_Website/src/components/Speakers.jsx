import { useState, useEffect, useRef } from 'react';
import speakers from '../data/speakers.json';
import defaultAvatar from '../assets/images/speakers/default-avatar.svg';

const Speakers = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);
  const duration = 100000; // milliseconds (45s) — faster than 70s

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

  useEffect(() => {
    if (!isVisible) return;
    let rafId;
    const container = containerRef.current;
    const track = trackRef.current;

    const startScroll = () => {
      if (!container || !track) return;
      // cancel any running animation before starting
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const max = track.scrollWidth - container.clientWidth;
      if (max <= 1) return; // nothing to scroll
      const startLeft = container.scrollLeft;
      if (startLeft >= max - 1) return; // already at end
      startTimeRef.current = performance.now();
      const distance = max - startLeft;
      const thisDuration = duration * (distance / max);

      const step = (now) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / thisDuration, 1);
        container.scrollLeft = startLeft + distance * progress;
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
          animRef.current = rafId;
        }
      };

      rafId = requestAnimationFrame(step);
      animRef.current = rafId;
    };

    // start once, and also restart on resize so scroll always spans full viewport
    if (!isPaused) startScroll();
    window.addEventListener('resize', startScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', startScroll);
    };
  }, [isVisible, isPaused]);

  return (
    <section id="speakers" className="bg-black py-24 overflow-hidden">

      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12 text-white relative w-full leading-tight">
          <span className="relative inline-block max-w-xl mx-auto text-center whitespace-normal">
            Speakers
            <span className="absolute left-0 right-0 bottom-[-6px] h-0.5 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue"></span>
          </span>
        </h2>

        <div
          ref={containerRef}
          className="relative w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <style>{`
            @keyframes scrollSpeakers {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50%)); }
            }
            .animate-scroll-speakers { animation: scrollSpeakers 200s linear infinite; will-change: transform; }
            .animate-scroll-speakers.paused { animation-play-state: paused; }
          `}</style>

          <div ref={trackRef} className={`flex gap-6 md:gap-8 py-2 px-6 md:px-12 ${isPaused ? 'animate-scroll-speakers paused' : 'animate-scroll-speakers'}`}>
            {[...Array(6)].map((_, setIndex) =>
              speakers.map((sp, i) => (
                <div key={`set-${setIndex}-${i}`} className="flex-shrink-0 transition-all duration-300 hover:scale-105">
                  <div className="w-72 md:w-80 h-32 md:h-40 bg-[#2a2a2a] rounded-xl p-4 flex items-center gap-4 md:gap-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 bg-[#1f1f1f]">
                      {sp.linkedin_url ? (
                        <a href={sp.linkedin_url} target="_blank" rel="noreferrer">
                          <img src={sp.image || defaultAvatar} alt={sp.speaker_name} className="w-full h-full object-cover" />
                        </a>
                      ) : (
                        <img src={sp.image || defaultAvatar} alt={sp.speaker_name} className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="text-white min-w-0">
                      {sp.linkedin_url ? (
                        <a href={sp.linkedin_url} target="_blank" rel="noreferrer" className="block">
                          <div className="font-semibold text-sm md:text-base truncate">{sp.speaker_name}</div>
                        </a>
                      ) : (
                        <div className="font-semibold text-sm md:text-base truncate">{sp.speaker_name}</div>
                      )}

                      <div className="mt-0.5 text-transparent bg-clip-text bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue font-bold md:text-lg truncate">{sp.organization}</div>
                      <div className="text-sm text-gray-300 mt-1 truncate">{sp.title}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">Tip: If you added images, set the `image` property in <code>src/data/speakers.json</code> to the public path (example: <code>/images/speakers/ashar.jpg</code>) or a public URL. The image and speaker name will link to LinkedIn when a `linkedin_url` is present.</p>
      </div>
    </section>
  );
};

export default Speakers;
