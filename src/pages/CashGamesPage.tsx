import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import DownloadApp from "../components/DownloadApp";

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
  <Card className="card-highlight p-6 flex flex-col md:flex-row md:items-center gap-4 animate-pulse">
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
  </Card>
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8">
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
                    <Card
                      key={game.id}
                      className="card-highlight p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm text-muted-foreground">
                        {game.clubname.substring(0, 1) || 'P'}
                      </div>

                      <div className="flex-grow">
                        <div className="text-sm text-primary mb-1">{game.clubname}</div>
                        <h3 className="text-xl font-semibold">{game.gametype}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-pokerBlue text-white">{stakes}</span>
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-pokerPurple text-white">Players: {game.players}</span>
                      </div>

                      <div className="text-right flex-shrink-0 mt-3 md:mt-0 space-y-1 w-24">
                        <div className="text-sm text-muted-foreground">Updated:</div>
                        <div className="text-xs text-muted-foreground">{new Date(game.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>

                      <ChevronRight className="hidden md:block ml-2 text-muted-foreground" />
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <DownloadApp />

      </main>

      <Footer />
    </div>
  );
};

export default CashGamesPage;
