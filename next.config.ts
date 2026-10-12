import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Allow LAN devices (e.g. phone testing) to reach dev-only resources like HMR.
  allowedDevOrigins: ["192.168.1.161", "172.20.10.5", "192.168.100.59,", "192.168.3.215", "192.168.100.59", "192.168.1.57", "192.168.1.164"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default withNextIntl(nextConfig);
