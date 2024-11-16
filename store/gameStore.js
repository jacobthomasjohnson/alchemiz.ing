// gameStore.js
import { create } from 'zustand';
import { resources, availableResources, craftingItems, upgrades, initialPlayerStats, xpRequirements, getXpForNextLevel, resourcePool, inventoryPool } from '../gameData';

const useGameStore = create((set) => ({

  currency: initialPlayerStats.currency,
  accumulatedCurrency: 0,
  energy: initialPlayerStats.energy,
  maxEnergy: 100,
  level: initialPlayerStats.level,
  experience: initialPlayerStats.experience,
  xpToNextLevel: xpRequirements[initialPlayerStats.level - 1] || getXpForNextLevel(initialPlayerStats.level),
  energyGain: initialPlayerStats.energyGain,
  currencyGain: initialPlayerStats.currencyGain,
  incomeRate: initialPlayerStats.incomeRate,
  resourcePool: resourcePool,
  inventoryPool: inventoryPool,

  upgrades,
  resources: [],
  inventory: [],
  activeUpgrades: [],

  gainExperience: (xp) => set((state) => {
    let newExperience = state.experience + xp;
    let newLevel = state.level;
    let experienceForNextLevel = state.xpToNextLevel;
    while (newExperience >= experienceForNextLevel) {
      newExperience -= experienceForNextLevel;
      newLevel += 1;
      experienceForNextLevel = xpRequirements[newLevel - 1] || getXpForNextLevel(newLevel);
    }
    return {
      experience: newExperience,
      level: newLevel,
      xpToNextLevel: experienceForNextLevel,
    };
  }),

  increaseCurrency: () => {
    set((state) => {
      const increment = state.incomeRate / 100; // Smaller increment per 0.01 second
      const newAccumulatedCurrency = state.accumulatedCurrency + increment;
      if (newAccumulatedCurrency >= 0.01) {
        const wholeUnits = Math.floor(newAccumulatedCurrency * 100) / 100; // Round down to two decimals
        return {
          currency: +(state.currency + wholeUnits).toFixed(2),
          accumulatedCurrency: +(newAccumulatedCurrency - wholeUnits).toFixed(4), // Retain any remainder for future increments
        };
      } else {
        return {
          accumulatedCurrency: newAccumulatedCurrency,
        };
      }
    });

    setTimeout(() => {
      useGameStore.getState().increaseCurrency(); // Recursively call itself every 0.01 second
    }, 10);
  },

  gatherResource: (resourceName) => set((state) => {
    const resource = state.resourcePool.find((res) => res.name === resourceName);
    console.log("Resource to gather:", resource);

    if (resource && state.energy >= resource.energyCost) {
      const updatedResources = [...state.resources];
      const resourceItem = updatedResources.find((item) => item.name === resource.name);
      if (resourceItem) {
        inventoryItem.quantity += 1;
      } else {
        updatedResources.push({ name: resource.name, quantity: 1 });
      }

      let newExperience = state.experience + resource.xpGain;
      let newLevel = state.level;
      let experienceForNextLevel = state.xpToNextLevel;

      while (newExperience >= experienceForNextLevel) {
        newExperience -= experienceForNextLevel;
        newLevel += 1;
        experienceForNextLevel = xpRequirements[newLevel - 1] || getXpForNextLevel(newLevel);
      }

      // console.log("Energy after deduction:", state.energy - resource.energyCost);
      // console.log("Updated Inventory:", updatedInventory);

      return {
        energy: state.energy - resource.energyCost,
        resource: updatedResources,
        experience: newExperience,
        level: newLevel,
        xpToNextLevel: experienceForNextLevel,
      };
    }

    console.log("Not enough energy or resource not found");
    return state; // Return unchanged state if not enough energy

  }),

  craftItem: (itemName) => set((state) => {
    const item = state.craftingItems.find((res) => res.name === craftingItems);
    console.log("Resource to gather:", item);

    if (item && state.energy >= resource.energyCost) { // Change to check if player has correct materials necessary for craft

      const updatedInventory = [...state.inventory];
      const craftable = updatedResources.find((item) => item.name === resource.name);
      if (craftable) {
        inventoryItem.quantity += 1;
      } else {
        updatedResources.push({ name: resource.name, quantity: 1 });
      }

      let newExperience = state.experience + resource.xpGain;
      let newLevel = state.level;
      let experienceForNextLevel = state.xpToNextLevel;

      while (newExperience >= experienceForNextLevel) {
        newExperience -= experienceForNextLevel;
        newLevel += 1;
        experienceForNextLevel = xpRequirements[newLevel - 1] || getXpForNextLevel(newLevel);
      }

      // console.log("Energy after deduction:", state.energy - resource.energyCost);
      // console.log("Updated Inventory:", updatedInventory);

      return {
        energy: state.energy - resource.energyCost,
        resource: updatedResources,
        experience: newExperience,
        level: newLevel,
        xpToNextLevel: experienceForNextLevel,
      };
    }

    console.log("Not enough energy or resource not found");
    return state; // Return unchanged state if not enough energy
    
  }),


  setIncomeRate: (newRate) => set(() => ({
    incomeRate: newRate,
  })),

  applyUpgrade: (upgrade) => set((state) => ({
    incomeRate: state.incomeRate * (upgrade.effect.incomeMultiplier || 1),
  })),

  useEnergy: (amount) => set((state) => ({
    energy: Math.max(0, state.energy - amount),
  })),

  regenerateEnergy: () => set((state) => ({
    energy: Math.min(state.maxEnergy, state.energy + state.energyGain),
  })),

  earnCurrency: () => set((state) => ({
    currency: state.currency + state.currencyGain,
  })),

  sellItem: (itemName) => set((state) => {
    const itemIndex = state.inventory.findIndex((item) => item.name === itemName);
    if (itemIndex === -1) return state;

    const item = state.inventory[itemIndex];
    const itemValue = item.quantity * (item.price || 10);
    const updatedInventory = state.inventory.filter((_, idx) => idx !== itemIndex);

    return {
      currency: state.currency + itemValue,
      inventory: updatedInventory,
    };
  }),

  startIncomeTimer: () => {
    useGameStore.getState().increaseCurrency(); // Start the automatic currency increment
  },
}));

export default useGameStore;
