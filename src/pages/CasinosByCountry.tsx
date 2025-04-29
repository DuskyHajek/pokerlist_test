import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      // Decode HTML entities for relevant fields
      const decodedName = decodeHtmlEntities(casinoData['TITLE']);
      const decodedAddress = decodeHtmlEntities(casinoData['ADDRESS']);
      const decodedCity = decodeHtmlEntities(casinoData['CITY']);

      casinos.push({
        id: casinoData['ID'],
        name: decodedName || 'N/A',
        countryCode: casinoData['COUNTRY'] || '',
        description: `${decodedAddress || ''}, ${decodedCity || ''}`.replace(/^, |, $/g, ''), // Combine Address and City
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

// --- Helper function to normalize text for search (remove diacritics) ---
const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Remove diacritics
    .toLowerCase();
};

// --- Helper function to decode HTML entities ---
const decodeHtmlEntities = (text: string | undefined): string => {
  if (!text) return '';
  try {
    // Use the browser's built-in capabilities to decode HTML entities
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<!doctype html><body>${text}</body>`, 'text/html');
    return doc.body.textContent || '';
  } catch (e) {
    console.error("Error decoding HTML entities:", e);
    return text; // Return original text if decoding fails
  }
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

// Replace dynamic country code-to-name mapping with the static list
const countries = [
  { code: "AT", name: "Austria", flag: "https://flagcdn.com/at.svg" },
  { code: "BE", name: "Belgium", flag: "https://flagcdn.com/be.svg" },
  { code: "BR", name: "Brazil", flag: "https://flagcdn.com/br.svg" },
  { code: "BG", name: "Bulgaria", flag: "https://flagcdn.com/bg.svg" },
  { code: "HR", name: "Croatia", flag: "https://flagcdn.com/hr.svg" },
  { code: "CZ", name: "Czech Republic", flag: "https://flagcdn.com/cz.svg" },
  { code: "FR", name: "France", flag: "https://flagcdn.com/fr.svg" },
  { code: "DE", name: "Germany", flag: "https://flagcdn.com/de.svg" },
  { code: "GB", name: "Great Britain", flag: "https://flagcdn.com/gb.svg" },
  { code: "GR", name: "Greece", flag: "https://flagcdn.com/gr.svg" },
  { code: "HU", name: "Hungary", flag: "https://flagcdn.com/hu.svg" },
  { code: "IT", name: "Italy", flag: "https://flagcdn.com/it.svg" },
  { code: "MT", name: "Malta", flag: "https://flagcdn.com/mt.svg" },
  { code: "NL", name: "Netherlands", flag: "https://flagcdn.com/nl.svg" },
  { code: "PL", name: "Poland", flag: "https://flagcdn.com/pl.svg" },
  { code: "PT", name: "Portugal", flag: "https://flagcdn.com/pt.svg" },
  { code: "SK", name: "Slovakia", flag: "https://flagcdn.com/sk.svg" },
  { code: "ES", name: "Spain", flag: "https://flagcdn.com/es.svg" },
  { code: "CH", name: "Switzerland", flag: "https://flagcdn.com/ch.svg" },
];

const CasinosByCountry = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCasinos, setFilteredCasinos] = useState<Casino[]>([]);
  const [allCasinos, setAllCasinos] = useState<Casino[]>([]);
  const [country, setCountry] = useState<{ code: string; name: string; flag: string } | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Animation ref for casino cards
  const casinoCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countryCode) {
      setError("Country code is missing.");
      setIsLoading(false);
      return;
    }
    // Find country from static list
    const foundCountry = countries.find(c => c.code.toUpperCase() === countryCode.toUpperCase());
    setCountry(foundCountry);
    // Fetch clubs for the selected country
    const fetchCasinos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/pokerlist-api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `country=${encodeURIComponent(countryCode)}`
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const xml = await response.text();
        // Parse all clubs (including border clubs)
        const clubRegex = /<POKERCLUB\s+([^>]+)\/>/g;
        const attrRegex = /(\w+)="([^"]*)"/g;
        let match;
        const clubs: Casino[] = [];
        while ((match = clubRegex.exec(xml)) !== null) {
          let attrMatch;
          let club: any = {};
          while ((attrMatch = attrRegex.exec(match[1])) !== null) {
            club[attrMatch[1]] = attrMatch[2];
          }

          // Decode HTML entities before storing
          const decodedName = decodeHtmlEntities(club['TITLE']);
          const decodedAddress = decodeHtmlEntities(club['ADDRESS']);
          const decodedCity = decodeHtmlEntities(club['CITY']);

          // Show all clubs returned by the API (including border clubs)
          clubs.push({
            id: club['ID'],
            name: decodedName || 'N/A',
            countryCode: club['COUNTRY'],
            description: `${decodedAddress || ''}, ${decodedCity || ''}`.replace(/^, |, $/g, ''),
            logo: club['LOGOURL'] || undefined,
          });
        }
        setAllCasinos(clubs);
        setFilteredCasinos(clubs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setAllCasinos([]);
        setFilteredCasinos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCasinos();
  }, [countryCode]);

  // Search effect - update to handle diacritics
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCasinos(allCasinos);
      return;
    }
    
    const normalizedSearch = normalizeText(searchTerm);
    const filtered = allCasinos.filter(casino => {
      const normalizedName = normalizeText(casino.name);
      const normalizedDescription = normalizeText(casino.description || '');
      
      return normalizedName.includes(normalizedSearch) || 
             normalizedDescription.includes(normalizedSearch);
    });
    setFilteredCasinos(filtered);
  }, [searchTerm, allCasinos]);

  // Focus on search input when search bar is shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Add intersection observer for animation
  useEffect(() => {
    if (!casinoCardsRef.current || isLoading) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.card-container');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
              }, index * 50); // Stagger animation
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(casinoCardsRef.current);
    
    return () => {
      if (casinoCardsRef.current) observer.unobserve(casinoCardsRef.current);
    };
  }, [isLoading, filteredCasinos]);

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
          <meta name="description" content="We couldn't find information for this country code. Please try another country or browse all available countries." />
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
          <meta name="description" content={`We encountered an issue loading poker rooms in ${country.name}. Please try again later or browse other countries.`} />
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
        <meta name="keywords" content={`poker rooms ${country?.name}, casinos ${country?.name}, poker venues, find poker games, ${country?.name} poker, live poker ${country?.name}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://pokerlist.com/casinos/${countryCode}`} />
        {/* JSON-LD structured data for local business listing */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                ${filteredCasinos.slice(0, 10).map((casino, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "item": {
                      "@type": "LocalBusiness",
                      "name": "${casino.name}",
                      "address": "${casino.description?.replace(/"/g, '\\"') || ''}",
                      "image": "${casino.logo || ''}",
                      "url": "https://pokerlist.com/casino/${casino.id}/${createSlug(casino.name)}"
                    }
                  }
                `).join(',')}
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="hero-gradient-casinos hero-lines-casinos py-16 md:py-24">
          <div className="container mx-auto px-4 text-center relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Poker Rooms in {country?.name || '...'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
              Explore casinos and poker rooms in {country?.name || 'this country'}.
            </p>
            
            {country && (
              <div className="absolute right-8 bottom-0 w-16 h-12 overflow-hidden rounded-md shadow-lg border-2 border-white/20 animate-fade-in hidden md:block">
                <img 
                  src={country.flag} 
                  alt={`${country.name} Flag`} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                {/* Show skeleton only while loading AND country is known */}
                {isLoading && country && <Skeleton className="h-8 w-48 inline-block" />}
                {/* Show count only when not loading AND country is known */}
                {!isLoading && country && `${filteredCasinos.length} Poker ${filteredCasinos.length === 1 ? 'Room' : 'Rooms'} in ${country.name}`}
                {/* Handle case where country might still be loading initially */}
                {isLoading && !country && <Skeleton className="h-8 w-48 inline-block" />}
              </h2>
              
              <div className="flex items-center gap-3">
                {showSearch ? (
                  <div className="relative flex items-center">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-3 pr-10 py-2 w-56 md:w-64 rounded-md border border-border bg-background"
                    />
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setShowSearch(false);
                      }}
                      variant="ghost"
                      size="icon"
                      className="absolute right-1"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowSearch(true)}
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    aria-label="Search casinos"
                  >
                    <Search size={18} />
                  </Button>
                )}
                <Link to="/casinos" className="text-primary hover:underline whitespace-nowrap">
                  View All Countries
                </Link>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CasinoCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredCasinos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={casinoCardsRef}>
                {filteredCasinos.map((casino, index) => {
                  // Generate slug for the link
                  const slug = createSlug(casino.name);
                  return (
                    <Link
                      key={casino.id}
                      // Updated link format: /casino/:id/:slug
                      to={`/casino/${casino.id}/${slug}`}
                      // Pass countryCode AND logoUrl in state
                      state={{ countryCode: casino.countryCode, logoUrl: casino.logo }}
                      className={cn(
                        "block rounded-lg border bg-card text-card-foreground shadow-sm",
                        "card-highlight card-container overflow-hidden hover:border-primary/50 transition-all duration-300 group opacity-0",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
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
                  {searchTerm ? (
                    <div>
                      <p className="text-xl mb-4">No results found for "{searchTerm}"</p>
                      <p className="text-muted-foreground mb-6">
                        Try a different search term or clear your search.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setShowSearch(false);
                        }}
                        variant="outline"
                        className="mr-4"
                      >
                        Clear Search
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl mb-4">No poker rooms found in {country.name}</p>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find any poker rooms in this country via the API. Please check another country or check back later.
                      </p>
                      <Link to="/casinos" className="text-primary underline">
                        View All Countries
                      </Link>
                    </div>
                  )}
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
