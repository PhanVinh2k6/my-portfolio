import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV !== 'production';
const scriptSources = isDevelopment ? "'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com" : "'self' 'unsafe-inline' https://www.googletagmanager.com";
const securityHeaders = [
  { key: 'Content-Security-Policy', value: `default-src 'self'; script-src ${scriptSources}; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; img-src 'self' data: blob: https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
