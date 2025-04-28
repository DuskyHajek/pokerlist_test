import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { countries } from "../data/mockData"; // Keep for country name lookup for now
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Phone, Globe, AlertCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Reusing the Casino interface (adjust if API provides more detail) ---
interface Casino {
  id: string;
  name: string; // TITLE
  address: string; // ADDRESS
  city: string; // CITY
  countryCode: string; // COUNTRY
  latitude?: string; // LATITUDE (string from XML)
  longitude?: string; // LONGITUDE (string from XML)
  contact?: string; // CONTACT
  url?: string; // URL
  logo?: string; // LOGOURL
  size?: string; // SIZE
  rank?: string; // RANK
}

// --- Reusing the XML Parser (adapted for single casino possibility) ---
// It expects the API to return one or more <POKERCLUB> tags.
// If fetching by ID returns *only* one tag, it will still work.
const parsePokerClubsXml = (xmlString: string): Casino[] => {
  const casinos: Casino[] = [];
  const clubRegex = /<POKERCLUB\s+([^>]+)\/>/g;
  const attrRegex = /(\w+)="([^"]*)"/g;

  let match;
  while ((match = clubRegex.exec(xmlString)) !== null) {
    const attributesString = match[1];
    const casinoData: { [key: string]: any } = {};
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
      casinoData[attrMatch[1]] = attrMatch[2];
    }

    // Map raw attributes to the Casino interface structure
    if (casinoData['ID']) {
      casinos.push({
        id: casinoData['ID'],
        name: casinoData['TITLE'] || 'N/A',
        address: casinoData['ADDRESS'] || '',
        city: casinoData['CITY'] || '',
        countryCode: casinoData['COUNTRY'] || '',
        latitude: casinoData['LATITUDE'],
        longitude: casinoData['LONGITUDE'],
        contact: casinoData['CONTACT'],
        url: casinoData['URL'],
        logo: casinoData['LOGOURL'],
        size: casinoData['SIZE'],
        rank: casinoData['RANK'],
      });
    }
  }
  return casinos;
};

// --- Skeleton Component for Details Page ---
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
          <Card className="overflow-hidden shadow-lg">
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
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const CasinoDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`[CasinoDetail Render] id from useParams: ${id}`); // Log ID on render
  const [casino, setCasino] = useState<Casino | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);

  useEffect(() => {
    console.log(`[CasinoDetail useEffect] Running effect for id: ${id}`); // Log ID when effect runs
    if (!id) {
      console.error("[CasinoDetail useEffect] ID is missing!");
      setError("Casino ID is missing from URL parameter.");
      setIsLoading(false);
      return;
    }

    const fetchCasinoDetails = async () => {
      console.log(`[CasinoDetail fetch] Fetching details for id: ${id}`); // Log ID before fetch
      setIsLoading(true);
      setError(null);
      setCasino(null); // Clear previous casino data

      try {
        const response = await fetch('/pokerlist-api', { // Use the proxy
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `id=${encodeURIComponent(id)}`
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Could not read error response.');
          console.error(`[CasinoDetail fetch] API Error Response (status ${response.status}):`, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlData = await response.text();
        console.log("[CasinoDetail fetch] Received XML Data:", xmlData); // Log raw XML

        const parsedCasinos = parsePokerClubsXml(xmlData);
        console.log("[CasinoDetail parse] Parsed Casinos:", parsedCasinos); // Log parsed array

        // --- FIX: Find the specific casino by ID within the returned list --- 
        const foundCasino = parsedCasinos.find(casino => casino.id === id);

        if (!foundCasino) {
          // Throw error if the specific ID wasn't found in the list returned by the API
          console.error(`[CasinoDetail parse] Casino with ID ${id} not found in the API response list.`);
          throw new Error(`Casino with ID ${id} not found in API response.`);
        }
        // --- End FIX ---

        console.log("[CasinoDetail state] Setting casino state to:", foundCasino); // Log casino before setting state
        setCasino(foundCasino);

        // Find country name from mock data
        const foundCountry = countries.find(c => c.code === foundCasino.countryCode);
        setCountryName(foundCountry?.name || foundCasino.countryCode); // Fallback to code

      } catch (err) {
        console.error("[CasinoDetail fetch/parse Error] Failed to fetch or parse casino details:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        console.log(`[CasinoDetail fetch] Finished fetching for id: ${id}`);
        setIsLoading(false);
      }
    };

    fetchCasinoDetails();

  }, [id]); // Re-run effect if the correct parameter 'id' changes

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
                <p>There was an error fetching details for this casino.</p>
                <p className="text-sm text-muted-foreground mt-2">Error: {error}</p>
                <div className="mt-4">
                   <Button variant="outline" size="sm" asChild>
                     <Link to="/casinos">Back to Casinos</Link>
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
    // This case should ideally be covered by the error state if fetch failed or ID not found
    // But included as a fallback.
     return (
      <div className="min-h-screen flex flex-col">
         <Helmet>
           <title>Casino Not Found | PokerList</title>
         </Helmet>
        <Navbar />
         <main className="flex-grow pt-16 flex items-center justify-center bg-background">
           <div className="text-center p-8">
             <h2 className="text-3xl font-bold mb-4">Casino Not Found</h2>
             <p className="mb-6">The casino you are looking for does not exist or could not be loaded.</p>
            <Button variant="outline" asChild>
               <Link to="/casinos">Back to Casinos</Link>
            </Button>
           </div>
         </main>
        <Footer />
      </div>
    );
  }

  // --- Page Content Rendering ---
  const pageTitle = `${casino.name} | ${countryName || casino.countryCode} | PokerList`;
  const pageDescription = `Details for ${casino.name} poker room located in ${casino.city}, ${countryName || casino.countryCode}. Address: ${casino.address}.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16 bg-background">
        {/* Header Section */}
        <div className="hero-gradient-casinos hero-lines-casinos py-16 md:py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/50 bg-muted flex-shrink-0 flex items-center justify-center shadow-lg">
              {casino.logo ? (
                 <img
                  src={casino.logo}
                  alt={`${casino.name} Logo`}
                  className="w-full h-full object-contain" // Use contain to prevent distortion
                  onError={(e) => { e.currentTarget.style.display = 'none'; /* Hide on error */ }}
                />
              ) : (
                 <span className="text-muted-foreground text-sm">No Logo</span>
              )}
            </div>
            {/* Title and Location */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {casino.name}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-5 h-5 inline-block flex-shrink-0" />
                {casino.city}, {countryName || casino.countryCode}
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden shadow-lg border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Casino Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-card-foreground">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                     <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                       <MapPin className="w-4 h-4" /> Address
                     </h3>
                     <p>{casino.address || 'N/A'}</p>
                     <p>{casino.city}{countryName && `, ${countryName}`}</p>
                  </div>
                  {casino.contact && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Contact
                      </h3>
                      <a href={`tel:${casino.contact}`} className="hover:text-primary transition-colors">{casino.contact}</a>
                    </div>
                  )}
                   {/* Optional: Display Map Link */}
                   {casino.latitude && casino.longitude && (
                     <div>
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

                {/* Right Column */}
                 <div className="space-y-4">
                   {casino.url && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                         <Globe className="w-4 h-4" /> Website
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
                   {/* Placeholder for other details like Size/Rank if needed */}
                   {casino.size && (
                     <div>
                       <h3 className="text-sm font-medium text-muted-foreground mb-1">Size Indicator</h3>
                       <p>{casino.size}</p>
                     </div>
                   )}
                   {casino.rank && (
                     <div>
                       <h3 className="text-sm font-medium text-muted-foreground mb-1">Rank</h3>
                       <p>{casino.rank !== "0" ? casino.rank : 'N/A'}</p>
                     </div>
                   )}
                 </div>

              </CardContent>
            </Card>

            {/* Back Button */}
             <div className="mt-12 text-center">
               <Button variant="outline" asChild>
                 <Link to={`/casinos/${casino.countryCode}`}>
                   &larr; Back to Casinos in {countryName || casino.countryCode}
                 </Link>
               </Button>
             </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CasinoDetail;
