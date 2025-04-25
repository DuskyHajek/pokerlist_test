
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Casinos from "./pages/Casinos";
import Events from "./pages/Events";
import CashGames from "./pages/CashGames";
import CasinoDetail from "./pages/CasinoDetail";
import CasinosByCountry from "./pages/CasinosByCountry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/casinos" element={<Casinos />} />
          <Route path="/casinos/:countryCode" element={<CasinosByCountry />} />
          <Route path="/casino/:id" element={<CasinoDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cash-games" element={<CashGames />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
