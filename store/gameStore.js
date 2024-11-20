import { create } from 'zustand';
import useDebugStore from './debugStore';

import { upgradesPool, resourcePool, inventoryPool, initialPlayerStats, xpRequirements, getXpForNextLevel }
      from '../gameData';

const useGameStore = create((set, get) => ({

      /* Currency Related */
      currency: initialPlayerStats.currency,
      currencyGain: initialPlayerStats.currencyGain,
      currencyGained: initialPlayerStats.currencyGained,
      incomeRate: initialPlayerStats.incomeRate,
      accumulatedCurrency: 0,

      /* Energy Related */
      energy: initialPlayerStats.energy, // Current amount of energy (default 100)
      maxEnergy: 100, // Maximum possible energy
      energyGain: initialPlayerStats.energyGain, // Current speed of energy return

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

      defaultSalesMultiplier: 0.75,

      /* Inventorys, Current Active Upgrades */
      resources: [],
      inventory: [],
      upgrades: [],

      gatherTimers: {},
      fractionalGather: {}, // Keeps track of fractional auto-gather progress
      autoGather: {}, // Tracks resources and their gather rates
      resourceBonus: {}, // Keeps track of resource gather bonuses

      recentlyUpdatedInventoryItem: null, // Tracks the last updated inventory item

      resetRecentlyUpdatedInventoryItem: (itemId) => set(() => ({ recentlyUpdatedInventoryItem: itemId })),
      setRecentlyUpdatedResource: (resourceId) => set(() => ({ recentlyUpdatedResource: resourceId, })),

      /* XP Related Functions */

      gainExperience: (xp) => set((state) => {
            const currentExperience = state.experience;
            const totalXp = xp * state.xpFromSalesMultiplier;
            let newExperience = currentExperience + totalXp;
            let newLevel = state.level;
            let experienceForNextLevel = state.xpToNextLevel;
            useDebugStore.getState().setDebugMessage(`Gained ${totalXp} XP`, 'green');

            // // Function to calculate the background color based on level
            // const calculateBackgroundColor = (level, maxLevel) => {
            //       const interpolate = (start, end, factor) => start + (end - start) * factor;
            //       const factor = (level - 1) / (maxLevel - 1); // Normalize level to range [0, 1]
            //       const startColor = { r: 16, g: 16, b: 16 }; // #101010
            //       const endColor = { r: 28, g: 30, b: 32 }; // #B7B7B7
            //       const r = Math.round(interpolate(startColor.r, endColor.r, factor));
            //       const g = Math.round(interpolate(startColor.g, endColor.g, factor));
            //       const b = Math.round(interpolate(startColor.b, endColor.b, factor));
            //       return `rgb(${r}, ${g}, ${b})`;
            // };

            // Level-up logic
            while (newExperience >= experienceForNextLevel) {
                  newExperience -= experienceForNextLevel;
                  newLevel += 1;
                  experienceForNextLevel = getXpForNextLevel(newLevel);
            }

            const levelChanged = state.level !== newLevel;

            if (levelChanged) {
                  // Update background color for the new level
                  // const newBackgroundColor = calculateBackgroundColor(newLevel, 16);
                  // document.body.style.backgroundColor = newBackgroundColor; // Apply new background color

                  // Debug message for leveling up
                  setTimeout(() => {
                        useDebugStore.getState().setDebugMessage(`Leveled up! Now level ${newLevel}`, 'blue');
                  }, 0);
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
            }, 1000);
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
            const updatedCurrency = state.currency - upgrade.cost;
            const updatedUpgrades = [...state.upgrades, upgradeId];
            const updatedUpgradesPool = state.upgradesPool.filter((u) => u.id !== upgradeId);
            let newState = {
                  ...state,
                  currency: updatedCurrency,
                  upgrades: updatedUpgrades,
                  upgradesPool: updatedUpgradesPool,
            };
            if (upgrade.effect?.modifyMaxEnergy) {
                  newState = { ...newState, ...handleMaxEnergyUpgrade(newState, upgrade.effect.modifyMaxEnergy) };
            }
            if (upgrade.effect?.increaseEnergyGain) {
                  newState = { ...newState, ...handleIncreaseEnergyGainUpgrade(newState, upgrade.effect.increaseEnergyGain) };
            }
            // Handle the auto-gather effect
            if (upgrade.effect?.autoGather) {
                  const { resource, amount } = upgrade.effect.autoGather;
                  useGameStore.getState().startAutoGather(resource, amount);
            }
            if (upgrade.effect?.resourceBonus) {
                  const { resource, amount } = upgrade.effect.resourceBonus;
                  newState = { ...newState, ...handleResourceBonusUpgrade(newState, resource, amount) };
            }
            if (upgrade.effect?.incomeRateIncrease) {
                  newState = { ...newState, ...handleIncomeRateIncrease(newState, upgrade.effect.incomeRateIncrease) };
            }
            useDebugStore.getState().setDebugMessage(`Applied upgrade: ${upgrade.name}`, 'blue');
            return newState;
      }),

      startAutoGather: (resourceId, rate) => {
            const state = get();

            if (state.gatherTimers[resourceId]) {
                  console.warn(`Auto-gather for ${resourceId} is already running.`);
                  return;
            }

            const timer = setInterval(() => {
                  const state = get();
                  const updatedResources = [...state.resources];
                  const fractionalGather = { ...state.fractionalGather };

                  // Find the resource in the resource pool
                  const resource = state.resourcePool.find((res) => res.id === resourceId);
                  if (!resource) {
                        console.error(`Resource with ID ${resourceId} not found.`);
                        clearInterval(state.gatherTimers[resourceId]);
                        const updatedTimers = { ...state.gatherTimers };
                        delete updatedTimers[resourceId];
                        set({ gatherTimers: updatedTimers });
                        return;
                  }

                  // Accumulate fractional gathering
                  fractionalGather[resourceId] = (fractionalGather[resourceId] || 0) + rate;

                  // If a whole unit is gathered
                  if (fractionalGather[resourceId] >= 1) {
                        const wholeUnits = Math.floor(fractionalGather[resourceId]);
                        fractionalGather[resourceId] %= 1; // Retain the fractional remainder

                        // Update the resource in the player's resources
                        const resourceItem = updatedResources.find((res) => res.id === resource.id);
                        if (resourceItem) {
                              resourceItem.quantity += wholeUnits;
                        } else {
                              updatedResources.push({ id: resource.id, name: resource.name, quantity: wholeUnits });
                        }

                        useGameStore.getState().setRecentlyUpdatedResource(resource.id);
                  }

                  // Update the state
                  set({ resources: updatedResources, fractionalGather });
            }, 1000); // 1 second interval

            set((state) => ({
                  gatherTimers: { ...state.gatherTimers, [resourceId]: timer },
            }));
      },


      stopAutoGather: (resourceId) => {
            const state = get();
            if (state.gatherTimers[resourceId]) {
                  clearInterval(state.gatherTimers[resourceId]);
                  const updatedTimers = { ...state.gatherTimers };
                  delete updatedTimers[resourceId];
                  const updatedFractionalGather = { ...state.fractionalGather };
                  delete updatedFractionalGather[resourceId];
                  set({ gatherTimers: updatedTimers, fractionalGather: updatedFractionalGather });
            }
      },


      gatherResource: (resourceId) => set((state) => {
            const resource = state.resourcePool.find((res) => res.id === resourceId);
            if (!resource) {
                  useDebugStore.getState().setDebugMessage(`Failed to gather: ${resourceId} not found`, 'red');
                  return state; // No changes if the resource is invalid
            }
            if (state.energy < resource.energyCost) {
                  useDebugStore.getState().setDebugMessage(`Insufficient energy for gathering resource: ${resourceId}`, 'red');
                  return state; // No changes if energy is insufficient
            }
            const baseYield = resource.yield || 0;
            const bonusYield = state.resourceBonus[resource.id] || 0;
            const totalYield = baseYield + bonusYield;
            const updatedResources = [...state.resources];
            const resourceItem = updatedResources.find((item) => item.id === resource.id);
            if (resourceItem) {
                  resourceItem.quantity += totalYield;
            } else {
                  updatedResources.push({ id: resource.id, name: resource.name, quantity: totalYield });
            }
            // Gain XP using the xpGain value
            get().gainExperience(resource.xpGain); // Call gainExperience correctly
            useDebugStore.getState().setDebugMessage(`Gathered ${totalYield} ${resource.name} and gained ${resource.xpGain} XP`, 'green');
            return {
                  energy: state.energy - resource.energyCost, // Deduct energy cost
                  resources: updatedResources, // Updated resources list
                  recentlyUpdatedResource: resource.id,
            };
      }),

      checkRequiredResources: (itemId) => {
            const state = get(); // Get the current state
            const item = state.inventoryPool.find((item) => item.id === itemId);
            if (!item) return false; // Item not found
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
                        useDebugStore.getState().setDebugMessage(`Missing resource: ${req.id} or insufficient quantity.`, 'red');
                  }
                  return resource && resource.quantity >= req.quantity;
            });
            if (!hasRequiredResources) {
                  useDebugStore.getState().setDebugMessage(`Not enough resources to craft ${itemId}`, 'red');
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
                  useDebugStore.getState().setDebugMessage(`${itemId} crafted`, 'blue');

            } else {
                  updatedInventory.push({ id: item.id, name: item.name, quantity: 1, cost: item.cost });
                  useDebugStore.getState().setDebugMessage(`${itemId} crafted`, 'blue');
            }
            // Gain experience for crafting
            const craftingXp = item.cost * xpFromCraftingMultiplier;
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
            const defaultSalesMultiplier = state.defaultSalesMultiplier;

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

            useDebugStore.getState().setDebugMessage(`Sold a ${itemId} for ${itemCost}`, 'green');

            // Gain experience based on the item's cost and multiplier
            useGameStore.getState().gainExperience((itemCost * defaultSalesMultiplier) * xpFromSalesMultiplier);

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

const handleIncreaseEnergyGainUpgrade = (state, amount) => {
      const increasedEnergyGain = state.energyGain += amount;
      return {
            energyGain: increasedEnergyGain,
      }
}

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

const handleIncomeRateIncrease = (state, amount) => {
      return {
            incomeRate: state.incomeRate + amount,
      };
};

export default useGameStore;