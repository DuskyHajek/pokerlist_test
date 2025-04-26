import React, { useState, useEffect } from "react";
// Remove Tournament import if no longer needed or replace with CashGame type
// import { Tournament } from "../data/mockData"; 
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Update CashGame interface to match API response
interface CashGame {
  id: string; // API returns string IDs
  smallblind: string;
  bigblind: string;
  minbuyin: string | null;
  players: string; // e.g., "8/8"
  gametype: string; // e.g., "OMAHA", "HOLDEM"
  updated: string; // ISO date string
  currency: string; // e.g., "EUR"
  description: string;
  clubname: string;
  clubid: string;
  // No direct logo or location field in this API response
}

// --- Skeleton Component for Live Cash Game Row ---
const LiveCashGameRowSkeleton = () => (
  <div className="card-highlight p-4 flex flex-col md:flex-row md:items-center gap-4">
    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-3/5" />
      <Skeleton className="h-4 w-1/3" />
    </div>
    <div className="flex gap-3 mt-3 md:mt-0">
      <Skeleton className="buy-in-chip h-6 w-16" />
      <Skeleton className="prize-pool-chip h-6 w-20" />
    </div>
    <div className="text-right flex-shrink-0 mt-3 md:mt-0 space-y-1">
      <Skeleton className="h-5 w-20 ml-auto" />
      <Skeleton className="h-4 w-12 ml-auto" />
    </div>
    <Skeleton className="hidden md:block ml-2 h-6 w-6" />
  </div>
);

const LiveCashGames = () => {
  const [cashGames, setCashGames] = useState<CashGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashGames = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/cash_games.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // --- Adjust data handling ---
        // API returns an array directly
        if (Array.isArray(data)) {
            // Limit to 6 for the homepage view (changed from 5)
            setCashGames(data.slice(0, 6)); 
        } else {
             // Handle unexpected data format
             console.warn("Received data is not an array:", data);
             setCashGames([]);
        }
      } catch (e) {
        console.error("Failed to fetch cash games:", e);
        setError("Failed to load cash games. Please try again later.");
        setCashGames([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCashGames();
  }, []);

  // Helper to format currency symbol
  const formatCurrency = (currencyCode: string) => {
      // Basic mapping, expand as needed
      if (currencyCode === 'EUR') return '€';
      if (currencyCode === 'USD') return '$';
      // Add other currencies
      return currencyCode; // Fallback
  };

  return (
    <section className="py-16 md:py-24 bg-pokerDarkBlue relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Live Cash Games</h2>
            <p className="text-muted-foreground">Running poker cash games happening now</p>
          </div>
          <Link to="/cash-games" className="hidden md:flex items-center text-pokerPurple hover:underline">
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div className="max-w-full w-full mx-auto" key={"skeleton-" + index}>
                <LiveCashGameRowSkeleton />
              </div>
            ))
          ) : error ? (
             <div className="text-center text-red-500 py-8">{error}</div>
          ) : cashGames.length === 0 ? (
             <div className="text-center text-muted-foreground py-8">No live cash games currently available.</div>
          ) : (
            cashGames.map((game) => { // Map over cashGames array
              const currencySymbol = formatCurrency(game.currency);
              const stakes = `${currencySymbol}${game.smallblind}/${currencySymbol}${game.bigblind}`;
              
              return (
                <div
                  key={game.id} // Use game.id
                  className="card-highlight p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 max-w-full w-full mx-auto"
                >
                   {/* Placeholder for Logo - maybe use clubid to map later? */}
                   <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                     {/* You could display first letter of clubname or a generic icon */}
                     {game.clubname.substring(0, 1) || 'P'}
                   </div>
                  {/* <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={game.casino.logo} // No logo in API
                      alt={game.casino.name}
                      className="w-full h-full object-cover bg-muted"
                      onError={(e) => (e.currentTarget.src = '/placeholder-logo.png')}
                    />
                  </div> */}
  
                  <div className="flex-grow">
                    {/* Use clubname and maybe link to club page? */}
                    <div className="text-sm text-primary mb-1">{game.clubname}</div> 
                    {/* Use gametype */}
                    <h3 className="text-xl font-semibold mb-2">{game.gametype}</h3> 
                    {/* Use description or maybe players? */}
                    {/* <div className="text-sm text-muted-foreground">Players: {game.players}</div> */}
                  </div>
  
                  {/* Display Stakes and Player Count Chips */}
                  <div className="flex flex-wrap gap-2 mt-3 md:mt-0"> {/* Use flex-wrap for smaller screens */} 
                    {/* Apply buy-in-chip class to stakes */}
                    <span className="buy-in-chip">{stakes}</span> 
                    {/* Apply prize-pool-chip class to players */}
                    <span className="prize-pool-chip">Players: {game.players}</span>
                    {/* Maybe display minbuyin if available? */}
                    {/* {game.minbuyin && <span className="info-chip">Min: {currencySymbol}{game.minbuyin}</span>} */}
                  </div>
  
                  {/* Display last updated time? */}
                  <div className="text-right flex-shrink-0 mt-3 md:mt-0 space-y-1">
                     {/* Format game.updated time */} 
                     <div className="text-sm text-muted-foreground">Updated: {new Date(game.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div> 
                  
                  <ChevronRight className="hidden md:block ml-2 text-muted-foreground" />
                </div>
              );
            })
          )}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link 
            to="/cash-games" 
            className="secondary-cta-button"
          >
            View All Cash Games <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-pokerRed/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-pokerRed/5 blur-3xl"></div>
    </section>
  );
};

export default LiveCashGames;
