import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ArrowRight, Play, CheckCircle2, Phone, Video, MessageSquare, Calendar, Clock, Star, ShieldCheck, X } from 'lucide-react';
import SEO from '../components/SEO';
import { apiService } from '../services/api';
import Toast from '../components/Toast';

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM',
  '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
];

const MEETING_TYPES = [
  { id: 'call', icon: Phone, label: 'Phone Call', desc: 'A direct call with your advisor' },
  { id: 'video', icon: Video, label: 'Video Call', desc: 'Face-to-face via Zoom / Meet' },
  { id: 'whatsapp', icon: MessageSquare, label: 'WhatsApp', desc: 'Flexible messaging consultation' },
];

const ADVISORS = [
  {
    name: 'Ndiana A.',
    title: 'Senior Asset Advisor',
    image: '/assets/team/ndiana.jpg',
    speciality: 'Lagos Island · Premium Residential',
    rating: 5,
    reviews: 84,
  },
  {
    name: 'Lekan',
    title: 'Senior Strategic Advisor & CX Manager',
    image: '/assets/team/lekan.jpg',
    speciality: 'Off-Market Acquisitions · Institutional Grade Estates',
    rating: 5,
    reviews: 142,
  },
];

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

export default function SpeakToAdvisor() {
  const router = useRouter();
  const { ref } = router.query;
  const [step, setStep] = useState(1); // 1: Details, 2: Schedule, 3: Confirm
  const [meetingType, setMeetingType] = useState('call');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAdvisor, setSelectedAdvisor] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);

  // Form state
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', interest: '', budget: '', notes: '',
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const data = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: `${countryCode.code}${form.phone}`,
      country: countryCode.country,
      interest: form.interest,
      budget: form.budget,
      notes: `Source: ${ref || 'Direct'} | Country: ${countryCode.country} | Advisor: ${ADVISORS[selectedAdvisor].name} | Type: ${meetingType} | Slot: ${selectedDate} ${selectedSlot}`,
    };

    const response = await apiService.submitLead(data);
    setIsSubmitting(false);
    
    if (response.success) {
      setIsSuccess(true);
    } else {
      setToast({ message: 'Error booking consultation. Please try again.', type: 'error' });
    }
  };

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <SEO
        title="Speak to a Sales Advisor | Book a Consultation"
        description="Book a free consultation with a BuyLetLive property advisor. Choose your preferred time, meeting type, and advisor. We'll help you find your perfect property."
        canonicalUrl="/speak-to-advisor"
      />

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-32 bg-brand-purple-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80" alt="Consultation" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-dark via-transparent to-brand-purple-dark"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Expert Advisory <br /><span className="text-brand-mint italic">Tailored to You.</span></h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Choose your preferred advisor, schedule a time that works for you, and start your real estate journey with absolute professional guidance.
          </p>
        </div>
      </section>

      {/* ── MULTI-STEP FORM ── */}
      <section className="relative -mt-20 pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {isSuccess ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-gray-100">
               <div className="w-20 h-20 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-brand-mint" />
               </div>
               <h2 className="text-3xl font-serif text-brand-purple-dark mb-4">Consultation Requested</h2>
               <p className="text-gray-600 mb-8 max-w-md mx-auto">Thank you for your interest. {ADVISORS[selectedAdvisor].name} will contact you via your preferred meeting type shortly.</p>
               <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-brand-purple text-white font-bold rounded-lg hover:bg-brand-purple-dark transition-all">Back to Home</button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px] border border-gray-100">
              
              {/* Left Sidebar: Progress */}
              <div className="lg:w-1/3 bg-brand-purple-dark p-12 text-white border-r border-white/5">
                <div className="space-y-12">
                  {[
                    { n: 1, title: 'Your Details', desc: 'Contact information' },
                    { n: 2, title: 'Meeting Choice', desc: 'Advisor & format' },
                    { n: 3, title: 'Confirmation', desc: 'Review & submit' }
                  ].map((s) => (
                    <div key={s.n} className={`flex gap-6 items-center transition-opacity ${step >= s.n ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= s.n ? 'bg-brand-mint text-brand-purple-dark border-brand-mint' : 'border-white/20'}`}>
                        {s.n}
                      </div>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-widest">{s.title}</div>
                        <div className="text-xs text-white/50">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-24 pt-12 border-t border-white/10">
                  <div className="flex gap-4 items-start">
                    <ShieldCheck className="w-5 h-5 text-brand-mint shrink-0" />
                    <p className="text-xs text-white/60 leading-relaxed">Your data is secured by institutional-grade encryption and will only be used for advisory purposes.</p>
                  </div>
                </div>
              </div>

              {/* Right: Step Content */}
              <div className="lg:w-2/3 p-8 md:p-16">
                
                <form onSubmit={(e) => e.preventDefault()}>
                  
                  {/* ─ Step 1: Details ─ */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-serif text-brand-purple-dark mb-8">Start with your details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">First Name</label>
                          <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="John" required />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Last Name</label>
                          <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="Doe" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="john@example.com" required />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Country</label>
                          <select 
                            value={countryCode.label}
                            onChange={(e) => {
                              const selected = COUNTRY_CODES.find(c => c.label === e.target.value);
                              if (selected) setCountryCode(selected);
                            }}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50"
                          >
                            {COUNTRY_CODES.map(c => (
                              <option key={c.label} value={c.label}>{c.flag} {c.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
                          <div className="flex">
                            <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 flex items-center text-sm font-medium text-gray-500">
                              {countryCode.code}
                            </div>
                            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" className="w-full border border-gray-200 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="800 000 0000" required />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Interest</label>
                          <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                            <option value="">Select interest...</option>
                            <option>Buying — Residential</option>
                            <option>Buying — Commercial</option>
                            <option>Off-Plan / Investment</option>
                            <option>Diaspora / Remote Purchase</option>
                            <option>Property Management</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Budget Range</label>
                          <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
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
                      
                      <div className="pt-8 flex justify-end">
                        <button onClick={() => setStep(2)} className="px-10 py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-dark transition-all flex items-center gap-2">
                          Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ─ Step 2: Meeting Choice ─ */}
                  {step === 2 && (
                    <div className="space-y-10">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-purple-dark mb-6">1. Choose your advisor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {ADVISORS.map((adv, idx) => (
                            <button
                              key={adv.name}
                              onClick={() => setSelectedAdvisor(idx)}
                              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${selectedAdvisor === idx ? 'bg-brand-mint/5 border-brand-mint ring-1 ring-brand-mint' : 'bg-white border-gray-100 hover:border-brand-mint/30'}`}
                            >
                              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                                <img src={adv.image} alt={adv.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-bold text-brand-purple-dark group-hover:text-brand-purple">{adv.name}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{adv.title}</div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-3 h-3 fill-brand-mint text-brand-mint" />
                                  <span className="text-[10px] font-bold text-gray-700">{adv.rating}.0 ({adv.reviews} reviews)</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-purple-dark mb-6">2. Choose meeting format</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {MEETING_TYPES.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setMeetingType(type.id)}
                              className={`p-6 rounded-2xl border transition-all text-center group flex flex-col items-center ${meetingType === type.id ? 'bg-brand-mint/5 border-brand-mint ring-1 ring-brand-mint' : 'bg-white border-gray-100 hover:border-brand-mint/30'}`}
                            >
                              <type.icon className={`w-6 h-6 mb-3 transition-colors ${meetingType === type.id ? 'text-brand-purple' : 'text-gray-400'}`} />
                              <div className="font-bold text-sm text-brand-purple-dark mb-1">{type.label}</div>
                              <div className="text-[10px] text-gray-500 leading-tight">{type.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 flex justify-between">
                        <button onClick={() => setStep(1)} className="text-gray-400 font-bold hover:text-brand-purple transition-colors">Go Back</button>
                        <button onClick={() => setStep(3)} className="px-10 py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-dark transition-all flex items-center gap-2">
                          Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ─ Step 3: Confirm ─ */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-2xl font-serif text-brand-purple-dark mb-2">Confirm your booking</h2>
                      <p className="text-sm text-gray-500 mb-8">Please review the details below before confirming</p>
                      
                      <div className="space-y-4 mb-8">
                        {/* Advisor card */}
                        <div className="bg-brand-purple-dark text-white rounded-2xl p-6 flex items-center gap-6">
                           <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-mint shadow-lg">
                              <img src={ADVISORS[selectedAdvisor].image} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="text-brand-mint text-[10px] font-black uppercase tracking-widest mb-1">Assigned Advisor</div>
                              <div className="text-xl font-serif">{ADVISORS[selectedAdvisor].name}</div>
                              <div className="text-sm text-white/60">{ADVISORS[selectedAdvisor].title}</div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { icon: Calendar, label: 'Full Name', value: `${form.firstName} ${form.lastName}` },
                            { icon: Clock, label: 'Meeting Type', value: MEETING_TYPES.find(m => m.id === meetingType)?.label || '—' },
                            { icon: ShieldCheck, label: 'Budget', value: form.budget || 'Not specified' },
                          ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                               <Icon className="w-5 h-5 text-brand-purple/40 shrink-0" />
                               <div>
                                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</div>
                                  <div className="text-sm font-bold text-gray-900">{value}</div>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 flex justify-between items-center">
                        <button onClick={() => setStep(2)} className="text-gray-400 font-bold hover:text-brand-purple transition-colors">Change details</button>
                        <button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting}
                          className="px-12 py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                        >
                          {isSubmitting ? 'Processing...' : 'Confirm Consultation'}
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER MANDATE ── */}
      <section className="py-24 bg-brand-purple-dark text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Play className="w-3.5 h-3.5 fill-current" /> Executive Message
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">The BuyLetLive <br />Mandate</h2>
              <p className="text-gray-300 text-lg mb-8 font-light leading-relaxed">
                "Our mission is to ensure that your real estate journey is backed by institutional-grade auditing and absolute legal certainty. When you speak to our advisors, you are speaking to the most dedicated team in Nigerian real estate."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-mint shadow-lg">
                  <img src="/assets/ceo/jemine.jpg" alt="Jemini Adollo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold">Jemini Adollo</p>
                  <p className="text-brand-mint text-[10px] font-black uppercase tracking-widest">CEO, BuyLetLive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
