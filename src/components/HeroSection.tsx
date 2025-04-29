import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Download, LayoutGrid } from "lucide-react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

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

  return (
    <div className="hero-gradient min-h-[75vh] sm:min-h-[85vh] pt-16 sm:pt-20 pb-10 sm:pb-16 flex flex-col justify-start relative overflow-hidden">
      {/* --- Animated Background Blobs --- */}
      <div className="bg-blob bg-pokerPurple w-40 h-40 sm:w-96 sm:h-96 absolute top-[-20px] left-[-20px] sm:top-[-50px] sm:left-[-100px]" style={{ animationDelay: '0s' }}></div>
      <div className="bg-blob bg-pokerBlue w-48 h-48 sm:w-[500px] sm:h-[500px] absolute bottom-[-40px] right-[-40px] sm:bottom-[-150px] sm:right-[-150px]" style={{ animationDelay: '5s' }}></div>
      <div className="bg-blob bg-pokerRed w-32 h-32 sm:w-80 sm:h-80 absolute top-[20%] left-[5%] sm:left-[30%]" style={{ animationDelay: '10s' }}></div>

      <div className="container mx-auto px-4 mt-8 sm:mt-12 md:mt-16 relative z-10">
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
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Discover tournaments, cash games, and poker rooms near you with PokerList - your pocket poker companion.
            </p>
            
            {/* Stats Cards - Placed here to appear before image on mobile */}
            <div 
              className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 animate-fade-in mb-6 sm:mb-8 md:mb-0"
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
                <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">18</span>
                <span className="text-muted-foreground block mt-0.5 sm:mt-1 text-xs sm:text-sm">Countries</span>
              </Card>
            </div>

            {/* Buttons - Now part of the text column */}
            <div 
              className="order-3 md:order-3 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-in justify-center md:justify-start"
              style={{ animationDelay: '0.4s' }}
            >
              <a 
                href="#download" 
                className="relative group app-download-button px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-gradient-to-r from-pokerPurple to-pokerBlue rounded-md"></div>
                <Download className="relative z-10 mr-2" size={18} />
                <span className="relative z-10">Download App</span>
              </a>
              <a 
                href="/casinos" 
                className="border border-white/20 hover:border-primary/80 hover:text-primary px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center transition-all duration-300 active:scale-95 w-full sm:w-auto"
              >
                <LayoutGrid className="mr-2" size={18} />
                Browse Casinos
              </a>
            </div>
          </div>

          {/* Image Section - Order 2. Removed negative margin, added md:justify-end */}
          {/* Adjusted container and image sizes for mobile */}
          <div className="order-2 md:order-2 flex justify-center md:justify-end items-center animate-fade-in mt-4 md:mt-0" style={{ animationDelay: '0.6s' }}>
            {/* Made base size even smaller */}
            <div className="relative flex justify-center items-center w-[200px] h-[200px] sm:w-[320px] md:w-[350px] sm:h-[320px] md:h-[350px]">
              {/* Image 1 - Now on top, rotated right */}
              <img
                src="/PL_screen1.jpeg"
                alt="PokerList Mobile App - Events"
                className="absolute w-[130px] h-auto sm:w-[220px] md:w-[240px] object-contain rounded-xl shadow-xl z-10 transform translate-x-2 sm:translate-x-6 rotate-[8deg] hover:rotate-[10deg] hover:scale-105 transition-transform duration-300"
              />
              {/* Image 2 - Now behind, rotated left */}
              <img
                src="/PL_screen2.jpeg"
                alt="PokerList Mobile App - Live Tournaments Preview"
                className="absolute w-[130px] h-auto sm:w-[220px] md:w-[240px] object-contain rounded-xl shadow-lg z-0 transform -translate-x-2 sm:-translate-x-6 -rotate-[8deg] hover:rotate-[-10deg] hover:scale-105 transition-transform duration-300"
              />
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
