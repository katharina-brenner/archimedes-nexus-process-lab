const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    const apiBase = process.env.AXION_API_BASE_URL || "http://127.0.0.1:8899";
    return [
      {
        source: "/api/core/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
