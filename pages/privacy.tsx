import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <SEO 
        title="Privacy Policy | BuyLetLive" 
        description="Learn how BuyLetLive handles and protects your data. Our commitment to transparency and data security."
        canonicalUrl="/privacy"
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-brand-purple-dark mb-8 leading-tight">Privacy Policy</h1>
        
        <div className="prose prose-purple max-w-none text-gray-600 font-light leading-relaxed space-y-8">
          <section>
            <p className="text-lg">
              At BuyLetLive, we prioritize the protection of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us when using our platform and professional real estate services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-purple-dark mb-4">1. Information Collection</h2>
            <p>
              We collect information that you voluntarily provide when you register on our platform, submit property enquiries, or engage with our advisory services. This may include your name, email address, phone number, and specific property preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-purple-dark mb-4">2. Use of Information</h2>
            <p>
              The information we collect is used solely to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide personalized property recommendations and advisory support.</li>
              <li>Process your enquiries and facilitate viewings with our verified partners.</li>
              <li>Send strategic market updates and platform notifications (which you can opt-out of at any time).</li>
              <li>Improve our platform's user experience and professional service delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-purple-dark mb-4">3. Data Security & Transparency</h2>
            <p>
              We implement institutional-grade security measures to protect your data. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your explicit consent, except to trusted partners who assist us in operating our platform and conducting our business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-purple-dark mb-4">4. Cookies & Tracking</h2>
            <p>
              Our website uses cookies to enhance your browsing experience and analyze site traffic. This helps us understand user behavior and optimize the platform for the Nigerian Diaspora and local investors.
            </p>
          </section>

          <section className="pt-10 border-t border-gray-100">
            <p className="text-sm text-gray-400 italic">
              This policy is part of our commitment to transparency. For any questions regarding your data, please contact our privacy officer at info@buyletlive.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
