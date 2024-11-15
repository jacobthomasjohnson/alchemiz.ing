"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import useGameStore from '../store/gameStore';

export function InventoryPanel() {
  const inventory = useGameStore((state) => state.inventory);
  const resources = useGameStore((state) => state.resources);

  return (
    <>
      <SectionHeader title="Inventory" icon="/inventory.svg" width={16} height={16} bgColor={"background"} />
      {inventory.length === 0 ? (
        <p className="px-8 py-4">Your inventory is empty.</p>
      ) : (
        inventory.map((item) => {
          // Find the corresponding resource in resources by matching the name
          const resource = resources.find((res) => res.name === item.name);
          const description = resource ? resource.description : "No description available";

          return (
            <ToolTip key={item.name} tooltipText={description}>
              <ListItem text={item.name} amount={item.quantity} />
            </ToolTip>
          );
        })
      )}
    </>
  );
}
