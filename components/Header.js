'use client';

import { DisplayStat } from "./Stat";

import Image from "next/image";

export function Header() {
    return (
        <header className="w-full h-[150px] flex" id="header">
            <div className="flex items-center gap-8 pl-16" id="header-left">
                <div>
                    <Image src="/pink-iso-potion.gif" width={48} height={48} />
                </div>
                <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                <div>ALCHEMIZ.ING</div>
                <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                <DisplayStat type="currentMoney" />
                <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                <DisplayStat type="earnMoneyRate" />
                <div className="h-[32px] w-[1px] bg-[#212121]"></div>
                <DisplayStat type="currentLevel" />
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
    )
}