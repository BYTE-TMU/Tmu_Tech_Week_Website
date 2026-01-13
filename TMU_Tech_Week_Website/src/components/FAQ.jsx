import { useState, useEffect, useRef } from 'react';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
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

  const faqItems = [
    {
      question: "Who can attend TMU Tech Week?",
      answer: "All TMU students are welcome – regardless of program or experience level.",
      bullet: "faq_bullet_one"
    },
    {
      question: "Do I need to register for events?",
      answer: "Some events require registration, while others are open to drop-ins. Details will be provided on the event schedule.",
      bullet: "faq_bullet_two"
    },
    {
      question: "Is TMU Tech Week free to attend?",
      answer: "Yes! All events are completely free for TMU students.",
      bullet: "faq_bullet_three"
    },
    {
      question: "Can clubs still join as partners?",
      answer: "Yes, we're open to new collaborators – reach out if your club wants to host or co-host an event.",
      bullet: "faq_bullet_four"
    }
  ];

  return (
    <section id="faq" className="relative min-h-screen bg-black flex items-center px-6 md:px-12 py-20">
      <div
        ref={sectionRef}
        className={`max-w-4xl mx-auto w-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {/* Title with gradient underline */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          {/* Gradient underline */}
          <div className="h-1 w-[80%] md:w-[90%] lg:w-[41rem] mx-auto bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue rounded-full" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-500 ${expandedIndex === index
                ? 'border-white/20 scale-[1.02]'
                : 'border-white/10 hover:border-white/20'
                }`}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-start gap-4 p-6 text-left hover:bg-white/5 transition-all duration-300 active:scale-[0.99]"
              >
                {/* Gradient Star Bullet */}
                <div className="flex-shrink-0 mt-1">
                  <img
                    src={`/src/assets/images/${item.bullet}.png`}
                    alt="star"
                    width="28"
                    height="28"
                  />
                </div>

                {/* Question and Icon */}
                <div className="flex-1 flex items-center justify-between">
                  <h3 className="text-xl md:text-xl lg:text-2xl font-semibold text-white">
                    {item.question}
                  </h3>
                  <svg
                    className={`flex-shrink-0 w-7 h-7 md:w-6 md:h-6 text-white/60 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-6 text-white/70 border-t border-white/10 pt-6">
                  <p className="text-xl md:text-lg lg:text-xl leading-relaxed animate-fade-in">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
