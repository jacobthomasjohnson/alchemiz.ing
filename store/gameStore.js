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
  xpFromSalesMultiplier: 1,
  xpFromCraftingMultiplier: 1,
  upgrades,

  resources: [],
  inventory: [],
  activeUpgrades: [],

  gainExperience: (xp) => set((state) => {

    const totalXp = xp * state.xpFromSalesMultiplier;

    let newExperience = state.experience + totalXp;
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

  setXpFromSalesMultiplier: (multiplier) => set(() => ({
    xpFromSalesMultiplier: multiplier,
  })),

  setXpFromCraftingMultiplier: (multiplier) => set(() => ({
    xpFromCraftingMultiplier: multiplier,
  })),

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

  // Example upgrade logic to modify multiplier
  applyUpgrade: (upgrade) => set((state) => {
    if (upgrade.type === "xpFromSalesMultiplier") {
      return { xpFromSalesMultiplier: state.xpFromSalesMultiplier * upgrade.value };
    }
    // Handle other upgrade types...
    return state;
  }),

  gatherResource: (resourceName) => set((state) => {
    const resource = state.resourcePool.find((res) => res.name === resourceName);
    console.log("Resource to gather:", resource);

    if (resource && state.energy >= resource.energyCost) {
      const updatedResources = [...state.resources];
      const resourceItem = updatedResources.find((item) => item.name === resource.name);
      if (resourceItem) {
        resourceItem.quantity += 1;
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
      console.log("Updated Inventory:", updatedResources);

      return {
        energy: state.energy - resource.energyCost,
        resources: updatedResources,
        experience: newExperience,
        level: newLevel,
        xpToNextLevel: experienceForNextLevel,
      };
    }

    console.log("Not enough energy or resource not found");
    return state; // Return unchanged state if not enough energy

  }),

  craftItem: (itemName) => set((state) => {
    const item = state.inventoryPool.find((res) => res.name === itemName);
    const xpFromCraftingMultiplier = state.xpFromCraftingMultiplier;

    if (!item) {
      console.log("Item not found in inventoryPool");
      return state;
    }

    // Check if player has enough resources for crafting
    const hasRequiredResources = item.requirements.every((req) => {
      const resource = state.resources.find((res) => res.name === req.item);
      return resource && resource.quantity >= req.quantity;
    });

    if (!hasRequiredResources) {
      console.log("Not enough resources to craft:", itemName);
      return state;
    }

    // Deduct required resources
    const updatedResources = state.resources.map((res) => {
      const requirement = item.requirements.find((req) => req.item === res.name);
      if (requirement) {
        return { ...res, quantity: res.quantity - requirement.quantity };
      }
      return res;
    });

    // Add crafted item to inventory
    const updatedInventory = [...state.inventory];
    const inventoryItem = updatedInventory.find((invItem) => invItem.name === item.name);

    if (inventoryItem) {
      inventoryItem.quantity += 1;
    } else {
      updatedInventory.push({ name: item.name, quantity: 1 });
    }

    // Gain experience for crafting
    const craftingXp = item.cost * xpFromCraftingMultiplier;
    console.log(`Adding XP from crafting ${itemName}: ${craftingXp}`);
    useGameStore.getState().gainExperience(craftingXp);

    return {
      resources: updatedResources,
      inventory: updatedInventory,
    };
  }),




  setIncomeRate: (newRate) => set(() => ({
    incomeRate: newRate,
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
    const inventoryItem = state.inventoryPool.find((poolItem) => poolItem.name === itemName);
    const xpFromSalesMultiplier = state.xpFromSalesMultiplier;

    if (itemIndex === -1 || !inventoryItem) {
      console.log(`Item ${itemName} not found in inventory or inventoryPool.`);
      return state; // Item not found in either inventory or inventoryPool
    }

    const itemCost = inventoryItem.cost; // Retrieve cost from inventoryPool
    let updatedInventory = [...state.inventory];

    // Reduce quantity or remove item if quantity is 1
    if (state.inventory[itemIndex].quantity > 1) {
      updatedInventory[itemIndex].quantity -= 1;
    } else {
      updatedInventory = updatedInventory.filter((_, idx) => idx !== itemIndex);
    }

    console.log(`Sold 1 ${itemName} for ${itemCost} currency.`);

    // Gain experience based on the item's cost and multiplier
    useGameStore.getState().gainExperience(itemCost * xpFromSalesMultiplier);

    return {
      currency: state.currency + itemCost, // Add the item's cost to currency
      inventory: updatedInventory,
    };
  }),



  startIncomeTimer: () => {
    useGameStore.getState().increaseCurrency(); // Start the automatic currency increment
  },
}));

export default useGameStore;
