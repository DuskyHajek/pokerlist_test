import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const FestivalDetail = () => {
  // Get the clubid from URL parameters
  const { clubid } = useParams<{ clubid: string }>();

  // TODO: Fetch festival and tournament data based on clubid
  // TODO: Display festival details and list of tournaments

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* TODO: Update title dynamically */}
        <title>Festival Detail | PokerList</title>
        <meta name="description" content={`Details for poker festival ${clubid}.`} />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 pt-24">
        <h1 className="text-3xl font-bold mb-6">Festival Detail</h1>
        <p className="mb-4">Displaying details for Festival ID: {clubid}</p>
        
        <div className="bg-muted p-8 rounded-lg">
          <p className="text-muted-foreground">
            (Placeholder: Festival details and tournament list will go here once data fetching is implemented.)
          </p>
          {/* Placeholder structure for tournament list */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tournaments</h2>
          <div className="space-y-4">
            {/* TODO: Map over actual tournament data */}
            <div className="p-4 border rounded">Tournament 1 Placeholder</div>
            <div className="p-4 border rounded">Tournament 2 Placeholder</div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default FestivalDetail; 