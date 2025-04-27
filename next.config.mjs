import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'itzimna.s3.amazonaws.com',
        port: '',
        pathname: '/media/**',
        search: '',
      }
    ],
  },
}

export default withNextIntl(nextConfig)
