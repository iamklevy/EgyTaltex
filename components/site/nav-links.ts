export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/products", key: "products" },
  { href: "/company", key: "company" },
  { href: "/clients", key: "clients" },
  { href: "/contact", key: "contact" },
] as const;

/** Links in the header bar; Home is the logo. */
export const HEADER_LINKS = NAV_LINKS.filter((l) => l.href !== "/");

/** Anchor ids on the products page, in messages `products.items` order. */
export const PRODUCT_SLUGS = [
  "polo-shirts",
  "t-shirts",
  "jackets",
  "sweatshirts",
  "uniforms",
  "sportswear",
  "swimwear",
  "training-suits",
  "vests",
  "ladies",
  "mens-underwear",
  "pyjamas",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];
