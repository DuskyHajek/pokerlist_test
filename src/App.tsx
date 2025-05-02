import React, { lazy, Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Cookie } from 'lucide-react';

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Casinos = lazy(() => import("./pages/Casinos"));
const Events = lazy(() => import("./pages/Events"));
const CashGamesPage = lazy(() => import("./pages/CashGamesPage"));
const CasinoDetail = lazy(() => import("./pages/CasinoDetail"));
const CasinosByCountry = lazy(() => import("./pages/CasinosByCountry"));
const FestivalDetail = lazy(() => import("./pages/FestivalDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

const queryClient = new QueryClient();
const GA_MEASUREMENT_ID = "G-7LT4X06BZM";
const COOKIE_NAME = "userCookieConsentPokerlist";

const App = () => {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (consent === "true") {
      setAnalyticsAllowed(true);
    } else if (consent === "false") {
      setAnalyticsAllowed(false);
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsAllowed(true);
    if (!analyticsAllowed) {
    }
  };

  const handleDecline = () => {
    setAnalyticsAllowed(false);
    Object.keys(Cookies.get()).forEach(cookieName => {
      if (cookieName.startsWith('_ga')) {
        Cookies.remove(cookieName, { path: '/', domain: window.location.hostname });
      }
    });
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {analyticsAllowed && (
              <Helmet>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
                <script>
                  {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);};
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                  `}
                </script>
              </Helmet>
            )}
            <ScrollToTop />
            <Suspense fallback={<div className="p-8 flex justify-center items-center h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/casinos" element={<Casinos />} />
                <Route path="/casinos/:countryCode" element={<CasinosByCountry />} />
                <Route path="/casino/:id/:slug?" element={<CasinoDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/cash-games" element={<CashGamesPage />} />
                <Route path="/festival/:clubid/:slug?" element={<FestivalDetail />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

            <CookieConsent
              location="bottom"
              buttonText="Accept"
              declineButtonText="Decline"
              cookieName={COOKIE_NAME}
              expires={150}
              enableDeclineButton
              onAccept={handleAccept}
              onDecline={handleDecline}
              containerClasses="bg-secondary text-secondary-foreground p-4 flex items-center justify-between shadow-md"
              contentClasses="text-sm flex-grow mr-4 flex items-center"
              buttonClasses="bg-primary hover:opacity-90 text-primary-foreground font-semibold py-2 px-4 rounded-md text-sm transition-opacity"
              declineButtonClasses="bg-muted hover:bg-muted/80 text-muted-foreground font-semibold py-2 px-4 rounded-md text-sm transition-colors mr-2"
            >
              <Cookie size={24} className="mr-3 text-primary flex-shrink-0"/>
              <span>
                This website uses cookies to enhance the user experience. See our{' '}
                <Link to="/cookie-policy" className="underline hover:text-primary transition-colors">
                  Cookie Policy
                </Link>{' '}
                for more details.
              </span>
            </CookieConsent>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
