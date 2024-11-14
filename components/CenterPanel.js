import { GatherPanel } from "./GatherPanel";
import { CraftingPanel } from "./CraftingPanel";

export function CenterPanel({ width }) {
  return (
    <div className={`w-full h-full grid grid-cols-1 grid-rows-2 gap-2`}>
      <GatherPanel />
      <CraftingPanel />
    </div>
  );
}
