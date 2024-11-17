// Header.js

'use client';

import { DisplayStat } from "./DisplayStat";
import useGameStore from "@/store/gameStore";
import Image from "next/image";

export function Header() {
  const currency = useGameStore((state) => state.currency).toFixed(2); // Ensures two decimal places
  const incomeRate = useGameStore((state) => state.incomeRate).toFixed(2); // Ensures two decimal places
  const currentLevel = useGameStore((state) => state.level); // Adjusted to match store

  return (
    <header className="w-full h-[200px] min-h-[200px] flex" id="header">
      <div className="flex items-center gap-8 pl-16" id="header-left">
        <div>
          <Image src="/pink-iso-potion.gif" width={48} height={48} alt="Potion Icon" />
        </div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        <div>ALCHEMIZ.ING</div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        
        {/* Currency display with fixed width and .00 for even numbers */}
        <div className="font-mono">${currency}</div>
        
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        
        {/* Income rate with two decimal places */}
        <div className="font-mono lowercase">${incomeRate}/s</div>
        
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        
        LEVEL {currentLevel}
      </div>
      <div className="grow"></div>
      <div className="flex items-center gap-8 pr-16" id="header-right">
        <div>PLAY</div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        <div>ALL STATS</div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        <div>ACHIEVEMENTS</div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        <div>SETTINGS</div>
      </div>
    </header>
  );
}
