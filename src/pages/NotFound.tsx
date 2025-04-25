import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Frown } from "lucide-react";

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
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="secondary-cta-button inline-flex items-center">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
