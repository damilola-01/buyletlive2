import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowRight, Search, CheckCircle2, ShieldCheck, MapPin, Home, Clock } from 'lucide-react';
import Link from 'next/link';
import SEO from '../components/SEO';
import { apiService } from '../services/api';

const COUNTRY_CODES = [
  { code: '+234', flag: '🇳🇬', label: 'Nigeria (+234)', country: 'Nigeria' },
  { code: '+44',  flag: '🇬🇧', label: 'United Kingdom (+44)', country: 'United Kingdom' },
  { code: '+1',   flag: '🇺🇸', label: 'United States (+1)', country: 'United States' },
  { code: '+1',   flag: '🇨🇦', label: 'Canada (+1)', country: 'Canada' },
  { code: '+971', flag: '🇦🇪', label: 'UAE (+971)', country: 'UAE' },
  { code: '+353', flag: '🇮🇪', label: 'Ireland (+353)', country: 'Ireland' },
  { code: '+27',  flag: '🇿🇦', label: 'South Africa (+27)', country: 'South Africa' },
  { code: '+61',  flag: '🇦🇺', label: 'Australia (+61)', country: 'Australia' },
  { code: '+49',  flag: '🇩🇪', label: 'Germany (+49)', country: 'Germany' },
  { code: '+33',  flag: '🇫🇷', label: 'France (+33)', country: 'France' },
  { code: '+233', flag: '🇬🇭', label: 'Ghana (+233)', country: 'Ghana' },
  { code: '+254', flag: '🇰🇪', label: 'Kenya (+254)', country: 'Kenya' },
];

export default function RequestPropertyPage() {
  const router = useRouter();
  const { ref } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('fullName') as string || 'Anonymous',
      email: formData.get('email') as string || '',
      phone: `${countryCode.code}${formData.get('phone')}`,
      interest: 'Property Request',
      notes: `Source: ${ref || 'Direct'} | Country: ${countryCode.country}`,
    };

    const response = await apiService.submitLead(data);
    setIsSubmitting(false);
    
    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <>
      <SEO
        title="Private Property Sourcing & Requirements | Strategic Off-Market Sourcing"
        description="Can't find your ideal property? Register your requirements with our professional sourcing team. We specialize in verified, off-market property matching for private clients."
        canonicalUrl="/request-property"
      />

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Institutional Property Sourcing"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-purple-dark/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Direct Property Sourcing</h1>
          <p className="text-gray-200 text-lg max-w-2xl font-light leading-relaxed">
            Many of our most exclusive properties never reach the public market. Tell us your specific requirements, and our private advisory team will negotiate the perfect acquisition on your behalf.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── FORM (Left 2/3) ── */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-8 md:p-10 shadow-xl rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-6 h-6 text-brand-mint" />
                <h2 className="text-2xl font-serif text-brand-purple-dark">Property Requirements</h2>
              </div>
              <p className="text-sm text-gray-600 mb-8">Please provide as much detail as possible. Our team will review your request and get back to you with curated options.</p>

              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-purple-dark mb-2">Request Received</h3>
                  <p className="text-gray-600 max-w-md mx-auto">Your property request has been submitted successfully. Our sourcing team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form id="request-property-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="John Doe" required />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address</label>
                        <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                       <div>
                         <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone / WhatsApp</label>
                          <div className="flex gap-2">
                            <select
                              value={countryCode.label}
                              onChange={e => setCountryCode(COUNTRY_CODES.find(c => c.label === e.target.value) || COUNTRY_CODES[0])}
                              className="border border-gray-200 rounded-lg px-2.5 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50 shrink-0 w-[100px]"
                            >
                              {COUNTRY_CODES.map(c => (
                                <option key={c.label} value={c.label}>{c.flag} {c.code}</option>
                              ))}
                            </select>
                            <input type="tel" name="phone" className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="800 000 0000" required />
                          </div>
                       </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Preferred Timeline *</label>
                        <select required name="timeline" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                          <option value="">Select timeline...</option>
                          <option>Immediately</option>
                          <option>Within 1-3 Months</option>
                          <option>Within 3-6 Months</option>
                          <option>Just Browsing / Flexible</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Property Details */}
                  <div>
                    <h3 className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-4">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Property Type *</label>
                        <select required name="propertyType" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                          <option value="">Select type...</option>
                          <option>Detached House</option>
                          <option>Semi-Detached House</option>
                          <option>Terraced Duplex</option>
                          <option>Penthouse / Apartment</option>
                          <option>Land</option>
                          <option>Commercial Property</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Preferred Location(s)</label>
                        <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="e.g., Ikoyi, Lekki Phase 1, Maitama" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Minimum Bedrooms *</label>
                        <select required name="bedrooms" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                          <option value="">Select bedrooms...</option>
                          <option>Any</option>
                          <option>1+</option>
                          <option>2+</option>
                          <option>3+</option>
                          <option>4+</option>
                          <option>5+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Maximum Budget *</label>
                        <select required name="budget" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                          <option value="">Select budget...</option>
                          <option>Under ₦100M</option>
                          <option>₦100M – ₦250M</option>
                          <option>₦250M – ₦500M</option>
                          <option>₦500M – ₦1B</option>
                          <option>₦1B – ₦2.5B</option>
                          <option>₦2.5B+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Specific Features or Requirements *</label>
                    <textarea required name="requirements" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" rows={4} placeholder="e.g., Must have a swimming pool, corner piece, waterfront view, minimum 2 BQs..." />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-4 bg-brand-purple text-white font-bold rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Property Request'} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── SIDEBAR (Right 1/3) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* How it works */}
              <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
                <h3 className="text-lg font-serif text-brand-purple-dark mb-6">How It Works</h3>
                <div className="space-y-6">
                  {[
                    { icon: Search, title: 'Submit Your Request', desc: 'Tell us exactly what you need — we listen.' },
                    { icon: ShieldCheck, title: 'We Source & Verify', desc: 'Our team finds matching properties from our exclusive network.' },
                    { icon: Home, title: 'Get Curated Options', desc: 'Receive a shortlist of verified, off-market properties.' },
                    { icon: Clock, title: 'Schedule Viewings', desc: 'Tour your favorites with a dedicated advisor.' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-purple/10 rounded-lg flex items-center justify-center shrink-0">
                        <step.icon className="w-5 h-5 text-brand-purple" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{step.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA - Synced for Clarity */}
              <div className="bg-brand-purple text-white p-8 rounded-xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                <h3 className="text-xl font-serif mb-3 relative z-10 text-white">Direct Sourcing Consultation</h3>
                <p className="text-sm text-gray-300 mb-6 relative z-10 leading-relaxed">
                  Need an immediate answer? Skip the form and chat directly with our sourcing specialists on WhatsApp.
                </p>
                <a
                  href="https://wa.me/2349131037985?text=Hello%2C%20I%20would%20like%20to%20request%20a%20property."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-brand-mint-light transition-all btn-mint-glow relative z-10"
                >
                  Message an Advisor Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
