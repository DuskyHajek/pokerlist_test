import React from "react";
import { Smartphone, Apple } from "lucide-react";

const DownloadApp = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-pokerDarkBlue to-background" id="download">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Get the PokerList App
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Access real-time cash game info, tournament schedules, and exclusive features on the go. Available soon!
        </p>
        
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
                <Smartphone className="mr-2" size={20} />
                Google Play
              </a>
              <a 
                href="#" 
                className="border border-white hover:bg-white/10 px-6 py-3 rounded-md text-white font-medium inline-flex items-center justify-center transition-colors"
              >
                <Apple className="mr-2" size={20} />
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
