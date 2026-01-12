import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative h-[200vh] bg-black flex flex-col items-center justify-between px-4 py-8 overflow-hidden">
      /* Circular Gradient - centered */
      <div className="absolute top-[-40%] left-[50%] -translate-x-1/2 w-[100vw] h-[100vw] max-w-[1400px] max-h-[1400px] pointer-events-none opacity-45 rotate-180">
        <img
          src="/src/assets/images/circular-gradient.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Top Section: Icon + TMU Tech Week + Tagline */}
      <div className="relative z-10 flex flex-col items-center gap-4 -mt-32">
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
      <div className="relative z-10 flex flex-col items-center">
        {/* Star image */}
        <div className="w-full max-w-md flex justify-center">
          <img
            src="/src/assets/images/star-beam.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
        {/* "Do you?" text positioned on top of the beam */}
        <p className="absolute top-[45%] font-notch text-xl md:text-3xl font-semibold text-white">
          Do you?
        </p>
      </div>

      {/* Dates and Location */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-center">
        <p className="font-text text-lg md:text-xl text-white font-medium">
          February 15-22, 2026
        </p>
        <p className="font-text text-sm md:text-base text-white/70">
          Toronto Metropolitan University
        </p>
      </div>

      {/* Calendar Button - Rounded rectangle with gradient border */}
      <a
        href="#calendar"
        className="relative z-10 group px-8 py-3 mb-4"
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue opacity-80 group-hover:opacity-100 transition-opacity"></div>
        {/* Inner black rectangle */}
        <div className="absolute inset-[2px] rounded-2xl bg-black flex items-center justify-center">
          <span className="font-text text-white text-sm md:text-base">
            View the Calendar
          </span>
        </div>
      </a>

      {/* Scroll Indicator at very bottom */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-white/50">
        <FaChevronDown className="w-4 h-4 animate-bounce" />
        <span className="font-text text-xs uppercase tracking-widest">Scroll</span>
      </div>

      {/* Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ttw-navy to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
