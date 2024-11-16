// Define resources available for gathering
export const resourcePool = [
  {
    id: 1,
    name: 'Water',
    energyCost: 30,
    price: 2,
    requiredLevel: 1,
    description: 'Essential for potion mixing.',
    xpGain: 10,
  },
  {
    id: 2,
    name: 'Herbs',
    energyCost: 45,
    price: 3,
    requiredLevel: 2,
    description: 'A basic ingredient for potions.',
    xpGain: 20,
  },
  {
    id: 3,
    name: 'Coal',
    energyCost: 75,
    price: 23,
    requiredLevel: 4,
    description: 'Used for heating brews.',
    xpGain: 53,
  },
  {
    id: 4,
    name: 'Mana Leaves',
    energyCost: 40,
    price: 82,
    requiredLevel: 7,
    description: 'Increases potency of magical potions.',
    xpGain: 194,
  },
];

export const xpRequirements = [
  100,  // Level 1 to 2
  200,  // Level 2 to 3
  400,  // Level 3 to 4
  800,  // Level 4 to 5
  1600,  // Level 5 to 6
];

// Optional function if using a dynamic calculation for fallback
export const getXpForNextLevel = (level) => 100 + (level - 1) * 50;

// Define crafting items and recipes
export const inventoryPool = [
  {
    id: 1,
    name: 'Water Ration',
    requirements: [
      { item: 'Water', quantity: 6 },
    ],
    cost: 20,
    requiredLevel: 1,
    buffs: { health: 10 },
  },
  {
    id: 2,
    name: 'Stew',
    requirements: [
      { item: 'Herbs', quantity: 7 },
      { item: 'Water', quantity: 12 },
    ],
    cost: 25,
    requiredLevel: 3,
    buffs: { mana: 15 },
  },
  {
    id: 3,
    name: 'Antidote',
    requirements: [
      { item: 'Herbs', quantity: 1 },
      { item: 'Water', quantity: 3 },
    ],
    cost: 30,
    requiredLevel: 2,
    buffs: { health: 5, status: 'Cure Poison' },
  },
];

// Define upgrades that improve gathering or crafting abilities
export const upgrades = [
  {
    id: 1,
    name: 'Herb Garden',
    cost: 100,
    requiredLevel: 4,
    effect: { resourceBonus: { "Herbs": 1.5 } }, // 20% increase in Herbs yield
  },
  {
    id: 2,
    name: 'Advanced Boiler',
    cost: 150,
    requiredLevel: 3,
    effect: { resourceBonus: { "Coal": 1.5 } }, // 50% increase in Coal yield
  },
  {
    id: 3,
    name: 'Mana Infuser',
    cost: 200,
    requiredLevel: 4,
    effect: { resourceBonus: { "Mana Leaves": 1.3 } }, // 30% increase in Mana Leaves yield
  },
];

// Player's initial stats
export const initialPlayerStats = {
  currency: 0,
  energy: 100,
  level: 1,
  experience: 0,
  energyGain: 2,          // Amount of energy regained per time unit or action
  currencyGain: 0,        // Amount of currency gained per action
  incomeRate: 0,          // Base income rate in currency per second
};