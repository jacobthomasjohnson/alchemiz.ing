"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";

import useGameStore from "@/store/gameStore";
import { Transmute } from "./Transmute";

export function TransmutePanel() {

    const upgradesPool = useGameStore((state) => state.upgradesPool);

    return (
        <div className="">
            <SectionHeader title="Transmute" icon="/gather.svg" width={18} height={18} />
            <Transmute />
        </div>
    )
}