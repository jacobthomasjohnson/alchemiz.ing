"use client";

import { useEffect, useState } from "react";
import { SectionHeaderColor } from "./SectionHeaderColor";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import Image from "next/image";
import useGameStore from "../store/gameStore";

import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export function CraftingPanel() {
  const level = useGameStore((state) => state.level);
  const inventoryPool = useGameStore((state) => state.inventoryPool);
  const craftItem = useGameStore((state) => state.craftItem);
  const checkRequiredResources = useGameStore((state) => state.checkRequiredResources);
  const resources = useGameStore((state) => state.resources); // React to resource changes
  const resourcePool = useGameStore((state) => state.resourcePool);

  const [newItems, setNewItems] = useState([]); // Track new items

  // Filter crafting items by player level
  const displayedItems = inventoryPool.filter((item) => item.requiredLevel <= level);

  // Track newly unlocked items
  useEffect(() => {
    const unlockedItems = displayedItems.filter((item) => item.requiredLevel === level);
    setNewItems(unlockedItems.map((item) => item.id)); // Track new item IDs
  }, [level, displayedItems]);

  return (
    <div className="flex flex-col grow bg-[#131313] rounded-xl rounded-tr-none rounded-tl-none overflow-hidden">
      <SectionHeaderColor
        title="CRAFTING"
        iconSrc="/crafting.svg"
        bgColor="bg-[#6B4449]"
        iconWidth={20}
        iconHeight={20}
      />
      <div className="flex justify-between p-4 px-6 items-center border-b-[1px] border-[#212121] bg-background">
        <span className="flex gap-2 w-[45%]">
          POTION
          <Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} />
        </span>
        <span className="w-[10%] text-center">VALUE</span>
        <span className="flex gap-2 justify-end  w-[45%]">
          REQUIREMENTS
          <Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} />
        </span>
      </div>
      <OverlayScrollbarsComponent
        options={{
          className: "os-theme-dark", // Predefined dark theme
          scrollbars: {
            autoHide: "scroll", // Auto-hide scrollbar when not in use
            autoHideDelay: 100, // Delay before hiding
          },
        }}
        className="grow overflow-hidden"
      >
        <div className="grow overflow-auto">
          {displayedItems.map((item) => {
            const canCraft = checkRequiredResources(item.id); // Pass item.id
            const isNew = newItems.includes(item.id); // Check if item is new
            
            return (
              <ToolTip
                key={item.id} // Use item.id as the key
                tooltipText={`Craft ${item.name}`}
                disabled={!canCraft}
              >
                <div
                  id={`craft-${item.id}`}
                  className={`relative ${isNew ? "unlocked" : ""}`}
                  onAnimationEnd={() =>
                    setNewItems((prev) => prev.filter((id) => id !== item.id))
                  }
                >
                  <ListItem
                    onClick={canCraft ? () => craftItem(item.id) : undefined} // Pass item.id to craftItem
                    columns={3}
                    value={item.cost}
                    amount={
                      item.requirements
                        .map(
                          (req) =>
                            `${req.quantity}x ${
                              resourcePool.find((res) => res.id === req.id)?.name || "Unknown"
                            }`
                        )
                        .join(" | ") || "No requirements"
                    } // Display all requirements with resource names
                    text={item.name}
                    opacity={canCraft ? 1 : 0.2} // Adjust opacity dynamically
                  />
                </div>
              </ToolTip>
            );
          })}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}
