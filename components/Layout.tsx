import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MessageCircle, MessageSquare, Send, ArrowRight, X, Linkedin, Twitter, Instagram } from 'lucide-react';
import Header from './Header';
import RelatedProperties from './RelatedProperties';

const FOOTER_LINKS = {
  'Property Types': [
    { label: 'Flats & Apartments', href: '/for-sale/nigeria/apartment/' },
    { label: 'Houses for Sale', href: '/for-sale/nigeria/house/' },
    { label: 'Lands for Sale', href: '/for-sale/nigeria/land/' },
    { label: 'Commercial Property', href: '/commercial/nigeria/' },
    { label: 'Shortlet Apartments', href: '/shortlet/nigeria/' },
  ],
  'Featured Collections': [
    { label: 'Serviced Properties', href: '/for-sale/nigeria/?tag=Serviced' },
    { label: 'Furnished Properties', href: '/for-sale/nigeria/?tag=Furnished' },
    { label: 'Newly Built Properties', href: '/for-sale/nigeria/?tag=Newly-Built' },
    { label: 'Cheap Properties', href: '/for-sale/nigeria/?max_price=50000000' },
    { label: 'Luxury Properties', href: '/for-sale/nigeria/?min_price=500000000' },
  ],
  'Market Brackets': [
    { label: '₦20M – ₦40M', href: '/for-sale/nigeria/?min_price=20000000&max_price=40000000' },
    { label: '₦40M – ₦60M', href: '/for-sale/nigeria/?min_price=40000000&max_price=60000000' },
    { label: '₦80M – ₦100M', href: '/for-sale/nigeria/?min_price=80000000&max_price=100000000' },
    { label: '₦120M – ₦150M', href: '/for-sale/nigeria/?min_price=120000000&max_price=150000000' },
    { label: 'Above ₦1B', href: '/for-sale/nigeria/?min_price=1000000000' },
  ],
  'Regional Hubs': [
    { label: 'Maitama, Abuja', href: '/for-sale/abuja/' },
    { label: 'Ikoyi, Lagos', href: '/for-sale/lagos/' },
    { label: 'Victoria Island', href: '/for-sale/vi/' },
    { label: 'GRA, Port Harcourt', href: '/for-sale/port-harcourt/' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Financing', href: '/financing' },
    { label: 'Advisory', href: '/advisory' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Terms of Agreement', href: '/terms' },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />

      <main className="flex-grow">{children}</main>

      {/* Conditionally hide RelatedProperties on specific pages */}
      {!['/contact', '/terms', '/about', '/real-estate-media', '/request-property', '/property-management', '/[category]/[[...slugs]]', '/', '/advisory'].includes(router.pathname) && <RelatedProperties />}

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-purple-mesh text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
        {/* Decorative glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-mint/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-12 mb-16">

            {/* Brand column */}
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="font-serif text-2xl font-bold text-white">
                  BuyLetLive<span className="text-brand-mint">.</span>
                </span>
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-8">
                Nigeria's premier real estate marketplace and advisory firm, connecting
                global capital with premium local properties since 2020.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Twitter,  label: 'Twitter'  },
                  { icon: Instagram, label: 'Instagram' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-mint/20 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-medium text-brand-mint mb-6 uppercase tracking-widest text-xs">
                  {heading}
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="hover:text-white hover:pl-1 transition-all duration-200 inline-block link-underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>© 2026 BuyLetLive. All rights reserved.</span>
            </div>
            <div className="text-gray-500 italic">
              Designed for Premium Real Estate Acquisition.
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CRO WIDGETS ───────────────────────────────────────── */}
      <div className="fixed bottom-32 lg:bottom-8 right-5 z-50 flex flex-col items-end gap-3">

        {/* Live Chat Window */}
        {isChatOpen && (
          <div className="w-80 sm:w-96 glass-card rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in origin-bottom-right">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-brand-purple-dark to-brand-purple p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-brand-mint/30 flex items-center justify-center text-white text-xs font-bold">
                    BLL
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-brand-purple-dark" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Advisor Chat</div>
                  <div className="text-brand-mint/80 text-xs">Online — typically replies in minutes</div>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 bg-gray-50/80 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100/80 max-w-[85%]">
                Hello! 👋 How can we assist you with your property search or investment today?
              </div>
              <div className="text-center text-xs text-gray-400">Today</div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100/80 bg-white flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-mint transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && setChatMessage('')}
              />
              <button
                className="w-9 h-9 bg-brand-mint text-brand-purple-dark rounded-full flex items-center justify-center hover:bg-brand-mint-light transition-colors shrink-0 btn-mint-glow"
                aria-label="Send message"
                onClick={() => setChatMessage('')}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="flex flex-col gap-3 items-end">
          {/* WhatsApp — Enhanced Visibility */}
          <div className="flex items-center group">
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 mr-3 animate-fade-in hidden md:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">Chat with Advisor</span>
            </div>
            <a
              href="https://wa.me/2349131037985"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.5)] hover:scale-110 hover:rotate-6 transition-all flex items-center justify-center relative animate-pulse-subtle"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* Live Chat Toggle */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`
              text-white p-4 rounded-full transition-all flex items-center justify-center group relative
              ${isChatOpen
                ? 'bg-gray-700 shadow-lg hover:bg-gray-800'
                : 'bg-brand-purple shadow-[0_4px_20px_rgba(69,56,117,0.45)] hover:scale-110 hover:shadow-[0_4px_30px_rgba(69,56,117,0.65)] btn-purple-glow'
              }
            `}
            aria-label={isChatOpen ? 'Close chat' : 'Open live chat'}
          >
            {isChatOpen
              ? <X className="w-6 h-6" />
              : <MessageSquare className="w-6 h-6" />
            }
            <span className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block border border-gray-100">
              {isChatOpen ? 'Close Chat' : 'Live Chat'}
            </span>
          </button>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM CTA ──────────────────────────────────── */}
      <div
        className={`
          lg:hidden fixed bottom-0 left-0 w-full z-40
          glass-white border-t border-gray-200/60
          p-3 transition-transform duration-500
          ${isScrolled ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <Link
          href="/advisory"
          className="w-full py-3.5 bg-brand-purple text-white font-bold rounded-xl flex items-center justify-center gap-2 btn-purple-glow hover:bg-brand-purple-dark active:scale-[0.98] transition-all text-sm"
        >
          Speak to an Advisor <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
