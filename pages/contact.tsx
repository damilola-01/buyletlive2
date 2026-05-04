import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
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

export default function ContactPage() {
  const router = useRouter();
  const { ref } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Property Acquisition',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = {
      name: form.name,
      email: form.email,
      phone: `${countryCode.code}${form.phone}`,
      interest: form.subject,
      notes: `Source: ${ref || 'Direct'} | Country: ${countryCode.country} | Subject: ${form.subject}\n\nMessage: ${form.message}`,
    };

    const response = await apiService.submitLead(data);
    setIsSubmitting(false);
    
    if (response.success) {
      setIsSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: 'Property Acquisition', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <SEO 
        title="Contact Us | BuyLetLive" 
        description="Get in touch with Nigeria's premier real estate advisory firm. Reach our advisors via phone, email, or visit our Lagos office."
        canonicalUrl="/contact"
      />

      {/* Header */}
      <section className="bg-brand-purple-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-brand-purple-dark/95"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Connect with Us</h1>
          <p className="text-gray-200 text-lg max-w-2xl font-light leading-relaxed">
            Whether you are looking to acquire your next premium property, manage your assets, or seek institutional advisory, our team is ready to assist.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-mint/10 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Call Our Advisors</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">Dedicated support for property sales, leasing, and advisory services.</p>
              <a href="tel:+2349131037985" className="text-2xl font-serif text-brand-purple-dark hover:text-brand-mint transition-colors tracking-tight">+234 913 103 7985</a>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-mint/10 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Email Inquiry</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">For general inquiries, corporate partnerships, and media requests.</p>
              <a href="mailto:info@buyletlive.com" className="text-lg font-bold text-brand-purple-dark hover:text-brand-mint transition-colors">info@buyletlive.com</a>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-mint/10 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Lagos HQ</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">Visit us at our strategic office in the heart of the business district.</p>
              <address className="not-italic text-brand-purple-dark font-medium text-center">
                12th Floor, Tower C, <br />
                Zenith Heights, Victoria Island, <br />
                Lagos, Nigeria
              </address>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-purple-dark mb-6 leading-tight">Professional Support <br />for Every Transaction</h2>
              <p className="text-gray-600 text-lg mb-10 font-light leading-relaxed">
                At BuyLetLive, we prioritize transparency and rapid response. Our advisors are trained to provide institutional-grade support across all time zones, ensuring your acquisition journey is seamless.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Institutional Verification</h4>
                    <p className="text-sm text-gray-500">Every property on our platform undergoes rigorous title and structural auditing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Direct Advisor Access</h4>
                    <p className="text-sm text-gray-500">Speak directly with specialized advisors for sales, rentals, or commercial assets.</p>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/2349131037985" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
                <MessageCircle className="w-5 h-5" /> Chat via WhatsApp
              </a>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl">
              <h3 className="text-2xl font-serif text-brand-purple-dark mb-8 text-center">Send a Message</h3>
              
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-purple-dark mb-2">Message Sent</h3>
                  <p className="text-gray-600">Your inquiry has been received. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Phone / WhatsApp</label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode.label}
                        onChange={e => setCountryCode(COUNTRY_CODES.find(c => c.label === e.target.value) || COUNTRY_CODES[0])}
                        className="bg-gray-50 border border-gray-200 px-3 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm shrink-0 w-[120px]"
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.label} value={c.label}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input 
                        type="tel" 
                        required
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm" 
                        placeholder="800 000 0000" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Subject</label>
                    <select 
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm appearance-none"
                    >
                      <option>Property Acquisition</option>
                      <option>Property Management</option>
                      <option>Corporate Partnership</option>
                      <option>Media Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      required
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm" 
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-purple text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-brand-purple-dark transition-all shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Message'} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
