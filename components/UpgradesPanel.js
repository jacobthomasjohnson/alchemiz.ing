"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";

import useGameStore from "@/store/gameStore";

export function UpgradesPanel() {

    const upgradesPool = useGameStore((state) => state.upgradesPool);
    const upgrades = useGameStore((state) => state.upgrades);
    const currentLevel = useGameStore((state) => state.level);

    // const lockedUpgrades = upgradesPool.filter(
    //     (item) => !upgrades.some((upgrade) => upgrade.id === item.id)
    // ); // Returns all upgrades that have not been purchased from upgradesPool

    const availableUpgrades = upgradesPool.filter((item) => item.requiredLevel <= currentLevel);

    return (
        <div className="">
            <SectionHeader title="Upgrades" icon="/upgrades.svg" width={18} height={18} />
            {availableUpgrades.map((upgrade) => (
                <ToolTip 
                    tooltipText={upgrade.description}
                    bgColor={'bg-[#4A5E5D]'}
                >
                    <ListItem key={upgrade.id} text={upgrade.name} amount={`$` + upgrade.cost} />
                </ToolTip>
            ))}
        </div>
    )
}