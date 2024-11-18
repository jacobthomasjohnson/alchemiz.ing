"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import useGameStore from "../store/gameStore";
import { useEffect, useState } from "react";

export function InventoryPanel() {
  const inventory = useGameStore((state) => state.inventory);
  const recentlyUpdatedInventoryItem = useGameStore((state) => state.recentlyUpdatedInventoryItem);
  const clearRecentlyUpdatedInventoryItem = () => useGameStore.setState({ recentlyUpdatedInventoryItem: null });

  const [animationDivs, setAnimationDivs] = useState([]);

  useEffect(() => {
    if (recentlyUpdatedInventoryItem) {
      // Create a unique div for the updated inventory item
      const animationId = `${recentlyUpdatedInventoryItem}-${Date.now()}`;

      setAnimationDivs((prev) => [
        ...prev,
        { id: animationId, itemId: recentlyUpdatedInventoryItem },
      ]);

      // Remove the animation div after it finishes
      setTimeout(() => {
        setAnimationDivs((prev) => prev.filter((div) => div.id !== animationId));
      }, 1000); // Match animation duration

      // Clear the recently updated inventory item in Zustand
      clearRecentlyUpdatedInventoryItem();
    }
  }, [recentlyUpdatedInventoryItem]);

  return (
    <>
      <div className="grow max-h-[50%]">
            <SectionHeader title="Inventory" icon="/inventory.svg" width={16} height={16} bgColor={"background"} />
            {inventory.length === 0 ? (
            <p className="px-8 py-4">Your inventory is empty.</p>
            ) : (
            <div className="relative">
            {inventory.map((item) => (
                  <div key={item.id} className="relative">
                  <ToolTip bgColor={`bg-[#708B56]`} tooltipText={`Sell ${item.name} for $${item.cost}`}>
                  <ListItem
                        onClick={() => useGameStore.getState().sellItem(item.id)}
                        text={item.name}
                        amount={item.quantity}
                  />
                  </ToolTip>
                  {/* Render animation divs for this inventory item */}
                  {animationDivs
                  .filter((div) => div.itemId === item.id)
                  .map((div) => (
                        <div
                        key={div.id}
                        className="absolute z-10 inset-0 animate-glow pointer-events-none"
                        ></div>
                  ))}
                  </div>
            ))}
            </div>
            )}   
      </div>

    </>
  );
}
