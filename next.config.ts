// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ne bloque pas le build si ESLint trouve des erreurs
    ignoreDuringBuilds: true,
  },
  typescript: {
    // (optionnel) ne bloque pas le build si TS voit des erreurs
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
