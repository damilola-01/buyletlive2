import React from 'react';
import Link from 'next/link';
import { getSEOLinksByCategory } from '../data/seo-links';

interface SEOExplorerProps {
  category?: string;
}

export default function SEOExplorer({ category }: SEOExplorerProps) {
  const groups = getSEOLinksByCategory(category);

  // JSON-LD for SiteNavigationElement
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": groups.flatMap(g => g.links).map((link, i) => ({
      "@type": "SiteNavigationElement",
      "position": i + 1,
      "name": link.label,
      "url": `https://buyletlive.com${link.href}`
    }))
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Header Info */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-serif text-brand-purple-dark mb-4">Market Discovery</h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Strategic access to Nigeria&apos;s most prestigious {category ? category.replace('-', ' ') : 'real estate'} assets and investment hubs.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.links.map((link, i) => (
                    <React.Fragment key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-[12px] text-gray-500 hover:text-brand-purple transition-colors font-light"
                      >
                        {link.label}
                      </Link>
                      {i < group.links.length - 1 && (
                        <span className="text-gray-200 text-[10px] self-center">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
