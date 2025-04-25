import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { countries } from "../data/mockData";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Casinos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Poker Rooms & Casinos Worldwide | PokerList</title>
        <meta name="description" content="Browse poker rooms and casinos by country. Find the best venues for poker tournaments and cash games near you." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="hero-gradient-casinos hero-lines-casinos py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              Poker Rooms Worldwide
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center mb-8 animate-fade-in">
              Find the best poker venues in your country
            </p>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 max-w-xl mx-auto relative">
              <Input 
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-card border-border focus:border-primary" 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
            
            {filteredCountries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {filteredCountries.map((country, index) => (
                  <Link
                    key={country.code}
                    to={`/casinos/${country.code}`}
                    className="card-highlight group p-6 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="relative w-24 h-16 mb-4 overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={country.flag}
                        alt={`${country.name} Flag`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 bg-muted"
                      />
                    </div>
                    <span className="font-medium text-center group-hover:text-primary transition-colors">
                      {country.name}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1 group-hover:text-primary/80 transition-colors">
                      View Casinos
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-16">
                No countries found matching "{searchTerm}".
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Casinos;
