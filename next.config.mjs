/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
  appDir: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/app',
      },
    ];
  },
};

export default nextConfig; // Use ES Module export
