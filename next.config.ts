import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  webpack(config) {
    //@ALIAS

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src/"),
      lodash: path.resolve(__dirname, "node_modules", "lodash-es"),
    };

    //SVG LOADING
    config.module.rules.push({
      test: /\.svg/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
