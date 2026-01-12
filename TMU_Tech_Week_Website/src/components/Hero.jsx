import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const [isTopVisible, setIsTopVisible] = useState(false);
  const [isStarVisible, setIsStarVisible] = useState(false);
  const [isDatesVisible, setIsDatesVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  const topRef = useRef(null);
  const starRef = useRef(null);
  const datesRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const topObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsTopVisible(true);
    }, observerOptions);

    const starObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsStarVisible(true);
    }, observerOptions);

    const datesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsDatesVisible(true);
    }, observerOptions);

    const buttonObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsButtonVisible(true);
    }, observerOptions);

    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsScrollVisible(true);
    }, observerOptions);

    if (topRef.current) topObserver.observe(topRef.current);
    if (starRef.current) starObserver.observe(starRef.current);
    if (datesRef.current) datesObserver.observe(datesRef.current);
    if (buttonRef.current) buttonObserver.observe(buttonRef.current);
    if (scrollRef.current) scrollObserver.observe(scrollRef.current);

    return () => {
      if (topRef.current) topObserver.unobserve(topRef.current);
      if (starRef.current) starObserver.unobserve(starRef.current);
      if (datesRef.current) datesObserver.unobserve(datesRef.current);
      if (buttonRef.current) buttonObserver.unobserve(buttonRef.current);
      if (scrollRef.current) scrollObserver.unobserve(scrollRef.current);
    };
  }, []);

  return (
    <section className="relative h-[200vh] bg-black flex flex-col items-center justify-between px-4 py-8 overflow-hidden">
      <div className="absolute top-[-43%] left-[49%] -translate-x-1/2 w-[100vw] h-[100vw] max-w-[1400px] max-h-[1400px] pointer-events-none opacity-50 rotate-180">
        <img
          src="/src/assets/images/circular-gradient.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Section: Icon + TMU Tech Week + Tagline */}
      <div
        ref={topRef}
        className={`relative z-10 flex flex-col items-center gap-4 mt-20 transition-all duration-1000 ease-out ${isTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
      >
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <img
            src="/src/assets/images/logo-transparent.png"
            alt="TMU Tech Week Logo"
            className="h-32 md:h-40 lg:h-48 w-auto"
          />
          <div className="flex flex-col leading-none">
            <span className="font-notch text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              TMU
            </span>
            <span className="font-notch text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Tech
            </span>
            <span className="font-notch text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Week
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="font-text text-xl md:text-2xl lg:text-3xl text-white/80">
          Innovation lives here.
        </p>
      </div>

      {/* Star Beam Section with "Do you?" inside */}
      <div
        ref={starRef}
        className={`relative z-10 flex flex-col items-center mt-16 transition-all duration-1000 ease-out ${isStarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
      >
        {/* Star image */}
        <div className="w-full max-w-4xl flex justify-center">
          <img
            src="/src/assets/images/star-beam.png"
            alt=""
            className="w-full h-auto object-contain opacity-80"
          />
        </div>
        {/* "Do you?" text positioned on top of the beam */}
        <p className="absolute top-[55%] font-text text-xl md:text-2.5xl lg:text-3xl text-white">
          Do you?
        </p>
      </div>

      {/* Dates and Location */}
      <div
        ref={datesRef}
        className={`relative z-10 flex flex-col items-center gap-2 text-center transition-all duration-1000 ease-out ${isDatesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
      >
        <p className="font-text text-2xl md:text-3xl text-white font-medium">
          February 15-22, 2026
        </p>
        <p className="font-text text-lg md:text-xl text-white/70">
          Toronto Metropolitan University
        </p>
      </div>

      {/* Calendar Button - Rounded rectangle with gradient border */}
      <a
        ref={buttonRef}
        href="#calendar"
        className={`relative z-10 group px-40 py-7 mt-4 mb-8 transition-all duration-1000 ease-out ${isButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue opacity-40 blur-xl"></div>
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue opacity-100 group-hover:opacity-100 transition-opacity"></div>
        {/* Inner black rectangle */}
        <div className="absolute inset-[1.5px] rounded-md bg-black flex items-center justify-center">
          <span className="font-text text-white text-2xl md:text-3xl whitespace-nowrap">
            View the Calendar
          </span>
        </div>
      </a>

      {/* Scroll Indicator at very bottom */}
      <div
        ref={scrollRef}
        className={`relative z-10 flex flex-col items-center gap-1 text-white/50 transition-all duration-1000 ease-out ${isScrollVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
      >
        <FaChevronDown className="w-4 h-4 animate-bounce" />
        <span className="font-text text-xs uppercase tracking-widest">Scroll</span>
      </div>

      {/* Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ttw-navy to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
