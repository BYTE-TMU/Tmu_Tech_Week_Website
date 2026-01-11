import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ArrowRight, Code, Users, Mic, Briefcase, Lightbulb, Star } from 'lucide-react';

const categories = [
    { id: 'all', name: 'All', icon: Star },
    { id: 'hackathons', name: 'Hackathons', icon: Code },
    { id: 'workshops', name: 'Workshops', icon: Lightbulb },
    { id: 'panels', name: 'Panels', icon: Mic },
    { id: 'networking', name: 'Networking', icon: Users },
    { id: 'conferences', name: 'Conferences', icon: Briefcase },
    { id: 'showcases', name: 'Showcases', icon: Star },
];

const events = [
    {
        id: 1,
        name: 'Tech Innovation Hackathon',
        date: 'Tuesday, February 17, 2026',
        category: 'hackathons',
        tags: ['Hackathons'],
    },
    {
        id: 2,
        name: 'AI Workshop Series',
        date: 'Wednesday, February 18, 2026',
        category: 'workshops',
        tags: ['Workshops', 'Networking'],
    },
    {
        id: 3,
        name: 'Industry Leaders Panel',
        date: 'Thursday, February 19, 2026',
        category: 'panels',
        tags: ['Panels', 'Conferences'],
    },
];

const EventCard = ({ event, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative glass rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
        >
            {/* Event Image Placeholder */}
            <div className="aspect-[4/3] relative bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40 text-sm">Event Poster/Logo</span>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {event.name}
                </h3>

                <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                </div>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

const EventCalendar = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const filteredEvents = activeCategory === 'all'
        ? events
        : events.filter((event) => event.category === activeCategory);

    return (
        <section id="calendar" className="relative py-32" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
                        Event Calendar
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Explore our exciting lineup of events, workshops, and activities
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.id;
                        return (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isActive
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'glass text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon className="w-4 h-4" />
                                {category.name}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredEvents.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>

                {/* View Full Calendar Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <motion.a
                        href="#"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View the Full Calendar
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default EventCalendar;
