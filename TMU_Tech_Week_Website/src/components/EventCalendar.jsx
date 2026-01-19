import { useState, useEffect, useRef } from 'react';
import { FaChevronRight, FaClock } from 'react-icons/fa';

const EventCalendar = () => {
  const eventTypes = ['All', 'Hackathons', 'Workshops', 'Panels', 'Networking', 'Conferences', 'Showcases'];

  const days = [
    { label: 'All Days', value: 'all' },
    { label: 'Feb 15', value: '2026-02-15' },
    { label: 'Feb 16', value: '2026-02-16' },
    { label: 'Feb 17', value: '2026-02-17' },
    { label: 'Feb 18', value: '2026-02-18' },
    { label: 'Feb 19', value: '2026-02-19' },
    { label: 'Feb 20', value: '2026-02-20' },
    { label: 'Feb 21', value: '2026-02-21' },
    { label: 'Feb 22', value: '2026-02-22' },
  ];

  // Sample event data
  const allEvents = [
    {
      id: 1,
      name: 'Opening Ceremony & Keynote',
      date: '2026-02-15',
      time: '10:00 AM',
      types: ['Conferences'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-1' // Replace with actual Luma link
    },
    {
      id: 2,
      name: 'AI/ML Workshop',
      date: '2026-02-16',
      time: '2:00 PM',
      types: ['Workshops'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-2' // Replace with actual Luma link
    },
    {
      id: 3,
      name: 'Startup Panel Discussion',
      date: '2026-02-17',
      time: '3:00 PM',
      types: ['Panels', 'Networking'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-3' // Replace with actual Luma link
    },
    {
      id: 4,
      name: '24-Hour Hackathon Kickoff',
      date: '2026-02-18',
      time: '9:00 AM',
      types: ['Hackathons'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-4' // Replace with actual Luma link
    },
    {
      id: 5,
      name: 'Web Development Workshop',
      date: '2026-02-18',
      time: '1:00 PM',
      types: ['Workshops'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-5' // Replace with actual Luma link
    },
    {
      id: 6,
      name: 'Tech Career Fair',
      date: '2026-02-19',
      time: '11:00 AM',
      types: ['Networking', 'Conferences'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-6' // Replace with actual Luma link
    },
    {
      id: 7,
      name: 'Project Showcase',
      date: '2026-02-21',
      time: '4:00 PM',
      types: ['Showcases'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-7' // Replace with actual Luma link
    },
    {
      id: 8,
      name: 'Closing Ceremony',
      date: '2026-02-22',
      time: '6:00 PM',
      types: ['Conferences'],
      poster: '/src/assets/images/event-placeholder.png',
      lumaLink: 'https://lu.ma/your-event-link-8' // Replace with actual Luma link
    },
  ];

  const [selectedType, setSelectedType] = useState('All');
  const [selectedDay, setSelectedDay] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [justExpanded, setJustExpanded] = useState(false);

  const sectionRef = useRef(null);

  // Filter events based on selected type and day
  const filteredEvents = allEvents.filter(event => {
    const typeMatch = selectedType === 'All' || event.types.includes(selectedType);
    const dayMatch = selectedDay === 'all' || event.date === selectedDay;
    return typeMatch && dayMatch;
  });

  // Limit displayed events
  const INITIAL_DISPLAY_COUNT = 3;
  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreEvents = filteredEvents.length > INITIAL_DISPLAY_COUNT;

  // Trigger animation when filters change
  useEffect(() => {
    setAnimationKey(prev => prev + 1); // Force remount with new key for fade-in animation
    setShowAll(false); // Reset to initial count when filters change
  }, [selectedType, selectedDay]);

  // Intersection observer for initial fade-in
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

  // Handle show more animation
  const handleShowMore = () => {
    if (!showAll) {
      setJustExpanded(true);
      setTimeout(() => setJustExpanded(false), 500);
    }
    setShowAll(!showAll);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get tag color based on event type
  const getTagColor = (type) => {
    const colors = {
      'Hackathons': 'bg-ttw-blue/20 text-ttw-blue border-ttw-blue/40',
      'Workshops': 'bg-ttw-fuchsia/20 text-ttw-fuchsia border-ttw-fuchsia/40',
      'Panels': 'bg-ttw-pink/20 text-ttw-pink border-ttw-pink/40',
      'Networking': 'bg-ttw-orange/20 text-ttw-orange border-ttw-orange/40',
      'Conferences': 'bg-ttw-blue/20 text-ttw-blue border-ttw-blue/40',
      'Showcases': 'bg-ttw-fuchsia/20 text-ttw-fuchsia border-ttw-fuchsia/40',
    };
    return colors[type] || 'bg-white/10 text-white border-white/20';
  };

  return (
    <section ref={sectionRef} id="calendar" className="py-6 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={`text-center mb-4 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="relative inline-block mb-2 md:mb-6">
            <h2 className="text-2xl md:text-5xl font-bold font-headline">Event Calendar</h2>
            <div className="absolute left-0 right-0 bottom-[-4px] md:bottom-[-8px] h-0.5 md:h-1 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue"></div>
          </div>
        </div>

        {/* Event Type Filters */}
        <div className={`mb-3 md:mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <div className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-text text-base bg-black text-white border-none focus:outline-none appearance-none cursor-pointer font-medium"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                  paddingRight: '3rem'
                }}
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type} className="bg-black text-white py-2">
                    {type === 'All' ? '🎯 All Events' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-text text-base whitespace-nowrap transition-all duration-300 ${selectedType === type
                  ? 'bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue text-white font-semibold'
                  : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {selectedType === type && (
                  <span className="mr-1">×</span>
                )}
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Day Filter */}
        <div className={`mb-4 md:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <div className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-ttw-blue via-ttw-fuchsia to-ttw-orange">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-text text-base bg-black text-white border-none focus:outline-none appearance-none cursor-pointer font-medium"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                  paddingRight: '3rem'
                }}
              >
                {days.map((day) => (
                  <option key={day.value} value={day.value} className="bg-black text-white py-2">
                    {day.label === 'All Days' ? '📅 All Days' : day.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-2">
            {days.map((day) => (
              <button
                key={day.value}
                onClick={() => setSelectedDay(day.value)}
                className={`px-3 py-1.5 rounded-md font-text text-sm whitespace-nowrap transition-all duration-300 ${selectedDay === day.value
                  ? 'bg-white/20 text-white font-semibold border border-white/40'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
                  }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        <div key={animationKey} className="space-y-3 md:space-y-6">
          {filteredEvents.length > 0 ? (
            displayedEvents.map((event, index) => {
              const isNewlyRevealed = showAll && index >= INITIAL_DISPLAY_COUNT;
              const animationDelay = isNewlyRevealed && justExpanded
                ? (index - INITIAL_DISPLAY_COUNT) * 100
                : index * 80;

              return (
                <a
                  key={event.id}
                  href={event.lumaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-[2px] rounded-xl bg-gradient-to-r from-ttw-fuchsia via-ttw-blue to-ttw-orange hover:shadow-2xl hover:shadow-ttw-fuchsia/20 block cursor-pointer"
                  style={{
                    animation: `fadeSlideIn 0.5s ease-out ${animationDelay}ms both`
                  }}
                >
                  <div className="bg-black rounded-xl p-4 md:p-6 flex flex-row items-center gap-4 md:gap-6 transition-all duration-300">
                    {/* Event Poster/Logo */}
                    <div className="flex-shrink-0 w-20 h-20 md:w-48 md:h-32 bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-white/40 font-text text-[10px] md:text-sm text-center">Event<br className="md:hidden" /> Poster</span>
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base md:text-3xl font-bold font-headline text-white mb-1 md:mb-2 line-clamp-2">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-1.5 md:gap-2 text-white/70 mb-2 md:mb-3">
                        <FaClock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="font-text text-xs md:text-lg truncate">
                          {formatDate(event.date)}, {event.time}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {event.types.map((type) => (
                          <span
                            key={type}
                            className={`px-2 md:px-3 py-0.5 md:py-1 rounded-md text-[10px] md:text-sm font-text border ${getTagColor(type)}`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 hidden md:block">
                      <FaChevronRight className="w-6 h-6 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-white/60 font-text">No events found for the selected filters.</p>
            </div>
          )}

          {/* Show More/Less Button */}
          {hasMoreEvents && filteredEvents.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShowMore}
                className="px-6 py-3 rounded-lg bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-text text-sm md:text-base"
              >
                {showAll ? 'Show Less' : `Show ${filteredEvents.length - INITIAL_DISPLAY_COUNT} More Events`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
