import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Pokerlist</title>
        <meta name="description" content="Read the Cookie Policy for Pokerlist (www.pokerlist.com) to understand how we use cookies and your choices." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 max-w-3xl animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center px-4 py-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm font-medium shadow-sm"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold mb-6 text-primary">Cookie Policy</h1>
          <div className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-primary prose-p:mb-4 prose-li:mb-2">
            <p className="text-muted-foreground italic">Last Updated: {new Date().toLocaleDateString()}</p>
            <p>This Cookie Policy explains how Pokerlist ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at <a href="https://www.pokerlist.com">www.pokerlist.com</a> ("Website"). It explains what these technologies are, why we use them, and your rights to control our use of them.</p>
            <h2>1. What are cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            <p>Cookies set by the website owner (in this case, Pokerlist) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g., analytics, advertising, and interactive content).</p>
            <h2>2. Why do we use cookies?</h2>
            <p>We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for analytics and other purposes. This is described in more detail below.</p>
            <h2>3. What types of cookies do we use?</h2>
            <ul>
              <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
              <li><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
              <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you. For example, we use Google Analytics (see below).</li>
            </ul>
            <h2>4. Google Analytics</h2>
            <p>We use Google Analytics to help us analyze how users use the Website. Google Analytics uses cookies to collect information such as how often users visit the Website, what pages they visit, and what other sites they used prior to coming to the Website. We use the information we get from Google Analytics only to improve our Website and services. Google Analytics collects only the IP address assigned to you on the date you visit the Website, rather than your name or other identifying information. We do not combine the information collected through the use of Google Analytics with personally identifiable information.</p>
            <p>For more information on how Google collects and processes data, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google's Privacy & Terms</a>.</p>
            <p>You can prevent Google Analytics from recognizing you on return visits to this Website by disabling cookies on your browser or by opting out via our cookie consent banner.</p>
            <h2>5. How can I control cookies?</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Banner. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
            <p>The Cookie Consent Banner allows you to accept or decline non-essential cookies. You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted.</p>
            <h2>6. Changes to this Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
            <h2>7. Where can you get further information?</h2>
            <p>If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:info@pokerlist.com">info@pokerlist.com</a>.</p>
            <p>For more information about how we use, store and keep your personal data secure, see our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CookiePolicy; 