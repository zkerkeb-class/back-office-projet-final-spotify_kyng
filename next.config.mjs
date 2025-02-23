/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {protocol: 'https', 
        hostname: 'back-end-projet-final-spotify-kyng.onrender.com'},
    ],
  },
};

export default nextConfig;
