import React, { useState, useEffect } from "react";

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
    <div className="hero-gradient min-h-screen pt-16 flex flex-col justify-center relative overflow-hidden">
      {/* --- Animated Background Blobs --- */}
      <div className="bg-blob bg-pokerPurple w-60 h-60 sm:w-96 sm:h-96 absolute top-[-30px] left-[-40px] sm:top-[-50px] sm:left-[-100px]" style={{ animationDelay: '0s' }}></div>
      <div className="bg-blob bg-pokerBlue w-72 h-72 sm:w-[500px] sm:h-[500px] absolute bottom-[-60px] right-[-60px] sm:bottom-[-150px] sm:right-[-150px]" style={{ animationDelay: '5s' }}></div>
      <div className="bg-blob bg-pokerRed w-40 h-40 sm:w-80 sm:h-80 absolute top-[20%] left-[10%] sm:left-[30%]" style={{ animationDelay: '10s' }}></div>

      <div className="container mx-auto px-4 py-10 sm:py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            {/* Removing the New Feature button
            <div 
              className="inline-block px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 mb-6 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">New Feature</span>
            </div>
            */}
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Find Your Next 
              <span className="bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent block mt-2">Poker Game</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Discover tournaments, cash games, and poker rooms near you with PokerList - your pocket poker companion.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <a 
                href="#download" 
                className="relative group app-download-button px-6 py-3 rounded-md text-white font-semibold text-lg inline-flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-gradient-to-r from-pokerPurple to-pokerBlue rounded-md"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                <span className="relative z-10">Download App</span>
              </a>
              
              <a 
                href="#tournaments" 
                className="border border-white/20 hover:border-primary/80 hover:text-primary px-6 py-3 rounded-md text-white font-semibold text-lg inline-flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/></svg>
                Browse Events
              </a>
            </div>
            
            <div 
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="card-highlight p-4 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">1000+</span>
                <span className="text-gray-400 block mt-1 text-sm">Tournaments</span>
              </div>
              <div className="card-highlight p-4 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">500+</span>
                <span className="text-gray-400 block mt-1 text-sm">Casinos</span>
              </div>
              <div className="card-highlight p-4 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">25+</span>
                <span className="text-gray-400 block mt-1 text-sm">Countries</span>
              </div>
            </div>
          </div>

          <div className="md:pl-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pokerPurple to-pokerBlue rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <img 
                src="/lovable-uploads/a94bc721-c2d6-44e8-92eb-31eb297cd5f6.png" 
                alt="PokerList Mobile App" 
                className="w-full max-w-[280px] mx-auto animate-float relative z-10 rounded-2xl shadow-2xl" 
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-72 h-20 bg-gradient-to-r from-pokerPurple to-pokerBlue opacity-20 blur-2xl rounded-full"></div>
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
