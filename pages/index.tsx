import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Search, MapPin, Home, ShieldCheck, ChevronRight,
  ArrowRight, CheckCircle2, X, Bed, Bath, Move,
  TrendingUp, Users, Award, Building2, Star,
  Calculator, Info, Play, Heart
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const PropertyDetailsOverlay = dynamic(() => import('../components/PropertyDetailsOverlay'), { ssr: false });
const GlobalSearchBar = dynamic(() => import('../components/GlobalSearchBar'), { ssr: false });
import Breadcrumbs from '../../components/Breadcrumbs';
import DocStatusBadge from '../../components/DocStatusBadge';
import { getOrganizationSchema, getBreadcrumbSchema, getListingSchema } from '@/data/schema';
import SEO from '../components/SEO';
import Toast from '../components/Toast';
import { ALL_PROPERTIES, FEATURED_PROPERTIES, UNDER_100M_PROPERTIES, TAG_STYLES, getPropertyUrl } from '../data/properties';
import { useStore } from '../hooks/useStore';
import { apiService } from '../services/api';
import SEOExplorer from '../components/SEOExplorer';
import { SEARCH_LOCATIONS, PROPERTY_TYPES, BED_OPTIONS, BATH_OPTIONS } from '../data/constants';
import { motion } from 'framer-motion';


/* ════════════════════════════════════════════════════
   CONSTANTS
   ════════════════════════════════════════════════════ */


const BUDGET_SALE = [
  { label: 'Under 100M',   value: '0-100000000' },
  { label: '100M - 300M',  value: '100000000-300000000' },
  { label: '300M - 600M',  value: '300000000-600000000' },
  { label: '600M - 1B',    value: '600000000-1000000000' },
  { label: 'Above 1B',     value: '1000000000-999999999999' },
];

const BUDGET_RENT = [
  { label: 'Under 1M',      value: '0-1000000' },
  { label: '1M - 3M',       value: '1000000-3000000' },
  { label: '3M - 5M',       value: '3000000-5000000' },
  { label: '5M - 10M',      value: '5000000-10000000' },
  { label: '10M - 20M',     value: '10000000-20000000' },
  { label: 'Above 20M',     value: '20000000-999999999' },
];

const BUDGET_COMMERCIAL = [
  { label: 'Under 500M',    value: '0-500000000' },
  { label: '500M - 2B',     value: '500000000-2000000000' },
  { label: 'Above 2B',      value: '2000000000-999999999999' },
];

const BUDGET_SHORTLET = [
  { label: 'Under 100k',    value: '0-100000' },
  { label: '100k - 250k',   value: '100000-250000' },
  { label: 'Above 250k',    value: '250000-9999999' },
];

const LOCATIONS = [
  { name: 'Lagos',          desc: 'Ikoyi, Lekki Phase 1 & Victoria Island.',  img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Abuja',          desc: 'Maitama, Asokoro & Wuse II.',              img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Port Harcourt',  desc: 'GRA Phase 2 & Premium Enclaves.',          img: 'https://images.unsplash.com/photo-1613490908578-79c6d37d518f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Ibadan',         desc: 'Bodija, Agodi GRA & Premium Estates.',     img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const TESTIMONIALS = [
  {
    quote: "Buying property in Lagos from London used to be a nightmare. BuyLetLive changed everything. Their off-market sourcing found me a stunning villa in Ikoyi, and their legal team handled the entire process flawlessly.",
    name: 'Dr. Adebayo O.',
    role: 'Diaspora Investor · London, UK',
    color: 'bg-brand-purple',
  },
  {
    quote: "The level of professionalism is unmatched. They don't just sell houses; they provide comprehensive wealth advisory. Their mortgage partners secured financing for my commercial land acquisition in record time.",
    name: 'Mrs. Folashade M.',
    role: 'Local HNWI · Lagos, Nigeria',
    color: 'bg-brand-mint',
  },
  {
    quote: "I was skeptical about investing back home due to past experiences. The BuyLetLive team provided complete transparency, verified titles, and a seamless transaction for my duplex in Abuja. Highly recommended.",
    name: 'Chukwudi E.',
    role: 'Diaspora Investor · Houston, Texas',
    color: 'bg-brand-purple',
  },
];

const INSIGHTS = [
  {
    tag: 'Market Report',
    tagColor: 'bg-brand-purple-dark text-white',
    title: 'Lagos Premium Real Estate Market Q1 2026',
    desc: 'An in-depth analysis of property appreciation rates across Ikoyi, Victoria Island, and Lekki Phase 1.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Diaspora Guide',
    tagColor: 'bg-brand-mint text-white',
    title: 'The 2026 Diaspora Property Acquisition Guide',
    desc: 'Step-by-step legal and financial frameworks for safely investing in Nigerian real estate from abroad.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Legal Insight',
    tagColor: 'bg-red-600 text-white',
    title: 'Understanding Land Titles & C of O',
    desc: 'A comprehensive breakdown of property documentation, verification processes, and avoiding common pitfalls.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

// Moved TAG_STYLES to properties.ts

const TRUST_PARTNERS = [
  { name: 'Providus Bank',      logo: '/assets/logos/Providus Bank Logo.png', role: 'Strategic Banking' },
  { name: 'Homebase Mortgage',  logo: '/assets/logos/Homebase Mortgage Bank.png', role: 'Primary Mortgage' },
  { name: 'Stanbic IBTC',       logo: '/assets/logos/Stanbic IBTC Bank.png', role: 'Expert Lending' },
  { name: 'SendOva',            logo: '/assets/logos/SendOva Logo.jpg', role: 'Remittance Partner' },
  { name: 'ZidaKredit',         logo: '/assets/logos/ZidaKredit Logo.png', role: 'Financing Hub' },
  { name: 'Nairametrics',       logo: '/assets/logos/Nairametrics Logo.png', role: 'Data Intelligence' },
  { name: 'PUNCH',              logo: '/assets/logos/PunchNewspaper Logo.png', role: 'Media Verification' },
  { name: 'BusinessDay',        logo: '/assets/logos/Businessday Newspaper logo.png', role: 'Media Verification' },
];

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BuyLetLive',
  url: 'https://buyletlive.com',
  description: "Nigeria's premier premium real estate marketplace and advisory firm.",
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  contactPoint: { '@type': 'ContactPoint', telephone: '+2349131037985', contactType: 'customer service', availableLanguage: 'English' },
};

/* ════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════ */

function calcMortgage(price: number, downPct: number, rate: number, years: number) {
  const principal = price * (1 - downPct / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function formatNaira(n: number) {
  return '₦ ' + Math.round(n).toLocaleString('en-NG');
}

/* ════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════ */

export default function HomePage() {
  const router = useRouter();
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useStore();
  const [selectedPropertyForViewing, setSelectedPropertyForViewing] = useState<any>(null);
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState<any>(null);

  // Mortgage calculator state
  const [mortgagePrice, setMortgagePrice] = useState(100_000_000);
  const [mortgageDown, setMortgageDown] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(18);
  const [mortgageTerm, setMortgageTerm] = useState(15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const monthlyPayment = useMemo(
    () => calcMortgage(mortgagePrice, mortgageDown, mortgageRate, mortgageTerm),
    [mortgagePrice, mortgageDown, mortgageRate, mortgageTerm]
  );
  const principalAmount = mortgagePrice * (1 - mortgageDown / 100);

  // Moved loading state to useStore hook

  const handleViewingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      viewingDate: formData.get('date') as string,
      viewingTime: formData.get('time') as string,
      propertyId: selectedPropertyForViewing?.id,
      interest: `Viewing for ${selectedPropertyForViewing?.title}`
    };

    const response = await apiService.submitLead(data);
    setIsSubmitting(false);
    
    if (response.success) {
      setToast({ message: response.message, type: 'success' });
      setSelectedPropertyForViewing(null);
    } else {
      setToast({ message: 'Error scheduling viewing. Please try again.', type: 'error' });
    }
  };

  const handleAdvisorSubmit = async (interest: string) => {
    setIsSubmitting(true);
    const data = {
      name: 'User from Homepage',
      email: 'user@example.com',
      phone: '0000',
      interest: interest
    };
    const response = await apiService.submitLead(data);
    setIsSubmitting(false);
    if (response.success) {
      setToast({ message: response.message, type: 'success' });
    }
  };

  const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <SEO
        title="Verified Property in Nigeria — Buy, Rent & Invest with Expert Guidance"
        description="BuyLetLive helps you buy, rent, and invest in verified properties across Nigeria. Expert advisors guide you through every step, from search to ownership, with zero guesswork."
        canonicalUrl="/"
        schema={getOrganizationSchema()}
      />
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center pt-16 md:pt-20" aria-label="Hero">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero-family-banner.png"
            alt="Happy family in premium verified home"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-brand-purple-dark/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-12 md:py-16 text-center">
          <div className="max-w-4xl mb-8 mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4">
              Home is <em className="text-brand-mint not-italic underline decoration-brand-mint/30 decoration-8 underline-offset-8">here.</em>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl font-light leading-relaxed mx-auto px-4">
              Build your legacy with verified Nigerian real estate. We simplify premium property acquisition
              for all Nigerians, at home and abroad, through expert advisory and absolute transparency.
            </p>
          </div>

          {/* Improved Search Bar */}
          <div className="w-full max-w-5xl mx-auto">
            <GlobalSearchBar />
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50 border-b border-gray-100 overflow-hidden" aria-label="Partners">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.35em] mb-12">Strategic Ecosystem & Verification</p>
          
          <div className="relative">
            {/* Sliding Marquee */}
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex items-center gap-10 md:gap-16 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ 
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear"
                  }
                }}
              >
                {[...TRUST_PARTNERS, ...TRUST_PARTNERS].map((partner, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                    <img src={partner.logo} alt={partner.name} className="h-6 md:h-9 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400/60">{partner.role}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Fades */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          </div>
        </div>
      </section>

      {/* Browse by Budget — moved up after Partners */}
      <section className="py-16 bg-gray-50 border-b border-gray-100" aria-label="Browse by budget">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              <TrendingUp className="w-3 h-3" /> Browse by Budget
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-purple-dark">Explore Properties by Price Range</h2>
            <p className="text-gray-500 text-sm mt-2">All properties are verified and available for immediate acquisition.</p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Under ₦100M',     slug: '0-100000000',               icon: '🏠', desc: 'Starter premium properties' },
              { label: 'Under ₦200M',     slug: '0-200000000',               icon: '🏡', desc: 'Mid-range premium' },
              { label: 'Under ₦300M',     slug: '0-300000000',               icon: '🏘️', desc: 'High-value assets' },
              { label: '₦300M and above', slug: '300000000-999999999999',     icon: '🏰', desc: 'Premium grade' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={`/for-sale/nigeria/?budget=${cat.slug}`}
                className="group relative flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-mint/10 hover:border-brand-mint/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-4xl mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500">{cat.icon}</span>
                  <span className="font-bold text-gray-900 text-lg md:text-xl mb-2 group-hover:text-brand-purple transition-colors">{cat.label}</span>
                  <span className="text-sm text-gray-400 font-light mb-6">{cat.desc}</span>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple text-xs font-bold text-white uppercase tracking-widest group-hover:bg-brand-mint group-hover:text-brand-purple-dark transition-colors shadow-md">
                    Browse <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Collection — Centered */}
      <section id="exclusive-collection" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Exclusive Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A curated selection of high-end properties, rigorously verified for immediate acquisition.</p>
            <Link href="/for-sale/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple text-white font-bold rounded-lg shadow-lg hover:bg-brand-purple-dark transition-colors mt-6 text-sm">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!isLoaded
              ? Array(6).fill(null).map((_, i) => (
                  <article key={i} className="bg-white border border-gray-200 overflow-hidden rounded-xl animate-pulse">
                    <div className="h-64 bg-gray-200" />
                    <div className="p-6 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-1/3" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-10 bg-gray-200 rounded w-full mt-4" />
                    </div>
                  </article>
                ))
              : FEATURED_PROPERTIES.map((p, i) => (
                  <article key={p.id} className="group bg-white border border-gray-200 overflow-hidden rounded-xl transition-all hover:border-brand-mint hover:shadow-lg flex flex-col">
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img
                        src={p.image}
                        alt={`${p.title} — ${p.location}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading={i < 3 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {p.tags.map(tag => (
                          <span key={tag} className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl ${TAG_STYLES[tag] ?? 'bg-white/90 text-brand-purple-dark text-xs'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(p.id);
                        }}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite(p.id) ? 'bg-red-500 text-white shadow-red-500/40' : 'bg-white/20 text-white hover:bg-white/40'}`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(p.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-brand-mint font-semibold text-xl mb-2">{p.price}</div>
                      <h3 className="text-xl font-serif mb-1">{p.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-6">
                        <MapPin className="w-3 h-3 mr-1" /> {p.location}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600 mb-6">
                        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds} Beds</span>
                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths} Baths</span>
                        <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5" /> {p.sqft} Sq.Ft</span>
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <Link
                          href={getPropertyUrl(p)}
                          className="w-full py-3 border border-gray-300 text-gray-700 font-medium hover:border-brand-purple hover:text-brand-purple transition-colors flex items-center justify-center text-sm rounded-lg"
                        >
                          View Listing
                        </Link>
                        <a
                          href={`https://wa.me/2349131037985?text=${encodeURIComponent(`Hi BuyLetLive, I'm interested in ${p.title} in ${p.location}. Price: ${p.price}. Link: https://buyletlive.com${getPropertyUrl(p)}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center text-sm rounded-lg"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </article>
                ))
            }
          </div>
        </div>
      </section>



      {/* ── Prime Locations ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Prime Locations</h2>
            <p className="text-gray-600">Explore our curated collections across Nigeria&apos;s most prestigious and high-yield real estate hubs.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map(({ name, desc, img }) => (
              <Link href={`/for-sale/${name.toLowerCase().replace(/\s+/g, '-')}/`} key={name} className="group relative h-80 overflow-hidden rounded-xl block">
                <img
                  src={img}
                  alt={`${name} Real Estate`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity group-hover:from-black/95" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-serif text-white mb-2">{name}</h3>
                  <p className="text-gray-300 text-sm mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {desc}
                  </p>
                  <div className="flex items-center text-brand-mint text-sm font-medium">
                    Explore Collection <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5.1 PREMIUM REAL ESTATE SERVICES
      ═══════════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 bg-brand-purple-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <header className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">Comprehensive Property Management</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We provide strategic management and leasing solutions across all property classes, ensuring your real estate assets deliver maximum yields with zero operational stress.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Property Management', 
                desc: 'Strategic management for peace of mind and long-term property preservation.',
                icon: ShieldCheck,
                tag: 'Strategic'
              },
              { 
                title: 'High-End Rentals', 
                desc: 'Premium leasing services for high-end residential properties in Nigeria\'s most sought-after enclaves.',
                icon: Star,
                tag: 'Premium'
              },
              { 
                title: 'Commercial & Residential', 
                desc: 'Tailored solutions across all property classes, from Class-A offices to premium penthouses.',
                icon: Building2,
                tag: 'Strategic'
              },
              { 
                title: 'Short-Let Management', 
                desc: 'Professional hospitality-driven management to maximize yields on your vacant units.',
                icon: Users,
                tag: 'High Yield'
              }
            ].map((service, i) => (
              <div key={i} className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-brand-mint text-brand-purple-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-bold text-brand-mint uppercase tracking-widest mb-3">{service.tag}</div>
                <h3 className="text-xl font-serif mb-4 text-white group-hover:text-brand-mint transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                <Link href="/services" className="text-sm font-bold text-white flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. MORTGAGE CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gray-900 text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover grayscale" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-serif mb-4 text-white">Need Financing for Your Next Property?</h3>
            <p className="text-gray-300 font-light text-lg">Access premium mortgage solutions and bespoke financing structures through our network of top-tier financial partners.</p>
          </div>
          <Link href="/financing" className="shrink-0 px-8 py-4 bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 rounded-lg shadow-xl text-sm">
            Explore Mortgages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Mortgage Calculator ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                <Calculator className="w-4 h-4" /> Mortgage Calculator
              </div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Estimate Your Monthly Payments</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Plan your premium real estate acquisition with confidence. Use our calculator to
                estimate your monthly mortgage payments based on current market rates.
              </p>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <p>Powered by our partners: <strong>ProvidusBank</strong>, <strong>Homebase Mortgage</strong>, and <strong>Stanbic IBTC</strong>. Actual rates may vary based on your financial profile and chosen institution.</p>
              </div>
            </div>

            {/* Right: Calculator */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider text-center">Estimate Your Plan</label>
                  <div className="bg-brand-purple-dark p-6 rounded-xl text-white text-center mb-8 relative overflow-hidden">
                    <div className="text-[10px] font-bold text-brand-mint uppercase tracking-widest mb-1">Estimated Monthly Payment</div>
                    <div className="text-4xl font-serif">₦ {Math.round(calcMortgage(mortgagePrice, mortgageDown, mortgageRate, mortgageTerm)).toLocaleString()}</div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Property Price (₦)</label>
                    <input
                      type="number"
                      value={mortgagePrice}
                      onChange={e => setMortgagePrice(Number(e.target.value) || 0)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Down Payment (%)</label>
                    <input
                      type="number"
                      value={mortgageDown}
                      onChange={e => setMortgageDown(Number(e.target.value) || 0)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      value={mortgageRate}
                      onChange={e => setMortgageRate(Number(e.target.value) || 0)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Period (Years)</label>
                    <select
                      value={mortgageTerm}
                      onChange={e => setMortgageTerm(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint"
                    >
                      <option value={5}>5 Years</option>
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                    </select>
                  </div>
                </div>
                <Link href="/financing" className="w-full py-4 bg-brand-purple text-white font-bold rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center gap-2 group">
                  Apply for Financing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="advisory" className="py-10 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/5 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                <Award className="w-4 h-4" /> The BuyLetLive Standard
              </div>

              {/* Quote attributed to Jemine Adollo */}
              <blockquote className="relative mb-8">
                <div className="absolute -left-2 -top-4 text-brand-mint/20 font-serif text-[8rem] leading-none select-none pointer-events-none">&ldquo;</div>
                <div className="relative pl-6 border-l-4 border-brand-mint space-y-4">
                  <p className="text-gray-700 font-serif text-lg md:text-xl italic leading-relaxed">
                    Owning property in Nigeria shouldn&apos;t lead to sleepless nights. We serve as your fractional real estate office, providing the same level of due diligence and security that was previously reserved for institutional funds.
                  </p>
                  <p className="text-gray-500 font-serif text-base italic leading-relaxed">
                    Every listing on our platform undergoes a rigorous 14-point verification process, ensuring title clarity, structural integrity, and market-accurate valuation. Whether you are in Ikoyi or London, our promise is absolute transparency.
                  </p>
                  <footer className="mt-5 flex items-center gap-3 not-italic">
                    <div className="w-10 h-10 rounded-full bg-brand-purple-dark overflow-hidden shrink-0">
                      <img src="/assets/ceo/jemine.jpg" alt="Jemine Adollo" className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
                    </div>
                    <div>
                      <p className="font-bold text-brand-purple-dark text-sm">Jemini Adollo</p>
                      <p className="text-gray-400 text-xs uppercase tracking-widest">CEO, BuyLetLive</p>
                    </div>
                  </footer>
                </div>
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {[
                  { title: 'Custodianship', desc: 'Secure property management and legal auditing.' },
                  { title: 'Transparency', desc: 'Real-time reporting and verified title chains.' },
                  { title: 'Yield Focus', desc: 'Strategic asset optimization for maximum ROI.' },
                  { title: 'Bespoke Advisory', desc: 'Dedicated account managers serving clients at home and abroad.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-brand-mint shrink-0" />
                    <div>
                      <h4 className="font-bold text-brand-purple-dark text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/advisory?ref=homepage_cta" className="px-10 py-4 bg-brand-purple text-white font-bold hover:bg-brand-purple-dark transition-all inline-flex items-center gap-3 rounded-lg shadow-2xl btn-purple-glow whitespace-nowrap">
                Speak to our Experts <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative animate-fade-in-up">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/assets/ceo/jemine.jpg"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: 'center 15%' }}
                  alt="Jemini Adollo, CEO of BuyLetLive"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                    <div className="text-xl font-serif">Jemini Adollo</div>
                    <div className="text-brand-mint text-xs font-bold uppercase tracking-widest mt-1">CEO, BuyLetLive</div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-mint rounded-2xl -z-10 opacity-30" />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-purple rounded-full -z-10 opacity-10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 bg-brand-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-brand-purple/90" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Client Testimonials</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from our esteemed clients who have successfully expanded their real estate holdings with our advisory team.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array(5).fill(null).map((_, s) => (
                    <Star key={s} className="w-5 h-5 fill-brand-mint text-brand-mint" />
                  ))}
                </div>
                <blockquote className="text-white/90 font-serif italic text-sm leading-relaxed mb-8 flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-brand-mint text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10. CEO VIDEO MESSAGE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brand-purple-dark relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-mint rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Play className="w-3 h-3 fill-current" /> Executive Insights
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white leading-tight">A Message from Our Group CEO</h2>
          <p className="text-gray-300 mb-16 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Ola Daramola shares the <span className="text-brand-mint italic">vision</span> behind The BuyLetLive Standard and our unwavering commitment to absolute transparency in Nigerian real estate.
          </p>

          <div className="relative group max-w-4xl mx-auto mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-mint/20 to-brand-purple/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
              <iframe
                src="https://drive.google.com/file/d/1Z4xgmx3k-IqH-qF4Y2fbd3TENT4C63CE/preview"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="A Message from Ola Daramola, Group CEO of BuyLetLive"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xl font-serif text-white/80 mb-8 font-light italic">Ready to experience the standard?</p>
            <Link 
              href="/advisory?ref=homepage_ceo_cta" 
              className="px-10 py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(102,255,204,0.3)] flex items-center gap-3"
            >
              Speak to an Advisor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          11. INSIGHTS & GUIDES
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Insights &amp; Real Estate Guides</h2>
              <p className="text-gray-600 max-w-xl">Expert analysis, market reports, and comprehensive guides to inform your investment decisions.</p>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 text-brand-purple font-medium hover:text-brand-mint transition-colors shrink-0">
              View All Insights <ArrowRight className="w-4 h-4" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INSIGHTS.map((article, i) => (
              <article key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-sm ${article.tagColor}`}>
                      {article.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif mb-2 group-hover:text-brand-purple transition-colors">{article.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{article.desc}</p>
                  <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple-dark hover:text-brand-mint transition-colors">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Feed ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center mb-10">
            <a
              href="https://www.instagram.com/buyletliveofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-lg hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @buyletliveofficial
            </a>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-purple-dark mb-3">Follow Our Journey</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Behind-the-scenes property tours, market insights, and exclusive previews — live on Instagram.</p>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {[
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
              'https://images.unsplash.com/photo-1613490908578-79c6d37d518f?w=400&q=80',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
              'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80',
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
            ].map((src, i) => (
              <a key={i} href="https://www.instagram.com/buyletliveofficial/" target="_blank" rel="noopener noreferrer" className="relative group aspect-square overflow-hidden rounded-xl block">
                <img src={src} alt="BuyLetLive on Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-brand-purple-dark/0 group-hover:bg-brand-purple-dark/50 transition-all duration-300 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="https://www.instagram.com/buyletliveofficial/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Follow @buyletliveofficial
            </a>
          </div>
        </div>
      </section>

      {/* ── Not Finding Your Property? CTA ── */}
      <section className="py-16 bg-brand-purple-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=2000&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark via-brand-purple-dark/95 to-brand-purple/80" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5">
                <Search className="w-3 h-3" /> Private Advisory
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight">
                Not seeing the right property?
              </h2>
              <p className="text-gray-300 text-lg font-light leading-relaxed">
                Our advisors have access to verified listings, new developments, and curated collections tailored to your needs. Tell us what you&apos;re looking for — we&apos;ll find it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/speak-to-advisor?ref=homepage_cta" className="px-8 py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-xl hover:brightness-105 transition-all inline-flex items-center gap-2 shadow-xl text-sm whitespace-nowrap">
                Speak to an Advisor <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/request-property?ref=homepage_cta" className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all inline-flex items-center gap-2 text-sm whitespace-nowrap">
                Request a Property <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SEOExplorer />

      {/* ═══════════════════════════════════════════════════════════
          PROPERTY DETAILS OVERLAY
      ═══════════════════════════════════════════════════════════ */}
      <PropertyDetailsOverlay
        property={selectedPropertyDetails}
        onClose={() => setSelectedPropertyDetails(null)}
        onScheduleViewing={(p: any) => {
          setSelectedPropertyDetails(null);
          setSelectedPropertyForViewing(p);
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          SCHEDULE VIEWING MODAL
      ═══════════════════════════════════════════════════════════ */}
      {selectedPropertyForViewing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPropertyForViewing(null)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-serif text-brand-purple-dark">Chat about a Viewing</h3>
              <button
                onClick={() => setSelectedPropertyForViewing(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <img
                  src={selectedPropertyForViewing.image}
                  alt={selectedPropertyForViewing.title}
                  className="w-16 h-16 object-cover rounded-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-medium text-gray-900">{selectedPropertyForViewing.title}</div>
                  <div className="text-sm text-gray-500">{selectedPropertyForViewing.location}</div>
                  <div className="text-sm font-semibold text-brand-mint mt-1">{selectedPropertyForViewing.price}</div>
                </div>
              </div>
              <form onSubmit={handleViewingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                    <input name="firstName" type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint" placeholder="John" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                    <input name="lastName" type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input name="email" type="email" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint" placeholder="john@example.com" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input name="phone" type="tel" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint" placeholder="+234 800 000 0000" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input name="date" type="date" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Time</label>
                    <select name="time" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-mint focus:ring-1 focus:ring-brand-mint">
                      <option>Morning (9AM – 12PM)</option>
                      <option>Afternoon (12PM – 4PM)</option>
                      <option>Evening (4PM – 6PM)</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3 bg-brand-purple text-white font-medium rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Chat Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}



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
