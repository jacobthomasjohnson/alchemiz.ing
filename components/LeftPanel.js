"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import Image from "next/image";

import useGameStore from '../store/gameStore';

export function LeftPanel() {
  return (
    <div className="w-full">

      {/* Potions in Inventory */}
      <SectionHeader title="inventory" icon="/inventory.svg" width={16} height={16} bgColor={"background"} />
      <ListItem text="Healing Salve" amount="10" />
      
      {/* Resources in Inventory */}
      <SectionHeader title="resources" icon="/resources.svg" width={20} height={20} bgColor={"background"} />
      <ListItem text="Herbs" amount="20" />
    
    </div>
  );
}
