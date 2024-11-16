"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import useGameStore from "../store/gameStore";
import { useEffect, useState } from "react";

export function ResourcesPanel() {
  const resources = useGameStore((state) => state.resources);
  const recentlyUpdatedResource = useGameStore((state) => state.recentlyUpdatedResource);
  const clearRecentlyUpdatedResource = () => useGameStore.setState({ recentlyUpdatedResource: null });

  const [animationDivs, setAnimationDivs] = useState([]);

  useEffect(() => {
    if (recentlyUpdatedResource) {
      // Create a unique div for the updated resource
      const animationId = `${recentlyUpdatedResource}-${Date.now()}`;

      setAnimationDivs((prev) => [
        ...prev,
        { id: animationId, resourceName: recentlyUpdatedResource },
      ]);

      // Remove the animation div after it finishes
      setTimeout(() => {
        setAnimationDivs((prev) => prev.filter((div) => div.id !== animationId));
      }, 1000); // Match animation duration

      // Clear the recently updated resource in Zustand
      clearRecentlyUpdatedResource();
    }
  }, [recentlyUpdatedResource]);

  const availableResources = resources.filter((resource) => resource.quantity > 0);

  return (
    <>
      <SectionHeader
        title="Resources"
        icon="/resources.svg"
        width={16}
        height={16}
        bgColor={"background"}
      />
      {availableResources.length === 0 ? (
        <p className="px-8 py-4">No resources are available.</p>
      ) : (
        <div className="relative">
          {availableResources.map((resource) => (
            <div key={resource.name} className="relative">
              <ListItem
                text={resource.name}
                amount={resource.quantity || 0}
              />
              {/* Render animation divs for this resource */}
              {animationDivs
                .filter((div) => div.resourceName === resource.name)
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
    </>
  );
}
