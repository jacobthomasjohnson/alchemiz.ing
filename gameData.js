// gameData.js

// Define resources available for gathering
export const resources = [
  {
    id: 1,
    name: 'Herbs',
    energyCost: 10,
    price: 5,
    requiredLevel: 1,
    description: 'A basic ingredient for potions.',
    xpGain: 5,  // XP gained for gathering this resource
  },
  {
    id: 2,
    name: 'Water',
    energyCost: 8,
    price: 2,
    requiredLevel: 1,
    description: 'Essential for potion mixing.',
    xpGain: 3,  // XP gained for gathering this resource
  },
  {
    id: 3,
    name: 'Coal',
    energyCost: 12,
    price: 15,
    requiredLevel: 2,
    description: 'Used for heating brews.',
    xpGain: 8,  // XP gained for gathering this resource
  },
  {
    id: 4,
    name: 'Mana Leaves',
    energyCost: 20,
    price: 25,
    requiredLevel: 3,
    description: 'Increases potency of magical potions.',
    xpGain: 15,  // XP gained for gathering this resource
  },
];

export const xpRequirements = [
  100,  // Level 1 to 2
  150,  // Level 2 to 3
  200,  // Level 3 to 4
  250,  // Level 4 to 5
  300,  // Level 5 to 6
];

// Optional function if using a dynamic calculation for fallback
export const getXpForNextLevel = (level) => 100 + (level - 1) * 50;

// Define crafting items and recipes
export const craftingItems = [
  {
    id: 1,
    name: 'Healing Salve',
    requirements: [
      { item: 'Herbs', quantity: 1 },
      { item: 'Water', quantity: 2 },
    ],
    cost: 20,
    requiredLevel: 1,
    buffs: { health: 10 },
  },
  {
    id: 2,
    name: 'Minor Mana Potion',
    requirements: [
      { item: 'Herbs', quantity: 2 },
      { item: 'Mana Leaves', quantity: 1 },
    ],
    cost: 25,
    requiredLevel: 2,
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
    requiredLevel: 2,
    effect: { resourceBonus: { "Herbs": 1.2 } }, // 20% increase in Herbs yield
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
  energyGain: 15,          // Amount of energy regained per time unit or action
  currencyGain: 2,        // Amount of currency gained per action
  incomeRate: 0,          // Base income rate in currency per second
};