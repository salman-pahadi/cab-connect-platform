/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },
  images: {
    domains: ['localhost'],
  },
  // Disable server-side rendering for specific routes if needed
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
