// Unsplash photos — used only where no real Egytaltex photography exists yet
// (raw cotton yarn, fabric rolls, loungewear were not photographed on the old site).
const UNSPLASH_IDS = {
  hero: "1476683874822-744764a2438f", // rows of raw cotton yarn cones, soft warm backlight
  process: "1675176785803-bffbbb0cd2f4", // industrial yarn spinning machine, rows of bobbins
  yarn: "1557817017-2ce200058acd", // thread spools / fabric swatches on wood
  knit: "1434389677669-e08b4cac3105", // cream knit poncho on hanger
  lounge: "1558769132-cb1aea458c5e", // warm knitwear on a rack
} as const;

export const unsplash = (key: keyof typeof UNSPLASH_IDS, w = 1200) =>
  `https://images.unsplash.com/photo-${UNSPLASH_IDS[key]}?auto=format&fit=crop&q=80&w=${w}`;

// Real Egytaltex product photography, sourced from egytaltex.com.
// Order matches messages `products.items`.
export const productMedia = [
  { src: unsplash("yarn"), pos: "object-center" }, // 0 Cotton Yarn
  { src: unsplash("knit"), pos: "object-center" }, // 1 Knitted Fabrics
  { src: "/products/tee-burgundy.png", pos: "object-top" }, // 2 T-Shirts & Tops
  { src: "/products/polo-blue-detail.png", pos: "object-center" }, // 3 Polo Shirts
  { src: unsplash("lounge"), pos: "object-center" }, // 4 Loungewear
  { src: "/products/group-tees.jpg", pos: "object-center" }, // 5 Private Label
];

// Genuine factory/product shot used in the "built to order" feature panel.
export const featureImage = "/products/jacket-red.png";

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
