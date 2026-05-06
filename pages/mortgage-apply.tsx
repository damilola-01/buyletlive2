import { useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, X } from 'lucide-react';
import SEO from '../components/SEO';
import Link from 'next/link';

export default function MortgageApplyPage() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    maritalStatus: 'single',
    employmentStatus: '',
    dob: '',
    monthlySalary: '',
    otherAllowance: '',
    propertyType: 'building',
    loanDuration: '20', // Default
    amountAvailable: '',
    propertyPrice: '', // Clear default
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    // Validate current step before proceeding
    const currentFields = getFieldsForStep(formStep);
    const isValid = currentFields.every(field => formData[field as keyof typeof formData] !== '');
    if (isValid) {
      setFormStep(prev => Math.min(prev + 1, 3));
      window.scrollTo(0, 0);
    } else {
      alert("Please fill in all compulsory fields to proceed.");
    }
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1: return ['fullName', 'email', 'phone', 'employmentStatus', 'dob'];
      case 2: return ['monthlySalary'];
      case 3: return ['amountAvailable', 'loanDuration'];
      default: return [];
    }
  };

  const prevStep = () => {
    setFormStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <SEO title="Success | Mortgage Application" description="Your mortgage application has been received." />
        <div className="max-w-md w-full bg-white rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-brand-mint" />
          </div>
          <h1 className="text-3xl font-serif text-brand-purple-dark mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-10">We've received your application. One of our advisors will reach out shortly to help you through the next steps of your home ownership journey.</p>
          <Link href="/" className="inline-block px-10 py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-dark transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-sans">
      <SEO 
        title="Apply for Mortgage Pre-Approval | BuyLetLive" 
        description="Complete our 3-step mortgage pre-approval form to understand your buying power and get matched with trusted Nigerian lenders."
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-4">Mortgage Pre-Approval</h1>
          <p className="text-gray-500">Fast-track your property ownership journey in 3 simple steps.</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          {/* Progress Sidebar */}
          <div className="w-full md:w-80 bg-brand-purple p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <div className="space-y-10">
                {[
                  { step: 1, label: 'Basic Info', desc: 'Personal details' },
                  { step: 2, label: 'Financial Info', desc: 'Income & stability' },
                  { step: 3, label: 'Loan Info', desc: 'Property & capital' }
                ].map((s) => (
                  <div key={s.step} className="flex gap-5 items-start">
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all ${formStep >= s.step ? 'bg-brand-mint border-brand-mint text-brand-purple-dark' : 'border-white/20 text-white/40'}`}>
                      {formStep > s.step ? <CheckCircle2 className="w-6 h-6" /> : s.step}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${formStep >= s.step ? 'text-white' : 'text-white/40'}`}>{s.label}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 hidden md:block">
              <div className="flex gap-4 mb-6">
                <ShieldCheck className="w-6 h-6 text-brand-mint" />
                <p className="text-xs text-white/60 leading-relaxed">Your data is encrypted and shared only with verified banking partners.</p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-grow p-8 md:p-16">
            <form onSubmit={handlePreApprovalSubmit}>
              {formStep === 1 && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                    <p className="text-sm text-gray-400">All fields are compulsory *</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-4">Marital Status *</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["single", "married"].map(opt => (
                          <label key={opt} className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.maritalStatus === opt ? 'border-brand-purple bg-brand-purple/5' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'}`}>
                            <input type="radio" name="maritalStatus" value={opt} checked={formData.maritalStatus === opt} onChange={handleInputChange} className="w-5 h-5 accent-brand-purple" required />
                            <span className="ml-3 capitalize font-bold text-gray-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Full Name *</label>
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="e.g. John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Phone Number *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="+234..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Employment Status *</label>
                        <select name="employmentStatus" required value={formData.employmentStatus} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors bg-white">
                          <option value="">Select status</option>
                          <option>Employed (Full-Time)</option>
                          <option>Self-Employed / Business Owner</option>
                          <option>Retired</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Date of Birth *</label>
                        <input type="date" name="dob" required value={formData.dob} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Financial Information</h2>
                    <p className="text-sm text-gray-400">All fields are compulsory *</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Net Monthly Salary (₦) *</label>
                      <input type="text" name="monthlySalary" required value={formData.monthlySalary} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="e.g. 1,500,000" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Other Monthly Allowance (₦) *</label>
                      <input type="text" name="otherAllowance" required value={formData.otherAllowance} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="e.g. 200,000 (Enter 0 if none)" />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Loan Information</h2>
                    <p className="text-sm text-gray-400">All fields are compulsory *</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-4">Select Type of Property *</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["land", "building"].map(opt => (
                          <label key={opt} className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.propertyType === opt ? 'border-brand-purple bg-brand-purple/5' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'}`}>
                            <input type="radio" name="propertyType" value={opt} checked={formData.propertyType === opt} onChange={handleInputChange} className="w-5 h-5 accent-brand-purple" required />
                            <span className="ml-3 capitalize font-bold text-gray-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Amount of Money Available (₦) *</label>
                        <input type="text" name="amountAvailable" required value={formData.amountAvailable} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="Down payment?" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-3">Preferred Loan Duration (Years) *</label>
                        <input type="number" name="loanDuration" required min="1" max="30" value={formData.loanDuration} onChange={handleInputChange} className="w-full border-2 border-gray-100 rounded-xl px-5 py-4 focus:border-brand-purple focus:outline-none transition-colors" placeholder="e.g. 20" />
                      </div>
                    </div>
                    {formData.propertyPrice && (
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Estimated Property Budget</p>
                        <p className="text-2xl font-serif text-brand-purple-dark">₦ {formData.propertyPrice}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4 mt-12 pt-8 border-t border-gray-100">
                {formStep > 1 && (
                  <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-100 text-gray-600 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-gray-200 transition-colors">
                    Back
                  </button>
                )}
                {formStep < 3 ? (
                  <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-brand-purple text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-brand-purple-dark transition-colors shadow-lg">
                    Next Step
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="flex-[2] py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(102,255,204,0.4)] disabled:opacity-50">
                    {isSubmitting ? 'Processing...' : 'Submit Mortgage Request'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
