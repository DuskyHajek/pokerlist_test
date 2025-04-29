import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeaturedTournaments from "../components/FeaturedTournaments";
import LiveCashGames from "../components/LiveCashGames";
import DownloadApp from "../components/DownloadApp";
import CountrySelector from "../components/CountrySelector";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Index = () => {
  // SEO: Dynamic meta tags and structured data
  const pageTitle = "PokerList - Find Poker Tournaments & Cash Games Near You";
  const pageDescription = "Your ultimate guide to live poker tournaments, cash games, and poker rooms. Discover events and download the PokerList app.";
  const pageKeywords = "poker, poker tournaments, cash games, poker rooms, live poker, poker events, poker clubs, pokerlist";
  const canonicalUrl = "https://pokerlist.com/";
  const ogImage = "/opengraph-default.png";

  // JSON-LD Structured Data for WebSite
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PokerList",
    "url": canonicalUrl,
    "description": pageDescription
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
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
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
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-2 pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <HeroSection />
        <FeaturedTournaments />
        <LiveCashGames />
        <CountrySelector />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
