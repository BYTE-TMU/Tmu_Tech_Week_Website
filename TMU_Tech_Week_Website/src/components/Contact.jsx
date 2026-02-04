import { useState, useEffect, useRef } from 'react';

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
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Let's connect.
        </h2>

        <p className="max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed mb-12">
          Have a question, an idea, or want to get involved with TMU Tech Week? Wed love to hear from you. Whether you're a <span className="font-bold text-white">student</span>, <span className="font-bold text-white">organization</span>, or <span className="font-bold text-white">industry partner</span>, this is the place to start.
        </p>

        {/* Email Link */}
        <a
          href="mailto:tmutechweek@gmail.com"
          className="inline-flex items-center gap-2 text-white hover:text-white transition-colors group relative text-lg md:text-xl"
        >
          <span className="relative">
            tmutechweek@gmail.com
            {/* Gradient underline */}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-ttw-blue via-ttw-fuchsia to-ttw-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Contact;
