/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: '/demoapp',
  async redirects() {
    return [
      { source: '/', destination: '/demoapp/open-finance', basePath: false, permanent: false },
    ];
  },
};

module.exports = nextConfig;
