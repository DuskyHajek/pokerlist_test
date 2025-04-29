import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Casinos = lazy(() => import("./pages/Casinos"));
const Events = lazy(() => import("./pages/Events"));
const CashGamesPage = lazy(() => import("./pages/CashGamesPage"));
const CasinoDetail = lazy(() => import("./pages/CasinoDetail"));
const CasinosByCountry = lazy(() => import("./pages/CasinosByCountry"));
const FestivalDetail = lazy(() => import("./pages/FestivalDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
