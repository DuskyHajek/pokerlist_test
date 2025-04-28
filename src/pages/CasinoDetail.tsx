import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Phone, Globe, AlertCircle, ExternalLink, CalendarDays, Users, CircleDollarSign, Image as ImageIcon, Euro, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import DownloadApp from "../components/DownloadApp";

// --- Updated Casino Interface ---
interface Casino {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude?: string;
  longitude?: string;
  contact?: string;
  url?: string;
  logo?: string;
  size?: string;
  rank?: string;
  description?: string;
  imgUrl?: string;
}

// --- Interface for Live Tournaments ---
// Based on attributes seen in the <LIVEPOKER> tags
interface LiveTournament {
  id: string;
  title: string;
  startDateStr: string;
  currency: string;
  buyin: string;
  description?: string;
  guaranteed?: string;
  latereg?: string;
}

// --- Interface for Cash Games (Assumed Structure) ---
// NEED TO CONFIRM ACTUAL STRUCTURE if/when API returns it
interface CashGame {
  id: string;
  smallblind: string;
  bigblind: string;
  gametype: string;
  players?: string;
  currency?: string;
  updated?: string;
  minbuyin?: string;
  clubid: string;
}

// --- Interface for Club Pictures ---
interface ClubPicture {
    href: string;
}

// --- Skeleton Component (Remains the same) ---
const CasinoDetailSkeleton = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 bg-background">
        {/* Skeleton Header */}
        <div className="hero-gradient-casinos hero-lines-casinos py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted/30 border-4 border-white/50 flex-shrink-0" />
            <div className="text-center md:text-left">
              <Skeleton className="h-10 w-64 md:w-96 mb-3 bg-muted/40" />
              <Skeleton className="h-6 w-48 md:w-64 bg-muted/40" />
            </div>
          </div>
        </div>
        {/* Skeleton Body */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden shadow-lg mb-8">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-8 w-1/3" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-5 w-5 mt-1" /> <Skeleton className="h-5 w-full" />
                </div>
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-5 w-5 mt-1" /> <Skeleton className="h-5 w-3/4" />
                </div>
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-5 w-5 mt-1" /> <Skeleton className="h-5 w-1/2" />
                </div>
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-5 w-5 mt-1" /> <Skeleton className="h-5 w-1/2" />
                </div>
                <div className="pt-4">
                   <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
             <Card className="overflow-hidden shadow-lg mb-8">
               <CardHeader><CardTitle><Skeleton className="h-8 w-1/2" /></CardTitle></CardHeader>
               <CardContent><Skeleton className="h-20 w-full" /></CardContent>
             </Card>
             <Card className="overflow-hidden shadow-lg">
               <CardHeader><CardTitle><Skeleton className="h-8 w-1/2" /></CardTitle></CardHeader>
               <CardContent><Skeleton className="h-20 w-full" /></CardContent>
             </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );

// --- Helper to get attribute value safely ---
const getAttr = (element: Element | null, attrName: string): string | undefined => {
    return element?.getAttribute(attrName) ?? undefined;
};

// --- Helper to format date string ---
const formatTournamentDate = (dateStr: string | undefined): { date: string; time: string } | null => {
    if (!dateStr) return null;
    try {
        // Assuming dateStr is like "YYYY-MM-DD HH:MM:SS"
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) return null; // Return null if invalid
        return {
            date: format(dateObj, 'eee, MMM d, yyyy'),
            time: format(dateObj, 'HH:mm')
        };
    } catch (e) {
        console.error("Error formatting date:", dateStr, e);
        return null; // Fallback to null
    }
};

// Add country code to name mapping and flag util
const countryCodeToName: Record<string, string> = {
  SK: "Slovakia", CZ: "Czech Republic", MT: "Malta", AT: "Austria", HU: "Hungary", PL: "Poland", DE: "Germany", CH: "Switzerland", GB: "United Kingdom", IE: "Ireland", DK: "Denmark", FR: "France", BE: "Belgium", SI: "Slovenia", IT: "Italy", ES: "Spain", PT: "Portugal", NL: "Netherlands",
};
const getFlagUrl = (code: string) => `https://flagcdn.com/${code.toLowerCase()}.svg`;

// Add this function near the top of the file, with other helper functions
const formatCurrency = (currencyCode: string) => {
  if (currencyCode === 'EUR') return '€';
  if (currencyCode === 'USD') return '$';
  return currencyCode;
};

const CasinoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedCountryCode = location.state?.countryCode as string | undefined;
  const passedLogoUrl = location.state?.logoUrl as string | undefined;

  console.log(`[CasinoDetail Render] id: ${id}, passedCountryCode: ${passedCountryCode}, passedLogoUrl: ${passedLogoUrl}`);

  const [casino, setCasino] = useState<Casino | null>(null);
  const [liveTournaments, setLiveTournaments] = useState<LiveTournament[]>([]);
  const [cashGames, setCashGames] = useState<CashGame[]>([]);
  const [clubPictures, setClubPictures] = useState<ClubPicture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [showAllTournaments, setShowAllTournaments] = useState(false);

  useEffect(() => {
    if (passedCountryCode) {
      const code = passedCountryCode.toUpperCase();
      const nameToSet = countryCodeToName[code] || code;
      setCountryName(nameToSet);
      // Optionally, you can set a countryFlag state if you want to display the flag
    } else {
      setCountryName("Unknown Country");
    }

    if (!id) {
      console.error("[CasinoDetail useEffect] ID is missing!");
      setError("Casino ID is missing from URL parameter.");
      setIsLoading(false);
      return;
    }

    const fetchCasinoData = async () => {
      console.log(`[CasinoDetail fetch] Fetching data for id: ${id}`);
      setIsLoading(true);
      setError(null);
      // Reset states
      setCasino(null);
      setLiveTournaments([]);
      setCashGames([]); // Reset cash games state
      setClubPictures([]);
      setShowAllTournaments(false);

      try {
        // --- Fetch 1: Casino Details (XML) ---
        const casinoDetailResponse = await fetch('/pokerlist-api-detail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `id=${encodeURIComponent(id)}`
        });

        if (!casinoDetailResponse.ok) {
          const errorText = await casinoDetailResponse.text().catch(() => 'Could not read casino detail error response.');
          console.error(`[CasinoDetail fetch] Casino Detail API Error (status ${casinoDetailResponse.status}):`, errorText);
          throw new Error(`Casino Detail API error! status: ${casinoDetailResponse.status}`); // Simplified error message
        }

        const xmlData = await casinoDetailResponse.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const parseError = xmlDoc.querySelector("parsererror");
         if (parseError) {
            console.error("[CasinoDetail parse] XML Parsing Error:", parseError.textContent);
             throw new Error("Failed to parse XML response.");
         }

        const pokerlistElement = xmlDoc.querySelector("POKERLIST");
        if (!pokerlistElement) {
            throw new Error("Invalid XML structure: <POKERLIST> tag not found.");
        }
        const clubElement = pokerlistElement.querySelector(`POKERCLUB[ID="${id}"]`); // More specific selector
        if (!clubElement) {
          console.error(`[CasinoDetail parse] Casino with ID ${id} not found in the API response XML.`);
          throw new Error(`Casino with ID ${id} not found in API response.`);
        }

        // Parse Casino Details from XML
        let rawDescription = getAttr(clubElement, 'DESCRIPTION')?.replace(/&#10;/g, '\n') || '';
        const addressLineStartIndex = rawDescription.search(/^Address:/im);
        let cleanedDescription = rawDescription;
        if (addressLineStartIndex !== -1) {
            const precedingNewlineIndex = rawDescription.lastIndexOf('\n', addressLineStartIndex -1);
            const actualStartIndex = (precedingNewlineIndex === -1) ? 0 : precedingNewlineIndex;
            cleanedDescription = rawDescription.substring(0, actualStartIndex).trim();
        }
        const casinoDetails: Casino = {
            id: getAttr(clubElement, 'ID')!,
            name: getAttr(clubElement, 'TITLE') || 'N/A',
            address: getAttr(clubElement, 'ADDRESS') || '',
            city: getAttr(clubElement, 'CITY') || '',
            latitude: getAttr(clubElement, 'LATITUDE'),
            longitude: getAttr(clubElement, 'LONGITUDE'),
            contact: getAttr(clubElement, 'CONTACT'),
            url: getAttr(clubElement, 'URL'),
            logo: getAttr(clubElement, 'LOGOURL'), // Keep this
            size: getAttr(clubElement, 'SIZE'),
            rank: getAttr(clubElement, 'RANK'),
            description: cleanedDescription,
            imgUrl: getAttr(clubElement, 'IMGURL'),
        };
        const finalCasinoDetails: Casino = {
          ...casinoDetails,
          logo: passedLogoUrl || casinoDetails.logo, // Prioritize passed logo
        };
        console.log("[CasinoDetail state] Setting final casino state:", finalCasinoDetails);
        setCasino(finalCasinoDetails);


        // Parse Live Tournaments from XML
        const tournamentElements = pokerlistElement.querySelectorAll("LIVETOURNAMENTS LIVEPOKER");
        const tournaments: LiveTournament[] = Array.from(tournamentElements).map(el => ({
            id: getAttr(el, 'ID')!,
            title: getAttr(el, 'TITLE') || 'N/A',
            startDateStr: getAttr(el, 'STARTDATESTR') || '',
            currency: getAttr(el, 'CURRENCY') || '',
            buyin: getAttr(el, 'BUYIN') || 'N/A',
            description: getAttr(el, 'DESCRIPTION'),
            guaranteed: getAttr(el, 'GUARANTEED'),
            latereg: getAttr(el, 'LATEREG'),
        }));
        console.log("[CasinoDetail state] Setting liveTournaments state:", tournaments);
        setLiveTournaments(tournaments);

        // Parse Club Pictures from XML
        const pictureElements = pokerlistElement.querySelectorAll("CLUBPICTURES PICTURE");
        const pictures: ClubPicture[] = Array.from(pictureElements).map(el => ({
            href: getAttr(el, 'href') || '',
        })).filter(p => p.href);
        console.log("[CasinoDetail state] Setting clubPictures state:", pictures);
        setClubPictures(pictures);

        // --- Fetch 2: Live Cash Games (JSON) ---
        console.log(`[CasinoDetail fetch] Fetching live cash games from /api/cash_games.php for club ID: ${id}`);
        try {
            const cashGameResponse = await fetch('/api/cash_games.php');
            if (!cashGameResponse.ok) {
                // Log error but don't throw, allow casino details to still render
                console.error(`[CasinoDetail fetch] Cash Game API Error (status ${cashGameResponse.status}): Could not fetch live cash games.`);
                // Set cash games to empty array or handle error state appropriately
                setCashGames([]);
            } else {
                const allCashGames: CashGame[] = await cashGameResponse.json();
                if (Array.isArray(allCashGames)) {
                    // Filter games for the current casino ID
                    const filteredGames = allCashGames.filter(game => game.clubid === id);
                    console.log(`[CasinoDetail state] Setting cashGames state (filtered from JSON):`, filteredGames);
                    setCashGames(filteredGames);
                } else {
                    console.warn("[CasinoDetail fetch] Received cash game data is not an array:", allCashGames);
                    setCashGames([]);
                }
            }
        } catch (cashGameError) {
             console.error("[CasinoDetail fetch] Failed to fetch or process live cash games:", cashGameError);
             // Decide how to handle this - maybe show a specific error message for cash games?
             // For now, just setting to empty and logging. The main casino details might still be valid.
             setCashGames([]);
        }

      } catch (err) {
        // This catches errors from the main XML fetch/parse
        console.error("[CasinoDetail fetch/parse Error] Failed to fetch or parse casino details:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred fetching casino details");
        // Ensure other states are clear if the main fetch fails
         setCasino(null);
         setLiveTournaments([]);
         setCashGames([]);
         setClubPictures([]);
      } finally {
        console.log(`[CasinoDetail fetch] Finished fetching data for id: ${id}`);
        setIsLoading(false);
      }
    };

    fetchCasinoData();

  }, [id, passedCountryCode, passedLogoUrl]); // Keep dependencies

  if (isLoading) {
    return <CasinoDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Error Loading Casino | PokerList</title>
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center bg-background">
          <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive" className="max-w-2xl mx-auto">
               <AlertCircle className="h-4 w-4" />
              <AlertTitle>Failed to Load Casino Details</AlertTitle>
              <AlertDescription>
                <p>There was an error fetching or processing details for this casino.</p>
                <p className="text-sm text-muted-foreground mt-2">Error: {error}</p>
                <div className="mt-4">
                   <Button variant="outline" size="sm" asChild>
                     <Link to={passedCountryCode ? `/casinos/${passedCountryCode}` : "/casinos"}>
                       Back to Casinos{countryName ? ` in ${countryName}` : ''}
                     </Link>
                   </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!casino) {
     return (
      <div className="min-h-screen flex flex-col">
         <Helmet>
           <title>Casino Not Found | PokerList</title>
         </Helmet>
        <Navbar />
         <main className="flex-grow pt-16 flex items-center justify-center bg-background">
           <div className="text-center p-8">
             <h2 className="text-3xl font-bold mb-4">Casino Not Found</h2>
             <p className="mb-6">The casino details could not be loaded or the casino was not found.</p>
            <Button variant="outline" asChild>
              <Link to={passedCountryCode ? `/casinos/${passedCountryCode}` : "/casinos"}>
                 Back to Casinos{countryName ? ` in ${countryName}` : ''}
               </Link>
            </Button>
           </div>
         </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${casino.name} | ${countryName || casino.city} | PokerList`;
  const pageDescription = `Details, tournaments, and games for ${casino.name} poker room in ${casino.city}, ${countryName || ''}. Address: ${casino.address}.`;

  const displayedTournaments = showAllTournaments
    ? liveTournaments
    : liveTournaments.slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16 bg-background">
        <div
           className={cn(
             "hero-gradient-casinos hero-lines-casinos py-16 md:py-20 relative bg-cover bg-center",
             !casino.imgUrl && "bg-gray-800"
           )}
           style={casino.imgUrl ? { backgroundImage: `url(${casino.imgUrl})` } : {}}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
             <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/50 bg-muted flex-shrink-0 flex items-center justify-center shadow-lg">
                 {casino.logo ? (
                    <img
                     src={casino.logo}
                     alt={`${casino.name} Logo`}
                     className="w-full h-full object-cover"
                     onError={(e) => {
                         e.currentTarget.style.display = 'none';
                     }}
                   />
                 ) : null}
               </div>
               <div className="text-center md:text-left">
                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
                   {casino.name}
                 </h1>
                 <p className="text-lg md:text-xl text-primary-foreground/80 flex items-center justify-center md:justify-start gap-2">
                   <MapPin className="w-5 h-5 inline-block flex-shrink-0" />
                   {casino.city}, {countryName || ''}
                 </p>
               </div>
             </div>
           </div>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 space-y-12">
             <Card className="overflow-hidden shadow-lg border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Casino Information
                </CardTitle>
              </CardHeader>
               <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-card-foreground">
                 <div className="space-y-5">
                   {casino.address && (
                       <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" /> Address
                          </h3>
                          <p className="leading-snug">{casino.address}</p>
                          <p className="leading-snug">{casino.city}{countryName && `, ${countryName}`}</p>
                       </div>
                   )}
                   {casino.contact && (
                     <div>
                       <h3 className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                         <Phone className="w-4 h-4 flex-shrink-0" /> Contact
                       </h3>
                       <a href={`tel:${casino.contact}`} className="text-primary hover:underline transition-colors break-all">{casino.contact}</a>
                     </div>
                   )}
                   {casino.url && (
                     <div>
                       <h3 className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                          <Globe className="w-4 h-4 flex-shrink-0" /> Website
                       </h3>
                       <a
                         href={casino.url.startsWith('http') ? casino.url : `http://${casino.url}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-primary hover:underline break-all inline-flex items-center gap-1"
                       >
                         {casino.url} <ExternalLink className="w-3 h-3 flex-shrink-0" />
                       </a>
                     </div>
                    )}
                    {casino.latitude && casino.longitude && (
                       <div className="pt-1">
                         <Button variant="outline" size="sm" asChild>
                           <a
                            href={`https://www.google.com/maps/search/?api=1&query=${casino.latitude},${casino.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                           >
                             View on Map <ExternalLink className="w-3 h-3" />
                           </a>
                         </Button>
                       </div>
                    )}
                 </div>

                  <div className="space-y-5">
                    {casino.description && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                                <Info className="w-4 h-4 flex-shrink-0" /> Description
                            </h3>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{casino.description}</p>
                        </div>
                    )}
                    {casino.size && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1.5">Size Indicator</h3>
                        <p>{casino.size}</p>
                      </div>
                    )}
                    {casino.rank && casino.rank !== "0" && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1.5">Rank</h3>
                        <p>{casino.rank}</p>
                      </div>
                    )}
                  </div>

               </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Cash Games</CardTitle>
              </CardHeader>
              <CardContent>
                {cashGames.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {cashGames.map((g) => {
                      const currencySymbol = formatCurrency(g.currency || '');
                      const stakes = `${currencySymbol}${g.smallblind}/${currencySymbol}${g.bigblind}`;
                      const updatedTime = g.updated 
                          ? new Date(g.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                          : null; 

                      return (
                        <Card key={g.id} className="card-highlight p-4 flex items-start md:items-center gap-3">
                            <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
                                <div className="flex-grow">
                                    <h3 className="text-base md:text-lg font-semibold leading-tight">{g.gametype}</h3>
                                </div>

                                <div className="flex flex-col items-start md:items-end md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm">
                                    <div className="flex items-center gap-2 mt-1 md:mt-0">
                                        <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-pokerBlue text-white whitespace-nowrap">{stakes}</span>
                                        {g.players && (
                                            <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-pokerPurple text-white whitespace-nowrap">
                                                Players: {g.players}
                                            </span>
                                        )}
                                    </div>
                                    {updatedTime && (
                                        <div className="text-muted-foreground md:text-right md:w-auto flex-shrink-0 mt-1 md:mt-0">
                                            Updated: {updatedTime}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No live cash games reported for this casino at the moment.</p>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Live Tournaments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {liveTournaments.length > 0 ? (
                    displayedTournaments.map((tournament) => {
                        const formattedDate = formatTournamentDate(tournament.startDateStr);
                        return (
                           <Card key={tournament.id} className="card-highlight p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                             <div className="flex-grow">
                                {formattedDate && (
                                    <p className="text-sm text-muted-foreground mb-1 sm:mb-1.5 flex items-center">
                                      <CalendarDays className="w-4 h-4 mr-1.5" />
                                      {formattedDate.date} @ {formattedDate.time}
                                   </p>
                                )}
                               <h3 className="text-lg sm:text-xl font-semibold">{tournament.title || 'N/A'}</h3>
                             </div>
                             <div className="flex-shrink-0 flex flex-row flex-wrap items-center sm:items-start gap-x-2 gap-y-1 pt-1">
                                {tournament.buyin && tournament.buyin !== '0' && (
                                    <span
                                     className="text-xs font-semibold text-white px-2.5 sm:px-3 py-1 rounded-full flex items-center bg-pokerBlue"
                                    >
                                     Buy-in: {tournament.buyin} {tournament.currency && <Euro className="w-3 h-3 ml-1" />}
                                    </span>
                                )}
                               {tournament.guaranteed && tournament.guaranteed !== '0' && (
                                 <span
                                   className="text-xs font-semibold text-white px-3 py-1 rounded-full flex items-center bg-pokerPurple"
                                 >
                                   {tournament.guaranteed} {tournament.currency && <Euro className="w-3 h-3 ml-0.5 mr-0.5" />} GTD
                                 </span>
                               )}
                             </div>
                           </Card>
                         );
                    })
                ) : (
                  <p className="text-muted-foreground text-center py-4">No live tournaments listed for this casino at the moment.</p>
                )}

                {liveTournaments.length > 10 && (
                   <div className="text-center pt-2">
                     <Button
                       variant="outline"
                       onClick={() => setShowAllTournaments(!showAllTournaments)}
                       className="text-primary hover:text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                     >
                       {showAllTournaments ? 'Show Less Tournaments' : `Show All ${liveTournaments.length} Tournaments`}
                     </Button>
                   </div>
                )}
              </CardContent>
            </Card>

             {clubPictures.length > 0 && (
                 <Card className="overflow-hidden shadow-lg border-border bg-card">
                   <CardHeader>
                     <CardTitle className="text-2xl font-semibold text-foreground">Gallery</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                       {clubPictures.map((pic, index) => (
                         <a key={index} href={pic.href} target="_blank" rel="noopener noreferrer" className="block aspect-square overflow-hidden rounded-lg border hover:opacity-80 transition-opacity">
                           <img
                             src={pic.href}
                             alt={`Casino Gallery Image ${index + 1}`}
                             className="w-full h-full object-cover"
                             loading="lazy"
                             onError={(e) => { e.currentTarget.parentElement?.classList.add('hidden'); }}
                           />
                         </a>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
             )}

            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link to={passedCountryCode ? `/casinos/${passedCountryCode}` : "/casinos"}>
                  &larr; Back to Casinos{countryName ? ` in ${countryName}` : ''}
                </Link>
              </Button>
            </div>

          </div>
        </section>
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
};

export default CasinoDetail;
