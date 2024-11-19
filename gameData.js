export const xpRequirements = [100, 150, 250, 400, 550, 800, 1000, 1500, 2500, 4000, 6000];

export const getXpForNextLevel = (level) => {
      return xpRequirements[level - 1] || Math.floor(100 * Math.pow(level, 1.5));
  };
  

export const resourcePool = [
      {
            id: 1,
            name: 'Water',
            energyCost: 15,
            requiredLevel: 1,
            description: 'Essential for potion mixing.',
            xpGain: 10,
            yield: 1,
      },
      {
            id: 2,
            name: "Herbs",
            energyCost: 20,
            requiredLevel: 4,
            description: 'Good for basic potion making.',
            xpGain: 15,
            yield: 1,
      },
      {
            id: 3,
            name: "Coal",
            energyCost: 25,
            requiredLevel: 9,
            description: 'A variety of uses including alchemical reactions.',
            xpGain: 20,
            yield: 1,
      }
];

export const inventoryPool = [
      {
            id: 1,
            name: 'Water Ration',
            requirements: [{ id: 1, quantity: 5 }],
            cost: 20,
            requiredLevel: 2,
      },
      {
            id: 2,
            name: 'Healing Salve',
            requirements: [{ id: 1, quantity: 3 }, { id: 2, quantity: 6 }],
            cost: 100,
            requiredLevel: 4,
      },
      {
            id: 3,
            name: 'Black Ink',
            requirements: [{ id: 1, quantity: 12 }, { id: 3, quantity: 6 }],
            cost: 350,
            requiredLevel: 9,
      }
];

export const upgradesPool = [
      {
            id: 1,
            name: 'Small Wooden Well',
            description: 'Passively collect water at a slow but useful rate.',
            cost: 200,
            requiredLevel: 3,
            effect: { autoGather: { resource: 1, amount: 0.5 } },
      },
      {
            id: 2,
            name: 'Replentish I',
            description:
                  'Increases rate of energy return by 1',
            cost: 500,
            requiredLevel: 5,
            effect: { increaseEnergyGain: 1 },
      },
      {
            id: 3,
            name: 'Gardener I',
            description:
                  'Earn 4 extra herbs per gather.',
            cost: 750,
            requiredLevel: 7,
            effect: { resourceBonus: { resource: 2, amount: 4 } }
      },
      {
            id: 4,
            name: 'Coal Cart',
            description:
                  'Passively collect coal at a slow but useful rate.',
            cost: 2200,
            requiredLevel: 10,
            effect: { autoGather: { resource: 3, amount: 0.5 } }
      }
      
      
];

export const initialPlayerStats = {
      currency: 0, // Starting currency
      currencyGained: 0,
      energy: 100, // Starting current energy
      level: 1, // Starting level
      experience: 0, // Starting XP
      energyGain: 1,
      currencyGain: 0,
      incomeRate: 0,
};
