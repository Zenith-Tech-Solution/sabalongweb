import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* GitHub serves each account's avatar from its own CDN host, reached by a
       permanent redirect from `github.com/<user>.png`. Only the host that
       actually serves the bytes needs to be allowed here. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
};

export default nextConfig;
