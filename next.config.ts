import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.scdn.co" }]
  }
};

export default createMDX()(nextConfig);
