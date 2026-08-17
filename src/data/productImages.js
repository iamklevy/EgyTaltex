// Unsplash fallbacks — used only where no real Egytaltex product photography exists yet
// (raw cotton yarn, fabric rolls, loungewear were not photographed on the old site).
const ID = {
  yarn: '1557817017-2ce200058acd', // thread spools / fabric swatches on wood
  knit: '1434389677669-e08b4cac3105', // cream knit poncho on hanger
  lounge: '1558769132-cb1aea458c5e', // warm knitwear on a rack
}

export const img = (key, w = 1200) =>
  `https://images.unsplash.com/photo-${ID[key]}?auto=format&fit=crop&q=80&w=${w}`

// Real Egytaltex product photography, sourced from egytaltex.com.
// Order matches translations.products.items.
export const productMedia = [
  { src: img('yarn'), pos: 'object-center' }, // 0 Cotton Yarn
  { src: img('knit'), pos: 'object-center' }, // 1 Knitted Fabrics
  { src: '/products/tee-burgundy.png', pos: 'object-top' }, // 2 T-Shirts & Tops
  { src: '/products/polo-blue-detail.png', pos: 'object-center' }, // 3 Polo Shirts
  { src: img('lounge'), pos: 'object-center' }, // 4 Loungewear
  { src: '/products/group-tees.jpg', pos: 'object-center' }, // 5 Private Label
]

// Genuine factory/product shot used in the "built to order" feature panel.
export const featureImage = '/products/jacket-red.png'

// Additional real production photography for the gallery strip.
export const productionGallery = [
  '/products/polo-blue-detail.png',
  '/products/jacket-red.png',
  '/products/jacket-blue.png',
  '/products/polo-longsleeve-1.png',
  '/products/polo-longsleeve-2.png',
  '/products/polo-navy-1.png',
  '/products/polo-green.png',
  '/products/shirt-navy.png',
  '/products/polo-navy-2.png',
  '/products/polo-navy-3.png',
  '/products/tee-burgundy.png',
  '/products/group-tees.jpg',
]
