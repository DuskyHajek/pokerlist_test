import React from "react";
import { Smartphone, Apple } from "lucide-react";

const DownloadApp = () => {
  return (
    <section className="py-8 sm:py-10 md:py-16 bg-gradient-to-br from-pokerDarkBlue via-pokerPurple/40 to-pokerRed/30 relative overflow-hidden" id="download">
      <div className="container mx-auto px-4 relative z-10">
        {/* Grid layout for md+ screens, flex-col for mobile */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-10 items-center">
          
          {/* Text & Buttons Column (Order 1 on md) */}
          <div className="order-1 md:order-1 text-center md:text-left">
            {/* Text Content */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Download the PokerList App
              </h2>
              <ul className="space-y-2 sm:space-y-3 max-w-md mx-auto md:mx-0">
                <li className="flex items-start">
                  <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-left">Find tournaments and cash games near you</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-left">Get notified about upcoming poker events</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-left">Track your favorite casinos and tournaments</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-3 sm:mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg text-left">Access exclusive offers and promotions</p>
                </li>
              </ul>
            </div>

            {/* Buttons */}          
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start w-full sm:w-auto mb-10 md:mb-0">
              <a 
                href="https://play.google.com/store/apps/details?id=com.icreativecompany.pokerlist2" 
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white hover:bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-white font-medium inline-flex items-center justify-center transition-colors transition-shadow duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] w-full sm:w-auto"
              >
                <Smartphone className="mr-2" size={18} />
                Google Play
              </a>
              <a 
                href="https://itunes.apple.com/sk/app/pokerlist/id604977349?mt=8" 
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white hover:bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-white font-medium inline-flex items-center justify-center transition-colors transition-shadow duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] w-full sm:w-auto"
              >
                <Apple className="mr-2" size={18} />
                App Store
              </a>
            </div>
          </div>

          {/* Image Column (Order 2 on md) - Added proper mobile spacing */}
          <div className="order-2 md:order-2 flex justify-center items-center mt-6 md:mt-0 pt-4">
            <div className="relative flex justify-center items-center w-[180px] h-[220px] sm:w-[320px] md:w-[350px] sm:h-[320px] md:h-[350px]">
              {/* Single image with decorative effect */}
              <div className="relative">
                <img 
                  src="/PL_screen1.jpeg" 
                  alt="PokerList Mobile App - Events Preview" 
                  className="w-[140px] h-auto sm:w-[260px] md:w-[280px] object-contain rounded-xl shadow-xl transform hover:scale-105 hover:rotate-2 transition-all duration-300 hover:shadow-2xl"
                />
                {/* Decorative effect elements - reduced size for mobile */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-pokerRed/30 to-pokerPurple/30 rounded-xl -z-10 transform -rotate-3 scale-95 blur-sm"></div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 bg-pokerRed/20 rounded-full blur-xl"></div>
                <div className="absolute -top-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 bg-pokerPurple/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-pokerRed/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-pokerRed/15 blur-3xl"></div>
    </section>
  );
};

export default DownloadApp;
