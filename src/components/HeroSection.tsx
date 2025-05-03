import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Card } from "@/components/ui/card";
import { Download, LayoutGrid, Smartphone, Apple, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update dropdown position when opening
  useEffect(() => {
    if (isDropdownOpen && dropdownButtonRef.current) {
      const rect = dropdownButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isDropdownOpen]);

  return (
    <div className="hero-gradient min-h-[65vh] sm:min-h-[65vh] pt-10 sm:pt-12 pb-8 sm:pb-10 flex flex-col justify-start relative">
      {/* --- Animated Background Blobs --- */}
      <div className="bg-blob bg-pokerPurple w-40 h-40 sm:w-96 sm:h-96 absolute top-[-20px] left-[-20px] sm:top-[-50px] sm:left-[-100px]" style={{ animationDelay: '0s' }}></div>
      <div className="bg-blob bg-pokerBlue w-48 h-48 sm:w-[500px] sm:h-[500px] absolute bottom-[-40px] right-[-40px] sm:bottom-[-150px] sm:right-[-150px]" style={{ animationDelay: '5s' }}></div>
      <div className="bg-blob bg-pokerRed w-32 h-32 sm:w-80 sm:h-80 absolute top-[20%] left-[5%] sm:left-[30%]" style={{ animationDelay: '10s' }}></div>

      <div className="container mx-auto px-4 mt-2 sm:mt-12 md:mt-16 relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 md:items-center">
          {/* Text Content - Order 1 */}
          <div className="text-center md:text-left order-1 md:order-1">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Find Your Next 
              <span className="bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent block mt-1 sm:mt-2">Poker Game</span>
            </h1>
            
            <p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 max-w-lg mx-auto md:mx-0 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Discover tournaments, cash games, and poker rooms near you with PokerList - your pocket poker companion.
            </p>
            
            {/* Stats Cards */}
            <div 
              className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 animate-fade-in mb-4 sm:mb-6 md:mb-0"
              style={{ animationDelay: '0.5s' }}
            >
              <Card className="card-highlight p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">14000+</span>
                <span className="text-muted-foreground block mt-0.5 sm:mt-1 text-xs sm:text-sm">Tournaments</span>
              </Card>
              <Card className="card-highlight p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">500+</span>
                <span className="text-muted-foreground block mt-0.5 sm:mt-1 text-xs sm:text-sm">Poker Rooms</span>
              </Card>
              <Card className="card-highlight p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">18+</span>
                <span className="text-muted-foreground block mt-0.5 sm:mt-1 text-xs sm:text-sm">Countries</span>
              </Card>
            </div>

            {/* Buttons */}
            <div 
              className="order-3 md:order-3 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 animate-fade-in justify-center md:justify-start mb-8 md:mb-0"
              style={{ animationDelay: '0.4s' }}
            >
              {/* Download App Button with Dropdown */}
              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <button 
                  ref={dropdownButtonRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative group app-download-button px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center overflow-hidden w-full"
                >
                  <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-gradient-to-r from-pokerPurple to-pokerBlue rounded-md"></div>
                  <Download className="relative z-10 mr-2" size={18} />
                  <span className="relative z-10">Download App</span>
                  <ChevronDown size={16} className={`relative z-10 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown Menu rendered in a portal */}
                {isDropdownOpen && ReactDOM.createPortal(
                  <div 
                    style={{
                      position: 'absolute',
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      width: dropdownPosition.width,
                      zIndex: 9999,
                    }}
                    className="rounded-md shadow-lg bg-background border border-border overflow-hidden transition-all duration-200 origin-top-right"
                  >
                    <div className="py-1">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.icreativecompany.pokerlist2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2.5 text-sm hover:bg-white/10 transition-colors w-full text-left"
                        onClick={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                      >
                        <Smartphone size={16} className="mr-2" />
                        Google Play
                      </a>
                      <a
                        href="https://apps.apple.com/sk/app/pokerlist-list-of-poker-game/id604977349"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2.5 text-sm hover:bg-white/10 transition-colors w-full text-left"
                        onClick={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                      >
                        <Apple size={16} className="mr-2" />
                        App Store
                      </a>
                    </div>
                  </div>,
                  document.body
                )}
              </div>
              
              <a 
                href="/casinos" 
                className="border border-white/20 hover:border-primary/80 hover:text-primary px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center transition-all duration-300 active:scale-95 w-full sm:w-auto"
              >
                <LayoutGrid className="mr-2" size={18} />
                Browse Casinos
              </a>
            </div>
          </div>

          {/* Image Section - Order 2, now with improved mobile spacing */}
          <div className="order-2 md:order-2 flex justify-center md:justify-end items-center animate-fade-in mt-0 md:mt-8" style={{ animationDelay: '0.6s' }}>
            <div className="relative flex justify-center items-center w-[220px] h-[240px] sm:w-[320px] md:w-[350px] sm:h-[320px] md:h-[350px]">
              {/* Single Image with shadow and hover effect */}
              <img
                src="/PL_screen1.jpeg"
                alt="PokerList Mobile App - Events"
                loading="lazy"
                width="240"
                height="480"
                fetchPriority="high"
                className="w-[150px] h-auto sm:w-[260px] md:w-[280px] object-contain rounded-xl shadow-xl transform hover:scale-105 hover:rotate-2 transition-all duration-300 hover:shadow-2xl"
              />
              {/* Subtle decorative element to add depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pokerPurple/20 to-pokerBlue/20 rounded-xl -z-10 transform -rotate-3 scale-95 blur-sm"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Background Elements with Parallax (These are different from the blobs above) */}
      {/* Removing the old parallax blur elements as they are replaced by the blobs and vignette */}
      {/* 
      <div 
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-pokerPurple/5 blur-3xl transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pokerBlue/5 blur-3xl transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      ></div> 
      */}
    </div>
  );
};

export default HeroSection;
