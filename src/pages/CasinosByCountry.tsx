import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { countries } from "../data/mockData";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// --- Define the structure for a casino based on API and component needs ---
interface Casino {
  id: string;
  name: string;
  countryCode: string;
  description?: string;
  logo?: string;
  // Add other fields from API if needed later
  // latitude?: number;
  // longitude?: number;
  // contact?: string;
  // url?: string;
}

// --- Helper function to parse XML string ---
// Basic parser assuming a list of <POKERCLUB ... /> tags
// Returns an array of objects with attributes
// Note: This is a simplified parser. A robust solution might need a dedicated library.
const parsePokerClubsXml = (xmlString: string): Casino[] => {
  const casinos: Casino[] = [];
  // Match <POKERCLUB ... /> tags
  const clubRegex = /<POKERCLUB\s+([^>]+)\/>/g;
  // Match attributes within a tag (e.g., ID="123")
  const attrRegex = /(\w+)="([^"]*)"/g;

  let match;
  while ((match = clubRegex.exec(xmlString)) !== null) {
    const attributesString = match[1];
    const casinoData: Partial<Casino> & { [key: string]: any } = {}; // Use index signature
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
      casinoData[attrMatch[1]] = attrMatch[2]; // Store raw attributes
    }

    // Map raw attributes to the Casino interface structure
    if (casinoData['ID']) {
      casinos.push({
        id: casinoData['ID'],
        name: casinoData['TITLE'] || 'N/A',
        countryCode: casinoData['COUNTRY'] || '',
        description: `${casinoData['ADDRESS'] || ''}, ${casinoData['CITY'] || ''}`.replace(/^, |, $/g, ''), // Combine Address and City
        logo: casinoData['LOGOURL'] || undefined, // Use undefined if not present
      });
    }
  }
  return casinos;
};

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

// --- Skeleton Component for Casino Card ---
const CasinoCardSkeleton = () => (
  <Card className="card-highlight overflow-hidden animate-pulse">
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-1" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="mt-4 flex justify-end">
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  </Card>
);

const CasinosByCountry = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  // Use the new Casino interface for state typing
  const [filteredCasinos, setFilteredCasinos] = useState<Casino[]>([]);
  const [country, setCountry] = useState<(typeof countries)[0] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    // Find country from mock data using case-insensitive comparison
    const foundCountry = countries.find(c => 
      c.code.toLowerCase() === countryCode?.toLowerCase()
    );
    setCountry(foundCountry);

    if (!countryCode) {
      setError("Country code is missing.");
      setIsLoading(false);
      return;
    }

    // Fetch data from the API
    const fetchCasinos = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch
      try {
        // Use the Vite proxy path instead of the direct URL
        const response = await fetch('/pokerlist-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `country=${encodeURIComponent(countryCode)}` // Encode country code
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlData = await response.text();
        const parsedCasinos = parsePokerClubsXml(xmlData);
        setFilteredCasinos(parsedCasinos);

      } catch (err) {
        console.error("Failed to fetch or parse casinos:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setFilteredCasinos([]); // Clear casinos on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCasinos();

    // No cleanup needed for fetch like with setTimeout timer
  }, [countryCode]); // Re-run effect if countryCode changes

  // Show loading skeleton for header too if country hasn't loaded
  if (isLoading && !country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {/* Skeleton Header */}
          <div className="hero-gradient py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Skeleton className="w-16 h-12 rounded" />
                <Skeleton className="h-10 w-64" />
              </div>
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
          </div>
          {/* Skeleton Body (repeated logic, could be component) */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                 <Skeleton className="h-8 w-48" />
                 <Skeleton className="h-5 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CasinoCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // If country not found in mock data
  if (!country && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Country Not Found | PokerList</title>
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold mb-4">Country Not Found</h2>
            <p className="mb-6">Could not find information for the country code '{countryCode}'.</p>
            <Link to="/casinos" className="text-primary underline">Back to all countries</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If country found, but API fetch resulted in an error
  if (error && country) {
     return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Error Loading Casinos | {country.name} | PokerList</title>
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center p-8 bg-destructive/10 border border-destructive rounded-lg">
            <h2 className="text-2xl font-bold mb-3 text-destructive">Failed to Load Casinos</h2>
            <p className="mb-4 text-destructive-foreground">There was an error fetching poker rooms for {country.name}.</p>
            <p className="text-sm text-muted-foreground mb-4">Error details: {error}</p>
            <button
              onClick={() => window.location.reload()} // Simple reload for retry
              className="text-primary underline"
            >
              Try Again
            </button>
             <span className="mx-2 text-muted-foreground">|</span>
            <Link to="/casinos" className="text-primary underline">
              Back to all countries
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Dynamic title/desc (ensure country exists before accessing name)
  const pageTitle = `Poker Rooms in ${country?.name || 'Selected Country'} | Casinos | PokerList`;
  const pageDescription = `Browse ${filteredCasinos.length} poker rooms and casinos in ${country?.name || 'the selected country'}. Find venues, locations, and details.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="hero-gradient-casinos hero-lines-casinos py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Poker Rooms in {country?.name || '...'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
              Explore casinos and poker rooms in {country?.name || 'this country'}.
            </p>
          </div>
        </div>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {/* Show skeleton only while loading AND country is known */}
                {isLoading && country && <Skeleton className="h-8 w-48 inline-block" />}
                {/* Show count only when not loading AND country is known */}
                {!isLoading && country && `${filteredCasinos.length} Poker ${filteredCasinos.length === 1 ? 'Room' : 'Rooms'} in ${country.name}`}
                {/* Handle case where country might still be loading initially */}
                {isLoading && !country && <Skeleton className="h-8 w-48 inline-block" />}
              </h2>
              <Link to="/casinos" className="text-primary hover:underline">
                View All Countries
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CasinoCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredCasinos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCasinos.map(casino => {
                  // Generate slug for the link
                  const slug = createSlug(casino.name);
                  return (
                    <Link
                      key={casino.id}
                      // Updated link format: /casino/:id/:slug
                      to={`/casino/${casino.id}/${slug}`}
                      // Pass countryCode in state for CasinoDetail to use
                      state={{ countryCode: casino.countryCode }}
                      className={cn(
                        "block rounded-lg border bg-card text-card-foreground shadow-sm",
                        "card-highlight overflow-hidden hover:border-primary/50 transition-all duration-300 group",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                    >
                      <div className="h-48 bg-gray-800 relative">
                        {/* Placeholder for casino image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50">
                            {/* Added check for casino.logo */}
                            {casino.logo ? (
                               <img 
                                src={casino.logo} 
                                alt={casino.name} 
                                className="w-full h-full object-cover bg-muted"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                             ) : (
                               <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">No Logo</div>
                             )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {casino.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {casino.description || 'No address available.'}
                        </p>
                        <div className="mt-auto pt-3 flex justify-between items-center">
                          <span className="text-primary font-medium text-sm flex items-center">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              // Check for country before displaying the "No rooms found" message
              country && (
                <div className="text-center p-8">
                  <p className="text-xl mb-4">No poker rooms found in {country.name}</p>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any poker rooms in this country via the API. Please check another country or check back later.
                  </p>
                  <Link to="/casinos" className="text-primary underline">
                    View All Countries
                  </Link>
                </div>
              )
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CasinosByCountry;
