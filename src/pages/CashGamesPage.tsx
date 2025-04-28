import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Download } from "lucide-react";
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

// Helper function to get attribute value safely (similar to CasinoDetail)
const getAttr = (element: Element | null, attrName: string): string | undefined => {
    return element?.getAttribute(attrName) ?? undefined;
};

const CashGameListItemSkeleton = () => (
  <Card className="card-highlight p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 animate-pulse">
    <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
    </div>
    <div className="flex gap-2 md:gap-3 mt-2 md:mt-0">
      <Skeleton className="buy-in h-5 md:h-6 w-16 md:w-20" />
    </div>
    <Skeleton className="hidden md:block ml-2 h-6 w-6" />
  </Card>
);

const CashGamesPage = () => {
  const [cashGames, setCashGames] = useState<CashGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoCache, setLogoCache] = useState<{ [key: string]: string | null }>({}); // State for logo cache

  // --- Function to fetch logo for a specific club ID ---
  const fetchLogoForClub = useCallback(async (clubId: string) => {
    // Avoid refetching if already cached or fetching failed previously
    if (logoCache[clubId] !== undefined) {
      return;
    }

    console.log(`[CashGamesPage] Fetching logo for clubId: ${clubId}`);
    try {
      const response = await fetch('/pokerlist-api-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(clubId)}`
      });

      if (!response.ok) {
        // Don't throw, just log and mark as failed (null) to prevent retries
        console.error(`[CashGamesPage] API Error fetching details for ${clubId}: ${response.status}`);
        setLogoCache(prev => ({ ...prev, [clubId]: null }));
        return;
      }

      const xmlData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      const clubElement = xmlDoc.querySelector(`POKERLIST > POKERCLUB[ID="${clubId}"]`);

      const logoUrl = getAttr(clubElement, 'LOGOURL');

      console.log(`[CashGamesPage] Logo for ${clubId}: ${logoUrl || 'Not found'}`);
      // Store the found URL or null if not found
      setLogoCache(prev => ({ ...prev, [clubId]: logoUrl || null }));

    } catch (err) {
      console.error(`[CashGamesPage] Failed to fetch/parse logo for ${clubId}:`, err);
      // Mark as failed (null) to prevent retries
      setLogoCache(prev => ({ ...prev, [clubId]: null }));
    }
  }, [logoCache]); // Dependency: logoCache prevents infinite loops if fetchLogoForClub is used directly in useEffect

  // --- Fetch Cash Games Effect ---
  useEffect(() => {
    const fetchCashGames = async () => {
      setIsLoading(true);
      setError(null);
      setLogoCache({}); // Clear logo cache on new fetch
      try {
        const response = await fetch('/api/cash_games.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setCashGames(data);
          // --- Trigger logo fetches after setting cash games ---
          const uniqueClubIds = [...new Set(data.map(game => game.clubid))];
          console.log("[CashGamesPage] Unique Club IDs found:", uniqueClubIds);
          uniqueClubIds.forEach(clubId => {
            // Check cache *before* calling fetch function (though fetch func also checks)
             if (logoCache[clubId] === undefined) {
               fetchLogoForClub(clubId);
             }
          });
          // -----------------------------------------------------
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fetchLogoForClub is memoized with useCallback, safe to exclude if only called like this

  const formatCurrency = (currencyCode: string) => {
    if (currencyCode === 'EUR') return '€';
    if (currencyCode === 'USD') return '$';
    return currencyCode;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="hero-gradient-live py-16 md:py-24 text-center h-[360px] md:h-[280px]">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              Live Cash Games
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8 animate-fade-in">
              Find active cash game tables running now in poker rooms
            </p>
          </div>
        </div>

        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <CashGameListItemSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : cashGames.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No live cash games found.</div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {cashGames.map(game => {
                  const currencySymbol = formatCurrency(game.currency);
                  const stakes = `${currencySymbol}${game.smallblind}/${currencySymbol}${game.bigblind}`;
                  const logoUrl = logoCache[game.clubid]; // Get logo from cache

                  return (
                    <Link key={game.id} to={`/casinos/detail/${game.clubid}`} className="block no-underline">
                      <Card
                        className="card-highlight p-4 flex items-start md:items-center gap-3 hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm text-muted-foreground mt-1 md:mt-0 overflow-hidden border">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={`${game.clubname} Logo`}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = 'none'; /* Hide on error */ }}
                              loading="lazy"
                            />
                          ) : logoUrl === null ? (
                              // Explicitly null means fetch failed or no logo found
                               game.clubname.substring(0, 1).toUpperCase() || 'P'
                          ) : (
                             // Undefined means still loading (or not triggered yet)
                             // Optionally show a mini-skeleton here while loading logo?
                             <Skeleton className="w-full h-full" /> // Simple skeleton while logo loads
                             // Or just show the letter immediately:
                             // game.clubname.substring(0, 1).toUpperCase() || 'P'
                          )}
                        </div>

                        <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
                          <div className="flex-grow">
                            <div className="text-xs md:text-sm text-primary mb-0.5 md:mb-1 font-medium">{game.clubname}</div>
                            <h3 className="text-base md:text-lg font-semibold leading-tight">{game.gametype}</h3>
                          </div>

                          <div className="flex flex-col items-start md:items-end md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm">
                            <div className="flex items-center gap-2 mt-1 md:mt-0">
                              <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-pokerBlue text-white whitespace-nowrap">{stakes}</span>
                              <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-pokerPurple text-white whitespace-nowrap">Players: {game.players}</span>
                            </div>
                            <div className="text-muted-foreground md:text-right md:w-auto flex-shrink-0 mt-1 md:mt-0">
                              Updated: {new Date(game.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
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
