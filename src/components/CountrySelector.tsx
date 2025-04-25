import React from "react";
import { countries } from "../data/mockData";
import { Link } from "react-router-dom";

const CountrySelector = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Find Poker Rooms by Country</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Explore poker rooms and casinos in different countries. Click on a country to see all venues.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {countries.map((country) => (
            <Link
              key={country.code}
              to={`/casinos/${country.code}`}
              className="card-highlight p-4 flex items-center justify-center hover:scale-105 transition-all"
            >
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  className="w-16 h-12 object-cover rounded shadow bg-muted"
                />
                <span className="font-medium">{country.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/casinos" 
            className="secondary-cta-button"
          >
            View All Casinos
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountrySelector;
