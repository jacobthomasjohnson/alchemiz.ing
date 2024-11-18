import { GatherPanel } from "./GatherPanel";
import { CraftingPanel } from "./CraftingPanel";

export function CenterPanel({ width }) {
  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-[1fr_1fr] gap-2 overflow-hidden center-panel">
      <GatherPanel />
      <CraftingPanel />
    </div>
  );
}
