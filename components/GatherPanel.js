"use client";

import { useState, useEffect } from "react";
import { SectionHeaderColor } from "./SectionHeaderColor";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import Image from "next/image";

import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import useGameStore from "../store/gameStore";

export function GatherPanel() {
  const level = useGameStore((state) => state.level);
  const resourcePool = useGameStore((state) => state.resourcePool);
  const gatherResource = useGameStore((state) => state.gatherResource);

  const [newResources, setNewResources] = useState([]); // Track new resources

  const displayedResources = resourcePool.filter(
    (resource) => resource.requiredLevel <= level
  );

  useEffect(() => {
    const unlocked = displayedResources.filter(
      (resource) => resource.requiredLevel === level
    );
    setNewResources(unlocked.map((r) => r.id)); // Track IDs of newly unlocked resources
  }, [level, displayedResources]);

  const handleGatherResource = (resourceId) => {
    const success = gatherResource(resourceId);
    if (success) {
      useGameStore.getState().setRecentlyUpdatedResource(resourceId);
    }
  };

  return (
    <div className="flex grow flex-col bg-[#131313] rounded-xl rounded-tr-none rounded-tl-none overflow-hidden">
      <SectionHeaderColor
        title="GATHER"
        iconSrc="/sell.svg"
        bgColor="bg-[#4A5E5D]"
        iconWidth={15}
        iconHeight={16}
      />
      <div className="flex justify-between p-4 px-6 items-center border-b-[1px] border-[#212121] bg-background">
        <span className="flex gap-2">
          RESOURCE
          <Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} />
        </span>
        <span className="flex gap-2 justify-end">
          ENERGY COST
          <Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} />
        </span>
      </div>
      <OverlayScrollbarsComponent
        options={{
          className: "os-theme-dark",
          scrollbars: {
            autoHide: "scroll",
            autoHideDelay: 100,
          },
        }}
        className="grow overflow-hidden"
      >
        <div className="grow overflow-auto">
          {displayedResources.length === 0 ? (
            <p>No resources available for your level.</p>
          ) : (
            displayedResources.map((resource) => {
              let starter = false;
              if(resource.id === 1) {
                starter = "true";
              }
              return (
                <ToolTip key={resource.id} tooltipText={`Gather ${resource.name}`}>
                  <div
                    id={`resource-${resource.id}`}
                    className={`relative`}
                    onClick={() => handleGatherResource(resource.id)}
                  >
                    <ListItem
                      unlockable={`${starter}`}
                      text={resource.name}
                      amount={resource.energyCost || 0}
                    />
                  </div>
                </ToolTip>
              );
            })
          )}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}
