// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Performance: Minify and compress output */
  // swcMinify: true,
  compress: true,
  
  /* 2. Security: Hide the "X-Powered-By" header to obscure the tech stack */
  poweredByHeader: false,

  /* 3. Images: Lockdown your asset domains to prevent hotlinking/injection */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn-or-s3-bucket.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  /* 4. Infrastructure: Add Security Headers */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Disable unused browser APIs
          },
        ],
      },
    ];
  },

  /* 5. DX: Clean up terminal output and handle large imports */
  experimental: {
    optimizePackageImports: ['lucide-react', 'shadcn-ui'],
  },
};

export default nextConfig;