/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['framer-motion', 'motion', 'lucide-react'],

  // SEO: Permanent unidirectional redirects from legacy URLs to the new standard paths
  async redirects() {
    return [
      // 1. Listings Redirects (Legacy -> New Hierarchical)
      { source: '/luxury-real-estate-nigeria/:path*', destination: '/for-sale/:path*', permanent: true },
      { source: '/luxury-rentals-nigeria/:path*', destination: '/for-rent/:path*', permanent: true },
      { source: '/propertysales/:path*', destination: '/for-sale/:path*', permanent: true },
      
      // 2. Services Redirects (Legacy/Aliases -> Canonical File Path)
      { source: '/diaspora-advisory', destination: '/advisory', permanent: true },
      { source: '/financing-options', destination: '/financing', permanent: true },
      { source: '/property-request', destination: '/request-property', permanent: true },
      { source: '/requestproperty', destination: '/request-property', permanent: true },
      { source: '/book-consultation', destination: '/speak-to-advisor', permanent: true },
    ];
  },

  // SEO: Internal rewrites (if any are needed). 
  // We've moved to a catch-all in [category]/[...slugs].tsx, so legacy propertysales rewrites are no longer needed.
  async rewrites() {
    return [];
  },
};

export default nextConfig;
