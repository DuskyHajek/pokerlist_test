import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Frown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <div className="text-center max-w-md">
        <Frown size={64} className="mx-auto mb-6 text-muted-foreground" />
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary animate-pulse">
          404
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-4">Oops! Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you were looking for.
        </p>
        
        <Link 
          to="/" 
        >
          <Button 
            variant="outline" 
            className={cn(
              "border-white/20 text-white hover:border-primary/80 hover:text-primary active:scale-95 transition-all duration-300",
              "px-6 py-3"
            )}
          >
            <Home size={16} className="mr-2" />
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
