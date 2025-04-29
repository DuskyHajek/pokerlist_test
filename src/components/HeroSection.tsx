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
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg animate-fade-in"
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
                <Download className="relative z-10 mr-2" size={20} />
                <span className="relative z-10">Download App</span>
              </a>
              
              <a 
                href="#tournaments" 
                className="border border-white/20 hover:border-primary/80 hover:text-primary px-6 py-3 rounded-md text-white font-semibold text-lg inline-flex items-center justify-center transition-all duration-300 active:scale-95"
              >
                <LayoutGrid className="mr-2" size={20} />
                Browse Events
              </a>
            </div>
            
            <div 
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <Card className="card-highlight p-6 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">1000+</span>
                <span className="text-muted-foreground block mt-1 text-sm">Tournaments</span>
              </Card>
              <Card className="card-highlight p-6 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">500+</span>
                <span className="text-muted-foreground block mt-1 text-sm">Casinos</span>
              </Card>
              <Card className="card-highlight p-6 text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-pokerPurple to-pokerBlue bg-clip-text text-transparent">25+</span>
                <span className="text-muted-foreground block mt-1 text-sm">Countries</span>
              </Card>
            </div>
          </div>

          <div className="md:pl-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pokerPurple to-pokerBlue rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <img 
                src="/opengraph-default.png" 
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
