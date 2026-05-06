import { ShieldCheck, Target, Heart, Users, ArrowRight, Play, CheckCircle2, Award, Globe, Building2, BarChart3, Fingerprint, Zap, CheckCircle, Briefcase } from 'lucide-react';
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
              <ShieldCheck className="w-3.5 h-3.5" /> LASERA Licensed Agency
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Helping Nigerians <br />
              <span className="text-brand-mint italic">secure their dream home.</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed mb-10">
              At BuyLetLive, we bridge the gap between property seekers and reputable developers. As a LASERA licensed agency, we are committed to providing a secure and transparent path to property ownership for every Nigerian, home and abroad.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Verified Properties', value: '1,200+', icon: Building2 },
              { label: 'Reputable Developers', value: 'Tier-1', icon: Briefcase },
              { label: 'Client Satisfaction', value: '99%', icon: Heart },
              { label: 'LASERA Licensed', value: 'Verified', icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-purple/10 transition-colors">
                   <stat.icon className="w-6 h-6 text-brand-purple" />
                </div>
                <div className="text-3xl font-serif text-brand-purple-dark mb-1">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values & Culture ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-6">Our Core Philosophy</h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              We work exclusively with reputable developers to ensure every property we list meets the highest standards of structural and legal integrity.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: 'Institutional Integrity',
                desc: 'As a LASERA licensed firm, we treat every private acquisition with the same level of due diligence as an institutional asset expansion.'
              },
              {
                icon: Globe,
                title: 'Unified Global Service',
                desc: 'Whether you are across the street or across the globe, our processes provide absolute confidence, overcoming the barriers of distance and trust for all Nigerians.'
              },
              {
                icon: Award,
                title: 'Market Excellence',
                desc: 'We prioritize the quality of our properties over the quantity of listings, ensuring only the most secure assets from reputable developers reach our clients.'
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

      {/* ── Diaspora Focus Section ── */}
      <section className="py-24 bg-brand-purple-dark overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1573164067507-40e1d7a426ab?auto=format&fit=crop&w=1200&q=80" alt="Global Connectivity" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/20 text-brand-mint rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Globe className="w-3.5 h-3.5" /> Diaspora Bridge
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">Secure Property Acquisition for the Diaspora</h2>
              <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
                We understand the unique challenges of investing from abroad. As a LASERA licensed agency, we provide a verified and legal bridge to property ownership in Nigeria, working only with reputable developers you can trust.
              </p>
              <ul className="space-y-4">
                {[
                  'Verified Listings from Reputable Developers',
                  'LASERA Licensed Agency Protection',
                  'Live Video Inspections and Progress Reports',
                  'Seamless Legal and Documentation Support'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                    <span className="text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/buy-from-abroad" className="inline-flex items-center gap-3 text-brand-mint font-bold uppercase tracking-widest text-xs group">
                  Learn about Diaspora Services <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-12 border border-white/10">
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand-mint flex items-center justify-center text-brand-purple-dark">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">Verified Partners</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">We only work with Tier-1 reputable developers with proven track records.</p>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-gray-300 text-sm italic font-light">"BuyLetLive made my investment from London feel as secure as a local transaction. Knowing they are LASERA licensed gave me peace of mind."</p>
                    <div className="mt-4 text-brand-mint text-[10px] font-black uppercase tracking-widest">— Tunde O., Investor</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-gray-300 text-sm italic font-light">"I appreciated the transparency. They only showed me properties from developers with verified titles and structural integrity."</p>
                    <div className="mt-4 text-brand-mint text-[10px] font-black uppercase tracking-widest">— Sarah A., Homeowner</div>
                  </div>
               </div>
            </div>
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
                  { title: 'Trust', desc: 'Trust is our primary currency. As a LASERA licensed agency, we build enduring relationships through unwavering honesty and data-backed advisory.' },
                  { title: 'Customer Centric', desc: 'Our clients are the architects of our search. We don\'t just find houses; we listen to your lifestyle needs and investment goals to source properties that perfectly align with your vision.' },
                  { title: 'Transparency', desc: 'We believe in radical clarity. We show the full picture—including the risks—so you can make informed decisions with zero guesswork.' },
                  { title: 'Integrity', desc: 'We uphold the highest moral and ethical standards. Our reputation is built on doing the right thing, even when no one is watching, ensuring legal and structural certainty.' },
                  { title: 'Value Addition', desc: 'We are partners in your wealth journey. We strive to add tangible value to your holdings through strategic market insights and lifecycle property management.' }
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
                    To provide Nigerians with a secure path to home ownership through <span className="text-brand-mint">verified properties</span> and reputable developers.
                  </h3>
                </div>

                {/* Decorative Accent */}
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-brand-mint/40" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-brand-mint/40 pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* ── Our People ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <header className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              <Users className="w-4 h-4" /> The Strategic Minds
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-purple-dark mb-6">Behind Your Property Goals</h2>
            <p className="text-gray-500 text-lg max-w-2xl font-light leading-relaxed">
              Our team consists of specialized advisors and property experts dedicated to helping you find and secure your dream home.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...management, ...salesTeam].map((member) => (
              <div key={member.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 shadow-xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-purple-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <p className="text-white text-sm font-light leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-purple-dark mb-1">{member.name}</h3>
                  <p className="text-brand-mint text-xs font-black uppercase tracking-[0.2em]">{member.role}</p>
                </div>
              </div>
            ))}
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
