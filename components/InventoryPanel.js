"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import useGameStore from '../store/gameStore';

export function InventoryPanel() {

  const inventory = useGameStore((state) => state.inventory);

  return (
    <>
      <SectionHeader title="Inventory" icon="/inventory.svg" width={16} height={16} bgColor={"background"} />
      {inventory.length === 0 ? (
        <p className="px-8 py-4">Your inventory is empty.</p>
      ) : (
        inventory.map((item) => (
          <ToolTip key={item.name} tooltipText={`Inspect ${item.name}`}>
            <ListItem text={item.name} amount={item.quantity} />
          </ToolTip>
        ))
      )}
    </>
  );
}
