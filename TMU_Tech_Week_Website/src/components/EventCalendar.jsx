import { useState, useEffect, useRef } from 'react';
import { FaChevronRight, FaClock, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import eventsData from '../data/eventsData.json';

const EventCalendar = () => {
  // Toggle this to show/hide event images
  const showEventImages = true; // Set to false if you want to hide posters

  const eventTypes = ['All', 'Hackathons', 'Workshops', 'Panels', 'Networking', 'Office Tours', 'Resume Reviews', 'Conferences', 'Showcases'];

  const days = [
    { label: 'All Days', value: 'all' },
    { label: 'Feb 15', value: '2026-02-15' },
    { label: 'Feb 17', value: '2026-02-17' },
    { label: 'Feb 18', value: '2026-02-18' },
    { label: 'Feb 19', value: '2026-02-19' },
    { label: 'Feb 20', value: '2026-02-20' },
    { label: 'Feb 21', value: '2026-02-21' },
    { label: 'Feb 22', value: '2026-02-22' },
  ];

  // Map events from JSON to the expected format
  const allEvents = eventsData.events.map(event => ({
    id: event.id,
    name: event.eventName,
    clubName: event.clubName,
    date: event.date,
    endDate: event.endDate || null,
    time: event.time,
    venue: event.venue,
    types: event.types,
    poster: event.poster,
    posterClass: event.posterClass || '',
    posterObjectPosition: event.posterObjectPosition || '',
    posterFit: event.posterFit || 'cover',
    posterWrapperClass: event.posterWrapperClass || '',
    lumaLink: event.lumaLink || '',
    googleFormLink: event.googleFormLink || '',
    description: event.description || ''
  }));

  const [selectedType, setSelectedType] = useState('All');
  const [selectedDay, setSelectedDay] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [justExpanded, setJustExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const sectionRef = useRef(null);

  // Filter events based on selected type and day
  const filteredEvents = allEvents.filter(event => {
    const typeMatch = selectedType === 'All' || event.types.includes(selectedType);

    // Handle multi-day events
    let dayMatch = selectedDay === 'all';
    if (!dayMatch) {
      if (event.endDate) {
        // For multi-day events, check if selected day falls within the range
        dayMatch = selectedDay >= event.date && selectedDay <= event.endDate;
      } else {
        dayMatch = event.date === selectedDay;
      }
    }

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

  // Format single date for display (preserves weekday)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Format date range for multi-day events
  const formatDateRange = (startDateStr, endDateStr) => {
    if (!startDateStr) return '';
    if (!endDateStr) return formatDate(startDateStr);

    const [sy, sm, sd] = startDateStr.split('-').map(Number);
    const [ey, em, ed] = endDateStr.split('-').map(Number);
    const s = new Date(sy, sm - 1, sd);
    const e = new Date(ey, em - 1, ed);

    // Same month & year: 'Month start–end, Year' e.g., 'February 18–19, 2026'
    if (sy === ey && sm === em) {
      const monthName = s.toLocaleDateString('en-US', { month: 'long' });
      return `${monthName} ${s.getDate()}–${e.getDate()}, ${sy}`;
    }

    // Same year: 'Month day – Month day, Year'
    if (sy === ey) {
      const sFmt = s.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const eFmt = e.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      return `${sFmt} – ${eFmt}, ${sy}`;
    }

    // Different years: include full dates
    const sFmt = s.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const eFmt = e.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `${sFmt} – ${eFmt}`;
  };

  // Get tag color based on event type
  const getTagColor = (type) => {
    const colors = {
      'Hackathons': 'bg-ttw-blue/20 text-ttw-blue border-ttw-blue/40',
      'Workshops': 'bg-ttw-fuchsia/20 text-ttw-fuchsia border-ttw-fuchsia/40',
      'Panels': 'bg-ttw-pink/20 text-ttw-pink border-ttw-pink/40',
      'Networking': 'bg-ttw-orange/20 text-ttw-orange border-ttw-orange/40',
      'Office Tours': 'bg-ttw-blue/20 text-ttw-blue border-ttw-blue/40',
      'Resume Reviews': 'bg-ttw-orange/20 text-ttw-orange border-ttw-orange/40',
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
            <div className="relative p-[1.5px] rounded-xl bg-white/20">
              <div className="relative bg-black rounded-xl">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white z-10" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl font-text text-base bg-black text-white border-none focus:outline-none appearance-none cursor-pointer font-medium"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type} className="bg-black text-white py-2">
                      {type === 'All' ? 'All Events' : type}
                    </option>
                  ))}
                </select>
              </div>
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
            <div className="relative p-[1.5px] rounded-xl bg-white/20">
              <div className="relative bg-black rounded-xl">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white z-10" />
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl font-text text-base bg-black text-white border-none focus:outline-none appearance-none cursor-pointer font-medium"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  {days.map((day) => (
                    <option key={day.value} value={day.value} className="bg-black text-white py-2">
                      {day.label === 'All Days' ? 'All Days' : day.label}
                    </option>
                  ))}
                </select>
              </div>
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
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setModalOpen(true);
                  }}
                  className="group relative p-[2px] rounded-xl bg-gradient-to-r from-ttw-fuchsia via-ttw-blue to-ttw-orange hover:shadow-2xl hover:shadow-ttw-fuchsia/20 block cursor-pointer"
                  style={{
                    animation: `fadeSlideIn 0.5s ease-out ${animationDelay}ms both`
                  }}
                >
                  <div className="bg-black rounded-xl p-4 md:p-6 flex flex-row items-center gap-4 md:gap-6 transition-all duration-300">
                    {/* Event Poster/Logo */}
                    {showEventImages && (
                      <div className={`flex-shrink-0 w-20 h-20 md:w-48 md:h-32 rounded-lg overflow-hidden ${event.posterWrapperClass}`}>
                        {event.poster === '/images/event-placeholder.png' ? (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <span className="text-white/50 font-text text-[10px] md:text-sm text-center">Poster<br className="md:hidden" /> coming soon</span>
                          </div>
                        ) : (
                          <img
                            src={`${import.meta.env.BASE_URL}${event.poster.replace(/^\//, '')}`}
                            alt={`${event.name} poster`}
                            className={`w-full h-full ${event.posterFit === 'contain' ? 'object-contain' : 'object-cover'} ${event.posterClass}`}
                            style={event.posterObjectPosition ? { objectPosition: event.posterObjectPosition } : undefined}
                            onError={(event) => {
                              event.currentTarget.src = `${import.meta.env.BASE_URL}images/event-placeholder.png`;
                            }}
                          />
                        )}
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="flex-grow min-w-0">
                      <p className="text-sm md:text-sm font-text text-ttw-fuchsia mb-0.5 md:mb-1 truncate">
                        {event.clubName}
                      </p>
                      <h3 className="text-lg md:text-3xl font-bold font-headline text-white mb-1 md:mb-2 line-clamp-2">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-1.5 md:gap-2 text-white/70 mb-2 md:mb-3">
                        <FaClock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="font-text text-sm md:text-lg truncate">
                          {event.endDate ? formatDateRange(event.date, event.endDate) : formatDate(event.date)}, {event.time}
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
                </div>
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

      {/* Event Details Modal */}
      {modalOpen && selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-start justify-center p-4 pt-20 pb-20"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-black/80 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[80vh] backdrop-blur-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FaTimes className="w-6 h-6 text-white" />
            </button>

            {/* Fixed Header */}
            <div className="p-4 md:p-6 pb-0 flex-shrink-0">
              {/* Event Type Tags */}
              <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
                {selectedEvent.types.map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1 rounded-md text-sm font-text border ${getTagColor(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Event Title and Club */}
              <p className="text-sm font-text text-ttw-fuchsia mb-1 md:mb-1.5">
                {selectedEvent.clubName}
              </p>
              <h2 className="text-2xl md:text-4xl font-bold font-headline text-white mb-3 md:mb-4">
                {selectedEvent.name}
              </h2>

              {/* Event Info */}
              <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                <div className="flex items-start gap-3 text-white/80">
                  <FaClock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-text font-semibold">Date & Time</p>
                    <p className="font-text text-sm">
                      {selectedEvent.endDate ? formatDateRange(selectedEvent.date, selectedEvent.endDate) : formatDate(selectedEvent.date)}, {selectedEvent.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-white/80">
                  <FaMapMarkerAlt className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-text font-semibold">Venue</p>
                    <p className="font-text text-sm">
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Description */}
            {selectedEvent.description && (
              <div 
                className="event-modal flex-1 overflow-y-auto px-6 md:px-8 py-3"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(244, 114, 182, 0.6) rgba(0, 0, 0, 0.2)'
                }}
              >
                <div>
                  <h3 className="text-lg font-bold font-headline text-white mb-2">About</h3>
                  <p className="text-white/80 font-text leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            )}

            {/* Fixed Footer - Register Button */}
            <div className="p-6 md:p-8 pt-4 flex-shrink-0 border-t border-white/10">
              {selectedEvent.googleFormLink ? (
                <a
                  href={selectedEvent.googleFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-ttw-orange/30 via-ttw-fuchsia/30 to-ttw-blue/30 text-white font-text font-semibold text-center block hover:from-ttw-orange/50 hover:via-ttw-fuchsia/50 hover:to-ttw-blue/50 transition-all duration-300"
                >
                  Register Now
                </a>
              ) : (
                <div className="w-full px-6 py-3 rounded-lg bg-white/10 text-white/80 font-text font-semibold text-center">
                  Registration coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventCalendar;
