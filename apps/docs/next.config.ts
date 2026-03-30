import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/
});

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@zds/react", "@zds/tokens"]
};

export default withMDX(nextConfig);
