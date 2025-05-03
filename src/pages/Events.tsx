import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DownloadApp from "../components/DownloadApp";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn, slugify } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

// Add this type above the Festival type:
type Tournament = {
  tid: string | number;
  title: string;
  startdate: string;
  starttime: string;
  buyin: string;
  guaranteed?: string | number;
  currency?: string;
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
  tournaments: Tournament[];
};

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
  const [events, setEvents] = useState<Festival[]>([]);

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
                  tournaments: [],
                };
              }
              // Only push if item has Tournament fields
              if ('tid' in item && 'title' in item && 'startdate' in item && 'starttime' in item && 'buyin' in item) {
                acc[item.clubid].tournaments.push({
                  tid: item.tid as string | number,
                  title: item.title as string,
                  startdate: item.startdate as string,
                  starttime: item.starttime as string,
                  buyin: item.buyin as string,
                  guaranteed: item['guaranteed'],
                  currency: item['currency'],
                });
              }
            } else {
              console.warn("Skipping invalid item during grouping:", item);
            }
            return acc;
          }, {} as Record<string, Festival>)
        ) as Festival[];

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

  // SEO: Dynamic meta tags and structured data
  const pageTitle = "Upcoming Poker Events & Tournaments | PokerList";
  const pageDescription = "Find major poker tournaments and festival series worldwide. Browse upcoming events by date, location, and buy-in.";
  const pageKeywords = "poker, events, poker events, poker tournaments, live poker, poker festivals, poker series, poker schedule, poker calendar, pokerlist";
  const canonicalUrl = "https://pokerlist.com/events";
  const ogImage = "/opengraph-default.png";

  // JSON-LD Structured Data for ItemList (events/festivals)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": events.map((festival, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": festival.clubname,
        "url": `/festival/${festival.clubid}/${slugify(festival.clubname)}`,
        "startDate": festival.tournaments[0]?.startdate || "",
        "location": {
          "@type": "Place",
          "name": festival.clubname,
          "address": festival.club_city
        },
        "image": festival.club_imgurl || festival.club_logourl || ogImage
      }
    }))
  };

  // JSON-LD Structured Data for BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pokerlist.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Events",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-2 pb-4 hidden sm:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Events</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="hero-gradient-events py-16 md:py-24 text-center h-[360px] md:h-[280px]">
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

        {/* Simple link to download section */}
        <div className="container mx-auto px-4 text-center py-8">
          <a
            href="#download"
            className="inline-flex items-center justify-center px-6 py-3 border border-pokerPurple text-base font-medium rounded-md text-pokerPurple bg-background hover:bg-pokerPurple/10 transition-colors"
          >
            More Poker Events in the PokerList App
          </a>
        </div>
      </main>

      <DownloadApp />
      <Footer />
    </div>
  );
};

export default Events;
