import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeaturedTournaments from "../components/FeaturedTournaments";
import LiveCashGames from "../components/LiveCashGames";
import DownloadApp from "../components/DownloadApp";
import CountrySelector from "../components/CountrySelector";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PokerList - Find Poker Tournaments & Cash Games Near You</title>
        <meta name="description" content="Your ultimate guide to live poker tournaments, cash games, and poker rooms. Discover events and download the PokerList app." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedTournaments />
        <LiveCashGames tournaments={[]} />
        <CountrySelector />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
