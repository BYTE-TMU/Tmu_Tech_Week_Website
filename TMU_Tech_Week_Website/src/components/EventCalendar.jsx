const EventCalendar = () => {
  return (
    <section id="calendar" className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Event Calendar</h2>
          <div className="absolute left-0 right-0 bottom-[6px] h-1 bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue"></div>
        </div>
        <p className="text-xl text-white/60 mt-4">Calendar Section Content</p>
      </div>
    </section>
  );
};

export default EventCalendar;
