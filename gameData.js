export const xpRequirements = [100, 150, 250, 400, 550, 800, 1000, 1500, 2500, 4000, 6000, 12000, 3000, 10000];

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
            xpGain: 15,
            yield: 1,
            unlocked: true,
      },
      {
            id: 2,
            name: "Herbs",
            energyCost: 20,
            requiredLevel: 4,
            description: 'Good for basic potion making.',
            xpGain: 15,
            yield: 1,
            unlocked: false,
      },
      {
            id: 3,
            name: "Coal",
            energyCost: 25,
            requiredLevel: 8,
            description: 'A variety of uses including alchemical reactions.',
            xpGain: 20,
            yield: 1,
            unlocked: false,
      }
];

export const inventoryPool = [
      {
            id: 1,
            name: 'Water Ration',
            requirements: [{ id: 1, quantity: 5 }],
            cost: 20,
            requiredLevel: 2,
            unlocked: false,
      },
      {
            id: 2,
            name: 'Healing Salve',
            requirements: [{ id: 1, quantity: 3 }, { id: 2, quantity: 6 }],
            cost: 100,
            requiredLevel: 4,
            unlocked: false,
      },
      {
            id: 3,
            name: 'Black Ink',
            requirements: [{ id: 1, quantity: 12 }, { id: 3, quantity: 6 }],
            cost: 350,
            requiredLevel: 9,
            unlocked: false,
      },
      {
            id: 4,
            name: 'Fuel Package',
            requirements: [{ id: 3, quantity: 20 }],
            cost: 200,
            requiredLevel: 8,
            unlocked: false,
      },
      {
            id: 5,
            name: 'Minor Healing Ration',
            requirements: [{ id: 2, quantity: 10 }],
            cost: 180,
            requiredLevel: 10,
            unlocked: false,
      }
];

export const upgradesPool = [
      {
            id: 1,
            name: 'Small Wooden Well',
            description: 'Passively collect water at a slow but useful rate.',
            cost: 200,
            requiredLevel: 3,
            effect: { autoGather: { resource: 1, amount: 1 } },
            unlocked: false,
      },
      {
            id: 2,
            name: 'Replentish I',
            description:
                  'Increases rate of energy return by 1',
            cost: 500,
            requiredLevel: 5,
            effect: { increaseEnergyGain: 1 },
            unlocked: false,
      },
      {
            id: 3,
            name: 'Gardener I',
            description:
                  'Earn 2 extra herbs per gather.',
            cost: 750,
            requiredLevel: 7,
            effect: { resourceBonus: { resource: 2, amount: 2 } },
            unlocked: false,
      },
      {
            id: 4,
            name: 'Garden Keep',
            description:
                  'Hire a Garden Keep to bring you herbs.',
            cost: 2000,
            requiredLevel: 9,
            effect: { autoGather: { resource: 2, amount: 0.5 } },
            unlocked: false,
      },
      {
            id: 5,
            name: 'Coal Cart',
            description:
                  'Passively collect coal at a slow but useful rate.',
            cost: 2200,
            requiredLevel: 11,
            effect: { autoGather: { resource: 3, amount: 0.5 } },
            unlocked: false,
      },
      {
            id: 6,
            name: 'Water Efficiency I',
            description:
                  'Increase water gather quantity by 4.',
            cost: 3250,
            requiredLevel: 12,
            effect: { resourceBonus: { resource: 1, amount: 4 } },
            unlocked: false,
      },
      {
            id: 6,
            name: 'Max Energy I',
            description:
                  'Increase your maximum energy by 100.',
            cost: 4000,
            requiredLevel: 12,
            effect: { modifyMaxEnergy: 100 },
            unlocked: false,
      },
      {
            id: 7,
            name: 'Replentish II',
            description:
                  'Increases rate of energy return by 1.',
            cost: 5000,
            requiredLevel: 13,
            effect: { increaseEnergyGain: 1 },
            unlocked: false,
      },
      {
            id: 7,
            name: 'Iron Well',
            description:
                  'Passively collect water at a fast inteval.',
            cost: 6500,
            requiredLevel: 13,
            effect: { autoGather: { resource: 1, amount: 2 } },
            unlocked: false,
      },
      {
            id: 8,
            name: 'Hire Apprentice I',
            description:
                  'Hire an apprentice who collects currency in unknown ways.',
            cost: 8000,
            requiredLevel: 14,
            effect: { incomeRateIncrease: 5000 },
            unlocked: false,
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
