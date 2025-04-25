import React from "react";

const DownloadApp = () => {
  return (
    <section id="download" className="py-16 md:py-24 hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Download the PokerList App
            </h2>
            
            <ul className="space-y-6 mb-8 max-w-md mx-auto md:mx-0">
              <li className="flex items-start">
                <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <p className="text-lg">Find tournaments and cash games near you</p>
              </li>
              <li className="flex items-start">
                <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <p className="text-lg">Get notified about upcoming poker events</p>
              </li>
              <li className="flex items-start">
                <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <p className="text-lg">Track your favorite casinos and tournaments</p>
              </li>
              <li className="flex items-start">
                <div className="bg-pokerRed/20 rounded-full p-1 mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-pokerRed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <p className="text-lg">Access exclusive offers and promotions</p>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#" 
                className="border border-white hover:bg-white/10 px-6 py-3 rounded-md text-white font-medium inline-flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                Google Play
              </a>
              <a 
                href="#" 
                className="border border-white hover:bg-white/10 px-6 py-3 rounded-md text-white font-medium inline-flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                App Store
              </a>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-pokerRed/20 to-transparent rounded-3xl"></div>
              <img 
                src="/lovable-uploads/689dfef7-edcf-42aa-bde4-0a45734c3ee5.png" 
                alt="PokerList Mobile App" 
                className="w-full max-w-[280px] mx-auto animate-float relative z-10 rounded-2xl shadow-2xl" 
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-72 h-20 bg-pokerRed/20 blur-2xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-pokerRed/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-pokerRed/10 blur-3xl"></div>
    </section>
  );
};

export default DownloadApp;
