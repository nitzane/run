// Avatar item catalogue — 200+ unique items across 8 categories.
// Each item has an unlock condition: level, badge, or free (level 1).
// Colors are hex strings used directly in the SVG renderer.

export const AVATAR_CATEGORIES = [
  { id: 'hair',        label: 'Hair',        icon: '💇‍♀️' },
  { id: 'top',         label: 'Tops',        icon: '👕' },
  { id: 'bottom',      label: 'Bottoms',     icon: '🩳' },
  { id: 'shoes',       label: 'Shoes',       icon: '👟' },
  { id: 'accessory',   label: 'Accessories', icon: '🧢' },
  { id: 'jewelry',     label: 'Jewelry',     icon: '💎' },
  { id: 'makeup',      label: 'Makeup',      icon: '💄' },
  { id: 'background',  label: 'Scene',       icon: '🌄' },
];

// unlock: { type: 'level'|'badge'|'free', value: levelNum | badgeId }
// price: XP cost to equip (cosmetic spend, no real money)

export const AVATAR_ITEMS = {

  // ── HAIR ─────────────────────────────────────────────────────────────────────
  hair: [
    { id: 'h-pony-brown',    label: 'Brown Ponytail',       style: 'ponytail',      color: '#6B3A2A', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'h-pony-black',    label: 'Black Ponytail',       style: 'ponytail',      color: '#1A1A1A', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'h-pony-blonde',   label: 'Blonde Ponytail',      style: 'ponytail',      color: '#D4A843', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'h-pony-pink',     label: 'Pink Ponytail',        style: 'ponytail',      color: '#F06292', accent: '#FF80AB', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'h-pony-ombre',    label: 'Purple Ombré Pony',    style: 'ponytail',      color: '#4A148C', accent: '#CE93D8', unlock: { type: 'level', value: 5 }, price: 200 },
    { id: 'h-bun-brown',     label: 'Messy Bun',            style: 'bun',           color: '#6B3A2A', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'h-bun-black',     label: 'Sleek Bun',            style: 'bun',           color: '#1A1A1A', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'h-bun-red',       label: 'Fiery Red Bun',        style: 'bun',           color: '#C62828', accent: '#FF5252', unlock: { type: 'level', value: 4 }, price: 150 },
    { id: 'h-bun-space',     label: 'Space Buns',           style: 'space-buns',    color: '#7B1FA2', accent: '#E040FB', unlock: { type: 'level', value: 4 }, price: 150 },
    { id: 'h-bun-silver',    label: 'Silver Space Buns',    style: 'space-buns',    color: '#9E9E9E', accent: '#E0E0E0', unlock: { type: 'badge', value: 'level-champion' }, price: 300 },
    { id: 'h-long-brown',    label: 'Long Straight',        style: 'long',          color: '#6B3A2A', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'h-long-black',    label: 'Long Black',           style: 'long',          color: '#1A1A1A', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'h-long-blonde',   label: 'Beach Blonde',         style: 'long',          color: '#FFCA28', accent: '#FFE082', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'h-long-pink',     label: 'Cotton Candy Pink',    style: 'long',          color: '#F48FB1', accent: '#FCE4EC', unlock: { type: 'level', value: 4 }, price: 200 },
    { id: 'h-long-blue',     label: 'Ocean Blue',           style: 'long',          color: '#1565C0', accent: '#64B5F6', unlock: { type: 'badge', value: 'challenge-summer' }, price: 400 },
    { id: 'h-long-rainbow',  label: 'Rainbow Mermaid',      style: 'long',          color: '#E91E63', accent: '#9C27B0', unlock: { type: 'badge', value: 'challenge-jun' }, price: 500 },
    { id: 'h-wavy-brown',    label: 'Wavy Brunette',        style: 'wavy',          color: '#5D4037', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'h-wavy-auburn',   label: 'Wavy Auburn',          style: 'wavy',          color: '#BF360C', accent: '#FF8A65', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'h-wavy-platinum', label: 'Platinum Waves',       style: 'wavy',          color: '#F5F5F5', accent: '#E0E0E0', unlock: { type: 'badge', value: 'runs-100' }, price: 350 },
    { id: 'h-curly-brown',   label: 'Curly Brown',          style: 'curly',         color: '#4E342E', accent: '#8D6E63', unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'h-curly-black',   label: 'Natural Curls',        style: 'curly',         color: '#212121', accent: '#424242', unlock: { type: 'free' },          price: 0 },
    { id: 'h-curly-orange',  label: 'Copper Curls',         style: 'curly',         color: '#E64A19', accent: '#FF7043', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'h-afro',          label: 'Big Natural Afro',     style: 'afro',          color: '#212121', accent: '#424242', unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'h-afro-color',    label: 'Coloured Afro Tips',   style: 'afro',          color: '#1A1A1A', accent: '#E040FB', unlock: { type: 'badge', value: 'challenge-mar' }, price: 300 },
    { id: 'h-bob-black',     label: 'Sharp Black Bob',      style: 'bob',           color: '#1A1A1A', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'h-bob-blonde',    label: 'Golden Bob',           style: 'bob',           color: '#F9A825', accent: null,      unlock: { type: 'level', value: 4 }, price: 150 },
    { id: 'h-bob-lilac',     label: 'Lilac Bob',            style: 'bob',           color: '#CE93D8', accent: '#AB47BC', unlock: { type: 'badge', value: 'challenge-feb' }, price: 250 },
    { id: 'h-braids-black',  label: 'Box Braids',           style: 'braids',        color: '#212121', accent: null,      unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'h-braids-brown',  label: 'Brown Braids',         style: 'braids',        color: '#5D4037', accent: null,      unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'h-braids-gold',   label: 'Golden Braids',        style: 'braids',        color: '#5D4037', accent: '#FFD54F', unlock: { type: 'badge', value: 'runs-50' }, price: 300 },
    { id: 'h-pixie-dark',    label: 'Dark Pixie Cut',       style: 'pixie',         color: '#1A1A1A', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'h-pixie-platinum','label': 'Platinum Pixie',     style: 'pixie',         color: '#ECEFF1', accent: '#CFD8DC', unlock: { type: 'badge', value: 'runs-200' }, price: 500 },
    { id: 'h-pixie-teal',    label: 'Teal Pixie',           style: 'pixie',         color: '#00838F', accent: '#4DD0E1', unlock: { type: 'badge', value: 'challenge-apr' }, price: 400 },
    { id: 'h-braid-pony',    label: 'Braided Ponytail',     style: 'braid-pony',    color: '#4E342E', accent: null,      unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'h-braid-crown',   label: 'Crown Braid',          style: 'crown-braid',   color: '#6B3A2A', accent: '#FFD54F', unlock: { type: 'badge', value: 'level-champion' }, price: 400 },
    { id: 'h-galaxy',        label: 'Galaxy Hair',          style: 'long',          color: '#1A237E', accent: '#E040FB', unlock: { type: 'badge', value: 'level-legend' }, price: 750 },
    { id: 'h-holographic',   label: 'Holographic Hair',     style: 'long',          color: '#B2EBF2', accent: '#E1BEE7', unlock: { type: 'badge', value: 'challenge-four-seasons' }, price: 1000 },
  ],

  // ── TOPS ──────────────────────────────────────────────────────────────────────
  top: [
    { id: 't-tank-white',   label: 'White Tank',           style: 'tank',         color: '#FAFAFA', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 't-tank-black',   label: 'Black Tank',           style: 'tank',         color: '#212121', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 't-tank-pink',    label: 'Pink Tank',            style: 'tank',         color: '#F06292', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 't-tank-lavender','label': 'Lavender Tank',      style: 'tank',         color: '#CE93D8', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 't-tank-neon',    label: 'Neon Yellow Tank',     style: 'tank',         color: '#F9FF00', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 't-crop-white',   label: 'White Crop Top',       style: 'crop',         color: '#FAFAFA', accent: '#E0E0E0', unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 't-crop-pink',    label: 'Pink Crop Top',        style: 'crop',         color: '#F48FB1', accent: '#FCE4EC', unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 't-crop-coral',   label: 'Coral Crop Top',       style: 'crop',         color: '#FF7043', accent: '#FFCCBC', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 't-sports-bra-b', label: 'Black Sports Bra',     style: 'sports-bra',   color: '#212121', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 't-sports-bra-p', label: 'Purple Sports Bra',    style: 'sports-bra',   color: '#7B1FA2', accent: '#CE93D8', unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 't-sports-bra-r', label: 'Rose Gold Sports Bra', style: 'sports-bra',   color: '#C2185B', accent: '#F48FB1', unlock: { type: 'badge', value: 'zone2-master' }, price: 200 },
    { id: 't-long-white',   label: 'White Long Sleeve',    style: 'long-sleeve',  color: '#FAFAFA', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 't-long-stripe',  label: 'Striped Long Sleeve',  style: 'long-sleeve',  color: '#1565C0', accent: '#FAFAFA', unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 't-hoodie-grey',  label: 'Grey Hoodie',          style: 'hoodie',       color: '#9E9E9E', accent: '#616161', unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 't-hoodie-pink',  label: 'Pink Hoodie',          style: 'hoodie',       color: '#F06292', accent: '#C2185B', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 't-hoodie-navy',  label: 'Navy Zip Hoodie',      style: 'hoodie',       color: '#1A237E', accent: '#FAFAFA', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 't-tiedye',       label: 'Tie-Dye Crop',         style: 'crop',         color: '#E91E63', accent: '#7C4DFF', unlock: { type: 'badge', value: 'challenge-jul' }, price: 250 },
    { id: 't-floral',       label: 'Floral Running Top',   style: 'tank',         color: '#FCE4EC', accent: '#E91E63', unlock: { type: 'badge', value: 'challenge-apr' }, price: 250 },
    { id: 't-galaxy',       label: 'Galaxy Print Top',     style: 'crop',         color: '#0D0D2B', accent: '#7986CB', unlock: { type: 'badge', value: 'level-elite' }, price: 400 },
    { id: 't-race-vest',    label: 'Race Vest — Gold',     style: 'vest',         color: '#F9A825', accent: '#FF6F00', unlock: { type: 'badge', value: 'sub20-5k' }, price: 500 },
    { id: 't-race-vest-r',  label: 'Race Vest — Red',      style: 'vest',         color: '#C62828', accent: '#FF1744', unlock: { type: 'badge', value: 'negative-split-5' }, price: 500 },
    { id: 't-holographic',  label: 'Holographic Top',      style: 'crop',         color: '#B2EBF2', accent: '#E1BEE7', unlock: { type: 'badge', value: 'level-legend' }, price: 750 },
    { id: 't-champion',     label: 'Champion Racing Kit',  style: 'vest',         color: '#B71C1C', accent: '#FFD700', unlock: { type: 'badge', value: 'challenge-four-seasons' }, price: 1000 },
  ],

  // ── BOTTOMS ───────────────────────────────────────────────────────────────────
  bottom: [
    { id: 'b-shorts-black', label: 'Black Shorts',         style: 'shorts',       color: '#212121', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'b-shorts-grey',  label: 'Grey Shorts',          style: 'shorts',       color: '#9E9E9E', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'b-shorts-pink',  label: 'Pink Shorts',          style: 'shorts',       color: '#F06292', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'b-shorts-navy',  label: 'Navy Shorts',          style: 'shorts',       color: '#1A237E', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'b-shorts-neon',  label: 'Neon Green Shorts',    style: 'shorts',       color: '#76FF03', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'b-legging-black','label': 'Black Leggings',      style: 'leggings',     color: '#212121', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'b-legging-navy', label: 'Navy Leggings',        style: 'leggings',     color: '#1A237E', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'b-legging-grey', label: 'Grey Marl Leggings',   style: 'leggings',     color: '#757575', accent: '#9E9E9E', unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'b-legging-pink', label: 'Pink Leggings',        style: 'leggings',     color: '#F48FB1', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'b-legging-flrl', label: 'Floral Leggings',      style: 'leggings',     color: '#7B1FA2', accent: '#F48FB1', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'b-legging-tie',  label: 'Tie-Dye Leggings',     style: 'leggings',     color: '#00BCD4', accent: '#E91E63', unlock: { type: 'badge', value: 'challenge-jun' }, price: 250 },
    { id: 'b-legging-glxy', label: 'Galaxy Leggings',      style: 'leggings',     color: '#1A237E', accent: '#7C4DFF', unlock: { type: 'badge', value: 'level-elite' }, price: 400 },
    { id: 'b-legging-holo', label: 'Holographic Leggings', style: 'leggings',     color: '#E1BEE7', accent: '#B2EBF2', unlock: { type: 'badge', value: 'level-legend' }, price: 750 },
    { id: 'b-skirt-black',  label: 'Black Run Skirt',      style: 'skirt',        color: '#212121', accent: null,      unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'b-skirt-pink',   label: 'Pink Run Skirt',       style: 'skirt',        color: '#F06292', accent: null,      unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'b-skirt-white',  label: 'Tennis Skirt',         style: 'skirt',        color: '#FAFAFA', accent: '#E0E0E0', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'b-skirt-plaid',  label: 'Plaid Mini Skirt',     style: 'skirt',        color: '#B71C1C', accent: '#1A237E', unlock: { type: 'badge', value: 'challenge-sep' }, price: 300 },
    { id: 'b-capri-black',  label: 'Black Capris',         style: 'capri',        color: '#212121', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'b-capri-purple', label: 'Purple Capris',        style: 'capri',        color: '#7B1FA2', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'b-capri-stripe', label: 'Striped Capris',       style: 'capri',        color: '#1A237E', accent: '#FAFAFA', unlock: { type: 'badge', value: 'runs-50' }, price: 200 },
    { id: 'b-race-short',   label: 'Race Split Shorts',    style: 'shorts',       color: '#C62828', accent: '#FF8F00', unlock: { type: 'badge', value: 'sub55-10k' }, price: 400 },
  ],

  // ── SHOES ─────────────────────────────────────────────────────────────────────
  shoes: [
    { id: 's-white',        label: 'Classic White',        color: '#FAFAFA', accent: '#E0E0E0', sole: '#E0E0E0',   unlock: { type: 'free' },          price: 0 },
    { id: 's-black',        label: 'Classic Black',        color: '#212121', accent: '#424242', sole: '#212121',   unlock: { type: 'free' },          price: 0 },
    { id: 's-pink',         label: 'Pink Runners',         color: '#F48FB1', accent: '#F06292', sole: '#FFFFFF',   unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 's-lavender',     label: 'Lavender Kicks',       color: '#CE93D8', accent: '#AB47BC', sole: '#FAFAFA',   unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 's-neon-green',   label: 'Neon Green',           color: '#76FF03', accent: '#1B5E20', sole: '#FFFFFF',   unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 's-neon-pink',    label: 'Hot Pink Neon',        color: '#FF4081', accent: '#880E4F', sole: '#FFFFFF',   unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 's-coral',        label: 'Coral Vibes',          color: '#FF7043', accent: '#BF360C', sole: '#FAFAFA',   unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 's-yellow',       label: 'Sunny Yellow',         color: '#FFD600', accent: '#F57F17', sole: '#FFFFFF',   unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 's-navy',         label: 'Navy & White',         color: '#1A237E', accent: '#FAFAFA', sole: '#FAFAFA',   unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 's-tiedye',       label: 'Tie-Dye',              color: '#E91E63', accent: '#7C4DFF', sole: '#FFFFFF',   unlock: { type: 'badge', value: 'weekend-warrior' }, price: 250 },
    { id: 's-rainbow',      label: 'Rainbow Runners',      color: '#FF0000', accent: '#9C27B0', sole: '#FFFFFF',   unlock: { type: 'badge', value: 'challenge-jun' }, price: 350 },
    { id: 's-gold',         label: 'Gold Edition',         color: '#FFD700', accent: '#FF6F00', sole: '#FFF8E1',   unlock: { type: 'badge', value: 'runs-100' }, price: 500 },
    { id: 's-rose-gold',    label: 'Rose Gold',            color: '#FFCDD2', accent: '#C2185B', sole: '#FCE4EC',   unlock: { type: 'badge', value: 'challenge-feb' }, price: 400 },
    { id: 's-silver',       label: 'Silver Mirror',        color: '#BDBDBD', accent: '#9E9E9E', sole: '#F5F5F5',   unlock: { type: 'badge', value: 'runs-200' }, price: 600 },
    { id: 's-holographic',  label: 'Holographic',          color: '#E1BEE7', accent: '#B2EBF2', sole: '#FFFFFF',   unlock: { type: 'badge', value: 'level-legend' }, price: 750 },
    { id: 's-champion',     label: 'Champion Gold',        color: '#FFD700', accent: '#1A1A1A', sole: '#FF6F00',   unlock: { type: 'badge', value: 'challenge-four-seasons' }, price: 1000 },
    { id: 's-trail-green',  label: 'Trail Greens',         color: '#2E7D32', accent: '#A5D6A7', sole: '#1B5E20',   unlock: { type: 'badge', value: 'plan-trail-complete' }, price: 300 },
    { id: 's-night',        label: 'Night Glow',           color: '#1A237E', accent: '#7986CB', sole: '#0D47A1',   unlock: { type: 'badge', value: 'midnight-madness' }, price: 300 },
  ],

  // ── ACCESSORIES ───────────────────────────────────────────────────────────────
  accessory: [
    { id: 'a-none',         label: 'None',                 style: 'none',         color: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'a-cap-white',    label: 'White Cap',            style: 'cap',          color: '#FAFAFA', accent: '#E0E0E0', unlock: { type: 'free' },          price: 0 },
    { id: 'a-cap-black',    label: 'Black Cap',            style: 'cap',          color: '#212121', accent: '#424242', unlock: { type: 'free' },          price: 0 },
    { id: 'a-cap-pink',     label: 'Pink Cap',             style: 'cap',          color: '#F06292', accent: '#FAFAFA', unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'a-cap-navy',     label: 'Navy Cap',             style: 'cap',          color: '#1A237E', accent: '#FAFAFA', unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'a-cap-neon',     label: 'Neon Cap',             style: 'cap',          color: '#76FF03', accent: '#1A1A1A', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'a-visor-white',  label: 'White Visor',          style: 'visor',        color: '#FAFAFA', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'a-visor-pink',   label: 'Pink Visor',           style: 'visor',        color: '#F48FB1', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'a-hband-white',  label: 'White Headband',       style: 'headband',     color: '#FAFAFA', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'a-hband-pink',   label: 'Pink Headband',        style: 'headband',     color: '#F48FB1', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'a-hband-flrl',   label: 'Floral Headband',      style: 'headband',     color: '#E91E63', accent: '#FFF176', unlock: { type: 'badge', value: 'challenge-apr' }, price: 200 },
    { id: 'a-hband-scrunc', label: 'Scrunchie Band',       style: 'headband',     color: '#CE93D8', accent: '#F48FB1', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'a-beanie-grey',  label: 'Grey Beanie',          style: 'beanie',       color: '#9E9E9E', accent: null,      unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'a-beanie-pink',  label: 'Pink Beanie',          style: 'beanie',       color: '#F48FB1', accent: null,      unlock: { type: 'badge', value: 'ice-queen' }, price: 200 },
    { id: 'a-beanie-xmas',  label: 'Santa Hat',            style: 'santa',        color: '#C62828', accent: '#FAFAFA', unlock: { type: 'badge', value: 'holiday-christmas' }, price: 300 },
    { id: 'a-sunglss-blk',  label: 'Black Sunnies',        style: 'sunglasses',   color: '#212121', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'a-sunglss-cat',  label: 'Cat-Eye Sunnies',      style: 'cat-eye',      color: '#4A148C', accent: '#CE93D8', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'a-sunglss-heart','label': 'Heart Sunglasses',   style: 'heart-glasses',color: '#E91E63', accent: '#FCE4EC', unlock: { type: 'badge', value: 'challenge-feb' }, price: 250 },
    { id: 'a-sunglss-mirr', label: 'Mirror Aviators',      style: 'aviators',     color: '#FFD700', accent: '#B2EBF2', unlock: { type: 'badge', value: 'challenge-summer' }, price: 400 },
    { id: 'a-crown',        label: 'Gold Crown 👑',         style: 'crown',        color: '#FFD700', accent: '#FF8F00', unlock: { type: 'badge', value: 'level-champion' }, price: 500 },
    { id: 'a-tiara',        label: 'Diamond Tiara',        style: 'tiara',        color: '#B2EBF2', accent: '#E1BEE7', unlock: { type: 'badge', value: 'challenge-four-seasons' }, price: 1000 },
    { id: 'a-hphones',      label: 'Headphones',           style: 'headphones',   color: '#212121', accent: '#CE93D8', unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'a-hphones-pink', label: 'Pink Headphones',      style: 'headphones',   color: '#F48FB1', accent: '#FCE4EC', unlock: { type: 'level', value: 4 }, price: 200 },
    { id: 'a-hphones-gold', label: 'Gold Headphones',      style: 'headphones',   color: '#FFD700', accent: '#FF6F00', unlock: { type: 'badge', value: 'voice-fanatic' }, price: 350 },
  ],

  // ── JEWELRY ───────────────────────────────────────────────────────────────────
  jewelry: [
    { id: 'j-none',         label: 'None',                 style: 'none',         color: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'j-studs-gold',   label: 'Gold Studs',           style: 'studs',        color: '#FFD700', accent: null,      unlock: { type: 'free' },          price: 0 },
    { id: 'j-studs-silver', label: 'Silver Studs',         style: 'studs',        color: '#BDBDBD', accent: null,      unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'j-studs-rose',   label: 'Rose Gold Studs',      style: 'studs',        color: '#FFAB91', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'j-hoops-gold',   label: 'Gold Hoops',           style: 'hoops',        color: '#FFD700', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'j-hoops-silver', label: 'Silver Hoops',         style: 'hoops',        color: '#BDBDBD', accent: null,      unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'j-hoops-hugger', label: 'Huggies — Pink',       style: 'huggers',      color: '#F48FB1', accent: '#FFD700', unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'j-drop-pearl',   label: 'Pearl Drops',          style: 'drop',         color: '#FAFAFA', accent: '#E0E0E0', unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'j-drop-crystal', label: 'Crystal Drops',        style: 'drop',         color: '#B2EBF2', accent: '#E1BEE7', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'j-necklace-gold','label': 'Gold Chain',          style: 'chain',        color: '#FFD700', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'j-necklace-diam','label': 'Diamond Pendant',    style: 'pendant',      color: '#B2EBF2', accent: '#FFD700', unlock: { type: 'badge', value: 'dist-100' }, price: 300 },
    { id: 'j-necklace-run', label: 'Running Charm',        style: 'charm',        color: '#FFD700', accent: '#FF4081', unlock: { type: 'badge', value: 'runs-25' }, price: 200 },
    { id: 'j-bracelet-gold','label': 'Gold Bracelet',      style: 'bracelet',     color: '#FFD700', accent: null,      unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'j-bracelet-bead','label': 'Bead Bracelet',      style: 'bracelet',     color: '#E91E63', accent: '#7C4DFF', unlock: { type: 'badge', value: 'challenge-jun' }, price: 200 },
    { id: 'j-watch-gold',   label: 'Gold Sports Watch',    style: 'watch',        color: '#FFD700', accent: '#1A1A1A', unlock: { type: 'badge', value: 'runs-50' }, price: 350 },
    { id: 'j-watch-smart',  label: 'Smart Watch — Pink',   style: 'watch',        color: '#212121', accent: '#F48FB1', unlock: { type: 'level', value: 4 }, price: 250 },
    { id: 'j-watch-rosegld','label': 'Rose Gold Watch',    style: 'watch',        color: '#FFCDD2', accent: '#C2185B', unlock: { type: 'badge', value: 'challenge-feb' }, price: 400 },
    { id: 'j-stars',        label: 'Star Earrings',        style: 'stars',        color: '#FFD700', accent: null,      unlock: { type: 'badge', value: 'new-pb' }, price: 200 },
    { id: 'j-moon',         label: 'Moon & Stars Set',     style: 'moon',         color: '#9C27B0', accent: '#FFD700', unlock: { type: 'badge', value: 'secret-full-moon' }, price: 500 },
    { id: 'j-diamond-set',  label: 'Full Diamond Set',     style: 'diamond-set',  color: '#B2EBF2', accent: '#E1BEE7', unlock: { type: 'badge', value: 'level-legend' }, price: 1000 },
  ],

  // ── MAKEUP ────────────────────────────────────────────────────────────────────
  makeup: [
    { id: 'm-none',         label: 'No Makeup',            lips: null,   blush: null,   eye: null,     unlock: { type: 'free' },          price: 0 },
    { id: 'm-natural',      label: 'Natural Glow',         lips: '#FFCCBC', blush: '#FFCDD2', eye: null,  unlock: { type: 'free' },       price: 0 },
    { id: 'm-pink-lips',    label: 'Pink Lips',            lips: '#F48FB1', blush: '#F8BBD9', eye: null,  unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'm-coral-lips',   label: 'Coral Lips',           lips: '#FF7043', blush: '#FFCCBC', eye: null,  unlock: { type: 'level', value: 2 }, price: 50 },
    { id: 'm-berry-lips',   label: 'Berry Lips',           lips: '#880E4F', blush: '#FCE4EC', eye: null,  unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'm-red-lips',     label: 'Classic Red',          lips: '#C62828', blush: '#FFCDD2', eye: null,  unlock: { type: 'level', value: 3 }, price: 100 },
    { id: 'm-nude-lips',    label: 'Nude & Blush',         lips: '#D7A89A', blush: '#FFCDD2', eye: null,  unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'm-glam',         label: 'Full Glam',            lips: '#C62828', blush: '#F48FB1', eye: '#7B1FA2', unlock: { type: 'level', value: 4 }, price: 200 },
    { id: 'm-smokey',       label: 'Smokey Eye',           lips: '#D7A89A', blush: '#FFCDD2', eye: '#212121', unlock: { type: 'level', value: 4 }, price: 175 },
    { id: 'm-purple',       label: 'Purple Sunset',        lips: '#7B1FA2', blush: '#E1BEE7', eye: '#7B1FA2', unlock: { type: 'badge', value: 'challenge-mar' }, price: 250 },
    { id: 'm-sparkle',      label: 'Sparkle & Glitter',    lips: '#F48FB1', blush: '#FCE4EC', eye: '#FFD700', unlock: { type: 'badge', value: 'new-pb' }, price: 300 },
    { id: 'm-rainbow',      label: 'Rainbow Eyeshadow',    lips: '#F48FB1', blush: '#FCE4EC', eye: '#E91E63', unlock: { type: 'badge', value: 'challenge-jun' }, price: 350 },
    { id: 'm-galaxy',       label: 'Galaxy Glam',          lips: '#9C27B0', blush: '#CE93D8', eye: '#1A237E', unlock: { type: 'badge', value: 'level-elite' }, price: 500 },
    { id: 'm-queen',        label: 'Queen Energy',         lips: '#FFD700', blush: '#F48FB1', eye: '#212121', unlock: { type: 'badge', value: 'level-legend' }, price: 750 },
  ],

  // ── BACKGROUNDS ───────────────────────────────────────────────────────────────
  background: [
    { id: 'bg-park',        label: 'City Park',            sky: '#87CEEB', ground: '#4CAF50', extra: '#2E7D32', unlock: { type: 'free' },          price: 0 },
    { id: 'bg-track',       label: 'Running Track',        sky: '#FFF8E1', ground: '#E64A19', extra: '#FFFFFF', unlock: { type: 'free' },          price: 0 },
    { id: 'bg-city',        label: 'City Skyline',         sky: '#FFB74D', ground: '#616161', extra: '#9E9E9E', unlock: { type: 'level', value: 2 }, price: 75 },
    { id: 'bg-beach',       label: 'Beach Sunset',         sky: '#FF7043', ground: '#FFD54F', extra: '#26C6DA', unlock: { type: 'level', value: 3 }, price: 125 },
    { id: 'bg-forest',      label: 'Forest Trail',         sky: '#81C784', ground: '#388E3C', extra: '#1B5E20', unlock: { type: 'badge', value: 'trail-blazer' }, price: 200 },
    { id: 'bg-mountain',    label: 'Mountain Peaks',       sky: '#64B5F6', ground: '#9E9E9E', extra: '#FAFAFA', unlock: { type: 'badge', value: 'mountain-goat' }, price: 300 },
    { id: 'bg-night',       label: 'Night City',           sky: '#1A237E', ground: '#212121', extra: '#FFD700', unlock: { type: 'badge', value: 'night-owl' }, price: 250 },
    { id: 'bg-sunrise',     label: 'Sunrise Run',          sky: '#FF8A65', ground: '#4CAF50', extra: '#FFF176', unlock: { type: 'badge', value: 'dawn-patrol' }, price: 300 },
    { id: 'bg-autumn',      label: 'Autumn Park',          sky: '#FFAB76', ground: '#795548', extra: '#E64A19', unlock: { type: 'badge', value: 'challenge-sep' }, price: 250 },
    { id: 'bg-winter',      label: 'Winter Wonderland',    sky: '#E3F2FD', ground: '#ECEFF1', extra: '#90CAF9', unlock: { type: 'badge', value: 'challenge-dec' }, price: 300 },
    { id: 'bg-spring',      label: 'Cherry Blossoms',      sky: '#FCE4EC', ground: '#A5D6A7', extra: '#F48FB1', unlock: { type: 'badge', value: 'challenge-mar' }, price: 300 },
    { id: 'bg-pride',       label: 'Pride Parade',         sky: '#FF80AB', ground: '#7C4DFF', extra: '#FFD600', unlock: { type: 'badge', value: 'challenge-jun' }, price: 400 },
    { id: 'bg-space',       label: 'Running Through Space','sky': '#0D0D2B', ground: '#1A237E', extra: '#E040FB', unlock: { type: 'badge', value: 'level-elite' }, price: 500 },
    { id: 'bg-candy',       label: 'Candy Land',           sky: '#F8BBD9', ground: '#F48FB1', extra: '#CE93D8', unlock: { type: 'badge', value: 'challenge-four-seasons' }, price: 750 },
    { id: 'bg-champion',    label: 'Champion Stadium',     sky: '#1A1A1A', ground: '#C62828', extra: '#FFD700', unlock: { type: 'badge', value: 'level-legend' }, price: 1000 },
  ],
};

// ── Skin tones (free, always available) ───────────────────────────────────────
export const SKIN_TONES = [
  { id: 'skin-1', label: 'Light',        color: '#FFDFC4', shadow: '#EBC8A0' },
  { id: 'skin-2', label: 'Light Warm',   color: '#F1C27D', shadow: '#D4A055' },
  { id: 'skin-3', label: 'Medium',       color: '#C68642', shadow: '#A0692A' },
  { id: 'skin-4', label: 'Medium Deep',  color: '#A0522D', shadow: '#7A3B1E' },
  { id: 'skin-5', label: 'Deep',         color: '#6B3A2A', shadow: '#4A2010' },
  { id: 'skin-6', label: 'Deep Rich',    color: '#3B1F10', shadow: '#2A1208' },
];

// ── Default avatar ────────────────────────────────────────────────────────────
export const DEFAULT_AVATAR = {
  skinTone: 'skin-1',
  hair: 'h-pony-brown',
  top: 't-tank-pink',
  bottom: 'b-shorts-black',
  shoes: 's-white',
  accessory: 'a-hband-white',
  jewelry: 'j-studs-gold',
  makeup: 'm-natural',
  background: 'bg-park',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getItem(category, id) {
  return (AVATAR_ITEMS[category] || []).find(i => i.id === id);
}

export function isUnlocked(item, userLevel, unlockedBadgeIds = []) {
  if (!item) return false;
  const { type, value } = item.unlock;
  if (type === 'free') return true;
  if (type === 'level') return userLevel >= value;
  if (type === 'badge') return unlockedBadgeIds.includes(value);
  return false;
}

export function getUnlockLabel(item) {
  if (!item) return '';
  const { type, value } = item.unlock;
  if (type === 'free') return 'Free';
  if (type === 'level') return `Level ${value}`;
  if (type === 'badge') return `Earn badge: ${value.replace(/-/g, ' ')}`;
  return '';
}
