import React, { useEffect, useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Calendar, ShieldCheck, ArrowRight, Phone, ChevronLeft, ChevronRight, Calculator } from 'lucide-react';
import { getPropertyUrl } from '../data/properties';
import DocStatusBadge from './DocStatusBadge';

interface PropertyDetailsOverlayProps {
  property: any;
  onClose: () => void;
  onScheduleViewing: (property: any) => void;
  onViewProperty?: (property: any) => void;
}

export default function PropertyDetailsOverlay({ property, onClose, onScheduleViewing, onViewProperty }: PropertyDetailsOverlayProps) {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default calculator state (20% down, 15 yrs)
  const [mortgageDownPayment, setMortgageDownPayment] = useState(20);
  const [mortgageYears, setMortgageYears] = useState(15);
  const interestRate = 0.18; // 18% standard Nigerian estimated rate

  // SEO & URL Management
  useEffect(() => {
    if (!property) return;

    if (overlayRef.current) {
      overlayRef.current.scrollTo(0, 0);
    }
    setCurrentImageIndex(0);

    // Update URL without reloading
    const originalUrl = window.location.pathname + window.location.search;
    const newUrl = getPropertyUrl(property);
    window.history.pushState({ propertyId: property.id }, '', newUrl);

    // Update Title and Meta
    const originalTitle = document.title;
    document.title = `${property.title} | BuyLetLive Premium`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalMetaDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', `View details for ${property.title} located in ${property.location}. Price: ${property.price}.`);
    }

    // Add Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "SingleFamilyResidence",
      "name": property.title,
      "description": `Luxury property located in ${property.location}`,
      "url": window.location.href,
      "image": property.image,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.location.split(',')[0].trim(),
        "addressRegion": property.location.split(',')[1]?.trim() || "Nigeria",
        "addressCountry": "NG"
      },
      "numberOfRooms": property.beds,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.sqft?.replace(/,/g, ''),
        "unitCode": "FTK"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'property-schema';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.history.pushState(null, '', originalUrl);
      document.title = originalTitle;
      if (metaDesc && originalMetaDesc) metaDesc.setAttribute('content', originalMetaDesc);
      const existingScript = document.getElementById('property-schema');
      if (existingScript) existingScript.remove();
      document.body.style.overflow = '';
    };
  }, [property]);

  if (!property) return null;

  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Mortgage Logic
  const priceNum = property.priceInt || parseInt(property.price.replace(/[^0-9]/g, '')) || 0;
  const downPaymentAmount = priceNum * (mortgageDownPayment / 100);
  const principal = priceNum - downPaymentAmount;
  const monthlyInterestRate = interestRate / 12;
  const totalMonths = mortgageYears * 12;
  const monthlyPayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[110] bg-white overflow-y-auto flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="font-serif text-xl font-bold text-brand-purple-dark">
          BuyLetLive<span className="text-brand-mint">.</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">Close Listing</span>
        </button>
      </header>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Carousel Hero */}
            <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] rounded-2xl overflow-hidden shadow-lg group bg-gray-100">
              <img 
                src={images[currentImageIndex]} 
                alt={`${property.title} - Image ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              {images.length > 1 && (
                <>
                  <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, idx) => (
                      <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {property.tags?.map((tag: string) => (
                  <span key={tag} className={`text-xs font-medium px-3 py-1 rounded-sm shadow-sm ${tag === 'Off-Market' ? 'bg-brand-purple text-white' : 'bg-white text-brand-purple-dark'}`}>
                    {tag}
                  </span>
                ))}
                {property.isMortgageEnabled && (
                  <span className="text-xs font-medium px-3 py-1 rounded-sm shadow-sm bg-brand-mint text-brand-purple-dark flex items-center gap-1">
                    <Calculator className="w-3 h-3" /> Mortgage Enabled
                  </span>
                )}
              </div>
            </div>

            {/* Property Header */}
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-500 text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-brand-mint" /> {property.location}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-brand-mint">
                  {property.price}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 text-gray-700">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{property.beds}</span> Bedrooms
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{property.baths}</span> Bathrooms
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{property.sqft}</span> Sq.Ft
                </div>
                {property.dateAdded && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Listed: {new Date(property.dateAdded).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-serif text-gray-900 mb-4">About this Property</h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Experience unparalleled luxury in this exquisite {property.beds}-bedroom property located in the prestigious neighborhood of {property.location}. 
                  Designed with meticulous attention to detail, this home offers a perfect blend of modern elegance and functional living spaces.
                </p>
              </div>
            </section>

            {/* Documentation Status — for-sale properties only */}
            {property.category === 'for-sale' && property.docs && (
              <DocStatusBadge docs={property.docs} variant="full" />
            )}

            {/* Mortgage Calculator Section */}
            {property.isMortgageEnabled && (
              <section className="bg-brand-purple/5 p-6 md:p-8 rounded-2xl border border-brand-purple/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-purple/10 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-brand-purple" />
                  </div>
                  <h2 className="text-2xl font-serif text-gray-900">Estimated Mortgage</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">Down Payment</span>
                        <span className="text-gray-900">{mortgageDownPayment}% (₦{(downPaymentAmount/1000000).toLocaleString()}M)</span>
                      </div>
                      <input 
                        type="range" min="10" max="80" step="5" value={mortgageDownPayment} onChange={(e) => setMortgageDownPayment(Number(e.target.value))}
                        className="w-full accent-brand-purple"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">Loan Term</span>
                        <span className="text-gray-900">{mortgageYears} Years</span>
                      </div>
                      <input 
                        type="range" min="5" max="30" step="5" value={mortgageYears} onChange={(e) => setMortgageYears(Number(e.target.value))}
                        className="w-full accent-brand-purple"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center text-center">
                    <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Estimated Monthly</span>
                    <span className="text-3xl font-bold text-brand-purple mt-2 mb-1">
                       ₦{(monthlyPayment / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}K
                    </span>
                    <span className="text-xs text-gray-400">*Based on {interestRate*100}% standard local rate</span>
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* Sidebar (Right) - Sticky CRO Elements */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
              <h3 className="text-xl font-serif text-gray-900 mb-2">Interested in this property?</h3>
              <p className="text-gray-500 text-sm mb-8">Our advisory team is ready to assist you with viewing, verification, and acquisition.</p>
              
              <div className="space-y-4">
                <a 
                  href={`https://wa.me/2349131037985?text=${encodeURIComponent(`Hi BuyLetLive, I want to learn more about the ${property.title} located at ${property.location} priced at ${property.price}. Here is the link: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Phone className="w-5 h-5" /> WhatsApp Us
                </a>

                <button 
                  onClick={() => onScheduleViewing(property)}
                  className="w-full py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Book Inspection <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">BuyLetLive Verified</h4>
                    <p className="text-xs text-gray-500 mt-1">This property has undergone our rigorous legal and structural verification process.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 flex gap-3">
        <a 
          href={`https://wa.me/2349131037985?text=${encodeURIComponent(`Hi BuyLetLive, I want to learn more about the ${property.title} located at ${property.location} priced at ${property.price}. Link: ${window.location.href}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-[#25D366] text-white font-bold rounded-lg flex items-center justify-center flex-col leading-tight shadow-sm"
        >
          <span className="text-sm">WhatsApp</span>
        </a>
        <button 
          onClick={() => onScheduleViewing(property)}
          className="flex-1 py-3 bg-brand-purple text-white font-bold rounded-lg shadow-sm flex items-center justify-center flex-col leading-tight"
        >
          <span className="text-sm">Book Inspection</span>
        </button>
      </div>
    </div>
  );
}
