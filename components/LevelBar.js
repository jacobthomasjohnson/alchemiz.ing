import React from 'react';
import useGameStore from '../store/gameStore';

export function LevelBar() {

  const experience = useGameStore((state) => state.experience);
  const level = useGameStore((state) => state.level);
  const xpToNextLevel = useGameStore((state) => state.xpToNextLevel);

  const levelProgress = (experience / xpToNextLevel) * 100;

  return (
    <div className="flex items-center p-8 border-b border-[#222222]">
      <div className="w-[25%]">
        LEVEL
      </div>
      <div className="w-[75%]">
        <div className="w-full h-6 overflow-hidden bg-[#222222] rounded-lg">
          <div
            className="h-full bg-[#708B56] transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
        Experience: {experience}<br />
        XP To Next Level: {xpToNextLevel}
      </div>
    </div>
  );
}
