/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // static HTML export
  images: { unoptimized: true }, // for next/image
}
 
module.exports = nextConfig