import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { format } from 'date-fns'; // For formatting dates
import { CalendarDays, Euro } from 'lucide-react'; // Import icons
import { Card } from "@/components/ui/card"; // Import Card
import DownloadApp from '../components/DownloadApp'; // Import DownloadApp
import OtherFestivalsTable from '../components/OtherFestivalsTable'; // Import the new table component
import { slugify } from "@/lib/utils"; // Import slugify from utils

// Define an interface for the Festival object (including tournaments)
interface Tournament {
  tid: string | number;
  title: string;
  startdate: string;
  starttime: string;
  buyin: string; // Assuming buyin is a string like '$100+10'
  guaranteed?: string | number; // Added optional guarantee field
  // Add other tournament fields if needed
  // Example: guarantee?: string; // Add if guarantee data becomes available
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

// --- Helper Function ---
/*
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};
*/

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
  const { clubid, slug } = useParams<{ clubid: string; slug?: string }>();
  const navigate = useNavigate();
  const [festival, setFestival] = useState<Festival | null>(null);
  const [otherFestivals, setOtherFestivals] = useState<Festival[]>([]); // State for other festivals
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllTournaments, setShowAllTournaments] = useState(false); // State for expanding tournaments

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
                guaranteed: item.guaranteed, // Pass guarantee from API item
                // Add other relevant fields from 'item'
              });
            } else {
              console.warn("Skipping invalid item during grouping:", item);
            }
            return acc;
          }, {})
        );
        
        // Find the specific festival by clubid (comparing as strings for safety)
        const currentFestivalId = clubid; // Keep track of the current ID
        const foundFestival = grouped.find(f => f.clubid.toString() === currentFestivalId);
        const otherFestivalsData = grouped.filter(f => f.clubid.toString() !== currentFestivalId);

        if (foundFestival) {
          setFestival(foundFestival);
          setOtherFestivals(otherFestivalsData); // Set the other festivals
        } else {
          setError(`Festival with ID ${clubid} not found.`);
          setOtherFestivals([]); // Clear other festivals if current not found
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

  // Effect for checking slug and redirecting
  useEffect(() => {
    if (festival && clubid) {
      const correctSlug = slugify(festival.clubname);
      // Redirect if slug is missing or incorrect
      if (!slug || slug !== correctSlug) {
        navigate(`/festival/${clubid}/${correctSlug}`, { replace: true });
      }
    }
  }, [festival, slug, clubid, navigate]); // Dependencies for slug check

  // Determine which tournaments to display - MOVED DOWN
  //const displayedTournaments = showAllTournaments
  //  ? festival.tournaments
  //  : festival.tournaments.slice(0, 10);

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
          <h1 className="text-3xl font-bold mb-4">Festival Not Found</h1>
          <p className="text-muted-foreground">Could not find details for festival ID {clubid}.</p>
           <Link to="/events" className="mt-6 inline-block text-primary hover:underline">Go back to Events</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Successful Render --- 
  // Determine which tournaments to display - MOVED HERE
  const displayedTournaments = showAllTournaments
    ? festival.tournaments
    : festival.tournaments.slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${festival.clubname} | PokerList`}</title>
        <meta name="description" content={`Schedule and details for the ${festival.clubname} poker festival.`} />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 pt-24">
        {/* --- Festival Header --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start">
          {/* Image on the left */}
          {festival.club_imgurl && (
             <img
                src={festival.club_imgurl.replace(/^http:/, 'https:')}
                alt={`${festival.clubname}`}
                className="w-full h-auto object-cover rounded-lg md:col-span-1" // Adjust grid span
              />
          )}

          {/* Details on the right */}
          <div className={`flex flex-col ${festival.club_imgurl ? 'md:col-span-2' : 'md:col-span-3'}`}> {/* Adjust grid span based on image presence */}
            {/* Removed small logo img tag here */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{festival.clubname}</h1>
            <p className="text-lg text-muted-foreground mb-1">{festival.club_description}</p>
            <p className="text-md text-muted-foreground mb-3">{festival.club_city}</p>
            <p className="text-md font-medium">Duration: {festival.club_event_duration}</p>
          </div>
        </div>

        {/* --- Main Content Area (Tournaments & Other Festivals) --- */}
        <h2 className="text-3xl font-bold mb-2">Tournament Schedule</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Tournament Cards */}
          <div className="lg:col-span-2 space-y-4">
            {festival.tournaments.length > 0 ? (
              displayedTournaments.map((tournament) => {
                // Create Date object once
                const startDateObj = new Date(tournament.startdate);
                
                return (
                <Card key={tournament.tid} className="card-highlight p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  {/* Left side: Date and Title */}
                  <div className="flex-grow">
                     {/* Date and Time - Formatted from single startdate field */}
                     <p className="text-sm text-muted-foreground mb-1 sm:mb-1.5 flex items-center">
                       <CalendarDays className="w-4 h-4 mr-1.5" />
                       {format(startDateObj, 'eee, MMM d, yyyy')} @ {format(startDateObj, 'HH:mm')}
                    </p>
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold">{tournament.title}</h3>
                  </div>
                  {/* Right side: Buy-in and Guarantee */}
                  <div className="flex-shrink-0 flex flex-row flex-wrap items-center sm:items-start gap-x-2 gap-y-1 pt-1">
                     {/* Buy-in Pill */}
                     <span
                      className="text-xs font-semibold text-white px-2.5 sm:px-3 py-1 rounded-full flex items-center bg-pokerBlue"
                     >
                      Buy-in: {tournament.buyin} <Euro className="w-3 h-3 ml-1" />
                     </span>
                    {/* Guarantee Pill - Display only if available */}
                    {tournament.guaranteed && (
                      <span
                        className="text-xs font-semibold text-white px-3 py-1 rounded-full flex items-center bg-pokerPurple"
                      >
                        {tournament.guaranteed} <Euro className="w-3 h-3 ml-0.5 mr-0.5" /> GTD
                      </span>
                    )}
                  </div>
                </Card>
              );
            })
            ) : (
              <p className="text-muted-foreground">No specific tournaments listed for this festival.</p>
            )}
             {/* --- Show More/Less Button --- */}
            {festival.tournaments.length > 10 && (
               <div className="text-center mt-6">
                 <button
                   onClick={() => setShowAllTournaments(!showAllTournaments)}
                   className="text-primary hover:underline font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                 >
                   {showAllTournaments ? 'Show Less Tournaments' : `Show All ${festival.tournaments.length} Tournaments`}
                 </button>
               </div>
            )}
          </div>

          {/* Right Side: Other Festivals Table */}
          <div className="lg:col-span-1">
            <OtherFestivalsTable festivals={otherFestivals} />
          </div>
        </div>
      </main>
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default FestivalDetail; 