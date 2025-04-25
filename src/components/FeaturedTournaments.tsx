import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// --- Skeleton Component for Tournament Card ---
const TournamentCardSkeleton = () => (
  <div className="tournament-card overflow-hidden h-[380px] flex flex-col relative">
    <Skeleton className="h-48 w-full" />
    <div className="p-5 flex flex-col flex-grow space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="buy-in-chip h-5 w-20" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
);

const FeaturedTournaments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [festivals, setFestivals] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component
    setIsLoading(true);
    fetch("/api/events.php")
      .then((res) => {
        if (!res.ok) {
          // Throw an error to be caught by .catch() if response not OK
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return; // Exit if component unmounted

        // Check if data is an array before processing
        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          throw new Error("Invalid data format received from API.");
        }

        // Group by clubid (festival)
        const grouped = Object.values(
          data.reduce((acc: any, item: any) => {
            // Basic check for item structure
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
                  // No tournaments array needed here
                };
              }
              // No need to push individual tournaments here
            } else {
              console.warn("Skipping invalid item during grouping:", item);
            }
            return acc;
          }, {})
        );

        setFestivals(grouped);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return; // Exit if component unmounted
        console.error("Error fetching or processing featured festivals:", error);
        // Ensure state is reset to empty array on error
        setFestivals([]);
        setIsLoading(false);
      });

      // Cleanup function to set isMounted to false when component unmounts
      return () => {
          isMounted = false;
      };
  }, []); // Empty dependency array ensures this runs only once on mount

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div className="max-w-full w-full mx-auto" key={"skeleton-" + index}><TournamentCardSkeleton /></div>
              ))
            : festivals.slice(0, 6).map(festival => (
                <Link 
                  to={`/festival/${festival.clubid}`} 
                  key={festival.clubid} 
                  className="block tournament-card overflow-hidden h-[380px] flex flex-col relative max-w-full w-full mx-auto group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {festival.club_imgurl ? (
                      <img
                        src={festival.club_imgurl.replace(/^http:/, 'https:')}
                        alt={festival.clubname}
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
                      <span className="buy-in-chip">{festival.club_event_duration}</span>
                    </div>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        {festival.club_logourl && (
                          <img
                            src={festival.club_logourl.replace(/^http:/, 'https:')}
                            alt={festival.clubname}
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
                </Link>
              ))}
        </div>
        <div className="mt-10 flex justify-center md:hidden">
          <Link to="/events" className="secondary-cta-button">
            View All Events <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTournaments;
