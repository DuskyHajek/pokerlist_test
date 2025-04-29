import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const countries = [
  { code: "AT", name: "Austria", flag: "https://flagcdn.com/at.svg" },
  { code: "BE", name: "Belgium", flag: "https://flagcdn.com/be.svg" },
  { code: "BR", name: "Brazil", flag: "https://flagcdn.com/br.svg" },
  { code: "BG", name: "Bulgaria", flag: "https://flagcdn.com/bg.svg" },
  { code: "HR", name: "Croatia", flag: "https://flagcdn.com/hr.svg" },
  { code: "CZ", name: "Czech Republic", flag: "https://flagcdn.com/cz.svg" },
  { code: "FR", name: "France", flag: "https://flagcdn.com/fr.svg" },
  { code: "DE", name: "Germany", flag: "https://flagcdn.com/de.svg" },
  { code: "GB", name: "Great Britain", flag: "https://flagcdn.com/gb.svg" },
  { code: "GR", name: "Greece", flag: "https://flagcdn.com/gr.svg" },
  { code: "HU", name: "Hungary", flag: "https://flagcdn.com/hu.svg" },
  { code: "IT", name: "Italy", flag: "https://flagcdn.com/it.svg" },
  { code: "MT", name: "Malta", flag: "https://flagcdn.com/mt.svg" },
  { code: "NL", name: "Netherlands", flag: "https://flagcdn.com/nl.svg" },
  { code: "PL", name: "Poland", flag: "https://flagcdn.com/pl.svg" },
  { code: "PT", name: "Portugal", flag: "https://flagcdn.com/pt.svg" },
  { code: "SK", name: "Slovakia", flag: "https://flagcdn.com/sk.svg" },
  { code: "ES", name: "Spain", flag: "https://flagcdn.com/es.svg" },
  { code: "CH", name: "Switzerland", flag: "https://flagcdn.com/ch.svg" },
];

const CountrySelector = () => {
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-b from-background to-pokerDarkBlue/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Find Poker Rooms by Country</h2>
        <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          Explore poker rooms and casinos in different countries. Click on a country to see all venues.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-center mx-auto max-w-5xl">
          {countries.map((country) => (
            <Link
              key={country.code}
              to={`/casinos/${country.code}`}
              className="card-highlight group p-3 sm:p-4 flex items-center justify-center hover:scale-105 transition-all rounded-lg"
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <img
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  className="w-16 h-10 sm:w-16 sm:h-12 object-cover rounded-md shadow bg-muted transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <span className="text-xs sm:text-sm md:text-base font-medium text-center group-hover:text-primary transition-colors duration-200">{country.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <Link 
            to="/casinos" 
          >
            <Button 
              variant="outline" 
              className={cn(
                "border-white/20 text-white hover:border-primary/80 hover:text-primary active:scale-95 transition-all duration-300",
                "px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              )}
            >
              View All Casinos
              <ChevronRight size={18} className="ml-1 sm:ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountrySelector;
