import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { casinos, countries } from "../data/mockData";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  const [filteredCasinos, setFilteredCasinos] = useState<typeof casinos>([]);
  const [country, setCountry] = useState<(typeof countries)[0] | undefined>(undefined);

  useEffect(() => {
    // Simulate data fetching
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundCountry = countries.find(c => c.code === countryCode);
      const foundCasinos = casinos.filter(casino => casino.countryCode === countryCode);
      setCountry(foundCountry);
      setFilteredCasinos(foundCasinos);
      setIsLoading(false);
    }, 1200); // Simulate loading

    return () => clearTimeout(timer);
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

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Country Not Found | PokerList</title>
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold mb-4">Country Not Found</h2>
            <p className="mb-6">The country you're looking for doesn't exist or has been removed.</p>
            <Link to="/casinos" className="text-primary underline">Back to all casinos</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Dynamic title/desc moved here as country is now state
  const pageTitle = `Poker Rooms in ${country.name} | Casinos | PokerList`;
  const pageDescription = `Browse ${filteredCasinos.length} poker rooms and casinos in ${country.name}. Find venues, locations, and details.`;

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
                {!isLoading && `${filteredCasinos.length} Poker ${filteredCasinos.length === 1 ? 'Room' : 'Rooms'} in ${country.name}`}
                {isLoading && <Skeleton className="h-8 w-48 inline-block" />}
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
                {filteredCasinos.map(casino => (
                  <Link
                    key={casino.id}
                    to={`/casino/${casino.id}`}
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
                          <img 
                            src={casino.logo} 
                            alt={casino.name} 
                            className="w-full h-full object-cover bg-muted"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {casino.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {casino.description || 'No description available.'}
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
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-xl mb-4">No poker rooms found in {country.name}</p>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any poker rooms in this country. Please check another country or check back later.
                </p>
                <Link to="/casinos" className="text-primary underline">
                  View All Countries
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CasinosByCountry;
