import { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import SEO from '../components/SEO';

export default function FinancingPage() {
  const [propertyValue, setPropertyValue] = useState<number>(150000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number | string>(18);
  const [loanTerm, setLoanTerm] = useState<number>(15);
  const [isPreApprovalFormOpen, setIsPreApprovalFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate processing endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsPreApprovalFormOpen(false);
      }, 3000);
    }, 1500);
  };

  const downPayment = (propertyValue * downPaymentPercent) / 100;
  const loanAmount = propertyValue - downPayment;
  
  // Monthly payment calculation (Standard Amortization Formula)
  const monthlyRate = ((Number(interestRate) || 0) / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the process for buying property in Nigeria from the diaspora?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide end-to-end legal and advisory support, ensuring secure transactions without you needing to travel."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a mortgage for premium real estate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our financial partners offer competitive mortgage solutions with up to 15-year terms for qualified buyers."
        }
      }
    ]
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <SEO 
        title="Institutional Real Estate Financing & Mortgages | BuyLetLive" 
        description="Access premium mortgage solutions and bespoke financing structures for high-yield real estate in Nigeria. Tailored for private and institutional investors."
        canonicalUrl="/financing"
        schema={faqSchema}
      />
      {/* Header */}
      <section className="bg-brand-purple-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Institutional Real Estate Financing" loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark/95 via-brand-purple-dark/80 to-brand-purple-dark/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white drop-shadow-md">Premium Property Financing Solutions</h1>
            <p className="text-white text-lg leading-relaxed mb-8 drop-shadow-sm font-medium">
              Access institutional mortgage structures and bespoke financing through our network of top-tier financial partners. We simplify the path to acquiring your next high-yield verified property.
            </p>
            <div className="flex flex-wrap gap-6 items-center bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <img src="/assets/logos/Providus Bank Logo.png" alt="Providus Bank" className="h-10 md:h-12 bg-white px-4 py-2 rounded-lg object-contain shadow-sm" />
              <img src="/assets/logos/Homebase Mortgage Bank.png" alt="Homebase Mortgage" className="h-10 md:h-12 bg-white px-4 py-2 rounded-lg object-contain shadow-sm" />
              <img src="/assets/logos/Stanbic IBTC Bank.png" alt="Stanbic IBTC" className="h-10 md:h-12 bg-white px-4 py-2 rounded-lg object-contain shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-purple-dark rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                <Calculator className="w-4 h-4" /> Mortgage Calculator
              </div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Estimate Your Monthly Repayments</h2>
              <p className="text-gray-600 mb-10">
                Use our calculator to estimate your monthly mortgage payments based on current market rates. Adjust the variables to find a financing structure that aligns with your investment strategy.
              </p>

              <div className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Property Value (₦)</label>
                    <span className="text-brand-purple-dark font-bold">₦ {propertyValue.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50000000" 
                    max="2000000000" 
                    step="10000000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Down Payment (%)</label>
                    <span className="text-brand-purple-dark font-bold">{downPaymentPercent}% (₦ {downPayment.toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="80" 
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:border-brand-mint"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Years)</label>
                    <select 
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:border-brand-mint"
                    >
                      <option value={5}>5 Years</option>
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pt-12">
              <div className="bg-brand-purple text-white p-10 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <h3 className="text-xl font-medium mb-8 text-gray-200">Estimated Repayment</h3>
                
                <div className="mb-10">
                  <div className="text-sm text-brand-mint mb-2 uppercase tracking-wider font-bold">Monthly Payment</div>
                  <div className="text-5xl font-serif">₦ {Math.round(monthlyPayment).toLocaleString()}</div>
                </div>

                <div className="space-y-4 mb-10 border-t border-white/10 pt-8">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Principal Loan Amount</span>
                    <span className="font-bold">₦ {loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Down Payment</span>
                    <span className="font-bold">₦ {downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Interest Payable</span>
                    <span className="font-bold">₦ {Math.round((monthlyPayment * numberOfPayments) - loanAmount).toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={() => setIsPreApprovalFormOpen(true)} className="w-full py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-md hover:bg-brand-mint-light transition-colors flex items-center justify-center gap-2">
                  Apply for Pre-Approval <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  *Estimates are for illustrative purposes only and do not constitute a loan offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-100">
              <ShieldCheck className="w-10 h-10 text-brand-purple mb-6" />
              <h3 className="text-xl font-bold mb-4">Diaspora Mortgages</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Specialized financing structures designed for Nigerians living abroad, allowing you to leverage foreign income to acquire premium local properties with competitive rates.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-100">
              <CheckCircle2 className="w-10 h-10 text-brand-purple mb-6" />
              <h3 className="text-xl font-bold mb-4">Equity Release</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unlock the value in your existing property holdings to fund new acquisitions or developments without liquidating your current high-yield properties.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-100">
              <Calculator className="w-10 h-10 text-brand-purple mb-6" />
              <h3 className="text-xl font-bold mb-4">Commercial Financing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bespoke debt structuring for large-scale commercial acquisitions, multi-unit residential developments, and institutional-grade real estate investments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ (SEO Optimized) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-purple-dark mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">What is the process for buying property in Nigeria from the diaspora?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We provide end-to-end legal and advisory support, ensuring secure transactions without you needing to travel.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Can I get a mortgage for premium real estate?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Yes, our financial partners offer competitive mortgage solutions with up to 15-year terms for qualified buyers.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Are the listed properties verified?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Absolutely. Every property undergoes strict legal due diligence and structural assessment before being listed on our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">What are the typical interest rates for premium property mortgages?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Interest rates vary depending on the financial institution, loan term, and your credit profile. Currently, rates typically range between 15% to 22% per annum. We negotiate on your behalf to secure the most favorable terms.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How long does the mortgage approval process take?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Once all required documentation is submitted, pre-approval can take as little as 48-72 hours. Full mortgage disbursement typically takes between 2 to 4 weeks, depending on the complexity of the transaction and property valuation.</p>
            </div>
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Do you offer financing for commercial properties?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Yes, we facilitate bespoke debt structuring for large-scale commercial acquisitions, multi-unit residential developments, and institutional-grade real estate investments through our specialized commercial banking partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRE-APPROVAL MODAL */}
      {isPreApprovalFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsPreApprovalFormOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h3 className="text-xl font-serif text-brand-purple-dark">Apply for Pre-Approval</h3>
              <button 
                onClick={() => setIsPreApprovalFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-serif text-brand-purple-dark mb-2">Application Received</h4>
                  <p className="text-gray-600">Your pre-approval request has been submitted successfully. Our financing team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handlePreApprovalSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="+234 800 000 0000" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Employment Status</label>
                      <select required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                        <option value="">Select Status</option>
                        <option>Employed (Full-Time)</option>
                        <option>Self-Employed / Business Owner</option>
                        <option>Contractor</option>
                        <option>Retired</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Monthly/Annual Income</label>
                      <input type="text" required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="e.g. ₦50,000,000 / year" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Proposed Budget</label>
                      <input type="text" required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="e.g. ₦250,000,000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Property Location</label>
                      <input type="text" required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" placeholder="e.g. Ikoyi, Maitama" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Property Type</label>
                      <select required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                        <option value="">Select Type</option>
                        <option>Detached House</option>
                        <option>Semi-Detached House</option>
                        <option>Penthouse / Apartment</option>
                        <option>Commercial Property</option>
                        <option>Land</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Expected Timeline</label>
                    <select required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50">
                      <option value="">Select Timeline</option>
                      <option>Immediately (0-3 months)</option>
                      <option>Short Term (3-6 months)</option>
                      <option>Medium Term (6-12 months)</option>
                      <option>Long Term (1+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint bg-gray-50" rows={3} placeholder="Any other details we should know?"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 bg-brand-purple text-white font-bold rounded-md hover:bg-brand-purple-dark transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Pre-Approval Request'} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
