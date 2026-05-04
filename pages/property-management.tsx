import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Home, Users, Building2, Wallet,
  LineChart, FileText, PenTool, Wrench, ClipboardCheck, Phone
} from 'lucide-react';
import SEO from '../components/SEO';

const MANAGEMENT_SERVICES = [
  {
    icon: LineChart,
    title: 'Property Valuation',
    desc: 'Accurate market benchmarking and strategic pricing analysis to ensure your property achieves maximum annual returns while remaining competitive.',
  },
  {
    icon: FileText,
    title: 'Lease Management',
    desc: 'Comprehensive oversight of all tenancy terms, renewals, and ongoing landlord-tenant relations to ensure zero operational friction.',
  },
  {
    icon: PenTool,
    title: 'Lease Agreement Drafting',
    desc: 'Creation of robust, legally sound tenancy agreements designed specifically to protect property owners and clearly outline mutual responsibilities.',
  },
  {
    icon: ShieldCheck,
    title: 'Legal & Compliance Management',
    desc: 'Ensuring your property adheres strictly to Nigerian tenancy laws, resolving disputes, and providing expert in-house legal support.',
  },
  {
    icon: Users,
    title: 'Reliable Tenant Placement',
    desc: 'Rigorous 14-point background checks, financial verification, and reference screening to ensure only highly qualified tenants occupy your property.',
  },
  {
    icon: Wallet,
    title: 'Rent Collection',
    desc: 'Automated, strictly enforced payment schedules ensuring timely rent disbursements to landlords and complete financial transparency.',
  },
  {
    icon: Wrench,
    title: 'Property Maintenance & Repairs',
    desc: 'Access to a vetted network of licensed contractors handling preventative maintenance and emergency repairs to preserve your property’s premium condition.',
  },
  {
    icon: ClipboardCheck,
    title: 'Periodic Inspections',
    desc: 'Scheduled physical inspections with detailed digital reporting to guarantee tenants are maintaining the structural and aesthetic integrity of your property.',
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      <SEO
        title="Professional Property Management & Property Preservation | BuyLetLive"
        description="Comprehensive professional property management services in Nigeria. We specialize in property preservation, high-yield leasing, and professional tenant management."
        canonicalUrl="/property-management"
      />

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Institutional Property Management"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-purple-dark/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3 h-3" /> Strategic Property Preservation
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">Professional <br />Property Management</h1>
          <p className="text-gray-200 text-lg max-w-3xl font-light leading-relaxed mx-auto lg:mx-0">
            We handle every aspect of management—from strict legal compliance to preventative maintenance and financial reporting—so your real estate assets deliver maximum premium yields with zero operational complexity.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10">
            <Link
              href="/speak-to-advisor"
              className="px-8 py-4 bg-brand-mint text-brand-purple-dark font-bold hover:bg-white hover:shadow-brand-mint/20 transition-all inline-flex items-center gap-2 rounded-xl shadow-xl text-sm"
            >
              Chat with an Advisor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-purple-dark">Comprehensive Property Management</h2>
            <p className="text-gray-600 text-lg">
              From legal drafting to structural upkeep, our dedicated team acts as the complete custodian of your high-yield real estate.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MANAGEMENT_SERVICES.map((service, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-mint/10 transition-all duration-500 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-brand-mint/10 group-hover:border-brand-mint/20 transition-colors">
                    <service.icon className="w-6 h-6 text-brand-purple transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 leading-snug">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="bg-brand-purple-dark rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" crossOrigin="anonymous" />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-mint/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-10">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight text-white">Trust Your Assets with the Experts</h3>
                <p className="text-gray-200 text-lg font-light leading-relaxed mb-8">
                  Partner with Nigeria's premier institutional management firm. Gain complete visibility through detailed monthly financial reporting and the peace of mind that comes with strict legal compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/speak-to-advisor"
                    className="px-8 py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-xl hover:bg-white transition-all duration-300 text-center"
                  >
                    Chat with an Advisor
                  </Link>
                  <a
                    href="https://wa.me/2349131037985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
