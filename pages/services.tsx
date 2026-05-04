import { ShieldCheck, Star, Building2, Users, ArrowRight, Play, CheckCircle2, LayoutGrid, Clock, Wallet } from 'lucide-react';
import Link from 'next/link';
import SEO from '../components/SEO';

const SERVICES = [
  {
    id: 'management',
    title: 'Property Management',
    tagline: 'Institutional Oversight for Private Assets',
    description: 'Our property management service goes beyond traditional rent collection. We provide institutional-grade oversight, ensuring your properties are maintained to global standards while maximizing occupancy and yields.',
    features: [
      'Strict Tenant Selection & Vetting',
      'Preventative Maintenance Programs',
      'Financial Reporting & Rent Accounting',
      'Legal & Compliance Oversight',
      'Dedicated Facility Managers'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: ShieldCheck
  },
  {
    id: 'rentals',
    title: 'High-End Rentals',
    tagline: 'Premium Leasing for Premium Properties',
    description: 'We specialize in the leasing of premium residential properties in Nigeria\'s most exclusive enclaves. Our network of local, diaspora, and corporate tenants ensures your property is occupied by high-quality occupants.',
    features: [
      'Corporate Lease Specialists',
      'Premium Marketing & Positioning',
      'Expedited Tenant Sourcing',
      'Inventory & Handover Management',
      'Virtual Tours & Showings'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Star
  },
  {
    id: 'commercial',
    title: 'Commercial & Residential',
    tagline: 'Strategic Asset Management',
    description: 'Whether it\'s a Class-A office tower or a collection of premium apartments, we provide strategic advice and execution to ensure your capital is efficiently deployed and managed.',
    features: [
      'Property Class Diversification',
      'Strategic Yield Optimization',
      'Market Intelligence & Valuations',
      'Asset Performance Reviews',
      'Acquisition & Disposal Advisory'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Building2
  },
  {
    id: 'shortlet',
    title: 'Short-Let Management',
    tagline: 'Hospitality-Driven Yield Maximization',
    description: 'Maximize the return on your vacant units through our professional short-let management. We transform your property into a high-yield hospitality property with full end-to-end management.',
    features: [
      'Dynamic Pricing Strategies',
      'Professional Cleaning & Laundry',
      'Guest Support & 24/7 Concierge',
      'Platform Optimization (Airbnb/Booking)',
      'Utility & Utility Bill Management'
    ],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Users
  }
];

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Premium Real Estate Services | Property Management & Rentals"
        description="Explore BuyLetLive's institutional-grade services. From premium property management and high-end rentals to strategic commercial property advisory and short-let hospitality."
        canonicalUrl="/services"
      />

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Corporate real estate"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-purple-dark/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Institutional Excellence
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 max-w-4xl mx-auto">
            World-Class Services for <span className="italic text-brand-mint">Sophisticated Holdings.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            From institutional property management to short-let hospitality, we provide the infrastructure required to scale your real estate wealth in Nigeria.
          </p>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Property Classes', value: 'Residential & Commercial', icon: LayoutGrid },
            { label: 'Management Standard', value: 'Institutional Grade', icon: ShieldCheck },
            { label: 'Response Time', value: '< 2 Hours', icon: Clock },
            { label: 'Asset Yield', value: 'Optimized', icon: Wallet }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-brand-purple/5 text-brand-purple rounded-lg flex items-center justify-center mb-4">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-brand-purple-dark mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES LIST ── */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
          {SERVICES.map((service, i) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center mb-8">
                  <service.icon className="w-7 h-7" />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-4">{service.title}</h2>
                <div className="text-brand-mint font-bold uppercase tracking-widest text-sm mb-6">{service.tagline}</div>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light">
                  {service.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/speak-to-advisor"
                  className="px-8 py-4 bg-brand-purple text-white font-bold rounded-lg hover:bg-brand-purple-dark transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  Consult an Advisor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative background */}
                <div className={`absolute -bottom-6 ${i % 2 !== 0 ? '-left-6' : '-right-6'} w-full h-full border-2 border-brand-mint/30 rounded-2xl z-0`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MD Message Video ── */}
      <section className="py-24 bg-brand-purple-dark overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-mint/5 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Play className="w-3.5 h-3.5 fill-current" /> Executive Message
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">The BuyLetLive <br />Commitment</h2>
              <p className="text-gray-300 text-lg mb-8 font-light leading-relaxed">
                "Our services are built on the foundation of institutional trust. Whether you are managing a single property or a vast commercial collection, our mandate is to provide absolute transparency and maximum yield."
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
            <div className="order-1 lg:order-2">
               <div className="relative group cursor-pointer rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
                    alt="BLL Commitment" 
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/30">
                    <div className="w-16 h-16 bg-brand-mint text-brand-purple-dark rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-purple-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover grayscale" aria-hidden="true" />
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 text-white">Ready to Scale Your Property Yields?</h2>
          <p className="text-gray-300 text-lg mb-12 font-light leading-relaxed">
            Whether you are looking for institutional management or premium leasing, our team of specialists is ready to help you optimize your Nigerian real estate assets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/speak-to-advisor"
              className="w-full sm:w-auto px-10 py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-lg hover:bg-brand-mint-light transition-all btn-mint-glow shadow-xl"
            >
              Consult an Advisor
            </Link>
            <a 
              href="https://wa.me/2349131037985"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
