export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/company", key: "company" },
  { href: "/products", key: "products" },
  { href: "/clients", key: "clients" },
  { href: "/contact", key: "contact" },
] as const;

/** Plain links in the header pill, shown after the Products dropdown. */
export const HEADER_LINKS = [
  { href: "/company", key: "company" },
  { href: "/clients", key: "clients" },
] as const;

/** Anchor ids on the products page, in messages `products.items` order. */
export const PRODUCT_SLUGS = [
  "polo-shirts",
  "t-shirts",
  "jackets",
  "sweatshirts",
  "sportswear",
  "swimwear",
  "training-suits",
  "vests",
  "ladies",
  "mens-underwear",
  "pyjamas",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/** Pages that open on the dark PageHero, where the unscrolled header needs light text. */
export const DARK_HERO_PATHS = ["/company", "/clients", "/contact"] as const;
