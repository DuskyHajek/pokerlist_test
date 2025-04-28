import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import DownloadApp from "../components/DownloadApp";
import { Link } from "react-router-dom";

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
  logoUrl?: string;
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

// Helper to get attribute value safely (similar to CasinoDetail)
const getAttr = (element: Element | null, attrName: string): string | undefined => {
    return element?.getAttribute(attrName) ?? undefined;
};

// Function to fetch COUNTRY code for a single club ID using the detail API
const fetchCountryForClub = async (clubId: string): Promise<{ clubId: string; countryCode: string | undefined }> => {
    console.log(`[fetchCountryForClub] Fetching country for club ID: ${clubId}`);
    try {
        const response = await fetch('/pokerlist-api-detail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${encodeURIComponent(clubId)}`
        });
        if (!response.ok) {
            console.error(`[fetchCountryForClub] Detail API error for club ${clubId}: Status ${response.status}`);
            return { clubId, countryCode: undefined };
        }
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const clubElement = xmlDoc.querySelector(`POKERLIST > POKERCLUB[ID="${clubId}"]`);
        const countryCode = getAttr(clubElement, 'COUNTRY');
        console.log(`[fetchCountryForClub] Found country for ${clubId}: ${countryCode}`);
        return { clubId, countryCode };
    } catch (error) {
        console.error(`[fetchCountryForClub] Failed to fetch/parse country for club ${clubId}:`, error);
        return { clubId, countryCode: undefined };
    }
};

// Function to fetch club list (including logos) for a single COUNTRY using the list API
const fetchLogosForCountry = async (countryCode: string): Promise<{ clubId: string; logoUrl: string | undefined }[]> => {
    console.log(`[fetchLogosForCountry] Fetching logos for country: ${countryCode}`);
    try {
        const response = await fetch('/pokerlist-api', { // Use the list API proxy
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `country=${encodeURIComponent(countryCode)}`
        });
        if (!response.ok) {
            console.error(`[fetchLogosForCountry] List API error for country ${countryCode}: Status ${response.status}`);
            return [];
        }
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const clubElements = xmlDoc.querySelectorAll(`POKERLIST > POKERCLUB`); // Get all clubs in the response
        const logos: { clubId: string; logoUrl: string | undefined }[] = [];
        clubElements.forEach(clubElement => {
            const clubId = getAttr(clubElement, 'ID');
            if (clubId) {
                logos.push({
                    clubId: clubId,
                    logoUrl: getAttr(clubElement, 'LOGOURL')
                });
            }
        });
        console.log(`[fetchLogosForCountry] Found ${logos.length} logos for country ${countryCode}`);
        return logos;
    } catch (error) {
        console.error(`[fetchLogosForCountry] Failed to fetch/parse logos for country ${countryCode}:`, error);
        return [];
    }
};

const CashGamesPage = () => {
  const [cashGames, setCashGames] = useState<CashGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashGamesAndLogos = async () => {
      setIsLoading(true);
      setError(null);
      let initialCashGames: CashGame[] = [];

      try {
        console.log("[CashGamesPage useEffect] Fetching initial cash games...");
        const response = await fetch('/api/cash_games.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          initialCashGames = data;
          setCashGames(data);
          console.log("[CashGamesPage useEffect] Initial cash games fetched:", initialCashGames.length);
        } else {
          console.warn("[CashGamesPage useEffect] Received data is not an array:", data);
          setCashGames([]);
        }

        // --- Step 2: Fetch Country Codes for unique clubs ---
        if (initialCashGames.length > 0) {
            console.log("[CashGamesPage useEffect] Fetching country codes...");
            const uniqueClubIds = [...new Set(initialCashGames.map(game => game.clubid))];
            console.log("[CashGamesPage useEffect] Unique club IDs:", uniqueClubIds);

            // Fetch countries concurrently
            const countryPromises = uniqueClubIds.map(id => fetchCountryForClub(id));
            const clubCountryResults = await Promise.all(countryPromises);

            // Create clubId -> countryCode map
            const clubCountryMap = new Map<string, string>();
            const uniqueCountryCodes = new Set<string>();
            clubCountryResults.forEach(result => {
                if (result.countryCode) {
                    clubCountryMap.set(result.clubId, result.countryCode);
                    uniqueCountryCodes.add(result.countryCode);
                }
            });
            console.log("[CashGamesPage useEffect] Club -> Country map created:", clubCountryMap);
            console.log("[CashGamesPage useEffect] Unique country codes found:", [...uniqueCountryCodes]);

            if (uniqueCountryCodes.size === 0) {
                 console.warn("[CashGamesPage useEffect] No country codes found for clubs. Cannot fetch logos.");
                 setIsLoading(false); // Stop loading if we can't proceed
                 return;
            }

            // --- Step 3: Fetch Logos using Country Codes ---
            console.log("[CashGamesPage useEffect] Fetching logos by country...");
            const logoListPromises = [...uniqueCountryCodes].map(code => fetchLogosForCountry(code));
            const countryLogoLists = await Promise.all(logoListPromises);

            // Flatten results and create clubId -> logoUrl map
            const clubLogoMap = new Map<string, string | undefined>();
            countryLogoLists.flat().forEach(logoInfo => {
                if (logoInfo.logoUrl) { // Only add if logo exists
                    clubLogoMap.set(logoInfo.clubId, logoInfo.logoUrl);
                }
            });
            console.log("[CashGamesPage useEffect] Final Logo map created:", clubLogoMap);

            // --- Step 4: Update cash games state with logos ---
            const gamesWithLogos = initialCashGames.map(game => ({
                ...game,
                logoUrl: clubLogoMap.get(game.clubid) // Add logoUrl from final map
            }));
            setCashGames(gamesWithLogos);
            console.log("[CashGamesPage useEffect] Updated cash games with logos.");
        }

      } catch (e) {
        console.error("[CashGamesPage useEffect] Failed to fetch data:", e);
        setError(e instanceof Error ? e.message : "Failed to load cash games. Please try again later.");
        setCashGames([]);
      } finally {
        setIsLoading(false);
        console.log("[CashGamesPage useEffect] Fetch process finished.");
      }
    };

    fetchCashGamesAndLogos();
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
                  const stakes = `${game.smallblind}/${game.bigblind} ${currencySymbol}`;
                  const slug = createSlug(game.clubname);

                  return (
                    <Link
                      key={game.id}
                      to={`/casino/${game.clubid}/${slug}`}
                      state={{ logoUrl: game.logoUrl }}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                    >
                      <Card
                        className="card-highlight p-4 flex items-start md:items-center gap-3 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm text-muted-foreground mt-1 md:mt-0 overflow-hidden border border-border">
                           {game.logoUrl ? (
                               <img
                                src={game.logoUrl}
                                alt={`${game.clubname} logo`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if(parent) parent.innerHTML = game.clubname.substring(0, 1) || 'P';
                                }}
                               />
                           ) : (
                             game.clubname.substring(0, 1) || 'P'
                           )}
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
