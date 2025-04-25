import React from "react";
import { Link } from "react-router-dom";
import { Home, Landmark, CalendarDays, Layers3, Smartphone, Apple, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pokerDarkBlue text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pokerDarkBlue via-black/20 to-pokerDarkBlue opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/lovable-uploads/c94440e7-a2f7-4833-9fc9-bbf34d1beb89.png"
                alt="PokerList Logo"
                className="h-8"
              />
              <span className="text-xl font-bold">PokerList</span>
            </div>
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              Your ultimate companion for finding poker tournaments and cash games. 
              Stay updated with the latest events and discover new poker venues.
            </p>
            
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-3 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="footer-link"><Home size={16} className="mr-2"/>Home</Link></li>
              <li><Link to="/casinos" className="footer-link"><Landmark size={16} className="mr-2"/>Casinos</Link></li>
              <li><Link to="/events" className="footer-link"><CalendarDays size={16} className="mr-2"/>Events</Link></li>
              <li><Link to="/cash-games" className="footer-link"><Layers3 size={16} className="mr-2"/>Live Cash Games</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-3 uppercase tracking-wider">Download</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a href="#" className="footer-link">
                  <Smartphone size={16} className="mr-2"/>
                  <span>Android App</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <Apple size={16} className="mr-2"/>
                  <span>iOS App</span>
                </a>
              </li>
            </ul>
            <h3 className="text-base font-semibold mb-3 uppercase tracking-wider">Contact</h3>
            <a href="mailto:info@pokerlist.com" className="footer-link">
              <Mail size={16} className="mr-2"/>
              info@pokerlist.com
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/30 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} PokerList. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
