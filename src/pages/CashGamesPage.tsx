import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import DownloadApp from "../components/DownloadApp";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CashGame {
  id: string;
  smallblind: string;
  bigblind: string;
  minbuyin: string | null;
  players: string;
  gametype: string;
  updated: string;
  currency: string;
  description: string;
  clubname: string;
  clubid: string;
}

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

const CashGameListItemSkeleton = () => (
  <Card className="card-highlight p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 animate-pulse">
    <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
    </div>
    <div className="flex gap-2 md:gap-3 mt-2 md:mt-0">
      <Skeleton className="buy-in h-5 md:h-6 w-16 md:w-20" />
    </div>
    <Skeleton className="hidden md:block ml-2 h-6 w-6" />
  </Card>
);

const CashGamesPage = () => {
  const [cashGames, setCashGames] = useState<CashGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashGames = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("[CashGamesPage useEffect] Fetching initial cash games...");
        const response = await fetch('/api/cash_games.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setCashGames(data);
          console.log("[CashGamesPage useEffect] Initial cash games fetched:", data.length);
        } else {
          console.warn("[CashGamesPage useEffect] Received data is not an array:", data);
          setCashGames([]);
        }
      } catch (e) {
        console.error("[CashGamesPage useEffect] Failed to fetch data:", e);
        setError(e instanceof Error ? e.message : "Failed to load cash games. Please try again later.");
        setCashGames([]);
      } finally {
        setIsLoading(false);
        console.log("[CashGamesPage useEffect] Fetch process finished.");
      }
    };

    fetchCashGames();
  }, []);

  const formatCurrency = (currencyCode: string) => {
    if (currencyCode === 'EUR') return '€';
    if (currencyCode === 'USD') return '$';
    return currencyCode;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Breadcrumb Navigation - Hidden on mobile, visible on larger screens */}
        <div className="container mx-auto px-4 pt-2 pb-4 hidden sm:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Cash Games</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="hero-gradient-live py-16 md:py-24 text-center h-[360px] md:h-[280px]">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              Live Cash Games
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8 animate-fade-in">
              Find active cash game tables running now in poker rooms
            </p>
          </div>
        </div>

        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <CashGameListItemSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : cashGames.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No live cash games found.</div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {cashGames.map(game => {
                  const currencySymbol = formatCurrency(game.currency);
                  const stakes = `${game.smallblind}/${game.bigblind} ${currencySymbol}`;
                  const slug = createSlug(game.clubname);

                  return (
                    <Card
                      key={game.id}
                      className="card-highlight p-4 flex items-start md:items-center gap-3"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm text-muted-foreground mt-1 md:mt-0 overflow-hidden border border-border">
                        {game.clubname.substring(0, 1) || 'P'}
                      </div>

                      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
                        <div className="flex-grow">
                          <div className="text-xs md:text-sm text-primary mb-0.5 md:mb-1 font-medium">{game.clubname}</div>
                          <h3 className="text-base md:text-lg font-semibold leading-tight">{game.gametype}</h3>
                        </div>

                        <div className="flex flex-col items-start md:items-end md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm">
                          <div className="flex items-center gap-2 mt-1 md:mt-0">
                            <span className="px-2 py-1 text-sm font-bold rounded bg-pokerBlue text-white whitespace-nowrap">{stakes}</span>
                            <span className="px-2 py-1 text-sm font-semibold rounded bg-pokerPurple text-white whitespace-nowrap">Players: {game.players}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Simple link to download section */}
        <div className="container mx-auto px-4 text-center py-8">
          <a
            href="#download"
            className="inline-flex items-center justify-center px-6 py-3 border border-pokerPurple text-base font-medium rounded-md text-pokerPurple bg-background hover:bg-pokerPurple/10 transition-colors"
          >
            More Cash Games in the PokerList App
          </a>
        </div>

        <DownloadApp />

      </main>

      <Footer />
    </div>
  );
};

export default CashGamesPage;
