import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { liveTournaments } from "../data/mockData";
import { ChevronRight } from "lucide-react";

const LiveTournamentsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="hero-gradient-live hero-lines-live py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Live Tournaments
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center mb-8">
              Running tournaments happening now at poker rooms
            </p>
          </div>
        </div>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              {liveTournaments.map(tournament => (
                <div
                  key={tournament.id}
                  className="card-highlight p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 border border-white/10 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={tournament.casino.logo}
                      alt={tournament.casino.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-sm text-primary mb-1">{tournament.casino.name}</div>
                    <h3 className="text-lg font-semibold">{tournament.title}</h3>
                    <div className="text-sm text-muted-foreground">{tournament.location}</div>
                  </div>
                  
                  <div className="flex gap-3 mt-3 md:mt-0">
                    <span className="buy-in">€{tournament.buyIn}</span>
                    <span className="prize-pool">€{tournament.prizePool.toLocaleString()}</span>
                  </div>
                  
                  <div className="text-right flex-shrink-0 mt-3 md:mt-0">
                    <div className="text-lg font-medium">
                      {new Date(tournament.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">14:00</div>
                  </div>
                  
                  <ChevronRight className="hidden md:block ml-2 text-muted-foreground" />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center text-muted-foreground">
              <p>For more tournaments and real-time updates, download our app.</p>
              <div className="mt-4">
                <a 
                  href="/#download" 
                  className="app-download-button px-6 py-3 rounded-md text-white font-medium inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                  Download App
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveTournamentsPage;
