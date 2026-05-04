import { useState } from 'react';
import { ShieldCheck, ArrowRight, Globe, Users, Scale } from 'lucide-react';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import Toast from '../components/Toast';

export default function Advisory() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      interest: formData.get('interest') as string,
      location: formData.get('location') as string,
      budget: formData.get('budget') as string,
      notes: formData.get('notes') as string,
    };

    const response = await apiService.submitLead(data);
    setIsSubmitting(false);

    if (response.success) {
      setToast({ message: response.message, type: 'success' });
      (e.target as HTMLFormElement).reset();
    } else {
      setToast({ message: 'Error submitting request. Please try again.', type: 'error' });
    }
  };

  return (
    <>
      <SEO
        title="Premium Real Estate Advisory | Strategic Property Support for Nigerians"
        description="Secure and transparent property acquisition for Nigerians at home and abroad. Professional-grade legal support, virtual tours, and dedicated account managers."
        canonicalUrl="/advisory"
      />

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Premium Institutional Estate Advisory"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-purple-dark/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">Strategic Property Protection for <br />Nigerians at Home & Abroad</h1>
          <p className="text-gray-200 text-lg max-w-3xl font-light leading-relaxed">
            Secure your piece of home with absolute certainty. We provide the professional oversight needed to bridge the distance, ensuring your real estate investments in Nigeria are verified, transparent, and strictly audited.
          </p>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Globe, title: '24/7 Support Across Time Zones', desc: 'We work around the clock to match your schedule, wherever you are.' },
            { icon: ShieldCheck, title: 'Investment Security', desc: 'Your properties are protected through rigorous institutional verification and SOPs.' },
            { icon: Users, title: 'Dedicated Account Manager', desc: 'A single point of contact for your entire acquisition journey.' },
            { icon: Scale, title: 'Legal & Title Verification', desc: 'Comprehensive due diligence on every property before you commit.' },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Text / SEO Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" /> Buy From Abroad
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight text-brand-purple-dark">
              Strategic Real Estate Advisory for <span className="text-brand-mint">Global Nigerians.</span>
            </h2>
            <div className="space-y-6 text-gray-600 font-light leading-relaxed mb-10 text-lg">
              <p>
                Navigating the Nigerian real estate market from abroad requires more than just a local contact—it requires strategic oversight. At BuyLetLive, we serve as your fractional real estate office on the ground, providing end-to-end property protection and lifecycle management.
              </p>
              <p>
                From the initial title audit to post-acquisition property management, we ensure your capital is secured by rigorous SOPs and market-leading legal frameworks. Our mandate is to bridge the distance with absolute transparency, giving you the confidence of a local insider with the professional standards of a global firm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-t border-gray-100">
              {[
                { title: 'Custodianship', desc: 'Secure property management and absolute legal auditing.' },
                { title: 'Transparency', desc: 'Real-time 4K video reporting and verified title chains.' },
                { title: 'Yield Focus', desc: 'Strategic asset optimization for maximum ROI.' },
                { title: 'Bespoke Support', desc: 'Dedicated strategic account managers serving clients globally.' },
              ].map(item => (
                <div key={item.title}>
                  <h4 className="font-bold text-brand-purple-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advisor Form */}
          <div className="bg-white border border-gray-200 p-8 md:p-10 shadow-2xl rounded-xl sticky top-28">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <img src="/assets/team/lekan.jpg" alt="Lekan - Lead Advisor" onError={(e) => { e.currentTarget.style.display='none' }} className="w-16 h-16 rounded-full object-cover border-2 border-brand-mint shadow-md" />
              <div>
                <h3 className="font-serif text-brand-purple-dark text-lg">Speak to Lekan</h3>
                <p className="text-xs text-brand-mint uppercase tracking-widest font-bold">Lead Diaspora Advisor</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-8">Fill out the form below and our private advisory team will contact you securely within 2 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
                <input name="fullName" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="John Doe" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone / WhatsApp</label>
                  <input name="phone" type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="+234 800 000 0000" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input name="email" type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Property Interest</label>
                  <select name="interest" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                    <option>Residential (Buy)</option>
                    <option>Residential (Rent)</option>
                    <option>Commercial</option>
                    <option>Off-Plan / Investment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Location</label>
                  <select name="location" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                    <option>Lagos (Island)</option>
                    <option>Lagos (Mainland)</option>
                    <option>Abuja</option>
                    <option>Port Harcourt</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Budget</label>
                <select name="budget" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                  <option>Under ₦100M</option>
                  <option>₦100M – ₦250M</option>
                  <option>₦250M – ₦500M</option>
                  <option>₦500M – ₦1B</option>
                  <option>₦1B – ₦2.5B</option>
                  <option>₦2.5B+</option>
                </select>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <input type="checkbox" id="increaseBudget" className="w-4 h-4 rounded text-brand-mint focus:ring-brand-mint border-gray-300" />
                <label htmlFor="increaseBudget" className="text-sm text-gray-700 font-medium cursor-pointer">I am willing to increase my budget for the right property</label>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Additional Notes</label>
                <textarea name="notes" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" rows={4} placeholder="Tell us more about what you're looking for..." />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-4 bg-brand-purple text-white font-bold rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Submit Request'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── TOAST ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
