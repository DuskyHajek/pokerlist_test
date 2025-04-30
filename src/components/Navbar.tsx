import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Smartphone, Apple, ChevronDown, Download } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDownloadOpen, setIsMobileDownloadOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDownloadOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
                className="h-10 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
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
            
            {/* Download App Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="app-download-button px-4 py-2 rounded-md text-white font-medium hover:scale-105 transition-transform flex items-center"
              >
                Download App
                <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border overflow-hidden transition-all duration-200 origin-top-right ${
                  isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-1">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.icreativecompany.pokerlist2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Smartphone size={16} className="mr-2" />
                    Google Play
                  </a>
                  <a
                    href="https://itunes.apple.com/sk/app/pokerlist/id604977349?mt=8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Apple size={16} className="mr-2" />
                    App Store
                  </a>
                </div>
              </div>
            </div>
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
          className={`md:hidden py-2 bg-background border-t border-border shadow-lg origin-top transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
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
            
            {/* Mobile Download App Button with Expandable Options */}
            <div className="w-full mt-2" ref={mobileDropdownRef}>
              {/* Main Download Button */}
              <button 
                onClick={() => setIsMobileDownloadOpen(!isMobileDownloadOpen)}
                className="app-download-button px-4 py-2.5 rounded-md text-white font-medium inline-flex items-center justify-between w-full"
              >
                <div className="flex items-center">
                  <Download size={18} className="mr-2" />
                  <span>Download App</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${isMobileDownloadOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Expandable Store Options */}
              <div 
                className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
                  isMobileDownloadOpen ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <a 
                  href="https://play.google.com/store/apps/details?id=com.icreativecompany.pokerlist2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pokerPurple/20 hover:bg-pokerPurple/30 px-4 py-2.5 rounded-md text-white font-medium inline-flex items-center w-full transition-colors"
                >
                  <Smartphone size={18} className="mr-2" />
                  Google Play
                </a>
                <a 
                  href="https://itunes.apple.com/sk/app/pokerlist/id604977349?mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pokerBlue/20 hover:bg-pokerBlue/30 px-4 py-2.5 rounded-md text-white font-medium inline-flex items-center w-full transition-colors"
                >
                  <Apple size={18} className="mr-2" />
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
