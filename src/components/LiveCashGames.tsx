import React, { useState, useEffect } from "react";
// Remove Tournament import if no longer needed or replace with CashGame type
// import { Tournament } from "../data/mockData"; 
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Revert CashGame interface: Remove logoUrl and countryCode
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
  // logoUrl?: string; // Removed
  // countryCode?: string; // Removed
}

// --- Helper function to generate a URL-friendly slug ---
const createSlug = (name: string): string => {
  if (!name) return '';

  const slug = name
    .toString()
    .normalize('NFD') // Split accented characters into base letters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars except hyphen
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

  return slug;
};

// --- Skeleton Component for Live Cash Game Row ---
const LiveCashGameRowSkeleton = () => (
  <Card className="card-highlight p-4 flex items-start md:items-center gap-3 animate-pulse">
    <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 mt-1 md:mt-0" />
    <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
      <div className="flex-grow space-y-1.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-3/5" />
      </div>
      <div className="flex flex-col items-start md:items-end md:flex-row md:items-center gap-1 md:gap-3 mt-1 md:mt-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-20 mt-1 md:mt-0" />
      </div>
    </div>
    <Skeleton className="hidden md:block ml-1 md:ml-2 h-6 w-6 self-center" />
  </Card>
);

const LiveCashGames = () => {
  const [cashGames, setCashGames] = useState<CashGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Revert fetchCashGames to only fetch basic list
  const fetchCashGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[LiveCashGames fetch] Fetching initial cash games...");
      const response = await fetch('/api/cash_games.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
          setCashGames(data.slice(0, 6)); // Set state directly
          console.log("[LiveCashGames fetch] Initial games fetched and set:", data.slice(0, 6).length);
      } else {
           console.warn("[LiveCashGames fetch] Received data is not an array:", data);
           setCashGames([]);
           setError("Invalid data format received from server.");
      }
    } catch (e) {
      console.error("[LiveCashGames fetch] Failed to fetch data:", e);
      setError("Failed to load cash games. Please try again later.");
      setCashGames([]);
    } finally {
      setIsLoading(false);
      console.log("[LiveCashGames fetch] Fetch process finished.");
    }
  };

  useEffect(() => {
    fetchCashGames();
  }, []);

  const formatCurrency = (currencyCode: string) => {
      if (currencyCode === 'EUR') return '€';
      if (currencyCode === 'USD') return '$';
      return currencyCode;
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

        <div className="space-y-3 md:space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div className="max-w-full w-full mx-auto" key={"skeleton-" + index}>
                <LiveCashGameRowSkeleton />
              </div>
            ))
          ) : error ? (
             <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col">
                  <p>{error}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchCashGames} 
                    className="mt-3 w-fit flex items-center gap-1.5"
                  >
                    <RefreshCw size={14} />
                    Retry
                  </Button>
                </AlertDescription>
             </Alert>
          ) : cashGames.length === 0 ? (
             <div className="text-center py-8">
                <Card className="p-6 mx-auto max-w-md">
                  <p className="text-muted-foreground mb-4">No live cash games currently available.</p>
                  <Button onClick={fetchCashGames} variant="outline" size="sm" className="mx-auto flex items-center gap-1.5">
                    <RefreshCw size={14} />
                    Refresh
                  </Button>
                </Card>
             </div>
          ) : (
            cashGames.map((game) => {
              const currencySymbol = formatCurrency(game.currency);
              const stakes = `${game.smallblind}/${game.bigblind} ${currencySymbol}`;
              const slug = createSlug(game.clubname);

              return (
                <Card
                  key={game.id}
                  className="card-highlight p-4 flex items-start md:items-center gap-3 max-w-full w-full mx-auto"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm text-muted-foreground mt-1 md:mt-0 overflow-hidden border border-border">
                     {game.clubname.substring(0, 1) || 'P'}
                  </div>

                  <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
                    <div className="flex-grow">
                      <div className="text-xs md:text-sm text-primary mb-0.5 md:mb-1 font-medium">{game.clubname}</div>
                      <h3 className="text-base md:text-lg font-semibold leading-tight">{game.gametype}</h3>
                    </div>

                    <div className="flex flex-col items-start md:items-end md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm">
                      <div className="flex items-center gap-2 mt-1 md:mt-0">
                        <span className="px-2 py-1 text-sm font-bold rounded bg-pokerBlue text-white whitespace-nowrap">{stakes}</span>
                        <span className="px-2 py-1 text-sm font-semibold rounded bg-pokerPurple text-white whitespace-nowrap">Players: {game.players}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link
            to="/cash-games"
          >
            <Button
              variant="outline"
              className={cn(
                "border-white/20 text-white hover:border-primary/80 hover:text-primary active:scale-95 transition-all duration-300",
                "px-6 py-3"
              )}
            >
              View All Cash Games <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-pokerRed/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-pokerRed/5 blur-3xl"></div>
    </section>
  );
};

export default LiveCashGames;
