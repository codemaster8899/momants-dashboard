const BASE_API_URL = process.env.BASE_API_URL;

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dashboard.momants.ai" },
      {
        protocol: "https",
        hostname: "momants-dashboard.ams3.cdn.digitaloceanspaces.com",
      },
      { protocol: "https", hostname: "www.sunrisefestival.be" }, // TODO remove this when i gets dynamic
    ],
  },
  async rewrites() {
    if (!BASE_API_URL) return [];

    return [
      {
        source: "/backend/:path*",
        destination: `${BASE_API_URL}/:path*`,
      },
    ];
  },
};
