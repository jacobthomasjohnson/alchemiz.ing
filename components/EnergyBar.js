import React, { useEffect } from 'react';
import useGameStore from '../store/gameStore';

export function EnergyBar() {
  const energy = useGameStore((state) => state.energy);
  const maxEnergy = useGameStore((state) => state.maxEnergy);
  const regenerateEnergy = useGameStore((state) => state.regenerateEnergy);

  // Passive energy regeneration effect
  useEffect(() => {
    const regenInterval = setInterval(() => {
      regenerateEnergy();
    }, 1000); // Regenerate 1 energy per second

    return () => clearInterval(regenInterval);
  }, [regenerateEnergy]);

  // Calculate energy bar width
  const energyProgress = (energy / maxEnergy) * 100;

  return (
    <div className="flex items-center p-8 border-b border-[#222222]">
      <div className="w-[25%]">
        ENERGY
      </div>
      <div className="w-[75%]">
        <div className="w-full h-6 overflow-hidden bg-[#222222] rounded-lg">
          <div
            className="h-full bg-[#48768A] transition-all duration-500"
            style={{ width: `${energyProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
