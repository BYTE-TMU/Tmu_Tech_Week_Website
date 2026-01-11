import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
    {
        id: 1,
        question: 'Who can attend TMU Tech Week?',
        answer: 'All TMU students are welcome — regardless of program or experience level.',
    },
    {
        id: 2,
        question: 'Is TMU Tech Week free to attend?',
        answer: 'Yes! All events are completely free for TMU students.',
    },
    {
        id: 3,
        question: 'Do I need to register for events?',
        answer: 'Some events require registration, while others are open to drop-ins. Details will be provided on the event schedule.',
    },
    {
        id: 4,
        question: 'Can clubs still join as partners?',
        answer: "Yes, we're open to new collaborators — reach out if your club wants to host or co-host an event.",
    },
];

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-b border-white/10 last:border-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg md:text-xl font-medium text-white group-hover:text-purple-400 transition-colors pr-4">
                    {faq.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center"
                >
                    {isOpen ? (
                        <Minus className="w-5 h-5 text-purple-400" />
                    ) : (
                        <Plus className="w-5 h-5 text-white/60" />
                    )}
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-white/60 text-lg leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const [openId, setOpenId] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="faq" className="relative py-32" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                {/* FAQ List */}
                <div className="glass rounded-3xl p-8 md:p-12">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            index={index}
                            isOpen={openId === faq.id}
                            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
