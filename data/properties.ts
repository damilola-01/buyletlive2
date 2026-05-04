export type DocStatus = 'available' | 'pending' | 'unavailable';

export interface PropertyDocs {
  registeredSurvey:    DocStatus;
  deedOfAssignment:    DocStatus;
  governorsConsent:    DocStatus;
  buildingPlanApproval: DocStatus;
  cOfO:                DocStatus;
}

export interface Property {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: string;
  priceInt: number;
  category: 'for-sale' | 'for-rent' | 'commercial' | 'shortlet';
  type: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  images: string[];
  tags: string[];
  dateAdded: string;
  isMortgageEnabled?: boolean;
  fullDescription?: string;
  amenities?: string[];
  specifications?: Record<string, string>;
  neighborhood?: { name: string; distance: string }[];
  /** Only present on category === 'for-sale' */
  docs?: PropertyDocs;
}

const COMMON_IMAGES_1 = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
];

const COMMON_IMAGES_2 = [
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
];

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Bourdillon Penthouse",
    slug: "the-bourdillon-penthouse",
    location: "Ikoyi, Lagos",
    price: "₦ 1,200,000,000",
    priceInt: 1200000000,
    category: "for-sale",
    type: "Penthouse Property",
    beds: 4, baths: 4, sqft: "4,500",
    image: COMMON_IMAGES_1[0],
    images: COMMON_IMAGES_1,
    tags: ["Verified", "Off-Market"],
    dateAdded: "2026-04-05",
    isMortgageEnabled: true,
    fullDescription: "Experience the pinnacle of vertical living at The Bourdillon. This expansive penthouse offers 270-degree views of the Lagos lagoon and city skyline. Featuring Italian marble flooring, a private cinema, and smart-home integrated climate control, this is the definitive choice for the global elite.",
    amenities: ["Private Pool", "24/7 Concierge", "Biometric Access", "Smart Home Tech", "Chef's Kitchen", "Private Cinema", "Infinity Gym"],
    specifications: { "Floor Type": "Crema Marfil Marble", "Ceiling Height": "3.5m", "Kitchen": "Miele Appliances", "Title": "Certificate of Occupancy" },
    neighborhood: [{ name: "Ikoyi Club 1938", distance: "5 mins" }, { name: "St. Saviour's School", distance: "3 mins" }, { name: "Falomo Square", distance: "7 mins" }],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'available', cOfO: 'available' },
  },
  {
    id: 2,
    title: "Waterfront Detached Villa",
    slug: "waterfront-detached-villa",
    location: "Lekki Phase 1, Lagos",
    price: "₦ 850,000,000",
    priceInt: 850000000,
    category: "for-sale",
    type: "Detached Property",
    beds: 5, baths: 6, sqft: "6,200",
    image: COMMON_IMAGES_2[0],
    images: COMMON_IMAGES_2,
    tags: ["Verified"],
    dateAdded: "2026-04-04",
    isMortgageEnabled: false,
    fullDescription: "Nestled along the serene waterfront of Lekki Phase 1, this detached villa blends contemporary architectural lines with premium living. The property features double-height ceilings, a sprawling poolside deck, and a private jetty for nautical escapes.",
    amenities: ["Waterfront View", "Swimming Pool", "Private Jetty", "Solar Power Array", "Electric Car Charging", "Fitted Kitchen", "Study Room"],
    specifications: { "Structure": "Reinforced Concrete", "Windows": "Double Glazed Alum-Glass", "Power": "250KVA Standby Gen", "Security": "CCTV & Infrared Perimeter" },
    neighborhood: [{ name: "Lekki British School", distance: "10 mins" }, { name: "Imax Filmhouse", distance: "5 mins" }, { name: "Admiralty Way Hub", distance: "2 mins" }],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'pending', buildingPlanApproval: 'available', cOfO: 'pending' },
  },
  {
    id: 3,
    title: "GRA Luxury Duplex",
    slug: "gra-luxury-duplex",
    location: "Ikeja GRA, Lagos",
    price: "₦ 450,000,000",
    priceInt: 450000000,
    category: "for-sale",
    type: "Duplex Property",
    beds: 5, baths: 5, sqft: "3,800",
    image: COMMON_IMAGES_1[2],
    images: COMMON_IMAGES_1,
    tags: ["Verified", "High Yield"],
    dateAdded: "2026-04-03",
    isMortgageEnabled: true,
    fullDescription: "A stately duplex located in the heart of Ikeja GRA. This home offers the perfect blend of security, accessibility, and premium finishing. Designed for family living, it includes multiple lounges, a garden terrace, and premium light fittings.",
    amenities: ["Borehole & Treatment", "Electric Fence", "Ample Parking", "Fitted Wardrobes", "2 Bedroom Bq", "Security Gatehouse"],
    specifications: { "Roofing": "Longspan Aluminium", "Flooring": "Vitrified Tiles", "Plumbing": "Dolphin Fittings", "Title": "Gazette" },
    neighborhood: [{ name: "Ikeja Mall", distance: "12 mins" }, { name: "Lagos Airport", distance: "15 mins" }, { name: "Sheraton Lagos", distance: "8 mins" }],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'pending', cOfO: 'unavailable' },
  },
  {
    id: 4,
    title: "Premium Terraced Estate",
    slug: "premium-terraced-estate",
    location: "Ajah, Lagos",
    price: "₦ 180,000,000",
    priceInt: 180000000,
    category: "for-sale",
    type: "Terraced Property",
    beds: 4, baths: 4, sqft: "2,500",
    image: COMMON_IMAGES_2[1],
    images: COMMON_IMAGES_2,
    tags: ["Verified"],
    dateAdded: "2026-04-02",
    isMortgageEnabled: true,
    fullDescription: "Modern terraced housing in a secured gated community in Ajah. Perfect for first-time premium buyers or investors seeking consistent rental yields. These homes are designed with efficiency and style in mind.",
    amenities: ["Gated Community", "Uniformed Security", "Street Lights", "Central Drainage", "Kids Play Area", "Gym House"],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'unavailable', buildingPlanApproval: 'available', cOfO: 'unavailable' },
  },
  {
    id: 5,
    title: "Modern Family Home",
    slug: "modern-family-home",
    location: "Surulere, Lagos",
    price: "₦ 85,000,000",
    priceInt: 85000000,
    category: "for-sale",
    type: "Detached Property",
    beds: 4, baths: 5, sqft: "2,200",
    image: COMMON_IMAGES_1[1],
    images: COMMON_IMAGES_1,
    tags: ["Verified"],
    dateAdded: "2026-04-01",
    isMortgageEnabled: false,
    fullDescription: "A functional and elegantly finished family home in a quiet enclave of Surulere. This property maximizes space without compromising on aesthetic appeal. Featuring a modern car port and beautifully designed kitchen.",
    amenities: ["Car Port", "Modern P.O.P", "Jacuzzi", "Water Heater", "Inverter Pre-wired"],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'pending', governorsConsent: 'unavailable', buildingPlanApproval: 'available', cOfO: 'unavailable' },
  },
  {
    id: 6,
    title: "Bodija Executive Villa",
    slug: "bodija-executive-villa",
    location: "Bodija, Ibadan",
    price: "₦ 220,000,000",
    priceInt: 220000000,
    category: "for-sale",
    type: "Detached Property",
    beds: 6, baths: 6, sqft: "5,000",
    image: COMMON_IMAGES_2[2],
    images: COMMON_IMAGES_2,
    tags: ["Verified", "Exclusive"],
    dateAdded: "2026-03-31",
    isMortgageEnabled: true,
    fullDescription: "An expansive executive villa in the prestigious Bodija GRA. This home offers grand dimensions, high-spec finishing, and a massive compound capable of hosting large gatherings.",
    amenities: ["Large Compound", "Penthouse Terrace", "Security Doors", "Heat Extractor", "Microwave & Oven"],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'available', cOfO: 'available' },
  },
  {
    id: 7,
    title: "Maitama Diplomatic Mansion",
    slug: "maitama-diplomatic-mansion",
    location: "Maitama, Abuja",
    price: "₦ 2,500,000,000",
    priceInt: 2500000000,
    category: "for-sale",
    type: "Detached Property",
    beds: 7, baths: 8, sqft: "9,500",
    image: COMMON_IMAGES_1[0],
    images: COMMON_IMAGES_1,
    tags: ["Verified", "Off-Market"],
    dateAdded: "2026-03-30",
    isMortgageEnabled: false,
    fullDescription: "Undoubtedly one of Abuja’s most prestigious properties. This diplomatic-grade mansion in Maitama features reinforced security systems, a private swimming pool, and multiple ballrooms. Perfectly suited for diplomatic use or high-level institutional housing.",
    amenities: ["Private Pool", "Ballroom", "Reinforced Security", "Elevator", "Large Garden", "Guest Wing"],
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'available', cOfO: 'available' },
  },
  {
    id: 8,
    title: "Asokoro High-Yield Terrace",
    slug: "asokoro-high-yield-terrace",
    location: "Asokoro, Abuja",
    price: "₦ 450,000,000",
    priceInt: 450000000,
    category: "for-sale",
    type: "Terraced Property",
    beds: 4, baths: 5, sqft: "3,100",
    image: COMMON_IMAGES_2[0],
    images: COMMON_IMAGES_2,
    tags: ["Verified", "High Yield"],
    dateAdded: "2026-03-29",
    isMortgageEnabled: true,
    fullDescription: "Strategically located in Asokoro, this high-yield terrace offers institutional investors a stable and high-appreciating property. Modern design meets top-tier security in Abuja's most secure neighborhood.",
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'pending', cOfO: 'pending' },
  },
  {
    id: 9,
    title: "Wuse 2 Commercial Plaza",
    slug: "wuse-2-commercial-plaza",
    location: "Wuse 2, Abuja",
    price: "₦ 1,800,000,000",
    priceInt: 1800000000,
    category: "commercial",
    type: "Commercial Property",
    beds: 0, baths: 12, sqft: "15,000",
    image: COMMON_IMAGES_1[1],
    images: COMMON_IMAGES_1,
    tags: ["Verified", "Commercial"],
    dateAdded: "2026-03-28",
    isMortgageEnabled: false,
    fullDescription: "A prime commercial plaza in the vibrant business hub of Wuse 2. This property offers multiple luxury let-able spaces for retail or corporate offices, featuring a central lift, backup power, and ample parking.",
  },
  {
    id: 10,
    title: "Peter Odili Waterfront Estate",
    slug: "peter-odili-waterfront-estate",
    location: "Peter Odili Rd, Port Harcourt",
    price: "₦ 550,000,000",
    priceInt: 550000000,
    category: "for-sale",
    type: "Semi Detached",
    beds: 5, baths: 6, sqft: "4,800",
    image: COMMON_IMAGES_2[1],
    images: COMMON_IMAGES_2,
    tags: ["Verified"],
    dateAdded: "2026-03-27",
    isMortgageEnabled: true,
    fullDescription: "A rare waterfront opportunity on Peter Odili Road. This estate offers expansive living spaces and a direct view of the river. Highly secured and exclusively finished.",
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'available', cOfO: 'pending' },
  },
  {
    id: 11,
    title: "GRA Phase 2 Luxury Apartment",
    slug: "gra-phase-2-luxury-apartment",
    location: "GRA Phase 2, Port Harcourt",
    price: "₦ 120,000,000",
    priceInt: 120000000,
    category: "for-sale",
    type: "Flat",
    beds: 3, baths: 3, sqft: "1,800",
    image: COMMON_IMAGES_1[2],
    images: COMMON_IMAGES_1,
    tags: ["Verified", "High Yield"],
    dateAdded: "2026-03-26",
    isMortgageEnabled: true,
    fullDescription: "Modern apartment living in Port Harcourt's most prestigious zone. GRA Phase 2 offers unparalleled serenity and infrastructure. This unit is perfectly suited for rental income or professional housing.",
    docs: { registeredSurvey: 'available', deedOfAssignment: 'available', governorsConsent: 'available', buildingPlanApproval: 'available', cOfO: 'available' },
  },
  {
    id: 12,
    title: "Banana Island Waterfront Apartment",
    slug: "banana-island-waterfront-apartment",
    location: "Banana Island, Lagos",
    price: "₦ 40,000,000 / year",
    priceInt: 40000000,
    category: "for-rent",
    type: "Flat",
    beds: 3, baths: 3, sqft: "2,200",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: COMMON_IMAGES_2,
    tags: ["Verified", "Serviced"],
    dateAdded: "2026-04-05",
    fullDescription: "Live in Nigeria's most exclusive island. This waterfront apartment in Banana Island offers maximum security, world-class amenities, and a community of high-net-worth individuals.",
    amenities: ["Waterfront View", "24/7 Electricity", "Central Cooling", "Pool & Gym", "Squash Court", "Underground Parking"],
  },
  {
    id: 13,
    title: "Victoria Island Luxury Maisonette",
    slug: "victoria-island-luxury-maisonette",
    location: "Victoria Island, Lagos",
    price: "₦ 25,000,000 / year",
    priceInt: 25000000,
    category: "for-rent",
    type: "Duplex Property",
    beds: 4, baths: 4, sqft: "3,500",
    image: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: COMMON_IMAGES_1,
    tags: ["Verified", "High Yield"],
    dateAdded: "2026-04-04",
    fullDescription: "A sophisticated maisonette in the heart of the Victoria Island business district. Offering two floors of premium finishings and a private balcony overlooking the city.",
  },
  {
    id: 14,
    title: "Maitama Diplomatic Villa",
    slug: "maitama-diplomatic-villa",
    location: "Maitama, Abuja",
    price: "₦ 60,000,000 / year",
    priceInt: 60000000,
    category: "for-rent",
    type: "Detached Property",
    beds: 6, baths: 7, sqft: "7,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: COMMON_IMAGES_2,
    tags: ["Verified", "Exclusive"],
    dateAdded: "2026-03-31",
    fullDescription: "Premium rental villa in Maitama, designed for high-level executives or diplomatic staff. Features expansive rooms, multiple living areas, and a massive kitchen.",
  },
  {
    id: 15,
    title: "Eko Atlantic Signature Suite",
    slug: "eko-atlantic-signature-suite",
    location: "Eko Atlantic, Lagos",
    price: "₦ 150,000 / night",
    priceInt: 150000,
    category: "shortlet",
    type: "Flat",
    beds: 2, baths: 2, sqft: "1,200",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: COMMON_IMAGES_1,
    tags: ["Verified", "Exclusive"],
    dateAdded: "2026-04-05",
    fullDescription: "Experience futuristic living in Eko Atlantic. This 2-bedroom suite offers floor-to-ceiling windows with unobstructed ocean views, ultra-modern amenities, and a dedicated concierge.",
    amenities: ["Ocean View", "24/7 Power", "Smart TV", "High-speed WiFi", "Pool Access", "Gym"],
  },
  {
    id: 16,
    title: "Ikoyi Luxury Studio",
    slug: "ikoyi-luxury-studio",
    location: "Ikoyi, Lagos",
    price: "₦ 85,000 / night",
    priceInt: 85000,
    category: "shortlet",
    type: "Flat",
    beds: 1, baths: 1, sqft: "650",
    image: "https://images.unsplash.com/photo-1536376074432-bf629731210b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: COMMON_IMAGES_2,
    tags: ["Verified", "Serviced"],
    dateAdded: "2026-04-04",
    fullDescription: "A perfectly curated studio for business travelers and short stays in Ikoyi. Featuring minimalist design, a workspace, and access to a rooftop lounge.",
    amenities: ["Workspace", "Rooftop Lounge", "Security", "Backup Power", "Housekeeping"],
  },
  {
    id: 17,
    title: "Maitama Business Suite",
    slug: "maitama-business-suite",
    location: "Maitama, Abuja",
    price: "₦ 120,000 / night",
    priceInt: 120000,
    category: "shortlet",
    type: "Flat",
    beds: 1, baths: 1, sqft: "800",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: COMMON_IMAGES_1,
    tags: ["Verified"],
    dateAdded: "2026-04-03",
    fullDescription: "Institutional-grade shortlet suite in the heart of Maitama. Designed for diplomats and corporate travelers who demand absolute privacy and reliability.",
    amenities: ["Reinforced Security", "Private Entrance", "Fiber Internet", "Netflix", "Laundry Service"],
  }
];

// Duplicate properties simply to pad out pagination
const DUPLICATED_MOCKS: Property[] = INITIAL_PROPERTIES.map((p, i) => ({
    ...p,
    id: p.id + 100, // offset id
    title: `${p.title} (Phase 2)`,
    slug: `${p.slug}-phase-2`,
    dateAdded: "2026-02-01", 
}));

export const ALL_PROPERTIES: Property[] = [...INITIAL_PROPERTIES, ...DUPLICATED_MOCKS];

export function getPropertyBySlug(slug: string): Property | undefined {
  return ALL_PROPERTIES.find(p => p.slug === slug);
}

export function getPropertyUrl(property: Property): string {
  const locSlug = property.location.split(',')[0].toLowerCase().trim().replace(/\s+/g, '-');
  return `/${property.category}/${locSlug}/${property.slug}-BLL${property.id}`;
}

export const TAG_STYLES: Record<string, string> = {
  "Verified": "bg-blue-100 text-blue-800 border-blue-200",
  "Off-Market": "bg-purple-100 text-purple-800 border-purple-200",
  "High Yield": "bg-green-100 text-green-800 border-green-200",
  "Exclusive": "bg-amber-100 text-amber-800 border-amber-200",
  "Serviced": "bg-teal-100 text-teal-800 border-teal-200",
};

export const FEATURED_PROPERTIES = ALL_PROPERTIES.slice(0, 6);
export const UNDER_100M_PROPERTIES = ALL_PROPERTIES.filter(p => (p.priceInt ?? 0) < 100000000).slice(0, 4);
