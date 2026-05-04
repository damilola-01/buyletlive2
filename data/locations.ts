export type LocationData = {
  h1Prefix: string;
  introText: string;
  yieldRating?: string;
  securityRating?: string;
  marketGuide: string[]; // 3-paragraph expert guide
  landmarks: { name: string; img: string }[];
  faqs: { question: string; answer: string }[];
  notableInfo: string;
  schools: string[];
  infrastructure: string[];
  seoDescription: string;
};

export const BED_OPTIONS = ['1', '2', '3', '4', '5'];
export const BATH_OPTIONS = ['1', '2', '3', '4', '5'];

export const LOCATION_DATA: Record<string, LocationData> = {
  lagos: {
    introText: "Lagos is the economic engine of West Africa, featuring some of the most resilient real estate valuations on the continent. From the traditional wealth of Ikoyi to the industrial potential of the Lekki Free Trade Zone, the city offers unparalleled liquidity and yield for institutional investors.",
    yieldRating: "5.5% - 8.2% Net Rental Yield",
    securityRating: "Tier 1 Private & Public Oversight",
    marketGuide: [
      "The Lagos real estate market is characterized by extreme demand-supply imbalances, particularly in the premium residential sector. As the commercial nerve center of Nigeria, the city continues to attract significant foreign direct investment, which in turn drives the luxury and serviced property classes in prime nodes.",
      "Investors prioritizing capital preservation often focus on the 'Golden Triangle'—Ikoyi, Victoria Island, and Lekki Phase 1. These areas have demonstrated consistent double-digit appreciation in dollar terms over the last decade, supported by high liquidity and a robust rental market for expatriates and corporate executives.",
      "Emerging infrastructure projects, such as the Lagos Blue Line Rail and various coastal road expansions, are shifting the growth trajectory toward the Lekki-Epe corridor. For long-term yield plays, serviced apartments and modern commercial plazas in these developing areas represent the highest potential for value-add returns."
    ],
    landmarks: [
      { name: "Eko Atlantic City", type: "Integrated City", icon: "🏙️" },
      { name: "National Theatre", type: "Cultural Hub", icon: "🎭" },
      { name: "Tinubu Square", type: "Historical Center", icon: "🏛️" },
      { name: "Tarkwa Bay", type: "Coastal Enclave", icon: "🏖️" }
    ],
    schools: [
      "British International School",
      "Grange School",
      "Lekki British School",
      "American International School"
    ],
    infrastructure: [
      "Lagos Blue Line Rail",
      "Third Mainland Bridge Network",
      "Lekki Deep Sea Port Access",
      "Eko Electricity Grid"
    ],
    faqs: [
      { question: "Which Lagos neighborhoods offer the highest rental yield?", answer: "Yields are currently highest in Lekki Phase 1 and specialized commercial nodes in Victoria Island." },
      { question: "Is property verification centralized in Lagos?", answer: "Yes, the Land Registry at Alausa, Ikeja, is the primary authority for all title searches and verifications." }
    ],
    seoDescription: "Explore verified premium properties in Lagos. Secure your next high-yield property with institutional-grade advisory."
  },
  lekki: {
    h1Prefix: "in Lekki, Lagos",
    introText: "Lekki is the epicenter of modern living in West Africa, offering a blend of waterfront serenity and cosmopolitan energy.",
    yieldRating: "6.0% - 9.0% Net Rental Yield",
    securityRating: "Private Gated Community Oversight",
    marketGuide: [
      "Lekki Phase 1 remains the primary destination for young professionals and international returnees, creating a vibrant rental market for serviced 2 and 3-bedroom apartments. The area's proximity to the Victoria Island financial hub makes it an ideal residential satellite with high logistical value.",
      "The market here is increasingly defined by smart-home integration and lifestyle amenities. Serviced properties—including those with 24/7 power and security—command a significant rental premium and maintain near-zero vacancy rates compared to traditional standalone properties.",
      "Strategic investment in Lekki is currently shifting toward the mid-point of the peninsula, where larger gated estates are coming online. These projects offer institutional-grade infrastructure and specialized security corridors, making them highly attractive for long-term family residency and capital appreciation."
    ],
    landmarks: [
      { name: "Lekki-Ikoyi Link Bridge", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80" },
      { name: "Admiralty Way Hub", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80" },
      { name: "Lekki Conservation Centre", img: "https://images.unsplash.com/photo-1542314831-c6a4d14eff4c?w=1000&q=80" }
    ],
    schools: ["Lekki British School", "Meadow Hall", "Children&apos;s International School (CIS)"],
    infrastructure: ["Robust Private Power Grids", "Automated Admiralty Toll Plaza", "Central Drainage Systems"],
    notableInfo: "Lekki Phase 1 remains one of the highest liquidity zones for real estate in Africa, favored by young professionals and tech executives.",
    faqs: [
      { question: "Is Lekki Phase 1 stable?", answer: "The premium zones and specialized estates have robust, modern drainage systems mitigating historical issues." }
    ],
    seoDescription: "Explore verified premium properties in Lekki. Secure your next high-yield property with institutional-grade advisory."
  },
  ikoyi: {
    h1Prefix: "in Ikoyi, Lagos",
    introText: "Historically Nigeria's most affluent neighborhood, Ikoyi offers supreme exclusivity, heritage, and unparalleled security.",
    yieldRating: "4.5% - 6.5% Net Rental Yield (Capital Preservation Focus)",
    securityRating: "Tier 0 (Highest) Security & Diplomatic Oversight",
    marketGuide: [
      "Ikoyi's real estate market is the gold standard for capital preservation in Nigeria. Characterized by high-end high-rises and expansive gated mansions, it remains the preferred enclave for the nation's political and business elite, as well as diplomatic missions.",
      "The shift from traditional land-to-villa developments to ultra-luxury penthouses and maisonettes has redefined the skyline. Properties on Bourdillon and Alexander Road represent the pinnacle of Nigerian real estate, offering vertical security and unparalleled views of the Eko Atlantic development.",
      "For the institutional investor, Ikoyi represents a 'Safety First' play. While rental yields may be lower than emerging nodes like Lekki, the appreciation in property value and the resilience of the market during economic downturns make it an essential component of any premium real estate portfolio."
    ],
    landmarks: [
      { name: "Bourdillon Road", img: "https://images.unsplash.com/photo-1628191136453-61a7c5c06fe3?w=1000&q=80" },
      { name: "Falomo Square", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80" }
    ],
    schools: ["St. Saviour&apos;s School", "Greenwood House School", "Lagos Preparatory School"],
    infrastructure: ["Embassies Section Patrols", "Smart-Grid CCTV Surveillance", "Waterfront Jetty Infrastructure"],
    notableInfo: "Ikoyi is Nigeria&apos;s primary hub for foreign embassies and ultra-high-net-worth individuals, offering the nation&apos;s highest entry price.",
    faqs: [
      { question: "Why Ikoyi?", answer: "Unmatched security and proximity to the financial hubs of Victoria Island while maintaining quiet exclusivity." }
    ],
    seoDescription: "Discover exclusive properties in Ikoyi, Lagos. Browse verified listings in Nigeria's most prestigious neighborhood."
  },
  abuja: {
    h1Prefix: "in Abuja",
    introText: "The nation's capital, defined by its master-planned infrastructure, wide boulevards, and institutional stability.",
    landmarks: [
      { name: "Central Business District", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80" },
      { name: "National Assembly Grounds", img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1000&q=80" }
    ],
    schools: ["American International School", "BSN Abuja", "Loyola Jesuit College"],
    infrastructure: ["Master-Planned Road Networks", "Stable Public Power Grid", "Federal Security Oversight"],
    notableInfo: "Abuja real estate is characterized by wide plots and stable appreciation, often serving as a safe-haven for capital preservation.",
    faqs: [
      { question: "Best areas?", answer: "Maitama, Asokoro, and Wuse 2 remain the gold standard for premium residential acquisitions." }
    ],
    seoDescription: "Invest in Abuja's premium real estate. View verified luxury villas and mansions in Maitama and Asokoro."
  }
};

export function getLocationData(slug: string): LocationData {
  const normalized = (slug || 'nigeria').toLowerCase().replace(/[^a-z]+/g, '');
  
  // 1. Direct Lookup
  if (LOCATION_DATA[normalized]) return LOCATION_DATA[normalized];
  
  // 2. Fuzzy/Hierarchy Lookup
  if (normalized.includes('lekki') || normalized.includes('ajah')) return LOCATION_DATA.lekki;
  if (normalized.includes('ikoyi')) return LOCATION_DATA.ikoyi;
  if (normalized.includes('abuja') || normalized.includes('maitama') || normalized.includes('asokoro')) return LOCATION_DATA.abuja;
  
  return {
    h1Prefix: `in ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    introText: "Nigeria's premium real estate landscape offers robust opportunities across commercial, residential, and mixed-use property classes. Strategic nodes are characterized by rapid urbanization, high-yield prospects, and increasing institutional oversight.",
    yieldRating: "5.0% - 8.5% Net Average",
    securityRating: "Gated Community Standard",
    marketGuide: [
      "The real estate market in this region is defined by rapid infrastructure development and steady capital growth. As urban expansion continues, the area has become a primary target for both residential acquisitions and commercial land banking activities.",
      "Investors are increasingly prioritizing secure, gated developments that offer proprietary power and water solutions. These serviced properties consistently command premium rental rates and maintain lower vacancy periods compared to unserviced standalone properties.",
      "Properties listed undergo a rigorous 14-point compliance and structural audit. With expanding road networks and increasing private sector interest, the region represents a strategic bridge for investors seeking high-yield opportunities outside the traditional central business districts."
    ],
    landmarks: [
      { name: "Central Business Hubs", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80" },
      { name: "Premium Retail Centers", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&q=80" }
    ],
    schools: [
      "International Standard Curriculum Schools",
      "Private Preparatory Academies",
      "Montessori Early Education Centers"
    ],
    notableInfo: "This region is rapidly expanding with new luxury developments, driven by significant infrastructure investments and a growing high-net-worth demographic.",
    infrastructure: [
      "Dedicated Independent Power Plants (IPP)",
      "Centralized Water Treatment Facilities",
      "Integrated Security Command Centers",
      "Fiber-Optic Broadband Networks"
    ],
    faqs: [
      {
        question: `Are properties in ${slug.replace(/-/g, ' ')} verified?`,
        answer: "Absolutely. Every property on our platform undergoes a rigorous 14-point compliance and structural audit before being listed, ensuring clean titles and safe transactions."
      },
      {
        question: "What makes this area a good investment?",
        answer: "The combination of rapid infrastructure deployment and a growing premium tenant base results in strong capital appreciation and consistent rental yields."
      }
    ],
    seoDescription: `Browse luxury properties and trusted real estate in ${slug.replace(/-/g, ' ')}. Secure your perfect home today with BuyLetLive.`
  };
}
