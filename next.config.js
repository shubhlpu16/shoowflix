const withPWA = require('next-pwa')({
  dest: 'public',
  disable: true,
  sw: 'sw.js'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = nextConfig
