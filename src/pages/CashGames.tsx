import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CashGames = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="hero-gradient py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              Live Cash Games
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center mb-8 animate-fade-in">
              Find ongoing cash games at poker rooms near you
            </p>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're working on bringing you the most up-to-date information about live cash games around the world. 
                Download our mobile app to get access to this feature today!
              </p>
              
              <div className="mt-8">
                <a 
                  href="/#download" 
                  className="app-download-button px-6 py-3 rounded-md text-white font-medium inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16"></path><path d="M9 4v16"></path><path d="M14 4v16"></path><path d="M19 4v16"></path><path d="M4 9h16"></path><path d="M4 14h16"></path></svg>
                  Download App
                </a>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto card-highlight p-8 border border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/c94440e7-a2f7-4833-9fc9-bbf34d1beb89.png" 
                    alt="PokerList Logo" 
                    className="w-32 h-32 mx-auto md:mx-0 animate-float" 
                  />
                </div>
                
                <div className="md:w-1/2 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Live Cash Game Data</h3>
                  <p className="text-muted-foreground mb-4">
                    Get real-time information about cash games, including:
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                      <span>Game types and stakes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                      <span>Table availability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"></path></svg>
                      <span>Waiting lists</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashGames;
