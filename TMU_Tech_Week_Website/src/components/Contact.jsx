import { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
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

  return (
    <section id="contact" className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover opacity-70"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}images/lets_connect.png')`,
          backgroundPosition: "center",
        }}
      />

      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Content */}
      <div
        ref={sectionRef}
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 py-20 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <h2 className="text-2xl md:text-5xl font-bold font-headline text-white mb-4 md:mb-8">
          Stay in the loop.
        </h2>

        <p className="max-w-2xl text-lg md:text-xl font-text text-white/70 leading-relaxed mb-8 md:mb-12">
          TMU Tech Week is just the beginning. Follow <span className="font-bold text-white">BYTE</span> to stay updated on upcoming events, workshops, hackathons, and more happening across campus.
        </p>

        {/* Social Media Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-14">
          <a
            href="https://www.instagram.com/tmubyte/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-text font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-[#E1306C]/30 hover:scale-[1.03] transition-all duration-300"
          >
            <FaInstagram className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
            Follow on Instagram
          </a>

          <a
            href="https://www.linkedin.com/company/tmu-byte/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#0A66C2] text-white font-text font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-[#0A66C2]/30 hover:scale-[1.03] transition-all duration-300"
          >
            <FaLinkedinIn className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
            Connect on LinkedIn
          </a>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/20 mb-6 md:mb-8"></div>

      </div>
    </section>
  );
};

export default Contact;
