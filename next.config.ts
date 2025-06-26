/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development' // desativa o service worker no dev
});

const nextConfig = {
  // Suas configs aqui
};

module.exports = withPWA(nextConfig);
