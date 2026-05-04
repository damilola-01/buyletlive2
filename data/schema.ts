export const siteConfig = {
  name: 'BuyLetLive',
  url: 'https://buyletlive.com',
  logo: 'https://buyletlive.com/assets/logos/bll-logo.png',
  address: {
    street: '12th Floor, Tower C, Zenith Heights, Victoria Island',
    city: 'Lagos',
    country: 'Nigeria'
  },
  contact: '+234 913 103 7985',
  socials: [
    'https://www.instagram.com/buyletliveofficial/',
    'https://www.linkedin.com/company/buyletlive/',
    'https://twitter.com/buyletlive'
  ]
};

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': siteConfig.name,
  'url': siteConfig.url,
  'logo': siteConfig.logo,
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': siteConfig.contact,
    'contactType': 'customer service',
    'areaServed': 'NG',
    'availableLanguage': 'English'
  },
  'sameAs': siteConfig.socials
});

export const getBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((it, i) => ({
    '@type': 'ListItem',
    'position': i + 1,
    'name': it.name,
    'item': `${siteConfig.url}${it.item}`
  }))
});

export const getListingSchema = (properties: any[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'numberOfItems': properties.length,
  'itemListElement': properties.map((p, i) => ({
    '@type': 'ListItem',
    'position': i + 1,
    'url': `${siteConfig.url}/for-sale/nigeria?id=${p.id}`,
    'name': p.title,
    'description': p.description || p.title,
    'image': p.image
  }))
});

export const getIndividualPropertySchema = (p: any) => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  'name': p.title,
  'description': p.fullDescription || p.title,
  'url': `${siteConfig.url}/for-sale/nigeria?id=${p.id}`,
  'image': p.image,
  'datePosted': p.datePosted || '2026-04-01',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': p.location.split(',')[0],
    'addressRegion': p.location.split(',')[1]?.trim() || 'Lagos',
    'addressCountry': 'NG'
  },
  'offers': {
    '@type': 'Offer',
    'price': p.priceInt,
    'priceCurrency': 'NGN',
    'availability': 'https://schema.org/InStock',
    'url': `${siteConfig.url}/for-sale/nigeria?id=${p.id}`
  }
});
