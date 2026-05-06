import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, X, Clock, Globe2, Building2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function FinancingPage() {
  const [propertyValue, setPropertyValue] = useState<number>(150000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number | string>(13.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);

  const downPayment = (propertyValue * downPaymentPercent) / 100;
  const loanAmount = propertyValue - downPayment;
  
  const monthlyRate = ((Number(interestRate) || 0) / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = monthlyRate > 0 
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    : loanAmount / numberOfPayments;

  const WHATSAPP_LINK = "https://wa.me/2349131037985?text=Hi%20BuyLetLive,%20I'm%20coming%20from%20the%20Mortgage%20Platform%20and%20would%20like%20to%20speak%20with%20an%20advisor.";

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-sans">
      <SEO 
        title="Real Estate Financing & Mortgages | BuyLetLive" 
        description="Access premium mortgage solutions and bespoke financing structures for real estate in Nigeria. Tailored for private and corporate investors."
        canonicalUrl="/financing"
      />
      
      {/* SECTION 1: HERO */}
      <section className="bg-brand-purple-dark text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Luxury Real Estate Mortgage" loading="lazy" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark/95 via-brand-purple-dark/80 to-brand-purple-dark/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-white leading-tight drop-shadow-md">
              Get a Mortgage for Property in Nigeria, <span className="text-brand-mint">From Anywhere You Are</span>
            </h1>
            <p className="text-white text-lg md:text-xl leading-relaxed mb-10 drop-shadow-sm font-light">
              We help you understand what you can comfortably afford, match you with trusted lenders and verified property, and stay with you until you get your keys.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
               <Link href="/mortgage-apply" className="px-8 py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(102,255,204,0.4)] flex items-center gap-3">
                 Apply for Mortgage Pre-Approval <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
            
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4 font-bold">In Partnership With Leading Banks</p>
            <div className="flex flex-wrap gap-6 items-center bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 inline-flex">
              <img src="/assets/logos/Providus Bank Logo.png" alt="Providus Bank" className="h-8 md:h-10 bg-white px-3 py-1.5 rounded-lg object-contain shadow-sm" />
              <img src="/assets/logos/Homebase Mortgage Bank.png" alt="Homebase Mortgage" className="h-8 md:h-10 bg-white px-3 py-1.5 rounded-lg object-contain shadow-sm" />
              <img src="/assets/logos/Stanbic IBTC Bank.png" alt="Stanbic IBTC" className="h-8 md:h-10 bg-white px-3 py-1.5 rounded-lg object-contain shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE ADVANTAGE */}
      <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-6 leading-tight">Your Direct Bridge to <br/>Property Financing.</h2>
            <p className="text-gray-600 text-lg">We act as your professional representative. We don't issue the debt; we structure it with our partners to ensure you get terms that are otherwise unavailable to the public.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Dedicated Support", desc: "We are with you every step of the way—from your initial application to the moment you receive your keys, ensuring a smooth and guided experience." },
              { icon: CheckCircle2, title: "Flexible Terms", desc: "Access 5-25 year mortgage terms with competitive fixed and variable rates through our network of trusted banking partners." },
              { icon: Building2, title: "Verified Properties", desc: "We only work with verified developers and properties, removing the guesswork and ensuring you buy with absolute confidence." },
              { icon: Clock, title: "Hassle-Free Process", desc: "We handle the complex bank negotiations and paperwork on your behalf, providing a smooth path from application to getting your keys." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-mint/50 transition-colors group">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-mint/20 transition-colors">
                  <item.icon className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-brand-purple-dark">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CALCULATOR */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-purple-dark rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                <Calculator className="w-4 h-4" /> Live Calculator
              </div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6 text-brand-purple-dark leading-tight">Know Your Exact Commitment.</h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed font-light">
                No hidden fees. No surprises. Adjust the parameters to see your monthly commitment.
              </p>

              <div className="space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Property Price (₦)</label>
                    <span className="text-brand-purple-dark font-bold text-lg">₦ {propertyValue.toLocaleString()}</span>
                  </div>
                  <input type="range" min="50000000" max="2000000000" step="10000000" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full h-2 bg-brand-purple-dark rounded-lg appearance-none cursor-pointer accent-white" />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Loan Duration (Years)</label>
                    <span className="text-brand-purple-dark font-bold text-lg">{loanTerm} Years</span>
                  </div>
                  <input type="range" min="5" max="30" step="1" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full h-2 bg-brand-purple-dark rounded-lg appearance-none cursor-pointer accent-white" />
                  <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    <span>5 Years</span>
                    <span>20 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Interest Rate (%)</label>
                    <span className="text-brand-purple-dark font-bold text-lg">{interestRate}%</span>
                  </div>
                  <input type="range" min="1" max="100" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-brand-purple-dark rounded-lg appearance-none cursor-pointer accent-white" />
                  <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    <span>1%</span>
                    <span>13.5%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-brand-purple text-white p-10 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                <h3 className="text-xl font-medium mb-10 text-brand-mint border-b border-white/10 pb-4">Financial Breakdown</h3>
                <div className="mb-12">
                  <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Est. Monthly Mortgage</div>
                  <div className="text-5xl md:text-6xl font-serif">₦ {Math.round(monthlyPayment).toLocaleString()}</div>
                </div>
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <span className="text-gray-300 font-light">Bank Finances</span>
                    <span className="font-bold text-lg">₦ {loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <span className="text-gray-300 font-light">Down Payment (30%)</span>
                    <span className="font-bold text-lg text-brand-mint">₦ {downPayment.toLocaleString()}</span>
                  </div>
                </div>
                <Link href="/mortgage-apply" className="w-full py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Start Application <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PATH */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-20">Your Path to Ownership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {[
              { step: 1, title: "Get Pre-Approved", desc: "Submit your details to understand your capacity." },
              { step: 2, title: "Select Your Asset", desc: "Choose from verified, mortgage-eligible properties." },
              { step: 3, title: "Sign & Own", desc: "We handle the bank negotiations while you get the keys." }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-brand-purple/5 text-brand-purple flex items-center justify-center text-3xl font-serif font-bold mb-6">{s.step}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 font-light text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-brand-purple-dark rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Ready to Start?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mortgage-apply" className="px-10 py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-sm rounded-xl hover:scale-105 transition-transform">
                Start Pre-Approval
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Speak with Advisor <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif text-brand-purple-dark mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "What is the role of BuyLetLive?", a: "We act as your advisory bridge, structuring the deal with our banking partners like Homebase and Stanbic IBTC." },
              { q: "Can I get a mortgage if I live abroad?", a: "Yes. Our Diaspora Mortgage desk is designed for Nigerians earning in foreign currencies." },
              { q: "How much down payment do I need?", a: "Typically, 30% for residential properties." },
              { q: "How long does approval take?", a: "Timelines vary by bank, but we work to expedite the process once documentation is ready." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-gray-600 text-sm font-light">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ADVISOR CTA */}
      <section className="py-20 bg-brand-purple text-center">
        <h2 className="text-3xl font-serif text-white mb-6">Need a custom structure?</h2>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-brand-mint text-brand-mint font-black uppercase tracking-widest text-sm rounded-xl hover:bg-brand-mint hover:text-brand-purple-dark transition-all">
          Consult with Senior Advisor <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </div>
  );
}
