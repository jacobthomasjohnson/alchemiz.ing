"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import useGameStore from '../store/gameStore';

export function ResourcesPanel() {

  const level = useGameStore((state) => state.level);
  const resources = useGameStore((state) => state.resources);
  const gatherResource = useGameStore((state) => state.gatherResource);
  const availableResources = resources.filter((resource) => resource.quantity > 0);

  return (
    <>
      <SectionHeader title="Resources" icon="/resources.svg" width={16} height={16} bgColor={"background"} />
      {availableResources.length === 0 ? (
        <p className="px-8 py-4">No resources are available.</p>
      ) : (
        availableResources.map((resource) => (
            <ListItem
              text={resource.name}
              amount={resource.quantity || 0}
              action={<button onClick={() => gatherResource(resource.name)}>Collect</button>}
            />
        ))
      )}
    </>
  );
}
