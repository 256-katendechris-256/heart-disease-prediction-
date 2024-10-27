/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Changed from 'standalone' to 'export'
    images: {
      unoptimized: true
    },
    distDir: '.next'  // Explicitly set the build directory
  }
  
  module.exports = nextConfig