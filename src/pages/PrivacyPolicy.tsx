import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Pokerlist</title>
        <meta name="description" content="Read the Privacy Policy for Pokerlist (www.pokerlist.com) to understand how we handle your data." />
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
          <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-primary prose-p:mb-6 prose-li:mb-3 space-y-8">
            <p className="text-muted-foreground italic mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="mb-8">
              <p>Pokerlist ("us", "we", or "our") operates the www.pokerlist.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
              <p className="mt-4">We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms of Service, accessible from www.pokerlist.com/terms-of-service.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">1. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Types of Data Collected</h3>
              
              <div className="mt-5">
                <h4 className="text-lg font-medium mb-3 text-primary">Personal Data</h4>
                <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information is typically not required to browse the core information on Pokerlist, but may include, but is not limited to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Email address (if you contact us directly)</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </div>
              
              <div className="mt-5">
                <h4 className="text-lg font-medium mb-3 text-primary">Usage Data</h4>
                <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
              </div>
              
              <div className="mt-5">
                <h4 className="text-lg font-medium mb-3 text-primary">Tracking & Cookies Data</h4>
                <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                <p className="mt-4">For more detailed information on the cookies we use and your choices regarding cookies, please see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">2. Use of Data</h2>
              <p>Pokerlist uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service (primarily through aggregated, anonymized analytics)</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">3. Legal Basis for Processing Personal Data under GDPR</h2>
              <p>If you are from the European Economic Area (EEA), Pokerlist's legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.</p>
              <p className="mt-4">Pokerlist may process your Personal Data because:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>We need to perform a contract with you (though currently, no contract is typically formed for basic browsing)</li>
                <li>You have given us permission to do so (e.g., cookie consent for analytics)</li>
                <li>The processing is in our legitimate interests and it's not overridden by your rights</li>
                <li>To comply with the law</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">4. Data Retention</h2>
              <p>Pokerlist will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
              <p className="mt-4">Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">5. Data Transfer</h2>
              <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction.</p>
              <p className="mt-4">If you are located outside the specified operating region and choose to provide information to us, please note that we transfer the data, including Personal Data, to our operating servers and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
              <p className="mt-4">Pokerlist will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">6. Disclosure of Data</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Legal Requirements</h3>
              <p>Pokerlist may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To comply with a legal obligation</li>
                <li>To protect and defend the rights or property of Pokerlist</li>
                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>To protect the personal safety of users of the Service or the public</li>
                <li>To protect against legal liability</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">7. Data Security</h2>
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">8. Your Data Protection Rights under GDPR</h2>
              <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Pokerlist aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
              <p className="mt-4">If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us at <a href="mailto:info@pokerlist.com" className="text-primary hover:underline">info@pokerlist.com</a>.</p>
              <p className="mt-4">In certain circumstances, you have the following data protection rights:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>The right to access, update or to delete the information we have on you.</li>
                <li>The right of rectification.</li>
                <li>The right to object.</li>
                <li>The right of restriction.</li>
                <li>The right to data portability.</li>
                <li>The right to withdraw consent.</li>
              </ul>
              <p className="mt-4">Please note that we may ask you to verify your identity before responding to such requests.</p>
              <p className="mt-4">You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">9. Service Providers</h2>
              <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
              <p className="mt-4">These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Example: Google Analytics (if consent is given).</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">10. Analytics</h2>
              <p>We use third-party Service Providers like Google Analytics to monitor and analyze the use of our Service, provided you have given consent via our cookie banner.</p>
              <p className="mt-4">Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network. For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">11. Links to Other Sites</h2>
              <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
              <p className="mt-4">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">12. Children's Privacy</h2>
              <p>Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">13. Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.</p>
              <p className="mt-4">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">14. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>By email: <a href="mailto:info@pokerlist.com" className="text-primary hover:underline">info@pokerlist.com</a></li>
                <li>By visiting this page on our website: <a href="https://www.pokerlist.com/contact" className="text-primary hover:underline">www.pokerlist.com/contact</a> (if applicable, otherwise remove)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy; 