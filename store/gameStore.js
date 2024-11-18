import { create } from 'zustand';

import { upgradesPool, resourcePool, inventoryPool,  
  initialPlayerStats, 
  xpRequirements, 
  getXpForNextLevel, 
} from '../gameData';

const handleMaxEnergyUpgrade = (state, value) => {
  return {
    maxEnergy: state.maxEnergy + value,
  };
};

const handleAutoGatherUpgrade = (state, resource, amount) => {
  const updatedAutoGather = { ...state.autoGather };
  if (updatedAutoGather[resource]) {
    updatedAutoGather[resource] += amount;
  } else {
    updatedAutoGather[resource] = amount;
  }
  return {
    autoGather: updatedAutoGather,
  };
};

const handleResourceBonusUpgrade = (state, resourceId, amount) => {
  const resource = state.resourcePool.find((res) => res.id === resourceId);
  if (!resource) {
    console.error(`Resource with ID ${resourceId} not found in resourcePool.`);
    return state; // No changes if the resource is invalid
  }
  const updatedResourceBonus = { ...state.resourceBonus };
  if (updatedResourceBonus[resource.id]) {
    updatedResourceBonus[resource.id] += amount;
  } else {
    updatedResourceBonus[resource.id] = amount;
  }
  return {
    resourceBonus: updatedResourceBonus,
  };
};

const useGameStore = create((set, get) => ({

  /* Currency Related */
  currency: initialPlayerStats.currency,
  currencyGain: initialPlayerStats.currencyGain,
  currencyGained: initialPlayerStats.currencyGained,
  incomeRate: initialPlayerStats.incomeRate,
  accumulatedCurrency: 0,

  /* Energy Related */
  energy: initialPlayerStats.energy,
  maxEnergy: 100,
  energyGain: initialPlayerStats.energyGain,

  /* Level/XP Related */
  level: initialPlayerStats.level,
  experience: initialPlayerStats.experience,
  xpToNextLevel: xpRequirements[initialPlayerStats.level - 1] || getXpForNextLevel(initialPlayerStats.level),

  /* Pools */
  resourcePool: resourcePool,
  inventoryPool: inventoryPool,
  upgradesPool: upgradesPool,

  /* Bonuses + Multipliers */
  xpFromSalesMultiplier: 1,
  xpFromCraftingMultiplier: 1,

  /* Inventorys, Current Active Upgrades */
  resources: [],
  inventory: [],
  upgrades: [],
  fractionalGather: {}, // Keeps track of fractional auto-gather progress
  autoGather: {}, // Tracks resources and their gather rates
  resourceBonus: {}, // Keeps track of resource gather bonuses

  recentlyUpdatedInventoryItem: null, // Tracks the last updated inventory item

  resetRecentlyUpdatedInventoryItem: () => set(() => ({ recentlyUpdatedInventoryItem: null })),

  /* XP Related Functions */

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

  /* Currency Related Functions */

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

  applyUpgrade: (upgradeId) => set((state) => {
    const upgrade = state.upgradesPool.find((u) => u.id === upgradeId);
  
    if (!upgrade) {
      console.error(`Upgrade with ID ${upgradeId} not found.`);
      return state;
    }
  
    if (state.currency < upgrade.cost) {
      console.warn(`Not enough currency to purchase ${upgrade.id}.`);
      return state;
    }
  
    // Deduct currency and add to purchased upgrades
    const updatedCurrency = state.currency - upgrade.cost;
    const updatedUpgrades = [...state.upgrades, upgradeId];
  
    // Remove the purchased upgrade from upgradesPool
    const updatedUpgradesPool = state.upgradesPool.filter((u) => u.id !== upgradeId);
  
    let newState = {
      ...state,
      currency: updatedCurrency,
      upgrades: updatedUpgrades,
      upgradesPool: updatedUpgradesPool,
    };
  
    // Handle maxEnergy effect
    if (upgrade.effect?.modifyMaxEnergy) {
      newState = { ...newState, ...handleMaxEnergyUpgrade(newState, upgrade.effect.modifyMaxEnergy) };
    }
  
    // Handle autoGather effect
    if (upgrade.effect?.autoGather) {
      const { resource, amount } = upgrade.effect.autoGather;
      newState = { ...newState, ...handleAutoGatherUpgrade(newState, resource, amount) };
      useGameStore.getState().startAutoGather(); // Start auto-gather process
    }
  
    // Handle resourceBonus effect
    if (upgrade.effect?.resourceBonus) {
      const { resource, amount } = upgrade.effect.resourceBonus;
      newState = { ...newState, ...handleResourceBonusUpgrade(newState, resource, amount) };
  }

  
    console.log(`Applied upgrade: ${upgrade.id}`);
    return newState;
  }),
  


  setRecentlyUpdatedResource: (resourceId) => set(() => ({ recentlyUpdatedResource: resourceId, })),

  startResourceBonus: () => {

  },

  startAutoGather: () => {
    setInterval(() => {
      const state = get();
      const { autoGather, resources } = state;

      let updatedResources = [...resources];
      let fractionalGather = { ...state.fractionalGather }; // Track fractional amounts separately

      Object.entries(autoGather).forEach(([resourceId, rate]) => {
        const resource = state.resourcePool.find((res) => res.id === parseInt(resourceId, 10));
        if (!resource) {
          console.warn(`Resource with ID ${resourceId} not found in resourcePool.`);
          return;
        }

        // Accumulate fractional gather
        if (!fractionalGather[resourceId]) {
          fractionalGather[resourceId] = 0;
        }
        fractionalGather[resourceId] += rate;

        // If a full resource is gathered
        if (fractionalGather[resourceId] >= 1) {
          const wholeUnits = Math.floor(fractionalGather[resourceId]);
          fractionalGather[resourceId] %= 1; // Retain only the fractional part

          // Update resources
          const existingResource = updatedResources.find((res) => res.id === resource.id);
          if (existingResource) {
            existingResource.quantity += wholeUnits;
          } else {
            updatedResources.push({ id: resource.id, name: resource.name, quantity: wholeUnits });
          }

          // Trigger animation
          useGameStore.getState().setRecentlyUpdatedResource(resource.id);
        }
      });

      set({ resources: updatedResources, fractionalGather });
    }, 1000); // Run every second
  },


  stopAutoGather: () => {
    const state = get();
    if (state.gatherInterval) {
      clearInterval(state.gatherInterval);
      set({ gatherInterval: null });
    }
  },


  gatherResource: (resourceId) => set((state) => {
    const resource = state.resourcePool.find((res) => res.id === resourceId);

    if (!resource) {
        console.error("Resource not found:", resourceId);
        return state; // No changes if the resource is invalid
    }

    if (state.energy < resource.energyCost) {
        console.warn("Not enough energy to gather:", resourceId);
        return state; // No changes if energy is insufficient
    }

    // Calculate the total yield for this resource, including bonuses
    const baseYield = resource.yield || 1;
    const bonusYield = state.resourceBonus[resource.id] || 0;
    const totalYield = baseYield + bonusYield;

    // Update the resource quantity or add it if not present
    const updatedResources = [...state.resources];
    const resourceItem = updatedResources.find((item) => item.id === resource.id);

    if (resourceItem) {
        resourceItem.quantity += totalYield;
    } else {
        updatedResources.push({ id: resource.id, quantity: totalYield });
    }

    // Handle experience gain and level-up logic
    let newExperience = state.experience + resource.xpGain;
    let newLevel = state.level;
    let experienceForNextLevel = state.xpToNextLevel;

    while (newExperience >= experienceForNextLevel) {
        newExperience -= experienceForNextLevel;
        newLevel += 1;
        experienceForNextLevel = xpRequirements[newLevel - 1] || getXpForNextLevel(newLevel);
    }

    console.log(`Gathered ${totalYield} of ${resourceId} (Base: ${baseYield}, Bonus: ${bonusYield})`);

    return {
        ...state,
        energy: state.energy - resource.energyCost, // Deduct energy cost
        resources: updatedResources, // Updated resources list
        experience: newExperience, // New experience after gathering
        level: newLevel, // Updated level
        xpToNextLevel: experienceForNextLevel, // Updated XP needed for next level
        recentlyUpdatedResource: resource.id, // Track the updated resource
    };
}),



checkRequiredResources: (itemId) => {
  const state = get(); // Get the current state
  const item = state.inventoryPool.find((item) => item.id === itemId);

  if (!item) return false; // Item not found

  // Check all requirements
  return item.requirements.every((req) => {
    const resource = state.resources.find((res) => res.id === req.id); // Match by ID
    return resource && resource.quantity >= req.quantity; // Check if sufficient resources exist
  });
},



  craftItem: (itemId) => set((state) => {
    const item = state.inventoryPool.find((res) => res.id === itemId);
    const xpFromCraftingMultiplier = state.xpFromCraftingMultiplier;
  
    if (!item) {
      console.log("Item not found in inventoryPool");
      return state;
    }
  
    // Check if player has enough resources for crafting
    const hasRequiredResources = item.requirements.every((req) => {
      const resource = state.resources.find((res) => res.id === req.id); // Match by ID
      if (!resource || resource.quantity < req.quantity) {
        console.log(`Missing resource: ${req.id} or insufficient quantity.`);
      }
      return resource && resource.quantity >= req.quantity;
    });
  
    if (!hasRequiredResources) {
      console.log("Not enough resources to craft:", itemId);
      return state;
    }
  
    // Deduct required resources
    const updatedResources = state.resources.map((res) => {
      const requirement = item.requirements.find((req) => req.id === res.id); // Match by ID
      if (requirement) {
        return { ...res, quantity: res.quantity - requirement.quantity };
      }
      return res;
    });
  
    // Add crafted item to inventory
    const updatedInventory = [...state.inventory];
    const inventoryItem = updatedInventory.find((invItem) => invItem.id === item.id);
  
    if (inventoryItem) {
      inventoryItem.quantity += 1;
    } else {
      updatedInventory.push({ id: item.id, quantity: 1, cost: item.cost });
    }
  
    // Gain experience for crafting
    const craftingXp = item.cost * xpFromCraftingMultiplier;
    console.log(`Adding XP from crafting ${itemId}: ${craftingXp}`);
    useGameStore.getState().gainExperience(craftingXp);
  
    return {
      resources: updatedResources,
      inventory: updatedInventory,
      recentlyUpdatedInventoryItem: item.id, // Track the recently updated item
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

  earnCurrency: () => set((state, amount) => ({
    currency: state.currency + amount,
  })),

  sellItem: (itemId) => set((state) => {

    const itemIndex = state.inventory.findIndex((item) => item.id === itemId);
    const inventoryItem = state.inventoryPool.find((poolItem) => poolItem.id === itemId);
    const xpFromSalesMultiplier = state.xpFromSalesMultiplier;

    if (itemIndex === -1 || !inventoryItem) {
      console.log(`Item ${itemId} not found in inventory or inventoryPool.`);
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

    console.log(`Sold 1 ${itemId} for ${itemCost} currency.`);

    // Gain experience based on the item's cost and multiplier
    useGameStore.getState().gainExperience(itemCost * xpFromSalesMultiplier);

    return {
      currency: state.currency + itemCost, // Add the item's cost to currency
      inventory: updatedInventory,
      currencyGained: state.currencyGained,
    };
  }),



  startIncomeTimer: () => {
    useGameStore.getState().increaseCurrency(); // Start the automatic currency increment
  },
}));

export default useGameStore;
