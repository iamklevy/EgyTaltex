// Company page figures. TODO(owners): EVERY value here is a placeholder invented for the layout;
// replace each one with the real figure. Labels live in messages `company.capacity`.

export const CAPACITY: { key: string; value: string }[] = [
  { key: "area", value: "12,000 m²" },
  { key: "knitting", value: "38" },
  { key: "lines", value: "6" },
  { key: "staff", value: "450+" },
  { key: "daily", value: "3,000" }, // same as the home page's "Pieces a day"
  { key: "moq", value: "500" },
  { key: "leadTime", value: "60–75" },
  { key: "markets", value: "4" }, // same as the home page's "Export markets"
];

// Steps shown in "Inside the factory", in messages `company.floor` order.
// TODO(owners): one real photo per step; until then each tile shows a "photo coming soon" placeholder.
export const FLOOR_PHOTOS: (string | null)[] = [null, null, null, null, null, null];

// Company hero: looking up into a circular knitting machine and its ring of yarn feeders.
// Portrait (3:4); the page frames the feeder ring.
export const companyHeroPhoto = "/company-hero.jpg";
