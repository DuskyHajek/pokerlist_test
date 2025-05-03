import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Add this type above the Festival type:
type FestivalApiItem = {
  clubid: string | number;
  clubname: string;
  club_imgurl: string;
  club_logourl: string;
  club_description: string;
  club_city: string;
  club_event_duration: string;
  // Other fields may exist, but these are used
};

// Add this type at the top (after imports):
type Festival = {
  clubid: string | number;
  clubname: string;
  club_imgurl: string;
  club_logourl: string;
  club_description: string;
  club_city: string;
  club_event_duration: string;
};

// --- Skeleton Component for Tournament Card ---
const TournamentCardSkeleton = () => (
  <Card className="tournament-card overflow-hidden h-[380px] flex flex-col relative animate-pulse">
    <Skeleton className="h-48 w-full" />
    <div className="p-5 flex flex-col flex-grow space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="buy-in-chip h-5 w-20" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
  </Card>
);

const FeaturedTournaments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFestivals = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/events.php");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Check if data is an array before processing
      if (!Array.isArray(data)) {
        console.error("API did not return an array:", data);
        setFestivals([]);
        setError("Invalid data format received from server.");
        return;
      }

      // Group by clubid (festival)
      const grouped = Object.values(
        data.reduce((acc: Record<string, Festival>, item: FestivalApiItem) => {
          if (item && item.clubid) {
            if (!acc[item.clubid]) {
              acc[item.clubid] = {
                clubid: item.clubid,
                clubname: item.clubname,
                club_imgurl: item.club_imgurl,
                club_logourl: item.club_logourl,
                club_description: item.club_description,
                club_city: item.club_city,
                club_event_duration: item.club_event_duration,
              };
            }
          } else {
            console.warn("Skipping invalid item during grouping:", item);
          }
          return acc;
        }, {} as Record<string, Festival>)
      ) as Festival[];

      setFestivals(grouped);
    } catch (error) {
      console.error("Error fetching or processing featured festivals:", error);
      setError("Failed to load tournaments. Please try again later.");
      setFestivals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background" id="tournaments">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Tournaments</h2>
            <p className="text-muted-foreground">Upcoming major poker events and festivals</p>
          </div>
          <Link to="/events" className="hidden md:flex items-center text-primary hover:underline">
            View all <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {error ? (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col">
              <p>{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchFestivals} 
                className="mt-3 w-fit flex items-center gap-1.5"
              >
                <RefreshCw size={14} />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div className="max-w-full w-full mx-auto" key={"skeleton-" + index}><TournamentCardSkeleton /></div>
                ))
              : festivals.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <Card className="p-6 mx-auto max-w-md">
                    <p className="text-muted-foreground mb-4">No tournaments currently available.</p>
                    <Button onClick={fetchFestivals} variant="outline" size="sm" className="mx-auto flex items-center gap-1.5">
                      <RefreshCw size={14} />
                      Refresh
                    </Button>
                  </Card>
                </div>
              ) : (
                festivals.slice(0, 6).map(festival => (
                  <Link 
                    to={`/festival/${festival.clubid}`} 
                    key={festival.clubid} 
                    className="block max-w-full w-full mx-auto group h-[380px] relative rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Card className="tournament-card overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        {festival.club_imgurl ? (
                          <img
                            src={festival.club_imgurl.replace(/^http:/, 'https:')}
                            alt={festival.clubname}
                            loading="lazy"
                            width="400"
                            height="300"
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{festival.clubname}</h3>
                        <div className="mb-4">
                          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-pokerBlue text-white">
                            {festival.club_event_duration}
                          </span>
                        </div>
                        <div className="mt-auto flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            {festival.club_logourl && (
                              <img
                                src={festival.club_logourl.replace(/^http:/, 'https:')}
                                alt={`${festival.clubname} logo`}
                                loading="lazy"
                                width="40" 
                                height="40"
                                className="w-full h-full object-cover bg-muted"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{festival.club_description}</p>
                            <p className="text-sm text-muted-foreground">{festival.club_city}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              )}
          </div>
        )}
        
        <div className="mt-10 flex justify-center md:hidden">
          <Link 
            to="/events"
          >
            <Button 
              variant="outline" 
              className={cn(
                "border-white/20 text-white hover:border-primary/80 hover:text-primary active:scale-95 transition-all duration-300",
                "px-6 py-3"
              )}
            >
              View All Events <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTournaments;
