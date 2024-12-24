/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['swapi.dev'],
  },
}

module.exports = nextConfig