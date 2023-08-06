/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibbcazsenzltzokoeiwr.supabase.co',
        port: '',
        pathname: '/storage/**/*',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
}

module.exports = nextConfig
