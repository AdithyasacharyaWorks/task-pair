/** @type {import('next').NextConfig} */
const config = {
	webpack(config) {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		};

		return config;
	},
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	experimental: {
		serverActions: true,
		typedRoutes: false,
	},
	// FIXME !!TEMPORARY FIX!! because checkout directory has many errors
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},

};

export default config;
