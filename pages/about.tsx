import { ShieldCheck, Target, Heart, Users, ArrowRight, Play, CheckCircle2, Award, Globe } from 'lucide-react';
import Link from 'next/link';
import SEO from '../components/SEO';
import { TEAM_MEMBERS } from '../data/team';


export default function AboutPage() {
  const management = (TEAM_MEMBERS || []).filter(m => m.department === 'Management');
  const salesTeam = (TEAM_MEMBERS || []).filter(m => m.department === 'Sales' || m.department === 'Advisory');

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <SEO 
        title="About Us | BuyLetLive" 
        description="Learn about Nigeria's premier real estate firm. Our mission, our people, and our commitment to institutional-grade property services."
        canonicalUrl="/about"
      />

      {/* ── Hero ── */}
      <section className="relative py-24 md:py-32 bg-brand-purple-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="About BuyLetLive" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark via-brand-purple-dark/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> Established 2020
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Building the Future of <br />
              <span className="text-brand-mint italic">Nigerian Real Estate.</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed mb-10">
              BuyLetLive was founded on a simple yet radical premise: that every real estate transaction in Nigeria should be characterized by absolute transparency, institutional oversight, and professional integrity.
            </p>
          </div>
        </div>
      </section>

      {/* ── CEO Video Message ── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-100">
                <iframe
                  src="https://drive.google.com/file/d/1Z4xgmx3k-IqH-qF4Y2fbd3TENT4C63CE/preview"
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="A Message from Ola Daramola, Managing Director of BuyLetLive"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-purple-dark mb-6 leading-tight">A Vision for <br />Transparency</h2>
              <p className="text-gray-600 text-lg mb-8 font-light leading-relaxed">
                "Our mission at BuyLetLive is to bridge the gap between dream and ownership for every Nigerian, whether they are across the street or across the globe. We are not just selling properties; we are securing legacies. Every property on our platform is a testament to our commitment to rigorous auditing and legal certainty."
              </p>
              <div className="space-y-4">
                <p className="font-serif text-2xl text-brand-purple-dark italic">— Ola Daramola</p>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Managing Director, BuyLetLive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values & Culture ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-6">Our Core Philosophy</h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              We operate at the intersection of local market intelligence and international professional standards.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: 'Institutional Integrity',
                desc: 'We treat every private acquisition with the same level of due diligence as an institutional asset expansion.'
              },
              {
                icon: Globe,
                title: 'Unified Global Service',
                desc: 'Whether you are across the street or across the globe, our processes provide absolute confidence, overcoming the barriers of distance and trust for all Nigerians.'
              },
              {
                icon: Award,
                title: 'Market Excellence',
                desc: 'We prioritize the quality of our properties over the quantity of listings, ensuring only the most secure assets reach our clients.'
              }
            ].map((value, i) => (
              <div key={i} className="text-center p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-brand-purple text-brand-mint rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-purple-dark mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our People (Sales Team) ── */}
      <section className="py-24 bg-brand-purple-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <header className="mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Users className="w-3.5 h-3.5" /> Our People
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">The Strategic Minds <br />Behind Your Property Goals</h2>
            <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed">
              Our team consists of specialized advisors, legal experts, and asset managers dedicated to your growth.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...management, ...salesTeam].map((member) => (
              <div key={member.id} className="group relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-brand-mint/50 transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80';
                    }}
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-brand-mint text-xs font-bold uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  <a 
                    href={`https://wa.me/${member.whatsapp}`} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-mint hover:text-white transition-colors"
                  >
                    Connect via WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-purple-dark mb-6 leading-tight">The BuyLetLive <br />Culture</h2>
              <div className="space-y-6">
                {[
                  { title: 'Trust', desc: 'Trust is our primary currency. We build enduring relationships through unwavering honesty, data-backed advisory, and a commitment to protecting our clients\' capital as if it were our own.' },
                  { title: 'Customer Centric', desc: 'Our clients are the architects of our search. We don\'t just find houses; we listen to your lifestyle needs and investment goals to source properties that perfectly align with your vision.' },
                  { title: 'Transparency', desc: 'We believe in radical clarity. From title verification to structural audits, we show the full picture—including the risks—so you can make informed decisions with zero guesswork.' },
                  { title: 'Integrity', desc: 'We uphold the highest moral and ethical standards. Our reputation is built on doing the right thing, even when no one is watching, ensuring legal and structural certainty for every asset.' },
                  { title: 'Value Addition', desc: 'We are partners in your wealth journey. We strive to add tangible value to your holdings through strategic market insights, yield optimization, and lifecycle property management.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-brand-purple/5 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-purple" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-purple-dark mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             <div className="relative h-full min-h-[500px] rounded-[3rem] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Premium Property" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-dark/80 via-transparent to-transparent" />
                
                {/* Floating Mission Card */}
                <div className="absolute bottom-8 left-8 right-8 p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
                  <div className="text-brand-mint text-[10px] font-black uppercase tracking-[0.3em] mb-3">Our Mission</div>
                  <h3 className="text-white text-2xl font-serif leading-tight">
                    To institutionalize trust in the African real estate market through <span className="text-brand-mint">absolute transparency</span> and professional excellence.
                  </h3>
                </div>

                {/* Decorative Accent */}
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-brand-mint/40" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-brand-mint/40 pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center bg-brand-purple-dark rounded-[3rem] p-16 md:p-24 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-brand-mint/5 mix-blend-overlay"></div>
           <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight relative z-10">Ready to Start Your <br />Real Estate Journey?</h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/for-sale/nigeria?ref=about_cta" className="px-10 py-5 bg-brand-mint text-brand-purple-dark font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl">Browse Properties</Link>
              <Link href="/speak-to-advisor?ref=about_cta" className="px-10 py-5 bg-white/10 text-white border border-white/20 backdrop-blur-md font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white hover:text-brand-purple-dark transition-all">Speak to Advisor</Link>
           </div>
        </div>
      </section>
    </div>
  );
}
