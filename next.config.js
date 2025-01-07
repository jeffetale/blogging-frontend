/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // Optionally, you can also use remotePatterns for more specific control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     pathname: '/dbdrbl0jt/image/upload/**',
    //   },
    // ],
  },
}

module.exports = nextConfig