import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn, slugify } from "@/lib/utils";

// --- Skeleton Component for Event Card ---
const EventCardSkeleton = () => (
  <Card className="card-highlight p-6 flex flex-col md:flex-row gap-6 animate-pulse">
    <Skeleton className="md:w-1/3 h-48 md:h-auto rounded-lg" />
    <div className="md:w-2/3 flex flex-col space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-4" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-4/5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  </Card>
);

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);

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

        // Group tournaments by clubid (festival)
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
                  tournaments: [],
                };
              }
              acc[item.clubid].tournaments.push(item);
            } else {
              console.warn("Skipping invalid item during grouping:", item);
            }
            return acc;
          }, {})
        );

        setEvents(grouped);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return; // Exit if component unmounted
        console.error("Error fetching or processing events:", error);
        // Ensure state is reset to empty array on error
        setEvents([]);
        setIsLoading(false);
      });

      // Cleanup function to set isMounted to false when component unmounts
      return () => {
          isMounted = false;
      };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Upcoming Poker Events & Tournaments | PokerList</title>
        <meta name="description" content="Find major poker tournaments and festival series worldwide. Browse upcoming events by date, location, and buy-in." />
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="hero-gradient-events hero-lines-events py-16 md:py-24 text-center h-[280px]">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              Poker Events & Festivals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8 animate-fade-in">
              Discover upcoming poker tournament series and festivals near you.
            </p>
          </div>
        </div>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))
                : events.map((festival) => (
                    <Link
                      to={`/festival/${festival.clubid}/${slugify(festival.clubname)}`}
                      key={festival.clubid}
                      className={cn(
                        "block rounded-lg border bg-card text-card-foreground shadow-sm",
                        "card-highlight p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 hover:border-primary/50 transition-all group",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                    >
                      <div className="md:w-1/3">
                        {festival.club_imgurl ? (
                          <img
                            src={festival.club_imgurl.replace(/^http:/, 'https:')}
                            alt={festival.clubname}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center"></div>
                        )}
                      </div>
                      <div className="md:w-2/3 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {festival.club_logourl && (
                            <img
                              src={festival.club_logourl.replace(/^http:/, 'https:')}
                              alt={festival.clubname}
                              className="w-6 h-auto rounded-sm bg-muted"
                            />
                          )}
                          <span className="text-sm text-muted-foreground">{festival.clubname}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{festival.clubname}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Event Duration</div>
                            <div className="font-medium">{festival.club_event_duration}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Venue</div>
                            <div className="font-medium">{festival.club_description}</div>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            {festival.club_logourl && (
                              <img
                                src={festival.club_logourl.replace(/^http:/, 'https:')}
                                alt={festival.clubname}
                                className="w-full h-full object-cover"
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
