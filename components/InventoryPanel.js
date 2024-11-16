"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import useGameStore from '../store/gameStore';

export function InventoryPanel() {

  const inventory = useGameStore((state) => state.inventory);
  const inventoryPool = useGameStore((state) => state.inventoryPool);
  const sellItem = useGameStore((state) => state.sellItem);

  return (
    <>
      <SectionHeader title="Inventory" icon="/inventory.svg" width={16} height={16} bgColor={"background"} />
      {inventory.length === 0 ? (
        <p className="px-8 py-4">Your inventory is empty.</p>
      ) : (
        inventory.map((item) => {

          // const craftedItem = inventory.find((item) => item.name === inventory.name);

          const itemName = item ? item.name : "Not an item";

          return (
            <ToolTip
              key={item.name}
              tooltipText={`Sell ${itemName}`}
            >
              <ListItem
                onClick={() => sellItem(item.name)} // Use arrow function to pass the name
                text={item.name}
                amount={item.quantity}
              />
            </ToolTip>
          );
        })
      )}
    </>
  );
}
