import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../hooks/useStore';
import { MapPin, Search } from 'lucide-react';
import { 
  PRICE_STEPS_SALE, 
  PRICE_STEPS_RENT, 
  PRICE_STEPS_COMMERCIAL, 
  PRICE_STEPS_SHORTLET,
  BED_OPTIONS, 
  TRANSACTION_CATEGORIES,
  SEARCH_LOCATIONS,
  PROPERTY_TYPES
} from '../data/constants';

interface GlobalSearchBarProps {
  initialTab?: string;
  initialFilters?: any;
  variant?: 'hero' | 'minimal';
}

export default function GlobalSearchBar({ 
  initialTab = 'for-sale', 
  initialFilters = {},
  variant = 'hero'
}: GlobalSearchBarProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [filters, setFilters] = useState({
    location: initialFilters.location || '',
    type: initialFilters.type || '',
    beds: initialFilters.beds || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
  });

  const getPriceOptions = () => {
    if (activeTab === 'for-sale') return PRICE_STEPS_SALE;
    if (activeTab === 'for-rent') return PRICE_STEPS_RENT;
    if (activeTab === 'commercial') return PRICE_STEPS_COMMERCIAL;
    return PRICE_STEPS_SHORTLET;
  };

  const { setIntent } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIntent({ category: activeTab, location: filters.location });
    // Construct hierarchical URL: /category/location/type/
    const category = activeTab;
    const location = filters.location ? filters.location.toLowerCase().replace(/\s+/g, '-') : 'nigeria';
    const type = filters.type ? filters.type.toLowerCase().trim().replace(/\s+/g, '-') : '';
    
    // For specific filters like beds and budget, we'll keep query params
    let queryParams = new URLSearchParams();
    if (filters.beds) queryParams.set('beds', filters.beds);
    
    if (filters.minPrice) queryParams.set('min_price', filters.minPrice);
    if (filters.maxPrice) queryParams.set('max_price', filters.maxPrice);

    const queryString = queryParams.toString();
    
    // Construct clean hierarchical path
    let targetPath = `/${category}/${location}/`;
    if (type) targetPath += `${type}/`;
    if (queryString) targetPath += `?${queryString}`;
    
    router.push(targetPath);
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Minimal version implementation... */}
           <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                list="location-suggestions-minimal"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                placeholder="Location"
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm"
              />
              <datalist id="location-suggestions-minimal">
                {SEARCH_LOCATIONS.map(l => <option key={l} value={l} />)}
              </datalist>
              <select 
                value={filters.type} 
                onChange={e => setFilters({...filters, type: e.target.value})}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm"
              >
                <option value="">Any Type</option>
                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select 
                value={filters.minPrice} 
                onChange={e => setFilters({...filters, minPrice: e.target.value})}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm"
              >
                <option value="">Min</option>
                {getPriceOptions().map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select 
                value={filters.maxPrice} 
                onChange={e => setFilters({...filters, maxPrice: e.target.value})}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm"
              >
                <option value="">Max</option>
                {getPriceOptions().map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
           </div>
           <button type="submit" className="bg-brand-purple text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2">
             <Search className="w-4 h-4" /> Search
           </button>
        </div>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center md:justify-start mb-0 overflow-x-auto no-scrollbar">
        <div className="bg-black/50 backdrop-blur-xl p-1.5 rounded-t-2xl border-t border-x border-white/20 flex gap-1 whitespace-nowrap min-w-max">
          {TRANSACTION_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-wide uppercase transition-all ${
                activeTab === tab.id
                ? 'bg-brand-mint text-brand-purple-dark shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative z-30"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          <div className="relative group/field">
            <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-purple/50" />
              <input
                type="text"
                list="location-suggestions"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                placeholder="Where are you looking?"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 pl-9 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm"
              />
              <datalist id="location-suggestions">
                {SEARCH_LOCATIONS.map(loc => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="relative group/field">
            <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Property Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm appearance-none"
            >
              <option value="">Any Type</option>
              {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="relative group/field">
            <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Bedrooms</label>
            <select
              value={filters.beds}
              onChange={(e) => setFilters({...filters, beds: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm appearance-none"
            >
              <option value="">Any</option>
              {BED_OPTIONS.map(b => <option key={b} value={b}>{b} bed{b !== '1+' ? 's' : ''}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 md:col-span-1">
            <div className="relative group/field">
              <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Min Price</label>
              <select
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm appearance-none"
              >
                <option value="">Any</option>
                {getPriceOptions().map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="relative group/field">
              <label className="block text-[10px] uppercase tracking-widest text-brand-purple-dark font-bold mb-2">Max Price</label>
              <select
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-mint font-medium text-sm appearance-none"
              >
                <option value="">Any</option>
                {getPriceOptions().map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-end sm:col-span-2 md:col-span-1">
            <button
              type="submit"
              className="w-full h-[52px] bg-brand-mint text-brand-purple-dark rounded-xl flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg font-bold uppercase tracking-widest text-xs gap-2"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
