/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs', 'jsonwebtoken', 'pdfkit', 'nodemailer'],
  },
};

export default nextConfig;
