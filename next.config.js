/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['xaydungviettin.vn', 'res.cloudinary.com'],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.API_URL,
  },
  redirects: async () => {
    return [
      {
        source: '/search',
        destination: '/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
