const About = () => {
  return (
    <section id="about" className="relative min-h-screen bg-black flex items-center px-6 md:px-12 py-20">
      {/* Content Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Door to Success Image */}
        <div className="flex items-center justify-center order-1">
          <img
            src="/src/assets/images/door-to-success.png"
            alt="Door to Success"
            className="w-full max-w-2xl md:max-w-lg h-auto"
          />
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col items-end text-right order-2">
          <div className="relative">
            <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              What is TMU Tech Week?
            </h2>
            {/* Gradient underline */}
            <div className="h-1 w-full bg-gradient-to-r from-ttw-orange via-ttw-fuchsia to-ttw-blue rounded-full mt-2" />
          </div>
          <p className="font-text text-xl md:text-xl lg:text-2xl text-white/70 leading-relaxed mt-6">
            A campus-wide celebration of technology, innovation, and creativity where <span className="font-bold text-white">student groups</span>, <span className="font-bold text-white">startups</span>, and <span className="font-bold text-white">industry leaders</span> come together to connect, collaborate, and create.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
