"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import { InventoryPanel } from "./InventoryPanel";
import { ResourcesPanel } from "./ResourcesPanel";

import useGameStore from '../store/gameStore';

export function LeftPanel() {
  return (
    <div className="w-full">
      <InventoryPanel />
      <ResourcesPanel />
    </div>
  );
}
