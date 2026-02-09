import { useState, useEffect, useRef } from 'react';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

const BoardyForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        about: '',
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    const inputClasses =
        'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white font-text text-base placeholder-white/40 focus:outline-none focus:border-ttw-fuchsia focus:ring-1 focus:ring-ttw-fuchsia/50 transition-all duration-300';

    return (
        <section
            ref={sectionRef}
            id="boardy-form"
            className="py-16 md:py-24 bg-black"
        >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Outer gradient border wrapper */}
                <div
                    className={`p-[2px] rounded-2xl bg-gradient-to-r from-ttw-fuchsia via-ttw-blue to-ttw-orange transition-all duration-1000 ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                >
                    <div className="bg-black rounded-2xl p-6 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                            {/* ── Left Column: Boardy Explanation ── */}
                            <div className="lg:col-span-2 flex flex-col justify-center">
                                <h2 className="text-2xl md:text-4xl font-bold font-headline text-white mb-4">
                                    Feel Free To Reach Out
                                </h2>
                                <div className="h-1 w-24 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue rounded-full mb-6" />
                                <p className="text-white/70 font-text text-base md:text-lg leading-relaxed">
                                    We've partnered with{' '}
                                    <span className="text-white font-semibold">Boardy</span>, an
                                    AI agent, to get to know you beyond a resume. As a first step,
                                    Boardy will schedule a quick call to learn what you're best at
                                    and where you shine. Share your details below and let's start a
                                    conversation.
                                </p>
                            </div>

                            {/* ── Right Column: Form ── */}
                            <div className="lg:col-span-3">
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center h-full py-16 gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue flex items-center justify-center">
                                            <FaCheck className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-headline text-white">
                                            Thank you!
                                        </h3>
                                        <p className="text-white/70 font-text text-center max-w-sm">
                                            We've received your details. Boardy will be in touch soon
                                            to schedule your introductory call.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Row 1: Name + Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-white font-text font-semibold text-sm mb-1.5">
                                                    What's your name?{' '}
                                                    <span className="text-ttw-fuchsia">•</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    placeholder="Jane Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-white font-text font-semibold text-sm mb-1.5">
                                                    Where should we email you?{' '}
                                                    <span className="text-ttw-fuchsia">•</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    placeholder="jane@example.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Phone + LinkedIn */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-white font-text font-semibold text-sm mb-1.5">
                                                    What's your number to reach you?{' '}
                                                    <span className="text-ttw-fuchsia">•</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    placeholder="(416) 555-0123"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-white font-text font-semibold text-sm mb-1.5">
                                                    Your LinkedIn profile{' '}
                                                    <span className="text-ttw-fuchsia">•</span>
                                                </label>
                                                <input
                                                    type="url"
                                                    name="linkedin"
                                                    required
                                                    value={formData.linkedin}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    placeholder="https://linkedin.com/in/janedoe"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 3: About Yourself */}
                                        <div>
                                            <label className="block text-white font-text font-semibold text-sm mb-1.5">
                                                Tell us a bit about yourself and why you're interested{' '}
                                                <span className="text-ttw-fuchsia">•</span>
                                            </label>
                                            <textarea
                                                name="about"
                                                required
                                                rows={4}
                                                value={formData.about}
                                                onChange={handleChange}
                                                className={`${inputClasses} resize-vertical`}
                                                placeholder="Share a little about your background, interests, and what excites you about tech..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="group inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-black font-text font-bold text-base hover:bg-white/90 transition-all duration-300"
                                        >
                                            Chat with Boardy
                                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoardyForm;
