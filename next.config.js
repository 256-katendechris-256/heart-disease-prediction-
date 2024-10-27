/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    
    env: {
      NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'production' 
        ? 'https://katende-heart-prediction.web.app'  // Replace with your Firebase URL
        : 'http://localhost:3000'
    }
  }
  
  module.exports = nextConfig