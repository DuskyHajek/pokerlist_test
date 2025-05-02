import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Terms of Service - Pokerlist</title>
        <meta name="description" content="Read the Terms of Service for using Pokerlist (www.pokerlist.com)." />
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
          <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
          <div className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-primary prose-p:mb-4 prose-li:mb-2">
            <p className="text-muted-foreground italic">Last Updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to Pokerlist! These Terms of Service ("Terms") govern your access to and use of the website www.pokerlist.com (the "Service"), operated by Pokerlist ("us", "we", or "our"). Please read these Terms carefully before using our Service.</p>
            <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.</p>
            <h2>1. Use of Service</h2>
            <p>Pokerlist provides information regarding poker events, cash games, and casino locations. The information provided is for informational purposes only. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial use, subject to these Terms.</p>
            <h2>2. User Conduct</h2>
            <ul>
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>To exploit, harm, or attempt to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Pokerlist, a Pokerlist employee, another user, or any other person or entity.</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm or offend Pokerlist or users of the Service or expose them to liability.</li>
            </ul>
            <h2>3. Intellectual Property</h2>
            <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Pokerlist and its licensors. The Service is protected by copyright, trademark, and other laws of both the European Union and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Pokerlist.</p>
            <h2>4. Links To Other Web Sites</h2>
            <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Pokerlist.</p>
            <p>Pokerlist has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites. You acknowledge and agree that Pokerlist shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such third-party web sites or services.</p>
            <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>
            <h2>5. Disclaimers</h2>
            <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
            <p>Pokerlist, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>
            <p>Information on www.pokerlist.com related to poker games, events, or venues is for informational purposes only and does not constitute endorsement or guarantee of accuracy. Participate responsibly and verify details directly with venues.</p>
            <h2>6. Limitation of Liability</h2>
            <p>In no event shall Pokerlist, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
            <h2>7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the European Union, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            <h2>8. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>
            <h2>9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
              <li>By email: info@pokerlist.com</li>
              <li>By visiting this page on our website: www.pokerlist.com</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService; 