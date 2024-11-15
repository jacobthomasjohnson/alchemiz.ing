// gameStore.js
import { create } from 'zustand';
import { resources, craftingItems, upgrades, initialPlayerStats, xpRequirements, getXpForNextLevel } from '../gameData';

const useGameStore = create((set) => ({
  // Player stats
  currency: initialPlayerStats.currency,
  accumulatedCurrency: 0, // New state to accumulate small increments
  energy: initialPlayerStats.energy,
  maxEnergy: 100,
  level: initialPlayerStats.level,
  experience: initialPlayerStats.experience,
  xpToNextLevel: xpRequirements[initialPlayerStats.level - 1] || getXpForNextLevel(initialPlayerStats.level),
  energyGain: initialPlayerStats.energyGain,
  currencyGain: initialPlayerStats.currencyGain,
  incomeRate: initialPlayerStats.incomeRate,

  // Game data
  resources,
  craftingItems,
  upgrades,
  inventory: [],
  activeUpgrades: [],



  // Actions
  gainExperience: (xp) => set((state) => {
    let newExperience = state.experience + xp;
    let newLevel = state.level;
    let experienceForNextLevel = state.xpToNextLevel;

    // Check if level-up should occur
    while (newExperience >= experienceForNextLevel) {
      newExperience -= experienceForNextLevel;
      newLevel += 1;

      // Update XP requirement for the next level
      experienceForNextLevel = xpRequirements[newLevel - 1] || getXpForNextLevel(newLevel);
    }

    return {
      experience: newExperience,
      level: newLevel,
      xpToNextLevel: experienceForNextLevel,
    };
  }),

  // Accumulate small increments and update currency visibly
  increaseCurrency: () => {
    set((state) => {
      const increment = state.incomeRate / 100; // Smaller increment per 0.01 second
      const newAccumulatedCurrency = state.accumulatedCurrency + increment;

      // If accumulated currency reaches 0.01 or more, add to currency
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

    // Trigger the next increment after 0.01 second
    setTimeout(() => {
      useGameStore.getState().increaseCurrency(); // Recursively call itself every 0.01 second
    }, 10);
  },

  // Updated gatherResource action
  gatherResource: (resourceName) => set((state) => {
    const resource = state.resources.find((res) => res.name === resourceName);
    console.log("Resource to gather:", resource);

    // Check if resource exists and player has enough energy
    if (resource && state.energy >= resource.energyCost) {
      console.log("Gathering resource:", resourceName, "Energy before:", state.energy);

      // Deduct energy and add resource to inventory
      const updatedInventory = [...state.inventory];
      const inventoryItem = updatedInventory.find((item) => item.name === resource.name);
      if (inventoryItem) {
        inventoryItem.quantity += 1;
      } else {
        updatedInventory.push({ name: resource.name, quantity: 1 });
      }

      // Gain experience points for gathering the resource
      let newExperience = state.experience + resource.xpGain; // Changed to let
      let newLevel = state.level;
      let experienceForNextLevel = state.xpToNextLevel;

      // Check if level-up should occur
      while (newExperience >= experienceForNextLevel) {
        newExperience -= experienceForNextLevel;
        newLevel += 1;
        experienceForNextLevel = xpRequirements[newLevel - 1] || getXpForNextLevel(newLevel);
      }

      console.log("Energy after deduction:", state.energy - resource.energyCost);
      console.log("Updated Inventory:", updatedInventory);

      return {
        energy: state.energy - resource.energyCost,
        inventory: updatedInventory,
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
