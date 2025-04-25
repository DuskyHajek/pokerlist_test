import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { format } from 'date-fns'; // For formatting dates

// Define an interface for the Festival object (including tournaments)
interface Tournament {
  tid: string | number;
  title: string;
  startdate: string;
  starttime: string;
  buyin: string; // Assuming buyin is a string like '$100+10'
  // Add other tournament fields if needed
}

interface Festival {
  clubid: string | number;
  clubname: string;
  club_imgurl: string;
  club_logourl: string;
  club_description: string;
  club_city: string;
  club_event_duration: string;
  tournaments: Tournament[];
}

// --- Loading Skeletons ---
const DetailSkeleton = () => (
  <div className="container mx-auto px-4 py-12 pt-24 animate-pulse">
    <Skeleton className="h-8 w-3/5 mb-6" />
    <Skeleton className="h-6 w-2/5 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <Skeleton className="md:col-span-2 h-64 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
    <Skeleton className="h-8 w-1/4 mb-4" />
    <div className="space-y-4">
      <Skeleton className="h-16 w-full rounded" />
      <Skeleton className="h-16 w-full rounded" />
      <Skeleton className="h-16 w-full rounded" />
    </div>
  </div>
);

const FestivalDetail = () => {
  const { clubid } = useParams<{ clubid: string }>();
  const [festival, setFestival] = useState<Festival | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch("/api/events.php")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (!Array.isArray(data)) throw new Error("Invalid data format received from API.");

        // Group tournaments by clubid (festival) - same logic as Events.tsx
        const grouped = Object.values<
          Festival // Explicitly type the accumulator result
        >(
          data.reduce((acc: { [key: string]: Festival }, item: any) => {
            if (item && item.clubid) {
              const currentClubId = item.clubid.toString(); // Ensure consistent key type
              if (!acc[currentClubId]) {
                acc[currentClubId] = {
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
              // Add necessary tournament details
              acc[currentClubId].tournaments.push({
                tid: item.tid,
                title: item.title,
                startdate: item.startdate,
                starttime: item.starttime,
                buyin: item.buyin,
                // Add other relevant fields from 'item'
              });
            } else {
              console.warn("Skipping invalid item during grouping:", item);
            }
            return acc;
          }, {})
        );
        
        // Find the specific festival by clubid (comparing as strings for safety)
        const foundFestival = grouped.find(f => f.clubid.toString() === clubid);

        if (foundFestival) {
          setFestival(foundFestival);
        } else {
          setError(`Festival with ID ${clubid} not found.`);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching or processing festival details:", err);
        setError(err.message || "Failed to load festival details.");
        setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [clubid]); // Re-run effect if clubid changes

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <DetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
         <Helmet><title>Error | PokerList</title></Helmet>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 pt-24 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Festival</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link to="/events" className="mt-6 inline-block text-primary hover:underline">Go back to Events</Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!festival) {
     // This case should ideally be covered by the error state if not found
    return (
       <div className="min-h-screen flex flex-col">
         <Helmet><title>Not Found | PokerList</title></Helmet>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 pt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Festival Not Found</h1>
          <p className="text-muted-foreground">Could not find details for festival ID {clubid}.</p>
           <Link to="/events" className="mt-6 inline-block text-primary hover:underline">Go back to Events</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Successful Render --- 
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${festival.clubname} | PokerList`}</title>
        <meta name="description" content={`Schedule and details for the ${festival.clubname} poker festival.`} />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 pt-24">
        {/* Festival Header */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 items-start">
          {festival.club_logourl && (
            <img 
              src={festival.club_logourl.replace(/^http:/, 'https:')}
              alt={`${festival.clubname} logo`}
              className="w-20 h-20 md:w-24 md:h-24 object-contain bg-muted p-2 rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{festival.clubname}</h1>
            <p className="text-lg text-muted-foreground mb-1">{festival.club_description}</p>
            <p className="text-md text-muted-foreground mb-3">{festival.club_city}</p>
            <p className="text-md font-medium">Duration: {festival.club_event_duration}</p>
          </div>
        </div>

        {/* Festival Image (Optional, can be prominent or background) */}
        {festival.club_imgurl && (
           <img 
              src={festival.club_imgurl.replace(/^http:/, 'https:')}
              alt={`${festival.clubname}`}
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-8"
            />
        )}

        {/* Tournament List */}
        <h2 className="text-2xl font-semibold mb-4">Tournament Schedule</h2>
        <div className="space-y-4">
          {festival.tournaments.length > 0 ? (
            festival.tournaments.map((tournament) => (
              <div key={tournament.tid} className="card-highlight p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{tournament.title}</h3>
                   {/* Format date if needed */}
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(tournament.startdate), 'eee, MMM d, yyyy')} @ {tournament.starttime}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="buy-in-chip text-sm">{tournament.buyin}</span>
                  {/* Add guarantee or other details if available */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No specific tournaments listed for this festival.</p>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default FestivalDetail; 