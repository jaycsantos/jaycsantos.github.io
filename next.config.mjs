/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
