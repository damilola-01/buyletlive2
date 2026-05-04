import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Search, Filter, X, ArrowRight, Star, ChevronLeft, ChevronRight, 
  Bed, Bath, Move, Heart, Info, ShieldCheck, Building, TreePine, CheckCircle2, Calculator, Share2, MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import SEO from '../../components/SEO';
import { ALL_PROPERTIES, Property, TAG_STYLES, getPropertyUrl } from '../../data/properties';
import { getLocationData } from '../../data/locations';
import { TEAM_MEMBERS, PROPERTY_ADVISORS } from '../../data/team';
import { useStore } from '../../hooks/useStore';
import GlobalSearchBar from '../../components/GlobalSearchBar';
import Breadcrumbs from '../../components/Breadcrumbs';
import DocStatusBadge from '../../components/DocStatusBadge';
import { getIndividualPropertySchema, getBreadcrumbSchema, getListingSchema } from '@/data/schema';
import SEOExplorer from '../../components/SEOExplorer';

const CATEGORY_INTROS: Record<string, string> = {
  'for-sale': "Acquire premium-grade residential and commercial assets in Nigeria's high-growth corridors. Our verified listings ensure secure title, professional auditing, and long-term capital appreciation for the discerning investor.",
  'for-rent': "Discover curated luxury rentals and high-end residential spaces in Nigeria's most prestigious neighborhoods. Experience a seamless leasing process with verified listings and professional management support.",
  'commercial': "Strategic commercial real estate solutions for institutional growth. From Class-A office spaces to prime retail nodes, explore high-yield opportunities in Nigeria's urban centers.",
  'shortlet': "Experience home away from home with our curated short-let apartments. Professionally managed, fully serviced, and located in Nigeria's safest premium enclaves."
};

/* ── SEO LINKIFY HELPER ── */
const Linkify = ({ text, category }: { text: string; category: string }) => {
  if (!text) return null;
  const keywords = [
    { word: 'Lagos', slug: 'lagos' },
    { word: 'Abuja', slug: 'abuja' },
    { word: 'Ikoyi', slug: 'ikoyi' },
    { word: 'Lekki', slug: 'lekki' },
    { word: 'Victoria Island', slug: 'victoria-island' },
    { word: 'Banana Island', slug: 'banana-island' },
    { word: 'Maitama', slug: 'maitama' },
    { word: 'Asokoro', slug: 'asokoro' },
    { word: 'Eko Atlantic', slug: 'eko-atlantic' }
  ];

  let parts: (string | JSX.Element)[] = [text];

  keywords.forEach(({ word, slug }) => {
    const newParts: (string | JSX.Element)[] = [];
    parts.forEach(part => {
      if (typeof part !== 'string') {
        newParts.push(part);
        return;
      }

      const regex = new RegExp(`(\\b${word}\\b)`, 'gi');
      const splitParts = part.split(regex);

      splitParts.forEach((subPart, i) => {
        if (subPart.toLowerCase() === word.toLowerCase()) {
          newParts.push(
            <Link 
              key={`${word}-${i}`} 
              href={`/${category}/${slug}/`}
              className="text-brand-mint font-medium hover:underline"
            >
              {subPart}
            </Link>
          );
        } else if (subPart) {
          newParts.push(subPart);
        }
      });
    });
    parts = newParts;
  });

  return <>{parts}</>;
};

/* ── PROPERTY DETAIL SUB-COMPONENT ── */
function PropertyDetailPage({ property, category, locationData }: any) {
  const router = useRouter();
  const { toggleFavorite, isFavorite, addRecentlyViewed } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);

  useEffect(() => {
    if (property?.id) {
      addRecentlyViewed(property.id);
    }
  }, [property?.id]);

  const advisor = useMemo(() => {
    if (!property) return PROPERTY_ADVISORS[0];
    return PROPERTY_ADVISORS[property.id % PROPERTY_ADVISORS.length];
  }, [property]);

  if (!property) return <div className="pt-32 text-center text-2xl font-serif">Property Not Found</div>;

  const images = property.images && property.images.length > 0 ? property.images : [property.image];
  const categoryLabel = property.category === 'for-sale' ? 'Properties for Sale' : property.category === 'for-rent' ? 'Properties for Rent' : 'Shortlet Apartments';
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <React.Fragment>
      <SEO 
        title={`${property.title} | BuyLetLive`}
        description={property.fullDescription || `${property.type} in ${property.location}`}
        canonicalUrl={fullUrl}
        schema={getIndividualPropertySchema(property)}
      />
      <div className="bg-white pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 mb-8">
           <Breadcrumbs 
              items={[
                { label: categoryLabel, href: `/${property.category}/` },
                { label: property.location.split(',')[0], href: `/${property.category}/${property.location.split(',')[0].toLowerCase().replace(/\s+/g, '-')}/` },
                { label: property.title }
              ]} 
           />
        </div>
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                 <section className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 p-3 shadow-xl relative h-[60vh]">
                    <img src={images[currentImageIndex]} className="w-full h-full object-cover rounded-2xl" />
                    {images.length > 1 && (
                      <div className="absolute bottom-10 right-10 flex gap-3">
                         <button onClick={() => setCurrentImageIndex(i => (i - 1 + images.length) % images.length)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white"><ChevronLeft /></button>
                         <button onClick={() => setCurrentImageIndex(i => (i + 1) % images.length)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white"><ChevronRight /></button>
                      </div>
                    )}
                 </section>
                 <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                       <div>
                          <div className="text-[10px] font-black text-brand-mint uppercase tracking-[0.2em] mb-2">{property.title}</div>
                          <h1 className="text-4xl md:text-5xl font-serif text-brand-purple-dark mb-4 leading-tight">
                             {property.beds} Bedroom {property.type}
                          </h1>
                          <div className="flex items-center text-gray-500 font-medium tracking-tight">
                             <MapPin className="w-4 h-4 mr-2 text-brand-mint" /> {property.location}
                          </div>
                       </div>
                       <div className="text-4xl font-black text-brand-purple tracking-tighter">{property.price}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                       <div className="flex flex-col"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Beds</span><div className="flex items-center gap-2 font-bold"><Bed className="w-4 h-4" /> {property.beds}</div></div>
                       <div className="flex flex-col"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Baths</span><div className="flex items-center gap-2 font-bold"><Bath className="w-4 h-4" /> {property.baths}</div></div>
                       <div className="flex flex-col"><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Area</span><div className="flex items-center gap-2 font-bold"><Move className="w-4 h-4" /> {property.sqft} SqFt</div></div>
                    </div>
                 </section>
                 <section className="bg-white p-8 border border-gray-50 rounded-3xl">
                    <h2 className="text-2xl font-serif text-brand-purple-dark mb-6">Description</h2>
                    <p className="text-gray-600 leading-relaxed font-light">{property.fullDescription || `A premium ${property.type} located in ${property.location}.`}</p>
                 </section>

                 {/* Documentation Status — for-sale only */}
                 {property.category === 'for-sale' && property.docs && (
                   <DocStatusBadge docs={property.docs} variant="full" />
                 )}
              </div>
              <div className="lg:col-span-4">
                 <div className="sticky top-28 space-y-6">
                    <div className="bg-brand-purple-dark text-white rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
                       <div className="flex items-center gap-4">
                          <img src={advisor.image} className="w-16 h-16 rounded-xl object-cover grayscale" />
                          <div>
                             <div className="text-xl font-serif italic">{advisor.name}</div>
                             <div className="text-[10px] text-brand-mint font-black uppercase tracking-widest">{advisor.role}</div>
                          </div>
                       </div>
                       <a 
                          href={`https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(`Hi ${advisor.name}, I'm interested in the ${property.beds} Bedroom ${property.type} in ${property.location} (${property.title})\n\nProperty Link: https://buyletlive.com${getPropertyUrl(property)}`)}`}
                          className="w-full py-4 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 shadow-2xl hover:brightness-110 transition-all"
                        >
                          Speak with {advisor.name} <ArrowRight />
                        </a>
                        <button onClick={() => setIsInspectionModalOpen(true)} className="w-full py-4 bg-white/10 text-white border border-white/20 font-black uppercase tracking-widest text-[10px] rounded-xl">Book Inspection</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* ── SIMILAR PROPERTIES ── */}
      {(() => {
        const similar = ALL_PROPERTIES.filter(p =>
          p.id !== property.id &&
          p.category === property.category &&
          p.location.split(',')[0].trim().toLowerCase() === property.location.split(',')[0].trim().toLowerCase()
        ).slice(0, 4);
        const fallback = similar.length < 2
          ? ALL_PROPERTIES.filter(p => p.id !== property.id && p.category === property.category).slice(0, 4)
          : similar;
        if (fallback.length === 0) return null;
        return (
          <section className="bg-gray-50 border-t border-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                  <div className="text-[10px] font-black text-brand-mint uppercase tracking-[0.2em] mb-2">Similar Properties</div>
                  <h2 className="text-3xl md:text-4xl font-serif text-brand-purple-dark leading-tight">
                    You May Also <span className="italic text-brand-mint">Like</span>
                  </h2>
                </div>
                <Link
                  href={`/${property.category}/nigeria/`}
                  className="group flex items-center gap-2 text-brand-purple font-black uppercase tracking-widest text-[10px] hover:text-brand-mint transition-colors shrink-0"
                >
                  View All Listings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {fallback.map((p) => (
                  <article key={p.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-purple-dark shadow-sm">{p.tags[0]}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="text-lg font-black text-white">{p.price}</div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-base font-serif text-brand-purple-dark group-hover:text-brand-purple transition-colors leading-tight mb-1">{p.beds} Bed {p.type}</h3>
                      <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <MapPin className="w-3 h-3 mr-1 text-brand-mint" /> {p.location.split(',')[0]}
                      </div>
                      <div className="flex items-center justify-between py-3 border-t border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-brand-purple/30" /> {p.beds}</span>
                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-brand-purple/30" /> {p.baths}</span>
                        <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5 text-brand-purple/30" /> {p.sqft}</span>
                      </div>
                      <Link
                        href={getPropertyUrl(p)}
                        className="mt-auto w-full py-3 bg-brand-purple/5 text-brand-purple font-black uppercase tracking-widest text-[9px] flex items-center justify-center rounded-xl border border-brand-purple/10 hover:bg-brand-purple hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {isInspectionModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-purple-dark/80 backdrop-blur-md">
           <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full relative">
              <button onClick={() => setIsInspectionModalOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full font-black text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-3xl font-serif text-brand-purple-dark mb-6">Secure <br/>Physical Inspection</h3>
              <p className="text-gray-500 mb-8 font-medium">Request a private tour of this <span className="text-brand-purple font-bold tracking-tight uppercase text-xs">{property.beds} Bed {property.type}</span>.</p>
              <button className="w-full py-5 bg-brand-purple text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-purple-dark transition-all">Confirm Schedule Request</button>
           </div>
        </div>
      )}
    </React.Fragment>
  );
}

/* ── CATEGORY LISTING SUB-COMPONENT ── */
function CategoryListingPage({ properties, seo, parsedQuery, locationData, category, locationLabel, dynamicH1 }: any) {
  const { toggleFavorite, isFavorite } = useStore();
  const router = useRouter();
  const itemsPerPage = 9;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Drive currentPage from URL query param so it survives SSR re-renders
  const currentPage = Math.max(1, Math.min(totalPages || 1, parseInt((router.query.page as string) || '1', 10)));
  const currentProperties = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const categoryLabel = (category || "").replace('for-', '').replace(/^\w/, (c: string) => c.toUpperCase());

  const handlePageChange = (page: number) => {
    const { page: _removed, ...restQuery } = router.query;
    router.push(
      { pathname: router.pathname, query: page === 1 ? restQuery : { ...restQuery, page } },
      undefined,
      { shallow: true, scroll: true }
    );
  };

  return (
    <React.Fragment>
      <SEO title={seo.title} description={seo.description} canonicalUrl={seo.canonical} />
      <section className="relative pt-24 pb-20 overflow-hidden bg-brand-purple-dark">
        <div className="absolute inset-0 z-0 text-white">
          <img
            src={locationData.landmarks?.[0]?.img || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2075&q=80"}
            className="w-full h-full object-cover opacity-40 blur-sm"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-dark/95 via-transparent to-brand-purple-dark/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16">
          <div className="max-w-3xl">
            <Breadcrumbs 
              items={[
                { label: categoryLabel, href: `/${category}/` },
                ...(locationLabel ? [{ label: locationLabel, href: `/${category}/${locationLabel.toLowerCase().replace(/\s+/g, '-')}/` }] : [])
              ]}
              theme="white"
            />
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 mt-8 leading-[1.1] animate-fade-in-up">
              {dynamicH1}
            </h1>
            <p className="text-white/60 text-xl font-light mb-10 max-w-2xl leading-relaxed whitespace-pre-line">
              <Linkify text={locationData.introText || `Discover premium real estate opportunities in ${locationLabel || 'Nigeria'}. Strategic properties for high-growth assets.`} category={category} />
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20 pb-32">
        <GlobalSearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentProperties.length > 0 ? (
            currentProperties.map((property: Property) => (
              <article key={property.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="relative h-72 overflow-hidden">
                  <img src={property.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={property.title} />
                  <div className="absolute top-5 left-5 flex gap-2">
                    {property.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand-purple-dark shadow-xl">{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => toggleFavorite(property.id)} className="absolute top-5 right-5 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-mint hover:text-brand-purple-dark transition-all">
                    <Heart className={`w-5 h-5 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                     <div className="text-2xl font-black text-white tracking-widest">{property.price}</div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                   <div className="flex justify-between items-start mb-4">
                      <div className="text-[9px] font-black text-brand-mint uppercase tracking-widest bg-brand-mint/5 px-2 py-1 rounded">Expertly Verified</div>
                      <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{property.slug.split('-').pop()?.toUpperCase()}</div>
                   </div>
                   <div className="mb-4">
                      <h3 className="text-xl font-serif text-brand-purple-dark group-hover:text-brand-purple transition-colors leading-tight mb-1">
                        {property.beds} Bedroom {property.type}
                      </h3>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider opacity-80">
                        {property.beds} Bedroom {property.type} FOR {property.category.replace('for-', '').toUpperCase()}
                      </div>
                   </div>
                    <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-widest mb-6"><MapPin className="w-3 h-3 mr-1.5 text-brand-mint" /> {property.location}</div>
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100 text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">
                      <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-brand-purple/40" /> {property.beds} Beds</span>
                      <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-brand-purple/40" /> {property.baths} Baths</span>
                      <span className="flex items-center gap-1.5"><Move className="w-4 h-4 text-brand-purple/40" /> {property.sqft.toString().replace('+','')} SqFt</span>
                    </div>
                    <div className="mt-auto grid grid-cols-2 gap-3">
                     {/* Doc strip — for-sale cards only */}
                     {property.category === 'for-sale' && property.docs && (
                       <div className="col-span-2 mb-1">
                         <DocStatusBadge docs={property.docs} variant="compact" />
                       </div>
                     )}
                     <Link href={getPropertyUrl(property)} className="w-full py-3.5 bg-brand-purple/5 text-brand-purple font-black uppercase tracking-widest text-[10px] items-center justify-center flex rounded-xl border border-brand-purple/10 hover:bg-brand-purple hover:text-white transition-all shadow-sm">View Details</Link>
                     <a href={`https://wa.me/2349131037985?text=${encodeURIComponent(`Hi, I'm interested in the ${property.beds} Bedroom ${property.type} at ${property.location}`)}`} target="_blank" className="w-full py-3.5 bg-[#25D366] text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center rounded-xl shadow-lg hover:brightness-110 transition-all">WhatsApp</a>
                   </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 px-10 bg-brand-purple-dark rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=2000&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  <Search className="w-4 h-4" /> Tailored Search
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">Can&apos;t find your ideal property?</h3>
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-12">
                  Our private advisors have access to exclusive, off-market listings and direct developer collections that aren&apos;t visible here. Let us find it for you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/speak-to-advisor" className="px-10 py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl w-full sm:w-auto">
                    Speak to an Advisor
                  </Link>
                  <Link href="/request-property" className="px-10 py-5 bg-white/10 text-white border border-white/20 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/20 transition-all w-full sm:w-auto">
                    Request a Property
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {properties.length > itemsPerPage && (
          <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
             <button 
               onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
               disabled={currentPage === 1}
               className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:text-brand-purple hover:border-brand-purple transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
             >
               <ChevronLeft className="w-4 h-4" /> Previous
             </button>
             <div className="flex gap-2">
               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                 <button 
                   key={page}
                   onClick={() => handlePageChange(page)}
                   className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === page ? 'bg-brand-purple text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                 >
                   {page}
                 </button>
               ))}
             </div>
             <button 
               onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
               disabled={currentPage === totalPages}
               className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:text-brand-purple hover:border-brand-purple transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
             >
               Next <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        )}
      </main>

      {/* ── Speak to Advisor / Request Property CTA ── */}
      <section className="bg-brand-purple-dark py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=2000&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark via-brand-purple-dark/95 to-brand-purple/80" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                Not finding the right property?
              </h3>
              <p className="text-gray-300 text-base font-light">
                Speak to a dedicated advisor or tell us exactly what you&apos;re looking for.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/speak-to-advisor"
                className="px-8 py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-xl hover:brightness-105 transition-all inline-flex items-center justify-center gap-2 shadow-xl text-sm whitespace-nowrap"
              >
                Speak to an Advisor <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/request-property"
                className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                Request a Property <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                   <div>
                      <h2 className="text-3xl font-serif text-brand-purple-dark mb-6 leading-tight">The {locationLabel || 'Nigeria'} <br/>Market Overview</h2>
                      <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">{locationData.introText}</p>
                      {locationData.notableInfo && (
                        <div className="p-6 bg-brand-mint/10 border border-brand-mint/20 rounded-2xl flex items-start gap-4 mb-8">
                           <div className="p-2 bg-brand-mint rounded-lg text-brand-purple-dark shadow-sm"><Star className="w-5 h-5 fill-current" /></div>
                           <div>
                               <div className="text-xs font-black uppercase tracking-widest text-brand-purple-dark mb-1">Notable Market Insight</div>
                               <div className="flex gap-4 mb-2">
                                  {locationData.yieldRating && <div className="text-[10px] font-bold px-2 py-1 bg-brand-purple/5 text-brand-purple rounded border border-brand-purple/10">Yield: {locationData.yieldRating}</div>}
                                  {locationData.securityRating && <div className="text-[10px] font-bold px-2 py-1 bg-brand-mint/20 text-brand-purple-dark rounded border border-brand-mint/30">Security: {locationData.securityRating}</div>}
                               </div>
                               <p className="text-sm text-brand-purple-dark/80 font-medium leading-relaxed">{locationData.notableInfo}</p>
                           </div>
                        </div>
                      )}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200">
                      <div><div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2 border-l-2 border-brand-mint">Key Landmarks</div><ul className="space-y-4">{locationData.landmarks?.map((l: any) => (<li key={l.name} className="text-sm font-bold text-brand-purple-dark flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-mint shadow-sm" /> {l.name}</li>))}</ul></div>
                      <div><div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2 border-l-2 border-brand-mint">Top Schools</div><ul className="space-y-4">{locationData.schools?.map((s: string) => (<li key={s} className="text-sm font-bold text-brand-purple-dark flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-mint shadow-sm" /> {s}</li>))}</ul></div>
                      <div><div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2 border-l-2 border-brand-mint">Regional Infrastructure</div><ul className="space-y-4">{locationData.infrastructure?.map((inf: string) => (<li key={inf} className="text-sm font-bold text-brand-purple-dark flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-mint shadow-sm" /> {inf}</li>))}</ul></div>
                   </div>
                </div>
                <div className="lg:sticky lg:top-32 h-fit">
                    <div className="bg-brand-purple-dark rounded-[2.5rem] p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                       <h3 className="text-3xl font-serif mb-6 leading-snug relative z-10 text-white font-bold">Unparalleled <br/>Property Custodianship & Verification</h3>
                       <p className="text-white/70 font-light leading-relaxed mb-10 text-lg relative z-10">We bridge the gap between global capital and local properties through rigorous 14-point auditing, professional title verification, and 24/7 strategic oversight.</p>
                       <Link href="/speak-to-advisor" className="px-8 py-5 bg-brand-mint text-brand-purple-dark w-max rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:scale-105 transition-all relative z-10">Speak with Advisor <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                </div>
            </div>
            
            {/* 3-Paragraph Market Guide Section */}
            <div className="mt-20 pt-20 border-t border-gray-200">
               <div className="max-w-4xl">
                  <h2 className="text-3xl font-serif text-brand-purple-dark mb-10">Strategic Market Guide</h2>
                  <div className="space-y-8">
                     {locationData.marketGuide?.map((paragraph: string, i: number) => (
                       <p key={i} className="text-gray-600 text-lg leading-relaxed font-light first-letter:text-4xl first-letter:font-serif first-letter:mr-2">
                         <Linkify text={paragraph} category={category} />
                       </p>
                     ))}
                  </div>
               </div>
            </div>
          </div>
      </section>

      {/* Vertical Bridges — SEO Cross-linking (Moved to Footer area) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 border-t border-gray-100 flex flex-wrap items-center gap-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2">Alternative Categories:</span>
        {['for-sale', 'for-rent', 'shortlet'].filter(cat => cat !== category).map(cat => (
          <Link 
            key={cat} 
            href={`/${cat}/${locationLabel.toLowerCase().replace(/\s+/g, '-')}/`}
            className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-sm"
          >
            View {cat.replace('-', ' ')} in {locationLabel || 'Nigeria'}
          </Link>
        ))}
      </div>

      <SEOExplorer category={category} />


      {/* FIXED MOBILE CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-[100] p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
         <Link href="/speak-to-advisor" className="flex items-center justify-center gap-3 w-full py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl active:scale-95 transition-all">
            Consult with Advisor <MessageCircle className="w-5 h-5" />
         </Link>
      </div>
    </React.Fragment>
  );
}

export default function UnifiedCatchAllPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (props.viewMode === 'property') {
    return <PropertyDetailPage {...props} />;
  }
  return <CategoryListingPage {...props} />;
}

/* ── UNIFIED GETSERVERIDEPROPS ── */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, slugs } = context.params || {};
  const slugParts = ((slugs as string[]) || []).filter(Boolean);
  const { type, beds, budget, min_price, max_price, tag } = context.query;
  
  // 0. Descriptive Slug Parsing Heuristic
  let resolvedFilters: any = { 
    type: (type as string) || '', 
    minPrice: min_price ? parseInt(min_price as string) : 0, 
    maxPrice: max_price ? parseInt(max_price as string) : 999999999999,
    tag: (tag as string) || ''
  };

  const descriptiveSlug = slugParts[1] || '';
  if (descriptiveSlug && !descriptiveSlug.includes('-BLL')) {
     const slug = descriptiveSlug.toLowerCase();
     
     // Detect Tags
     if (slug.includes('serviced')) resolvedFilters.tag = 'Serviced';
     else if (slug.includes('furnished')) resolvedFilters.tag = 'Furnished';
     else if (slug.includes('new-built') || slug.includes('newly-built')) resolvedFilters.tag = 'Newly-Built';
     
     if (slug.includes('apartment') || slug.includes('flat')) resolvedFilters.type = 'Flat';
     else if (slug.includes('house')) resolvedFilters.type = 'Detached Property';
     else if (slug.includes('land')) resolvedFilters.type = 'Land';
     else if (slug.includes('duplex')) resolvedFilters.type = 'Duplex Property';
     else if (slug.includes('commercial')) resolvedFilters.type = 'Commercial Property';
     else if (slug.includes('terraced')) resolvedFilters.type = 'Terraced Property';
     else if (slug.includes('penthouse')) resolvedFilters.type = 'Penthouse Property';
     else if (slug.includes('detached')) resolvedFilters.type = 'Detached Property';

     // Detect Price Brackets
     if (slug.includes('under-')) {
        const match = slug.match(/under-(\d+)(m|b)/);
        if (match) {
           const factor = match[2] === 'm' ? 1000000 : 1000000000;
           resolvedFilters.maxPrice = parseInt(match[1]) * factor;
        }
     } else if (slug.includes('above-')) {
        const match = slug.match(/above-(\d+)(m|b)/);
        if (match) {
           const factor = match[2] === 'm' ? 1000000 : 1000000000;
           resolvedFilters.minPrice = parseInt(match[1]) * factor;
        }
     } else if (slug.includes('between-')) {
        const match = slug.match(/between-(\d+)(m|b)-and-(\d+)(m|b)/);
        if (match) {
           const f1 = match[2] === 'm' ? 1000000 : 1000000000;
           const f2 = match[4] === 'm' ? 1000000 : 1000000000;
           resolvedFilters.minPrice = parseInt(match[1]) * f1;
           resolvedFilters.maxPrice = parseInt(match[3]) * f2;
        }
     }
  }

  // 1. Determine if this is a Property Detail Page 
  const potentialSlugId = slugParts[1] || '';
  const idMatch = potentialSlugId.match(/-BLL(\d+)$/);
  
  if (idMatch) {
     const propertyId = parseInt(idMatch[1]);
     const property = ALL_PROPERTIES.find(p => p.id === propertyId);
     if (property) {
        return {
           props: {
              viewMode: 'property',
              property: JSON.parse(JSON.stringify(property)),
              category: category || '',
              locationLabel: property.location.split(',')[0],
              locationData: JSON.parse(JSON.stringify(getLocationData(slugParts[0])))
           }
        };
     }
  }

  // 2. Listing Logic
  const locationSlug = slugParts[0] || 'nigeria';
  const typeInPath = slugParts[1] || ''; 
  const locationLabel = locationSlug !== 'nigeria' ? locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
  const typeResolved = (typeInPath || (type as string) || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  let properties = ALL_PROPERTIES.filter(p => p.category === category);
  if (locationSlug && locationSlug !== 'nigeria') {
    properties = properties.filter(p => p.location.toLowerCase().includes(locationSlug.replace(/-/g, ' ')));
  }
  
  const finalType = resolvedFilters.type || typeResolved;
  if (finalType) {
    properties = properties.filter(p => p.type.toLowerCase().trim() === finalType.toLowerCase().trim() || p.type.toLowerCase().includes(finalType.toLowerCase()));
  }
  
  if (resolvedFilters.tag) {
     properties = properties.filter(p => p.tags.includes(resolvedFilters.tag));
  }
  
  if (beds) {
    properties = properties.filter(p => p.beds >= parseInt(beds as string));
  }
  
  const minP = Math.max(resolvedFilters.minPrice, min_price ? parseInt(min_price as string) : 0);
  const maxP = Math.min(resolvedFilters.maxPrice, max_price ? parseInt(max_price as string) : 999999999999);
  
  if (min_price || max_price || resolvedFilters.minPrice > 0 || resolvedFilters.maxPrice < 999999999999) {
    properties = properties.filter(p => p.priceInt >= minP && p.priceInt <= maxP);
  } else if (budget) {
     const [min, max] = (budget as string).split('-').map(Number);
     properties = properties.filter(p => p.priceInt >= min && p.priceInt <= max);
  }

  const dynamicH1 = generateDynamicContent(category as string, locationLabel, finalType, beds as string, minP, maxP, resolvedFilters.tag);
  const locationData = JSON.parse(JSON.stringify(getLocationData(locationSlug || 'nigeria')));
  
  // Personalize introText based on category if it's the generic one
  if (locationData.introText.includes("Nigeria's premium real estate landscape offers robust opportunities")) {
    locationData.introText = CATEGORY_INTROS[category as string] || locationData.introText;
  }

  return {
    props: {
      viewMode: 'listing',
      properties: JSON.parse(JSON.stringify(properties)),
      category: category || '',
      locationLabel: locationLabel,
      locationData: JSON.parse(JSON.stringify(locationData)),
      parsedQuery: { 
        location: locationLabel || (locationSlug === 'nigeria' ? '' : locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
        type: typeResolved || '', 
        beds: beds || '', 
        min_price: min_price || '',
        max_price: max_price || ''
      },
      dynamicH1,
      seo: {
        title: `${dynamicH1} | BuyLetLive`,
        description: locationData.seoDescription || `Discover premium-grade ${dynamicH1}. Explore verified real estate properties in Nigeria.`,
        canonical: `/${category}/${locationSlug ? locationSlug + '/' : ''}${typeInPath ? typeInPath + '/' : ''}`,
        schema: [
          getBreadcrumbSchema([
            { name: category === 'for-sale' ? 'For Sale' : category === 'for-rent' ? 'For Rent' : 'Commercial', item: `/${category}` },
            { name: locationLabel || 'Nigeria', item: `/${category}/${locationSlug}` }
          ]),
          getListingSchema(properties.slice(0, 10))
        ]
      }
    }
  };
};

function generateDynamicContent(category: string, location: string, type?: string, beds?: string, minPrice?: number, maxPrice?: number, tag?: string) {
  const bedCount = beds ? parseInt(beds) : 0;
  const bedLabel = (beds && bedCount > 0) ? `${bedCount} Bed ` : '';
  const tagLabel = tag ? `${tag} ` : '';
  let typeLabel = (type && type.toLowerCase().includes('commercial')) ? 'Commercial Property ' : (type ? `${type} ` : (category === 'shortlet' ? '' : 'Property '));
  if (category === 'shortlet') {
    typeLabel = typeLabel.replace(/Property/gi, '').trim();
    if (typeLabel) typeLabel += ' ';
  }
  
  let catLabel = '';
  if (category === 'for-sale') catLabel = 'for Sale';
  else if (category === 'for-rent') catLabel = 'for Rent';
  else if (category === 'shortlet') catLabel = 'Shortlet Apartments';
  else if (category === 'commercial') { catLabel = ''; typeLabel = 'Commercial Property '; }
  else catLabel = 'Properties';

  const locLabel = location ? `in ${location}` : 'in Nigeria';
  
  let priceRange = '';
  if (minPrice && minPrice > 0 && maxPrice && maxPrice < 1000000000) {
     priceRange = ` between ₦${minPrice/1000000}M and ₦${maxPrice/1000000}M`;
  } else if (maxPrice && maxPrice < 500000000) {
     priceRange = ` under ₦${maxPrice/1000000}M`;
  } else if (minPrice && minPrice >= 500000000) {
     priceRange = ` above ₦${minPrice/1000000}M`;
  }

  return `${bedLabel}${tagLabel}${typeLabel}${catLabel} ${locLabel}${priceRange}`.replace(/\s+/g, ' ').trim();
}
