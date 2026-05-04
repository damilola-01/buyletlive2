import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Heart, Bed, Bath, Move } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { ALL_PROPERTIES, getPropertyUrl } from '../data/properties';

export default function RelatedProperties() {
  const { intent, recentlyViewed, isFavorite, toggleFavorite, isLoaded } = useStore();

  const recommendedProperties = useMemo(() => {
    if (!isLoaded) return [];

    let filtered = ALL_PROPERTIES;

    // 1. If we have recent intent (last search)
    if (intent && (intent.category || intent.location)) {
      filtered = ALL_PROPERTIES.filter(p => {
        const catMatch = intent.category ? p.category === intent.category : true;
        const locMatch = intent.location ? p.location.toLowerCase().includes(intent.location.toLowerCase()) : true;
        return catMatch && locMatch;
      });
    }

    // 2. If we have recently viewed items, prioritize those categories/locations
    if (recentlyViewed && recentlyViewed.length > 0) {
      const recentProps = ALL_PROPERTIES.filter(p => recentlyViewed.includes(p.id));
      const recentCats = Array.from(new Set(recentProps.map(p => p.category)));
      const recentLocs = Array.from(new Set(recentProps.map(p => p.location.split(',')[0])));

      // If filtered is still too large, narrow it down by what they actually clicked
      if (filtered.length > 4) {
        filtered = filtered.filter(p => 
          recentCats.includes(p.category) || 
          recentLocs.some(loc => p.location.includes(loc))
        );
      }
    }

    // 3. Fallback to featured if nothing matches intent
    if (filtered.length === 0) {
      filtered = ALL_PROPERTIES.slice(0, 8);
    }

    // 4. Shuffle and take top 4
    return filtered
      .filter(p => !recentlyViewed?.includes(p.id)) // Don't show what they JUST saw
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [intent, recentlyViewed, isLoaded]);

  if (!isLoaded || recommendedProperties.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-purple-dark mb-4">
              You May Also <span className="italic text-brand-mint">Like</span>
            </h2>
          </div>
          <Link 
            href="/for-sale/nigeria/" 
            className="group flex items-center gap-2 text-brand-purple font-black uppercase tracking-widest text-[10px] hover:text-brand-mint transition-colors"
          >
            Explore Full Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProperties.map((property) => (
            <article 
              key={property.id} 
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.tags.slice(0, 1).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-purple-dark shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-mint hover:text-brand-purple-dark transition-all"
                  aria-label={isFavorite(property.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                </button>
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-xl font-black text-white tracking-tight">{property.price}</div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-lg font-serif text-brand-purple-dark group-hover:text-brand-purple transition-colors leading-tight mb-1">
                    {property.beds} Bed {property.type}
                  </h3>
                  <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <MapPin className="w-3 h-3 mr-1 text-brand-mint" /> {property.location.split(',')[0]}
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-auto">
                  <span className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-brand-purple/30" /> {property.beds}</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5 text-brand-purple/30" /> {property.baths}</span>
                  <span className="flex items-center gap-1.5"><Move className="w-3.5 h-3.5 text-brand-purple/30" /> {property.sqft}</span>
                </div>

                <Link 
                  href={getPropertyUrl(property)}
                  className="mt-4 w-full py-3 bg-brand-purple/5 text-brand-purple font-black uppercase tracking-widest text-[9px] flex items-center justify-center rounded-xl border border-brand-purple/10 hover:bg-brand-purple hover:text-white transition-all"
                >
                  View Property Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
