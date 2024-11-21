'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import useGameStore from "@/store/gameStore";
import HeaderLink from "./HeaderLink";

export function Header() {

      const currency = useGameStore((state) => state.currency);
      const incomeRate = useGameStore((state) => state.incomeRate).toFixed(2);
      const currentLevel = useGameStore((state) => state.level);
      const currencyGained = useGameStore((state) => state.currencyGained);

      const [animationDivs, setAnimationDivs] = useState([]);
      const [prevCurrency, setPrevCurrency] = useState(currency);

      useEffect(() => {
            if (currency !== prevCurrency) {
                  const animationId = `animation-${Date.now()}`;
                  const currencyChange = (currency - prevCurrency).toFixed(2);
                  const typeOfChange = currency > prevCurrency ? '+' : '-';
                  console.log(animationId);
                  console.log(currencyChange);
                  console.log(typeOfChange);
                  setAnimationDivs((prev) => [
                        ...prev,
                        { id: animationId, type: typeOfChange, amount: currencyChange },
                  ]);
                  setTimeout(() => {
                        setAnimationDivs((prev) => prev.filter((div) => div.id !== animationId));
                  }, 3000);
            }
            setPrevCurrency(currency);
      }, [currency, prevCurrency]);

      return (
            <header className="w-full h-[100px] min-h-[100px] flex relative z-50" id="header">
                  <div className="flex items-center gap-8 pl-16" id="header-left">
                        <div>
                              <Image src="/pink-iso-potion.gif" width={48} height={48} alt="Potion Icon" />
                        </div>
                        <div className="h-[32px] w-[1px] bg-[#212121] header-left-spacer"></div>
                        <div>ALCHEMIZ.ING</div>
                        <div className="h-[32px] w-[1px] bg-[#212121] header-left-spacer"></div>
                        <div className="font-mono relative">
                              <span>${currency.toFixed(2)}</span>
                              {animationDivs.map((div) => (
                                    <div
                                          key={div.id}
                                          className={`absolute inset-0 pointer-events-none text-sm flex items-center justify-center ${div.type === '+' ? 'currency-box-gain-animation' : 'currency-box-loss-animation'}`}
                                    >
                                          <span className={`flex items-center justify-center translate-y-[100%] ${div.type === '+' ? 'currency-value-gain-animation' : 'currency-value-loss-animation'}`}>
                                                +${div.amount} {/* Correctly calculate and render gained amount */}
                                          </span>
                                    </div>
                              ))}
                        </div>
                        <div className="h-[32px] w-[1px] bg-[#212121] header-left-spacer"></div>
                        <div className="font-mono lowercase">${incomeRate}/s</div>
                        <div className="h-[32px] w-[1px] bg-[#212121] header-left-spacer"></div>
                        <div className="">LEVEL {currentLevel}</div>
                  </div>
                  <div className="grow"></div>
                  <div className="flex items-center gap-8 pr-16" id="header-right">
                        <HeaderLink text="Game" href="game" />
                        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                        <HeaderLink text="All Stats" href="stats" />
                        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                        <HeaderLink text="Achievements" href="achievements" />
                        <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                        <HeaderLink text="Settings" href="settings" />
                  </div>
            </header>
      );
}
