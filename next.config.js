/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// experimental: {
	//   serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
	// },
	images: {
		unoptimized: true,
		remotePatterns: [],
	},
	pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
