"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";

import useGameStore from "@/store/gameStore";

export function UpgradesPanel() {

    const upgradesPool = useGameStore((state) => state.upgradesPool);
    const currentLevel = useGameStore((state) => state.level);
    const upgrades = useGameStore((state) => state.upgrades);
    const applyUpgrade = useGameStore((state) => state.applyUpgrade);
    const currency = useGameStore((state) => state.currency);

    const availableUpgrades = upgradesPool.filter((item) => item.requiredLevel <= currentLevel && !upgrades.includes(item.id));

    return (
        <div className="flex flex-col">
            <SectionHeader title="Upgrades" icon="/upgrades.svg" width={18} height={18} />
            <div className="max-h-[50%] overflow-auto">
                {availableUpgrades.map((upgrade) => (
                    <ToolTip 
                        tooltipText={upgrade.description}
                        bgColor={'bg-[#4A5E5D]'}
                    >
                        <ListItem 
                            unlockable="true"
                            key={upgrade.id} 
                            text={upgrade.name} 
                            amount={`$` + upgrade.cost}
                            onClick={() => applyUpgrade(upgrade.id)}
                            disabled={currency < upgrade.cost}
                        />
                    </ToolTip>
                ))}
            </div>
        </div>
    )
}