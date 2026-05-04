import { Camera, Video, Plane, Building, Layout, Play, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';
import SEO from '../components/SEO';

const MEDIA_SERVICES = [
  {
    icon: Camera,
    title: 'Professional Photography',
    desc: 'High dynamic range (HDR) architectural photography that highlights the premium features, natural lighting, and true scope of your property.',
  },
  {
    icon: Video,
    title: 'Cinematic Video Tours',
    desc: '4K stabilized video walk-throughs with professional editing, color grading, and licensed music to create an emotional connection with potential buyers.',
  },
  {
    icon: Plane, 
    title: 'Aerial Drone Media',
    desc: 'Breathtaking 4K aerial photography and videography to showcase the property’s exterior, plot size, neighborhood context, and surrounding amenities.',
  },
  {
    icon: Layout,
    title: '3D Virtual Tours & Floorplans',
    desc: 'Immersive 3D Matterport tours allowing international and diaspora clients to walk through the property virtually, paired with precise schematic floor plans.',
  }
];

export default function RealEstateMediaPage() {
  return (
    <>
      <SEO
        title="Real Estate Media Services | BuyLetLive"
        description="Premium real estate photography, cinematic videography, 3D virtual tours, and drone media services for premium properties in Nigeria."
        canonicalUrl="/real-estate-media"
      />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden" aria-label="Real Estate Media Hero">
        <div className="absolute inset-0 z-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
          >
            <source src="https://buyletlive.com/assets/videos/bll-studio-bg.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img
              src="https://images.unsplash.com/photo-1512444648784-0e31e50f3b0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Real estate media production"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-brand-mint text-[10px] font-black uppercase tracking-[0.3em] mb-8 rounded-full shadow-lg">
              <Camera className="w-3.5 h-3.5" /> BuyLetLive Studios
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-brand-mint italic underline decoration-white/20 decoration-8 underline-offset-8">Property Collection.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Premium visual storytelling. We produce high-end architectural photography, cinematic video tours, and immersive 3D experiences that sell properties faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#book"
                className="px-8 py-4 bg-brand-mint text-brand-purple-dark font-bold hover:bg-white hover:shadow-brand-mint/20 transition-all inline-flex items-center gap-2 rounded-xl shadow-xl text-sm"
              >
                Submit Brief <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                className="px-8 py-4 border border-white/30 text-white font-bold hover:bg-white/10 transition-all inline-flex items-center gap-2 rounded-xl text-sm backdrop-blur-sm"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-brand-purple-dark"><Play className="w-3 h-3 ml-0.5" /></span>
                Watch 2026 Showreel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-purple-dark">Studio Capabilities</h2>
            <p className="text-gray-600 text-lg">
              Our in-house production team utilizes industry-leading cinema cameras, drones, and 3D mapping technology to capture your property in its best light.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Camera,
                title: 'Professional Photography',
                desc: 'High dynamic range (HDR) architectural photography that highlights the premium features, natural lighting, and true scope of your property.',
              },
              {
                icon: Video,
                title: 'Cinematic Video Tours',
                desc: '4K stabilized video walk-throughs with professional editing, color grading, and licensed music to create an emotional connection with potential buyers.',
              },
              {
                icon: Building,
                title: 'Aerial Drone Media',
                desc: 'Breathtaking 4K aerial photography and videography to showcase the property’s exterior, plot size, neighborhood context, and surrounding amenities.',
              },
              {
                icon: Layout,
                title: '3D Virtual Tours & Floorplans',
                desc: 'Immersive 3D Matterport tours allowing international and diaspora clients to walk through the property virtually, paired with precise schematic floor plans.',
              }
            ].map((service, idx) => (
              <div key={idx} className="group p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-mint/10 hover:border-brand-mint/30 transition-all duration-500 bg-gray-50 hover:bg-white flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-white shadow-sm rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-brand-mint/10 transition-colors">
                  <service.icon className="w-7 h-7 text-brand-purple group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-snug">{service.title}</h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery & Past Clients ── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-purple-dark">Studio Showcase</h2>
            <p className="text-gray-600 text-lg mb-10">
              Trusted by Nigeria's most eminent developers to accurately document their collections. Our clients include top-tier institutional firms and premium developers.
            </p>
            
            {/* Trusted By Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 mb-16 grayscale opacity-60">
              <img src="/assets/logos/Businessday Newspaper logo.png" className="h-6 md:h-8 object-contain hover:grayscale-0 hover:opacity-100 transition-all" alt="Client Logo 1" />
              <img src="/assets/logos/Nairametrics Logo.png" className="h-6 md:h-8 object-contain hover:grayscale-0 hover:opacity-100 transition-all" alt="Client Logo 2" />
              {/* Note: In a real environment, replace these with Dillon, Veritasi, etc. For now utilizing existing assets */}
              <div className="font-serif text-2xl font-bold italic tracking-tighter">DILLON</div>
              <div className="font-serif text-2xl font-bold uppercase tracking-widest text-[#B5915F]">Veritasi</div>
            </div>
            
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" className="object-cover h-64 w-full transition-transform duration-700 group-hover:scale-110" alt="Villa Media Work" />
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" className="object-cover h-64 w-full transition-transform duration-700 group-hover:scale-110" alt="Apartment Media Work" />
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" className="object-cover h-64 w-full transition-transform duration-700 group-hover:scale-110" alt="Drone Media Work" />
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer">
              <img src="https://images.unsplash.com/photo-1613490908578-79c6d37d518f?w=800&q=80" className="object-cover h-64 w-full transition-transform duration-700 group-hover:scale-110" alt="Interior Media Work" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Brief Intake Form ── */}
      <section className="py-24 bg-white" id="book">
        <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-14">
          <header className="mb-10 text-center">
            <h2 className="text-3xl font-serif mb-3 text-brand-purple-dark">Share Property Brief</h2>
            <p className="text-gray-500">Provide details about your property to receive an accurate production quote.</p>
          </header>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-mint text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-mint text-sm" placeholder="john@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-mint text-sm appearance-none">
                  <option>Residential</option>
                  <option>Commercial Tower</option>
                  <option>Estate Development</option>
                  <option>Shortlet/Hotel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location/Address</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-mint text-sm" placeholder="e.g. Ikoyi, Lagos" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services Required</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Photography', 'Videography', 'Drone Mapping', '3D Tour'].map(option => (
                  <label key={option} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" className="w-4 h-4 text-brand-purple border-gray-300 rounded focus:ring-brand-purple" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Brief / Size (sqft)</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-mint text-sm" placeholder="Tell us about the property style, room count, and square footage..."></textarea>
            </div>
            <button type="button" className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-dark transition-all text-sm shadow-xl shadow-brand-purple/20">
              Submit Media Brief
            </button>
          </form>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">Ready to Capture Your Next Property?</h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                Quality media is the highest ROI investment for real estate marketing. Contact our studio team to schedule your production.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                href="/speak-to-advisor"
                className="px-8 py-4 bg-brand-mint text-brand-purple-dark font-bold rounded-xl hover:bg-white transition-all duration-300 w-full sm:w-auto"
                >
                Chat with Studio Advisor
                </Link>
                <a
                href="https://wa.me/2349131037985"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                <Phone className="w-4 h-4" /> WhatsApp Us
                </a>
            </div>
        </div>
      </section>
    </>
  );
}
