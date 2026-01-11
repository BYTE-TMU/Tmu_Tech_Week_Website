const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 glass">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">TMU Tech Week</div>
        <div className="flex gap-8">
          <a href="#about" className="hover:text-ttw-pink transition-colors">About</a>
          <a href="#calendar" className="hover:text-ttw-pink transition-colors">Calendar</a>
          <a href="#partners" className="hover:text-ttw-pink transition-colors">Partners</a>
          <a href="#faq" className="hover:text-ttw-pink transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-ttw-pink transition-colors">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
