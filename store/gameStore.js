// store/gameStore.js
import create from 'zustand';
import { resources, craftingItems, upgrades } from '../gameData';

const useGameStore = create((set) => ({
  // Player stats
  currency: 0,
  energy: 100,
  level: 1,
  
  // Game data
  resources,
  craftingItems,
  upgrades,
  
  // Actions
  gatherResource: (resourceName) =>
    set((state) => {
      const resource = state.resources.find((res) => res.name === resourceName);
      if (state.energy >= resource.energyCost) {
        const updatedResources = state.resources.map((res) =>
          res.name === resourceName
            ? { ...res, quantity: (res.quantity || 0) + 1 }
            : res
        );
        return {
          resources: updatedResources,
          energy: state.energy - resource.energyCost,
        };
      }
      return state;
    }),

  craftItem: (itemName) =>
    set((state) => {
      const item = state.craftingItems.find((item) => item.name === itemName);
      const canCraft = item.requirements.every((req) => {
        const resource = state.resources.find((res) => res.name === req.item);
        return resource && (resource.quantity || 0) >= req.quantity;
      });

      if (canCraft && state.currency >= item.cost) {
        const updatedResources = state.resources.map((res) => {
          const requirement = item.requirements.find((req) => req.item === res.name);
          return requirement
            ? { ...res, quantity: res.quantity - requirement.quantity }
            : res;
        });
        return {
          craftingItems: [...state.craftingItems],
          currency: state.currency - item.cost,
          resources: updatedResources,
        };
      }
      return state;
    }),

  upgrade: (upgradeName) =>
    set((state) => {
      const upgrade = state.upgrades.find((upg) => upg.name === upgradeName);
      if (upgrade && state.currency >= upgrade.cost && state.level >= upgrade.requiredLevel) {
        const effect = upgrade.effect.resourceBonus;
        const updatedResources = state.resources.map((res) => {
          if (effect[res.name]) {
            return { ...res, bonusMultiplier: effect[res.name] };
          }
          return res;
        });
        return {
          currency: state.currency - upgrade.cost,
          upgrades: [...state.upgrades, upgrade],
          resources: updatedResources,
        };
      }
      return state;
    }),
}));

export default useGameStore;
