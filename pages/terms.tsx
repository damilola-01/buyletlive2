import { ShieldCheck, FileText, Lock, Scale } from 'lucide-react';
import SEO from '../components/SEO';

export default function TermsPage() {

  
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <SEO 
        title="Terms of Agreement | BuyLetLive" 
        description="Review the terms and conditions for using the BuyLetLive platform. Institutional standards for real estate transactions."
        canonicalUrl="/terms"
      />

      <section className="bg-brand-purple-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Terms of Agreement</h1>
          <p className="text-gray-300 font-light max-w-2xl mx-auto">
            Governing the use of our platform and the standards of our professional real estate services.
          </p>

        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-12">
            
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-purple" />
                </div>
                <h2 className="text-2xl font-serif text-brand-purple-dark">1. Institutional Standards</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                BuyLetLive operates as a professional real estate brokerage and advisory firm. All properties listed on our platform undergo a proprietary 14-point verification process. By using this platform, you acknowledge that while we strive for absolute data accuracy, property availability and pricing are subject to market changes.
              </p>
            </article>

            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-brand-purple" />
                </div>
                <h2 className="text-2xl font-serif text-brand-purple-dark">2. Verification Mandate</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                Our "Verified" status indicates that BuyLetLive has conducted preliminary due diligence on property titles, structural integrity, and seller legitimacy. Users are encouraged to perform independent legal verification before final acquisition, supported by our advisory team.
              </p>
            </article>

            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-brand-purple" />
                </div>
                <h2 className="text-2xl font-serif text-brand-purple-dark">3. Data Privacy & Use</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We collect and process personal data in accordance with Nigerian Data Protection Regulations (NDPR). Your information is used strictly for property matching, advisory communication, and transaction facilitation. We do not sell user data to third-party marketing entities.
              </p>
            </article>

            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-purple" />
                </div>
                <h2 className="text-2xl font-serif text-brand-purple-dark">4. Brokerage Fees</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                Standard professional fees apply to all successfully facilitated transactions. These fees are disclosed transparently at the commencement of any acquisition or management mandate.
              </p>
            </article>

            <div className="pt-10 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-400 font-medium">
                For detailed legal inquiries regarding our terms, please contact <a href="mailto:legal@buyletlive.com" className="text-brand-purple hover:underline">legal@buyletlive.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
