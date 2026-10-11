import type { ProductSlug } from "@/components/site/nav-links";

// Unsplash photos — used only where no real Egytaltex photography exists yet.
const UNSPLASH_IDS = {
  hero: "1476683874822-744764a2438f", // rows of raw cotton yarn cones, soft warm backlight
} as const;

export const unsplash = (key: keyof typeof UNSPLASH_IDS, w = 1200) =>
  `https://images.unsplash.com/photo-${UNSPLASH_IDS[key]}?auto=format&fit=crop&q=80&w=${w}`;

// Real Egytaltex product photography, sourced from egytaltex.com. Only these
// categories were photographed; the rest show as typographic swatch cards.
export const categoryPhotos: Partial<Record<ProductSlug, string>> = {
  "polo-shirts": "/products/polo-blue-detail.png",
  "t-shirts": "/products/tee-burgundy.png",
  jackets: "/products/jacket-red.png",
};

// The polo feature spread on the products page.
export const poloGallery = [
  "/products/polo-navy-1.png",
  "/products/polo-green.png",
  "/products/polo-longsleeve-1.png",
  "/products/polo-navy-3.png",
];

// Additional real production photography for the gallery strip.
export const productionGallery = [
  "/products/polo-blue-detail.png",
  "/products/jacket-red.png",
  "/products/jacket-blue.png",
  "/products/polo-longsleeve-1.png",
  "/products/polo-longsleeve-2.png",
  "/products/polo-navy-1.png",
  "/products/polo-green.png",
  "/products/shirt-navy.png",
  "/products/polo-navy-2.png",
  "/products/polo-navy-3.png",
  "/products/tee-burgundy.png",
  "/products/group-tees.jpg",
];

export const clientLogos = [
  { name: "OVS", logo: "/clients/ovs.svg" },
  { name: "Coin", logo: "/clients/coin.png" },
  { name: "Delta Galil", logo: "/clients/delta-galil.svg" },
  { name: "Bob Company", logo: "/clients/bob-company.png" },
  { name: "La Societe", logo: "/clients/la-societe.png" },
  { name: "Del Mare 1911", logo: "/clients/del-mare-1911.png" },
  { name: "Roy Rogers", logo: "/clients/roy-rogers.png" },
  { name: "Klevy", logo: "/clients/klevy.jpg" },
];
