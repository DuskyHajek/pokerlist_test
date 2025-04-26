import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CashGame {
  id: string;
  smallblind: string;
  bigblind: string;
  minbuyin: string | null;
  players: string;
  gametype: string;
  updated: string;
  currency: string;
  description: string;
  clubname: string;
  clubid: string;
}

const CashGameListItemSkeleton = () => (
  <div className="card-highlight p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 border border-white/10">
    <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
    </div>
    <div className="flex gap-3 mt-3 md:mt-0">
      <Skeleton className="buy-in h-6 w-20" />
    </div>
    <Skeleton className="hidden md:block ml-2 h-6 w-6" />
  </div>
);

const CashGamesPage = () => {
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
        if (Array.isArray(data)) {
          setCashGames(data);
        } else {
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

  const formatCurrency = (currencyCode: string) => {
    if (currencyCode === 'EUR') return '€';
    if (currencyCode === 'USD') return '$';
    return currencyCode;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="hero-gradient-live hero-lines-live py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Live Cash Games
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center mb-8">
              Find active cash game tables running now in poker rooms
            </p>
          </div>
        </div>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <CashGameListItemSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : cashGames.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No live cash games found matching your criteria.</div>
            ) : (
              <div className="space-y-4">
                {cashGames.map(game => {
                  const currencySymbol = formatCurrency(game.currency);
                  const stakes = `${currencySymbol}${game.smallblind}/${currencySymbol}${game.bigblind}`;

                  return (
                    <div
                      key={game.id}
                      className="card-highlight p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 border border-white/10 hover:border-primary/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm text-muted-foreground">
                        {game.clubname.substring(0, 1) || 'P'}
                      </div>

                      <div className="flex-grow">
                        <div className="text-sm text-primary mb-1">{game.clubname}</div>
                        <h3 className="text-lg font-semibold">{game.gametype}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                        <span className="buy-in-chip">{stakes}</span>
                        <span className="prize-pool-chip">Players: {game.players}</span>
                      </div>

                      <div className="text-right flex-shrink-0 mt-3 md:mt-0 space-y-1 w-24">
                        <div className="text-sm text-muted-foreground">Updated:</div>
                        <div className="text-xs text-muted-foreground">{new Date(game.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>

                      <ChevronRight className="hidden md:block ml-2 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-12 text-center text-muted-foreground">
              <p>For more games and real-time updates, download our app.</p>
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

export default CashGamesPage;
