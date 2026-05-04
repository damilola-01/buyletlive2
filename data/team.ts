export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  whatsapp: string;
  bio?: string;
  department?: 'Management' | 'Sales' | 'Operations' | 'Advisory';
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ola',
    name: 'Jemini Adollo',
    role: 'CEO, BuyLetLive',
    image: '/assets/ceo/jemine.jpg', // Utilizing existing asset as placeholder for Ola
    whatsapp: '2349131037985',
    bio: 'A visionary leader in the Nigerian real estate sector, committed to transparency and institutional-grade property services.',
    department: 'Management'
  },
  {
    id: 'lekan',
    name: 'Lekan',
    role: 'Senior Strategic Advisor & CX Manager',
    image: '/assets/team/lekan.jpg',
    whatsapp: '2349131037985',
    bio: 'Dedicated to providing seamless property acquisition experiences and expert client support.',
    department: 'Advisory'
  },
  {
    id: 'ndiana',
    name: 'Ndiana A.',
    role: 'Customer Experience Manager',
    image: '/assets/team/ndiana.jpg',
    whatsapp: '2347074691144',
    bio: 'Dedicated to excellence in client relations and ensuring every BuyLetLive interaction is seamless and professional.',
    department: 'Management'
  },
  {
    id: 'adisa',
    name: 'Adisa F.',
    role: 'Sales Executive & Property Advisor',
    image: '/assets/team/adisa.jpg',
    whatsapp: '2349131037985',
    bio: 'Expert in property acquisition and strategic sales advisory.',
    department: 'Sales'
  },
  {
    id: 'erica',
    name: 'Erica O.',
    role: 'Sales Executive & Property Advisor',
    image: '/assets/team/erica.jpg',
    whatsapp: '2349131037985',
    bio: 'Passionate about connecting clients with their dream homes across Nigeria.',
    department: 'Sales'
  },
  {
    id: 'annette',
    name: 'Annette A.',
    role: 'Sales Executive & Property Advisor',
    image: '/assets/team/annette.jpg',
    whatsapp: '2349131037985',
    bio: 'Committed to delivering value and integrity in every real estate transaction.',
    department: 'Sales'
  }
];

/**
 * Only Lekan and Ndiana are assigned as advisors on property listings.
 * Jemini and Ola are reserved for the About / Advisory / Management pages.
 */
export const PROPERTY_ADVISORS = TEAM_MEMBERS.filter(m => m.id === 'lekan' || m.id === 'ndiana');
