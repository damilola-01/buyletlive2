import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface LeadMagnetProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  features?: string[];
  tag?: string;
}

export default function LeadMagnet({
  title = "Lagos High-Yield Property Deals 2026",
  description = "Discover the top-performing off-market properties in Lagos. Our latest intelligence report reveals where smart money is investing for maximum ROI and long-term capital appreciation.",
  imageSrc = "/images/lagos-deals-2026.png",
  features = [
    "Top 10 Emerging Neighbourhoods",
    "Rental Yield Comparisons (Ikoyi vs Lekki)",
    "Pre-vetted Off-Plan Opportunities"
  ],
  tag = "Free Download"
}: LeadMagnetProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lead capture logic would go here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
    }, 5000);
  };

  return (
    <section className="py-24 bg-brand-purple-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-mint rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy & Form */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              {tag}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white leading-tight">
              {title}
            </h2>
            <p className="text-gray-300 mb-8 text-lg font-light leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" /> <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Lead Capture Form */}
            {submitted ? (
              <div className="bg-white/10 border border-brand-mint/30 rounded-xl p-6 text-center animate-fade-in max-w-md">
                <CheckCircle2 className="w-8 h-8 text-brand-mint mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-1">Request Received!</h3>
                <p className="text-gray-300 text-sm">Your download link is on its way to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-brand-mint transition-colors"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-brand-mint transition-colors"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full sm:w-auto self-start px-10 py-4 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(102,255,204,0.3)] whitespace-nowrap"
                >
                  Get the Report
                </button>
                <p className="text-xs text-white/40 mt-1">* Your data is secure. We never spam.</p>
              </form>
            )}
          </div>

          {/* Right: Mockup */}
          <div className="relative group flex justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-mint/20 to-brand-purple/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={imageSrc} 
              alt={title} 
              className="relative z-10 w-full max-w-md drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 object-contain"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
