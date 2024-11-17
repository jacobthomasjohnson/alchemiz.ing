"use client";

import { SectionHeaderColor } from "./SectionHeaderColor";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import Image from "next/image";
import useGameStore from "../store/gameStore";

export function CraftingPanel() {
  const level = useGameStore((state) => state.level);
  const inventoryPool = useGameStore((state) => state.inventoryPool);
  const craftItem = useGameStore((state) => state.craftItem);
  const checkRequiredResources = useGameStore((state) => state.checkRequiredResources);
  const resources = useGameStore((state) => state.resources); // React to resource changes

  // Filter crafting items by player level
  const displayedItems = inventoryPool.filter((item) => item.requiredLevel <= level);

  return (
    <div className="flex flex-col bg-[#131313] rounded-xl rounded-tr-none rounded-tl-none">
      <SectionHeaderColor
        title="CRAFTING"
        iconSrc="/crafting.svg"
        bgColor="bg-[#6B4449]"
        iconWidth={20}
        iconHeight={20}
      />
      <div className="flex justify-between p-4 px-6 items-center border-b-[1px] border-[#212121] bg-background">
        <span className="flex gap-2">
          POTION
          <Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} />
        </span>
        <span className="flex gap-2 justify-end">
          REQUIREMENTS
          <Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} />
        </span>
      </div>
      {displayedItems.length === 0 ? (
        <p className="px-8 py-4">No crafts are available at your level.</p>
      ) : (
        displayedItems.map((item) => {
          const canCraft = checkRequiredResources(item.name); // Dynamically check craftability

          return (
            <ToolTip key={item.name} tooltipText={`Craft ${item.name}`}>
              <ListItem
                onClick={canCraft ? () => craftItem(item.name) : undefined} // Disable crafting if not craftable
                columns={3}
                value={item.cost}
                amount={
                  item.requirements
                    .map((req) => `${req.quantity}x ${req.item}`)
                    .join(" | ") || "No requirements"
                } // Display all requirements
                text={item.name}
                opacity={canCraft ? 1 : 0.25} // Adjust opacity dynamically
              />
            </ToolTip>
          );
        })
      )}
    </div>
  );
}
