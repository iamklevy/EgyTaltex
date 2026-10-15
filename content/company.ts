// Company page figures, from the Egytaltex company profile. Labels live in messages `company.capacity`.

export const CAPACITY: { key: string; value: string }[] = [
  { key: "daily", value: "3,000+" }, // same as the home page's "Pieces a day"
  { key: "lines", value: "4" },
  { key: "machines", value: "130+" },
  { key: "staff", value: "100" },
  { key: "sampling", value: "7" },
  { key: "leadTime", value: "60" },
  { key: "moq", value: "500" },
  { key: "markets", value: "3" }, // same as the home page's "Export markets"
];

// The machine park by department. Labels live in messages `company.machineryDepts` / `company.machines`;
// `detail` is brands and sizes, which read the same in every language.
export type Machine = { key: string; detail?: string; count: number };
export const MACHINERY: { dept: string; machines: Machine[] }[] = [
  {
    dept: "knitting",
    machines: [
      { key: "circular", detail: "Orizio · Monarch", count: 2 },
      { key: "flatKnit", detail: "Stoll · Protti", count: 2 },
      { key: "yarnWrapping", count: 1 },
    ],
  },
  {
    dept: "embroidery",
    machines: [{ key: "embroidery", detail: "Barudan", count: 2 }],
  },
  {
    dept: "cutting",
    machines: [
      { key: "cuttingTable", detail: "8 m", count: 1 },
      { key: "cuttingKnife", detail: "8″", count: 3 },
      { key: "fusing", count: 2 },
    ],
  },
  {
    dept: "sewing",
    machines: [
      { key: "singleNeedle", detail: "Juki · Jack · Siruba · Sunstar · Russo · Brother", count: 40 },
      { key: "doubleNeedle", detail: "Brother · Juki", count: 4 },
      { key: "overlock", detail: "Juki · Jack · Siruba · Simba · Pegasus", count: 37 },
      { key: "hemming", detail: "Pegasus · Siruba · Yamato · Rimoldi", count: 26 },
      { key: "flatSeam", detail: "Pegasus · Yamato", count: 2 },
      { key: "chainStitch", detail: "Jack", count: 2 },
      { key: "buttonhole", detail: "Juki · Brother", count: 5 },
      { key: "barTack", detail: "Juki · Sunstar · Joyee", count: 3 },
      { key: "specialty", detail: "Siruba", count: 2 },
      { key: "heatPress", detail: "60 × 40 cm", count: 2 },
    ],
  },
  {
    dept: "finishing",
    machines: [
      { key: "washers", count: 3 },
      { key: "dryers", count: 3 },
      { key: "ironing", count: 9 },
      { key: "steamClean", count: 1 },
    ],
  },
];

// Names live in messages `company.certs`.
export const CERTIFICATIONS: { key: string; code: string }[] = [
  { key: "iso9001", code: "ISO 9001" },
  { key: "iso14001", code: "ISO 14001" },
  { key: "iso45001", code: "ISO 45001" },
];

// Steps shown in "Inside the factory", in messages `company.floor` order (portrait 3:4).
// Sources and alt text are in public/images/factory/manifest.json. Washing & finishing shows pressing:
// there is no photo of the washers yet. A null shows "photo coming soon".
export const FLOOR_PHOTOS: (string | null)[] = [
  "/images/factory/knitting-02-1920.webp", // IMG_7377
  "/images/factory/embroidery-02-1920.webp", // IMG_7537
  "/images/factory/cutting-03-1920.webp", // IMG_7388
  "/images/factory/sewing-02-1920.webp", // IMG_7414
  "/images/factory/finishing-03-1920.webp", // IMG_8792, cropped below the presser's face
  "/images/factory/packing-02-1920.webp", // IMG_8645
];

// Company hero, art-directed by screen orientation. Portrait screens: looking up into a circular knitting
// machine and its ring of yarn feeders (3:4, IMG_7149). Landscape screens: a full-resolution 2:1 band cut
// from IMG_8629, the feeder ring head-on with the yarn running down to the needle cylinder.
export const companyHeroPhoto = {
  landscape: { src: "/images/factory/knitting-wide-01-3024.webp", width: 3024, height: 1512 },
  portrait: { src: "/company-hero.jpg", width: 2400, height: 3200 },
};
