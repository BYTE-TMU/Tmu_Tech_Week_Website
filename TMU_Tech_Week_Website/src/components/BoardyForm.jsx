import { useState, useEffect, useRef } from 'react';
import { FaCheck, FaArrowRight, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const COUNTRY_CODES = [
    { code: '+1', label: '🇨🇦 +1', country: 'CA' },
    { code: '+1', label: '🇺🇸 +1', country: 'US' },
    { code: '+44', label: '🇬🇧 +44', country: 'GB' },
    { code: '+91', label: '🇮🇳 +91', country: 'IN' },
    { code: '+61', label: '🇦🇺 +61', country: 'AU' },
    { code: '+33', label: '🇫🇷 +33', country: 'FR' },
    { code: '+49', label: '🇩🇪 +49', country: 'DE' },
    { code: '+81', label: '🇯🇵 +81', country: 'JP' },
    { code: '+82', label: '🇰🇷 +82', country: 'KR' },
    { code: '+86', label: '🇨🇳 +86', country: 'CN' },
    { code: '+55', label: '🇧🇷 +55', country: 'BR' },
    { code: '+52', label: '🇲🇽 +52', country: 'MX' },
    { code: '+234', label: '🇳🇬 +234', country: 'NG' },
    { code: '+971', label: '🇦🇪 +971', country: 'AE' },
    { code: '+966', label: '🇸🇦 +966', country: 'SA' },
    { code: '+92', label: '🇵🇰 +92', country: 'PK' },
    { code: '+880', label: '🇧🇩 +880', country: 'BD' },
    { code: '+63', label: '🇵🇭 +63', country: 'PH' },
    { code: '+39', label: '🇮🇹 +39', country: 'IT' },
    { code: '+34', label: '🇪🇸 +34', country: 'ES' },
    { code: '+31', label: '🇳🇱 +31', country: 'NL' },
    { code: '+90', label: '🇹🇷 +90', country: 'TR' },
    { code: '+65', label: '🇸🇬 +65', country: 'SG' },
    { code: '+60', label: '🇲🇾 +60', country: 'MY' },
    { code: '+254', label: '🇰🇪 +254', country: 'KE' },
    { code: '+27', label: '🇿🇦 +27', country: 'ZA' },
    { code: '+48', label: '🇵🇱 +48', country: 'PL' },
    { code: '+46', label: '🇸🇪 +46', country: 'SE' },
    { code: '+47', label: '🇳🇴 +47', country: 'NO' },
    { code: '+45', label: '🇩🇰 +45', country: 'DK' },
    { code: '+353', label: '🇮🇪 +353', country: 'IE' },
    { code: '+64', label: '🇳🇿 +64', country: 'NZ' },
];

const ZAPIER_WEBHOOK_URL = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;

const BoardyForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const sectionRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        linkedin: '',
        consentCall: false,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (!ZAPIER_WEBHOOK_URL) {
                throw new Error('Webhook endpoint is not configured.');
            }

            const response = await fetch(ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: `${formData.countryCode} ${formData.phone}`,
                    linkedin: formData.linkedin,
                }),
            });

            // With no-cors mode, response.type is 'opaque' and status is 0,
            // but the request still reaches Zapier successfully.
            setSubmitted(true);
            setFormData({ name: '', email: '', countryCode: '+1', phone: '', linkedin: '', consentCall: false });
        } catch (err) {
            console.error('Form submission error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                                    Want to find cool startup job opportunities?
                                    <br />
                                    Talk to Boardy!
                                </h2>
                                <div className="h-1 w-24 bg-gradient-to-r from-ttw-blue via-ttw-blue-500 to-ttw-blue rounded-full mb-6" />
                                <p className="text-white/70 font-text text-base md:text-lg leading-relaxed">
                                    We've partnered with{' '}
                                    <a
                                        href="https://www.boardy.ai"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative text-white font-semibold hover:text-ttw-blue-500 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-ttw-orange after:via-ttw-fuchsia after:to-ttw-blue after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                                    >
                                        Boardy
                                    </a>, an
                                    AI superconnector that gets to know you beyond a resume.
                                    Share your details for a casual chat about your interests—no interview, just conversation—and Boardy will connect you with relevant startup opportunities.
                                    (FYI Boardy talks to hundreds of cool founders every day).
                                </p>
                                <img
                                    src={`${import.meta.env.BASE_URL}images/boardy.png`}
                                    alt="Boardy AI"
                                    className="mt-8 w-32 md:w-40 lg:w-48 object-contain mx-auto lg:mx-0"
                                />
                            </div>

                            {/* ── Right Column: Form ── */}
                            <div className="lg:col-span-3 flex flex-col justify-center">
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center h-full py-16 gap-6">
                                        {/* Animated Checkmark */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 12, duration: 0.6 }}
                                            className="w-20 h-20 rounded-full bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue flex items-center justify-center"
                                        >
                                            <motion.div
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.4 }}
                                            >
                                                <FaCheck className="w-9 h-9 text-white" />
                                            </motion.div>
                                        </motion.div>

                                        {/* Thank you text */}
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.5 }}
                                            className="text-3xl font-bold font-headline text-white text-center"
                                        >
                                            Thank you!
                                        </motion.h3>

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6, duration: 0.5 }}
                                            className="text-white/70 font-text text-lg text-center max-w-md leading-relaxed"
                                        >
                                            Boardy will set up a call with you — please check your phone!
                                        </motion.p>

                                        {/* WhatsApp Fallback */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                            className="flex items-center gap-3 mt-3 px-6 py-4 rounded-lg bg-white/5 border border-white/10"
                                        >
                                            <FaPhone className="w-5 h-5 text-ttw-fuchsia shrink-0" />
                                            <p className="text-white font-text text-base">
                                                Didn't get the call scheduled with Boardy?{' '}
                                                <a
                                                    href="https://whatsapp.boardy.ai/tmutechweek"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-ttw-blue-500 font-semibold hover:text-ttw-blue transition-colors duration-300 underline underline-offset-2"
                                                >
                                                    Chat via WhatsApp
                                                </a>
                                            </p>
                                        </motion.div>
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
                                                <div className="flex gap-2">
                                                    <div className="relative shrink-0 w-[110px]">
                                                        <select
                                                            name="countryCode"
                                                            value={formData.countryCode}
                                                            onChange={handleChange}
                                                            className="w-full px-2 pr-7 py-3 rounded-lg bg-white/5 border border-white/20 text-white font-text text-sm focus:outline-none focus:border-ttw-fuchsia focus:ring-1 focus:ring-ttw-fuchsia/50 transition-all duration-300 appearance-none cursor-pointer"
                                                        >
                                                            {COUNTRY_CODES.map((c) => (
                                                                <option
                                                                    key={`${c.country}-${c.code}`}
                                                                    value={c.code}
                                                                    className="bg-neutral-900 text-white"
                                                                >
                                                                    {c.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <svg
                                                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/60"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className={`${inputClasses} flex-1`}
                                                        placeholder="555-0123"
                                                    />
                                                </div>
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

                                        {/* Consent Checkbox */}
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="consentCall"
                                                name="consentCall"
                                                required
                                                checked={formData.consentCall}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        consentCall: e.target.checked,
                                                    }))
                                                }
                                                className="mt-1 w-4 h-4 shrink-0 rounded border-white/20 bg-white/5 text-ttw-fuchsia focus:ring-ttw-fuchsia/50 cursor-pointer accent-[#E040FB]"
                                            />
                                            <label
                                                htmlFor="consentCall"
                                                className="text-white/60 font-text text-sm leading-relaxed cursor-pointer"
                                            >
                                                I agree to let Boardy schedule a call with me to discuss startup opportunities.{' '}
                                                <span className="text-ttw-fuchsia">•</span>
                                            </label>
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <p className="text-red-400 font-text text-sm">
                                                {error}
                                            </p>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`group inline-flex items-center gap-2 px-8 py-3 rounded-lg font-text font-bold text-base transition-all duration-300 ${isSubmitting
                                                ? 'bg-white/60 text-black/60 cursor-not-allowed'
                                                : 'bg-white text-black hover:bg-white/90'
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg
                                                        className="animate-spin w-4 h-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                        />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Chat with Boardy
                                                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default BoardyForm;
