import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { casinos, tournaments, liveTournaments } from "../data/mockData";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const CasinoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const casino = casinos.find(c => c.id === id);

  if (!casino) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Casino Not Found | PokerList</title>
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Casino Not Found</h2>
            <p className="mb-6">The casino you're looking for doesn't exist or has been removed.</p>
            <a href="/casinos" className="text-primary underline">Back to all casinos</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${casino.name} - Poker Events & Info | PokerList`;
  const pageDescription = `Find upcoming poker tournaments, cash games, contact info, and location for ${casino.name} in ${casino.city}, ${casino.country}.`;

  const casinoTournaments = [...tournaments, ...liveTournaments]
    .filter(t => t.casino.id === id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="hero-gradient py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                <img 
                  src={casino.logo} 
                  alt={casino.name} 
                  className="w-full h-full object-cover bg-muted"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {casino.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>{casino.city}, {casino.country}</span>
                  </div>
                  
                  {casino.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{casino.phoneNumber}</span>
                    </div>
                  )}
                  
                  {casino.email && (
                    <div className="flex items-center gap-1">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{casino.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="card-highlight p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-2">Casino Information</h3>
                  
                  {casino.description && (
                    <div className="mb-6">
                      <p className="text-muted-foreground">{casino.description}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Address</div>
                      <div className="font-medium">{casino.address}</div>
                      <div>{casino.city}, {casino.country}</div>
                    </div>
                    
                    {casino.phoneNumber && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Phone</div>
                        <div className="font-medium">{casino.phoneNumber}</div>
                      </div>
                    )}
                    
                    {casino.email && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Email</div>
                        <div className="font-medium">{casino.email}</div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Website</div>
                      <a href="#" className="text-primary hover:underline flex items-center gap-1">
                        <Globe size={16} />
                        <span>Visit website</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                {casino.latitude && casino.longitude && (
                  <div className="card-highlight p-6">
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <p>Map would be displayed here</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Lat: {casino.latitude}, Lng: {casino.longitude}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Upcoming Tournaments</h2>
                
                {casinoTournaments.length > 0 ? (
                  <div className="space-y-4">
                    {casinoTournaments.map(tournament => (
                      <div
                        key={tournament.id}
                        className="card-highlight p-5 border border-white/10"
                      >
                        <h3 className="text-xl font-semibold mb-2">{tournament.title}</h3>
                        
                        <div className="text-sm text-muted-foreground mb-4">
                          {new Date(tournament.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="buy-in">Buy-in €{tournament.buyIn}</span>
                          <span className="prize-pool">€{tournament.prizePool.toLocaleString()} GTD</span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <p>More details about this tournament can be found in our mobile app.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card-highlight p-6 text-center">
                    <p className="mb-4">No upcoming tournaments at this casino.</p>
                    <p className="text-sm text-muted-foreground">
                      Check back soon or download our app for the latest updates.
                    </p>
                  </div>
                )}
                
                <div className="mt-10 text-center">
                  <p className="mb-4 text-muted-foreground">
                    Find more tournaments and real-time updates in our mobile app.
                  </p>
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CasinoDetail;
