export const resourcePool = [
  {
    id: 1,
    name: 'Water',
    energyCost: 15,
    price: 5,
    requiredLevel: 1,
    description: 'Essential for potion mixing.',
    xpGain: 10,
  },
  {
    id: 2,
    name: 'Herbs',
    energyCost: 20,
    price: 3,
    requiredLevel: 1,
    description: 'A basic ingredient for potions.',
    xpGain: 20,
  },
  {
    id: 3,
    name: 'Coal',
    energyCost: 50,
    price: 23,
    requiredLevel: 2,
    description: 'Used for heating brews.',
    xpGain: 53,
  },
  {
    id: 4,
    name: 'Mana Leaves',
    energyCost: 95,
    price: 82,
    requiredLevel: 5,
    description: 'Increases potency of magical potions.',
    xpGain: 194,
  },
  {
    id: 5,
    name: 'Crystal Shards',
    energyCost: 150,
    price: 300,
    requiredLevel: 8,
    description: 'A mystical resource for advanced potions.',
    xpGain: 400,
  },
  {
    id: 6,
    name: 'Lunar Essence',
    energyCost: 200,
    price: 500,
    requiredLevel: 11,
    description: 'Harnessed from the moon’s glow.',
    xpGain: 600,
  },
  {
    id: 7,
    name: 'Sunlight Essence',
    energyCost: 250,
    price: 700,
    requiredLevel: 14,
    description: 'Captured from pure sunlight.',
    xpGain: 800,
  },
  {
    id: 8,
    name: 'Dragon Root',
    energyCost: 300,
    price: 1000,
    requiredLevel: 18,
    description: 'A rare root with immense power.',
    xpGain: 1000,
  },
  {
    id: 9,
    name: 'Phoenix Feathers',
    energyCost: 400,
    price: 1500,
    requiredLevel: 21,
    description: 'Legendary feathers with regenerative properties.',
    xpGain: 1200,
  },
  {
    id: 10,
    name: 'Dark Crystals',
    energyCost: 500,
    price: 2000,
    requiredLevel: 24,
    description: 'Crystals imbued with shadow energy.',
    xpGain: 1400,
  },
  {
    id: 11,
    name: 'Angel’s Tears',
    energyCost: 600,
    price: 3000,
    requiredLevel: 26,
    description: 'A rare and divine liquid.',
    xpGain: 1600,
  },
  {
    id: 12,
    name: 'Shadow Essence',
    energyCost: 750,
    price: 3500,
    requiredLevel: 29,
    description: 'Dark energy in its purest form.',
    xpGain: 1800,
  },
  {
    id: 13,
    name: 'Holy Water',
    energyCost: 800,
    price: 4000,
    requiredLevel: 33,
    description: 'Water blessed with divine light.',
    xpGain: 2000,
  },
  {
    id: 14,
    name: 'Philosopher’s Stone Shards',
    energyCost: 1000,
    price: 5000,
    requiredLevel: 36,
    description: 'Fragments of the legendary stone.',
    xpGain: 2200,
  },
];

export const xpRequirements = [
  100,  // Level 1 to 2
  250,  // Level 2 to 3
  500,  // Level 3 to 4
  1200,  // Level 4 to 5
  2500,  // Level 5 to 6
];

// Optional function if using a dynamic calculation for fallback
export const getXpForNextLevel = (level) => 100 + (level - 1) * 50;

// Define crafting items and recipes
export const inventoryPool = [
  {
    id: 1,
    name: 'Healing Salve',
    requirements: [{ item: 'Herbs', quantity: 3 }, { item: 'Water', quantity: 2 }],
    cost: 20,
    requiredLevel: 1, // Herbs and Water are unlocked at level 1
  },
  {
    id: 2,
    name: 'Antidote',
    requirements: [{ item: 'Herbs', quantity: 5 }, { item: 'Coal', quantity: 1 }],
    cost: 50,
    requiredLevel: 2, // Coal is unlocked at level 2
  },
  {
    id: 3,
    name: 'Minor Mana',
    requirements: [{ item: 'Mana Leaves', quantity: 2 }, { item: 'Water', quantity: 1 }],
    cost: 30,
    requiredLevel: 5, // Mana Leaves are unlocked at level 5
  },
  {
    id: 4,
    name: 'Great Healing Potion',
    requirements: [{ item: 'Herbs', quantity: 10 }, { item: 'Water', quantity: 8 }],
    cost: 100,
    requiredLevel: 6, // Both Herbs and Water are available
  },
  {
    id: 5,
    name: 'Vitality Tonic',
    requirements: [{ item: 'Mana Leaves', quantity: 5 }, { item: 'Crystal Shards', quantity: 3 }],
    cost: 150,
    requiredLevel: 8, // Crystal Shards are unlocked at level 8
  },
  {
    id: 6,
    name: 'Fire Scorch',
    requirements: [{ item: 'Lunar Essence', quantity: 5 }, { item: 'Herbs', quantity: 10 }],
    cost: 200,
    requiredLevel: 11, // Lunar Essence is unlocked at level 11
  },
  {
    id: 7,
    name: 'Elixir of Youth',
    requirements: [{ item: 'Sunlight Essence', quantity: 8 }, { item: 'Water', quantity: 15 }],
    cost: 300,
    requiredLevel: 14, // Sunlight Essence is unlocked at level 14
  },
  {
    id: 8,
    name: 'Elixir of Strength',
    requirements: [{ item: 'Dragon Root', quantity: 10 }, { item: 'Herbs', quantity: 20 }],
    cost: 500,
    requiredLevel: 18, // Dragon Root is unlocked at level 18
  },
  {
    id: 9,
    name: 'Elixir of Enlightenment',
    requirements: [{ item: 'Phoenix Feathers', quantity: 5 }, { item: 'Mana Leaves', quantity: 10 }],
    cost: 600,
    requiredLevel: 21, // Phoenix Feathers are unlocked at level 21
  },
];


// Define upgrades that improve gathering or crafting abilities
export const upgradesPool = [
  {
    id: 1,
    name: 'Herb Garden',
    description: 'Automatically gather herbs at a slow rate.',
    cost: 500,
    requiredLevel: 4,
    effect: { autoGather: 'Herbs' },
  },
  {
    id: 2,
    name: 'Mana Spring',
    description: 'Increases mana leaf gathering efficiency.',
    cost: 1500,
    requiredLevel: 7,
    effect: { resourceBonus: { "Mana Leaves": 1.5 } },
  },
  {
    id: 3,
    name: 'Crystal Mines',
    description: 'Efficiently mine crystal shards.',
    cost: 3000,
    requiredLevel: 17,
    effect: { autoGather: 'Crystal Shards' },
  },
  {
    id: 4,
    name: 'Distillation Apparatus',
    description: 'Enhances potion crafting speed.',
    cost: 5000,
    requiredLevel: 13,
    effect: { craftingSpeed: 1.2 },
  },
  {
    id: 5,
    name: 'Advanced Cauldron',
    description: 'Improves crafting efficiency for potions.',
    cost: 7500,
    requiredLevel: 22,
    effect: { craftingBonus: 1.3 },
  },
  {
    id: 6,
    name: 'Phoenix Aviary',
    description: 'Enables gathering of Phoenix Feathers.',
    cost: 10000,
    requiredLevel: 27,
    effect: { autoGather: 'Phoenix Feathers' },
  },
];

export const initialPlayerStats = {
  currency: 10000,
  energy: 100,
  level: 1000,
  experience: 0,
  energyGain: 2,          // Amount of energy regained per time unit or action
  currencyGain: 0,        // Amount of currency gained per action
  incomeRate: 0,          // Base income rate in currency per second
};


// Player's initial stats
// export const initialPlayerStats = {
//   currency: 0,
//   energy: 100,
//   level: 1,
//   experience: 0,
//   energyGain: 2,          // Amount of energy regained per time unit or action
//   currencyGain: 0,        // Amount of currency gained per action
//   incomeRate: 0,          // Base income rate in currency per second
// };
