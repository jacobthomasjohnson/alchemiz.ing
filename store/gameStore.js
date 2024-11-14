// gameStore.js
import { create } from 'zustand';
import { resources, craftingItems, upgrades, initialPlayerStats, xpRequirements, getXpForNextLevel } from '../gameData';

const useGameStore = create((set) => ({
  // Player stats
  currency: initialPlayerStats.currency,
  energy: initialPlayerStats.energy,
  maxEnergy: 100,
  level: initialPlayerStats.level,
  experience: initialPlayerStats.experience,
  xpToNextLevel: xpRequirements[initialPlayerStats.level - 1] || getXpForNextLevel(initialPlayerStats.level), // XP needed for the current level

  // Game data
  resources,
  craftingItems,
  upgrades,
  inventory: [],
  activeUpgrades: [],

  // Actions
  gainExperience: (xp) => set((state) => {
    let newExperience = state.experience + xp; // Changed to let
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
      // Use a fallback for xpToNextLevel
      xpToNextLevel: xpRequirements[initialPlayerStats.level - 1] !== undefined
        ? xpRequirements[initialPlayerStats.level - 1]
        : getXpForNextLevel(initialPlayerStats.level),

    };
  }),

  // Other actions remain the same...
  useEnergy: (amount) => set((state) => {
    const newEnergy = Math.max(0, state.energy - amount);
    return { energy: newEnergy };
  }),

  regenerateEnergy: () => set((state) => {
    const newEnergy = Math.min(state.maxEnergy, state.energy + 1);
    return { energy: newEnergy };
  }),

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
}));

export default useGameStore;
