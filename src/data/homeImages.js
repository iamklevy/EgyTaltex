// Unsplash photos used on the Home page (verified on-brand — warm, neutral tones).
const ID = {
  hero: '1476683874822-744764a2438f', // rows of raw cotton yarn cones, soft warm backlight
  process: '1675176785803-bffbbb0cd2f4', // industrial yarn spinning machine, rows of bobbins
}

export const homeImg = (key, w = 1200) =>
  `https://images.unsplash.com/photo-${ID[key]}?auto=format&fit=crop&q=80&w=${w}`
