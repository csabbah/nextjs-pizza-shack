/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // reactStrictMode: true, // We also don't need this this
  swcMinify: true,
};

module.exports = nextConfig;
