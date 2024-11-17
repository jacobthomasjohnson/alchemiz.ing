'use client';

import { useEffect, useState } from "react";
import useGameStore from "@/store/gameStore";
import Image from "next/image";

export function Header() {
  const currency = useGameStore((state) => state.currency).toFixed(2);
  const incomeRate = useGameStore((state) => state.incomeRate).toFixed(2);
  const currentLevel = useGameStore((state) => state.level);

  const [animationDivs, setAnimationDivs] = useState([]);
  const [prevCurrency, setPrevCurrency] = useState(currency);

  useEffect(() => {
    if (currency > prevCurrency) {
      const animationId = `currency-${Date.now()}`;
      setAnimationDivs((prev) => [
        ...prev,
        { id: animationId, amount: (currency - prevCurrency).toFixed(2) },
      ]);

      setTimeout(() => {
        setAnimationDivs((prev) => prev.filter((div) => div.id !== animationId));
      }, 2000); // Match animation duration
    }
    setPrevCurrency(currency);
  }, [currency, prevCurrency]);

  return (
    <header className="w-full h-[200px] min-h-[200px] flex relative" id="header">
      <div className="flex items-center gap-8 pl-16" id="header-left">
        <div>
          <Image src="/pink-iso-potion.gif" width={48} height={48} alt="Potion Icon" />
        </div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
        <div>ALCHEMIZ.ING</div>
        <div className="h-[32px] w-[1px] bg-[#212121]"></div>

        {/* Currency Display */}
        <div className="font-mono relative">
          <span>${currency}</span>

          {/* Render animation divs */}
          {animationDivs.map((div) => (
            <div
              key={div.id}
              className="absolute inset-0 pointer-events-none animate-currency-glow"
            ></div>
          ))}
        </div>

        <div className="h-[32px] w-[1px] bg-[#212121]"></div>

        {/* Income rate */}
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
