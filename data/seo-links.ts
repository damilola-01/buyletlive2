export interface SEOLink {
  label: string;
  href: string;
}

export interface SEOLinkGroup {
  title: string;
  links: SEOLink[];
}

export const getSEOLinksByCategory = (category?: string): SEOLinkGroup[] => {
  const isSale = category === 'for-sale';
  const isRent = category === 'for-rent';
  const isShortlet = category === 'shortlet';
  const isCommercial = category === 'commercial';

  const states = [
    { label: 'Lagos', href: `/${category || 'for-sale'}/lagos` },
    { label: 'Abuja (FCT)', href: `/${category || 'for-sale'}/abuja` },
    { label: 'Oyo', href: `/${category || 'for-sale'}/oyo` },
    { label: 'Ogun', href: `/${category || 'for-sale'}/ogun' ` },
    { label: 'Rivers', href: `/${category || 'for-sale'}/rivers` },
    { label: 'Edo', href: `/${category || 'for-sale'}/edo` },
    { label: 'Enugu', href: `/${category || 'for-sale'}/enugu` },
    { label: 'Delta', href: `/${category || 'for-sale'}/delta` },
    { label: 'Akwa Ibom', href: `/${category || 'for-sale'}/akwa-ibom` },
    { label: 'Ondo', href: `/${category || 'for-sale'}/ondo` },
    { label: 'Kaduna', href: `/${category || 'for-sale'}/kaduna` },
  ];

  const types = [];
  if (isSale) {
    types.push(
      { label: '3 Bedroom Flats for Sale', href: '/for-sale/3-bedroom-flats' },
      { label: '4 Bedroom Duplexes for Sale', href: '/for-sale/4-bedroom-duplexes' },
      { label: '5 Bedroom Mansions for Sale', href: '/for-sale/5-bedroom-mansions' },
      { label: 'Land for Development', href: '/for-sale/land' },
      { label: 'Off-Plan Opportunities', href: '/for-sale/newly-built' },
      { label: 'Verified Luxury Estates', href: '/for-sale/luxury' }
    );
  } else if (isRent) {
    types.push(
      { label: 'Luxury Apartments for Rent', href: '/for-rent/luxury' },
      { label: 'Serviced 3 Bedroom Flats', href: '/for-rent/serviced' },
      { label: 'Self Contain Units', href: '/for-rent/self-contain' },
      { label: 'Short-term Rentals', href: '/shortlet/' },
      { label: 'Shared Apartments', href: '/for-rent/shared' }
    );
  } else if (isShortlet) {
    types.push(
      { label: '1 Bedroom Studio Shortlets', href: '/shortlet/1-bedroom' },
      { label: 'Luxury Shortlet Penthouses', href: '/shortlet/penthouse' },
      { label: 'Shortlet Mansions with Pool', href: '/shortlet/mansion' },
      { label: 'Serviced Holiday Homes', href: '/shortlet/serviced' },
      { label: 'Business Travel Suites', href: '/shortlet/business' }
    );
  } else {
    types.push(
      { label: 'Commercial Office Spaces', href: '/commercial/office' },
      { label: 'Warehouse Facilities', href: '/commercial/warehouse' },
      { label: 'Retail & Shops', href: '/commercial/retail' },
      { label: 'Industrial Land', href: '/for-sale/land' },
      { label: 'Mixed Use Developments', href: '/commercial/mixed-use' }
    );
  }

  const locations = [];
  if (isShortlet) {
    locations.push(
      { label: 'Eko Atlantic City', href: '/shortlet/eko-atlantic' },
      { label: 'Victoria Island', href: '/shortlet/victoria-island' },
      { label: 'Ikoyi Luxury Suites', href: '/shortlet/ikoyi' },
      { label: 'Oniru Shortlets', href: '/shortlet/oniru' },
      { label: 'Lekki Phase 1', href: '/shortlet/lekki-phase-1' }
    );
  } else {
    locations.push(
      { label: 'Lekki Phase 1', href: `/${category || 'for-sale'}/lekki` },
      { label: 'Ikoyi Estates', href: `/${category || 'for-sale'}/ikoyi` },
      { label: 'Banana Island', href: `/${category || 'for-sale'}/banana-island` },
      { label: 'Maitama (Abuja)', href: `/${category || 'for-sale'}/maitama` },
      { label: 'Asokoro (Abuja)', href: `/${category || 'for-sale'}/asokoro` },
      { label: 'Ikeja GRA', href: `/${category || 'for-sale'}/ikeja-gra' ` }
    );
  }

  return [
    { title: `Explore States ${isRent ? 'for Rent' : isShortlet ? 'for Shortlet' : 'for Sale'}`, links: states },
    { title: `Popular ${isShortlet ? 'Shortlet' : isCommercial ? 'Commercial' : isRent ? 'Rental' : 'Property'} Types`, links: types },
    { title: `Trending ${isShortlet ? 'Hospitality' : 'Investment'} Hubs`, links: locations }
  ];
};
