import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/lovable-uploads/c94440e7-a2f7-4833-9fc9-bbf34d1beb89.png" 
              alt="PokerList Logo" 
              className="h-8 transition-transform duration-300 group-hover:scale-110" 
            />
            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              PokerList
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/casinos" className="nav-link">
              Casinos
            </Link>
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <Link to="/cash-games" className="nav-link">
              Live Cash Games
            </Link>
            <Link to="/#download" className="app-download-button px-4 py-2 rounded-md text-white font-medium hover:scale-105 transition-transform">
              Download App
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4 bg-background border-t border-border shadow-lg"
            style={{ animation: 'fade-slide-down 0.3s ease-out forwards' }}
          >
            <div className="flex flex-col space-y-2 items-start px-4">
              <Link 
                to="/" 
                className="nav-link-mobile w-full text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/casinos" 
                className="nav-link-mobile w-full text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Casinos
              </Link>
              <Link 
                to="/events" 
                className="nav-link-mobile w-full text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/cash-games" 
                className="nav-link-mobile w-full text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Live Cash Games
              </Link>
              <div className="pt-2 w-full">
                <div className="border-t border-border/50 w-full"></div>
              </div>
              <Link 
                to="/#download" 
                className="app-download-button px-4 py-2 rounded-md text-white font-medium inline-block w-fit mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Download App
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
