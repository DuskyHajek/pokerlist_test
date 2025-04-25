import React, { useState, useEffect } from "react";
import { Tournament } from "../data/mockData";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LiveCashGamesProps {
  tournaments: Tournament[];
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

const LiveCashGames = ({ tournaments }: LiveCashGamesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1700); // Simulate loading (slightly different delay)
    return () => clearTimeout(timer);
  }, []);

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
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div className="max-w-full w-full mx-auto" key={"skeleton-" + index}><LiveCashGameRowSkeleton /></div>
              ))
            : tournaments.map(tournament => (
                <div
                  key={tournament.id}
                  className="card-highlight p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 max-w-full w-full mx-auto"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={tournament.casino.logo}
                      alt={tournament.casino.name}
                      className="w-full h-full object-cover bg-muted"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-sm text-primary mb-1">{tournament.casino.name}</div>
                    <h3 className="text-xl font-semibold mb-2">{tournament.title}</h3>
                    <div className="text-sm text-muted-foreground">{tournament.location}</div>
                  </div>
                  
                  <div className="flex gap-3 mt-3 md:mt-0">
                    <span className="buy-in-chip">€{tournament.buyIn}</span>
                    <span className="prize-pool-chip">€{tournament.prizePool.toLocaleString()}</span>
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
