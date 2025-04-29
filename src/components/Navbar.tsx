import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background/80 backdrop-blur-sm'} border-b border-border`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <div className="relative rounded-lg p-1.5 bg-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out">
              <img 
                src="/PL_logo.png" 
                alt="PokerList Logo" 
                width="40"
                height="40"
                className="h-8 sm:h-10 relative z-10 transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className={`nav-link flex items-center gap-1.5 ${location.pathname === '/' ? 'text-primary' : ''}`}>
              <img src="/icons/home.png" alt="" width="20" height="20" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"/>
              Home
            </Link>
            <Link to="/casinos" className={`nav-link flex items-center gap-1.5 ${location.pathname === '/casinos' ? 'text-primary' : ''}`}>
              <img src="/icons/casinos.png" alt="" width="20" height="20" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"/>
              Casinos
            </Link>
            <Link to="/events" className={`nav-link flex items-center gap-1.5 ${location.pathname === '/events' ? 'text-primary' : ''}`}>
              <img src="/icons/events.png" alt="" width="20" height="20" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"/>
              Events
            </Link>
            <Link to="/cash-games" className={`nav-link flex items-center gap-1.5 ${location.pathname === '/cash-games' ? 'text-primary' : ''}`}>
              <img src="/icons/cashgames.png" alt="" width="20" height="20" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"/>
              Live Cash Games
            </Link>
            <Link to="/#download" className="app-download-button px-4 py-2 rounded-md text-white font-medium hover:scale-105 transition-transform">
              Download App
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-primary active:scale-95 transition-all duration-150"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden py-2 bg-background border-t border-border shadow-lg origin-top transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col space-y-0.5 items-start px-2">
            <Link 
              to="/" 
              className={`nav-link-mobile w-full text-base flex items-center gap-2 py-2.5 ${location.pathname === '/' ? 'bg-white/10 text-primary' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/icons/home.png" alt="" width="24" height="24" className="w-6 h-6"/>
              Home
            </Link>
            <Link 
              to="/casinos" 
              className={`nav-link-mobile w-full text-base flex items-center gap-2 py-2.5 ${location.pathname === '/casinos' ? 'bg-white/10 text-primary' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/icons/casinos.png" alt="" width="24" height="24" className="w-6 h-6"/>
              Casinos
            </Link>
            <Link 
              to="/events" 
              className={`nav-link-mobile w-full text-base flex items-center gap-2 py-2.5 ${location.pathname === '/events' ? 'bg-white/10 text-primary' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/icons/events.png" alt="" width="24" height="24" className="w-6 h-6"/>
              Events
            </Link>
            <Link 
              to="/cash-games" 
              className={`nav-link-mobile w-full text-base flex items-center gap-2 py-2.5 ${location.pathname === '/cash-games' ? 'bg-white/10 text-primary' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="/icons/cashgames.png" alt="" width="24" height="24" className="w-6 h-6"/>
              Live Cash Games
            </Link>
            <div className="pt-2 w-full">
              <div className="border-t border-border/50 w-full"></div>
            </div>
            <Link 
              to="/#download" 
              className="app-download-button px-4 py-2.5 rounded-md text-white font-medium inline-block w-fit mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Download App
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
