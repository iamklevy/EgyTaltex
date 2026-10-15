import type { ProductSlug } from "@/components/site/nav-links";

// Home hero, art-directed by screen orientation: landscape screens get the sewing floor down its
// central aisle (4:3, IMG_8804), portrait screens keep the knitting machine and its creel (3:4).
export const heroPhoto = { landscape: { src: "/images/factory/floor-wide-01-2560.webp", width: 2560, height: 1920 }, portrait: { src: "/hero-knitting.jpg", width: 2400, height: 3200 } };
// Contact page side card, under "Come and see how it's made": operators on the sewing floor (4:3, IMG_8805).
export const contactPhoto = "/images/factory/floor-wide-02-1920.webp";

// Home "How it's made": a strip of factory photos, each captioned by its step in messages `home.journey`.
// Sources are in public/images/factory/manifest.json.
export const processPhotos: { src: string; step: number }[] = [
  { src: "/images/factory/knitting-03-1920.webp", step: 1 }, // circular knitting, IMG_7375
  { src: "/images/factory/sewing-03-1920.webp", step: 4 }, // cut & sew, IMG_7470
  { src: "/images/factory/embroidery-03-1920.webp", step: 5 }, // embroidery, IMG_7539
];
// Products "Options": the embroidery row (landscape 4:3), IMG_7263.
export const optionsPhoto = "/images/factory/embroidery-04-1920.webp";

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

// Client logos: transparent PNGs trimmed to the mark, with their pixel size so the marquee can give
// every logo the same visual area (a wide wordmark renders shorter than a compact badge); `scale` nudges
// one that still reads small.
export const clientLogos: { name: string; logo: string; w: number; h: number; scale?: number }[] = [
  { name: "OVS", logo: "/clients/ovs.png", w: 602, h: 240 },
  { name: "Coin", logo: "/clients/coin.png", w: 157, h: 88 },
  { name: "Delta Galil", logo: "/clients/delta-galil.png", w: 780, h: 240 },
  { name: "Bob Company", logo: "/clients/bob-company.png", w: 422, h: 240 },
  { name: "La Societe", logo: "/clients/la-societe.png", w: 1372, h: 240, scale: 1.25 }, // thin, very wide wordmark
  { name: "Del Mare 1911", logo: "/clients/del-mare-1911.png", w: 229, h: 62 },
  { name: "Roy Rogers", logo: "/clients/roy-rogers.png", w: 281, h: 240 },
  { name: "Klevy", logo: "/clients/klevy.png", w: 492, h: 240 },
];
