// gameData.js

// Define resources available for gathering
export const resources = [
      {
        id: 1,
        name: 'Herbs',
        energyCost: 10,
        price: 5,
        requiredLevel: 1,
        description: 'Basic ingredient for potions',
      },
      {
        id: 2,
        name: 'Water',
        energyCost: 8,
        price: 2,
        requiredLevel: 1,
        description: 'Essential ingredient for mixing',
      },
      {
        id: 3,
        name: 'Coal',
        energyCost: 12,
        price: 15,
        requiredLevel: 2,
        description: 'Provides heat for brewing',
      },
      // Add more resources as needed
    ];
    
    // Define items available for crafting
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
          { item: 'Water', quantity: 1 },
        ],
        cost: 25,
        requiredLevel: 2,
        buffs: { mana: 15 },
      },
      // Add more crafting items as needed
    ];
    
    // Define available upgrades
    export const upgrades = [
      {
        id: 1,
        name: 'Herb Garden',
        cost: 100,
        requiredLevel: 2,
        effect: { resourceBonus: { Herbs: 1.2 } }, // Boosts Herbs yield by 20%
      },
      {
        id: 2,
        name: 'Water Well',
        cost: 200,
        requiredLevel: 3,
        effect: { resourceBonus: { Water: 1.5 } }, // Boosts Water yield by 50%
      },
      // Add more upgrades as needed
    ];
    