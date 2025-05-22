import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DownloadApp from "../components/DownloadApp";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Countries array without hardcoded casinoCounts - we'll fetch the real counts
const countries = [
  { code: "AT", name: "Austria", flag: "https://flagcdn.com/at.svg", casinoCount: 0 },
  { code: "BE", name: "Belgium", flag: "https://flagcdn.com/be.svg", casinoCount: 0 },
  { code: "BR", name: "Brazil", flag: "https://flagcdn.com/br.svg", casinoCount: 0 },
  { code: "BG", name: "Bulgaria", flag: "https://flagcdn.com/bg.svg", casinoCount: 0 },
  { code: "HR", name: "Croatia", flag: "https://flagcdn.com/hr.svg", casinoCount: 0 },
  { code: "CZ", name: "Czech Republic", flag: "https://flagcdn.com/cz.svg", casinoCount: 0 },
  { code: "FR", name: "France", flag: "https://flagcdn.com/fr.svg", casinoCount: 0 },
  { code: "DE", name: "Germany", flag: "https://flagcdn.com/de.svg", casinoCount: 0 },
  { code: "GB", name: "Great Britain", flag: "https://flagcdn.com/gb.svg", casinoCount: 0 },
  { code: "GR", name: "Greece", flag: "https://flagcdn.com/gr.svg", casinoCount: 0 },
  { code: "HU", name: "Hungary", flag: "https://flagcdn.com/hu.svg", casinoCount: 0 },
  { code: "IT", name: "Italy", flag: "https://flagcdn.com/it.svg", casinoCount: 0 },
  { code: "MT", name: "Malta", flag: "https://flagcdn.com/mt.svg", casinoCount: 0 },
  { code: "NL", name: "Netherlands", flag: "https://flagcdn.com/nl.svg", casinoCount: 0 },
  { code: "PL", name: "Poland", flag: "https://flagcdn.com/pl.svg", casinoCount: 0 },
  { code: "PT", name: "Portugal", flag: "https://flagcdn.com/pt.svg", casinoCount: 0 },
  { code: "SK", name: "Slovakia", flag: "https://flagcdn.com/sk.svg", casinoCount: 0 },
  { code: "ES", name: "Spain", flag: "https://flagcdn.com/es.svg", casinoCount: 0 },
  { code: "CH", name: "Switzerland", flag: "https://flagcdn.com/ch.svg", casinoCount: 0 },
];

const Casinos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesWithCounts, setCountriesWithCounts] = useState(countries);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCasinoCounts = async () => {
      setIsLoading(true);
      const updatedCountries = [...countries];
      
      // Fetch casino counts for each country
      try {
        // Process countries sequentially to avoid overwhelming the API
        for (const country of updatedCountries) {
          try {
            const externalApiBaseUrl = import.meta.env.VITE_EXTERNAL_API_BASE_URL;
            const response = await fetch(externalApiBaseUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `country=${encodeURIComponent(country.code)}`
            });
            
            if (response.ok) {
              const xml = await response.text();
              // Count the number of POKERCLUB tags to get the casino count
              const matches = xml.match(/<POKERCLUB\s+([^>]+)\/>/g);
              country.casinoCount = matches ? matches.length : 0;
            }
          } catch (error) {
            console.error(`Error fetching data for ${country.name}:`, error);
            // Keep the count at 0 in case of error
          }
        }
        setCountriesWithCounts(updatedCountries);
      } catch (error) {
        console.error("Error fetching casino counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCasinoCounts();
  }, []);

  const filteredCountries = countriesWithCounts.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // SEO: Dynamic meta tags and structured data
  const pageTitle = "Poker Rooms & Casinos Database | Find Poker Venues Worldwide | PokerList";
  const pageDescription = "Browse our comprehensive database of poker rooms and casinos across 19+ countries. Find poker tournaments, cash games, and venue details for your next poker destination.";
  const pageKeywords = "poker rooms, casinos worldwide, poker venues, international poker, casino database, find poker games, pokerlist";
  const canonicalUrl = "https://pokerlist.com/casinos";
  const ogImage = "/opengraph-default.png";

  // JSON-LD Structured Data for ItemList (countries)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": countriesWithCounts.map((country, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Country",
        "name": country.name,
        "url": `/casinos/${country.code}`,
        "image": country.flag
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
        "name": "Casinos",
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
                <BreadcrumbPage>Casinos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="hero-gradient-casinos py-16 md:py-24 text-center h-[360px] md:h-[280px]">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
              Poker Casinos Worldwide
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8 animate-fade-in">
              Discover over 450+ poker rooms and casinos across the globe
            </p>
          </div>
        </div>
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {filteredCountries.map((country, index) => (
                <Link
                  key={country.code}
                  to={`/casinos/${country.code}`}
                  aria-label={`View casinos in ${country.name}`}
                >
                  <Card
                    className={cn(
                      "card-highlight h-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/30 animate-fade-in"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="aspect-video relative overflow-hidden bg-pokerDarkBlue/20">
                      <img
                        src={country.flag}
                        alt={`${country.name} Flag`}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-base mb-1">{country.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <img 
                          src="/icons/casinos.png" 
                          alt="Casino" 
                          className="h-3 w-3 mr-1 flex-shrink-0 object-contain" 
                        />
                        <span>{isLoading ? '...' : `${country.casinoCount} Poker Rooms`}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default Casinos;
