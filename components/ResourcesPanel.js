"use client";

import { SectionHeader } from "./SectionHeader";
import { ListItem } from "./ListItem";
import useGameStore from "../store/gameStore";
import { useEffect, useState } from "react";

export function ResourcesPanel() {

  // Retrieve Data
  const resources = useGameStore((state) => state.resources);
  const resourcePool = useGameStore((state) => state.resourcePool);
  const recentlyUpdatedResource = useGameStore((state) => state.recentlyUpdatedResource); // Tracks the recentlyUpdatedResource variable.
  const availableResources = resources.filter((resource) => resource.quantity > 0);

  // States
  const [animationDivs, setAnimationDivs] = useState([]);

  const clearRecentlyUpdatedResource = () => useGameStore.setState({ recentlyUpdatedResource: null }); // Function used to clear recentlyUpdatedResource once hook has run.

  // Hooks
  useEffect(() => {
    if (recentlyUpdatedResource) { // Checks to see if the recentlyUpdatedResource has changed. If it has, play animation.
      const animationId = `${recentlyUpdatedResource}-${Date.now()}`;
      setAnimationDivs((prev) => [
        ...prev,
        { id: animationId, resourceId: recentlyUpdatedResource },
      ]);
      setTimeout(() => {
        setAnimationDivs((prev) => prev.filter((div) => div.id !== animationId));
      }, 4000); // Match animation duration
      clearRecentlyUpdatedResource();
    }
  }, [recentlyUpdatedResource]);

  return (
    <>
      
      <SectionHeader
        title="Resources"
        icon="/resources.svg"
        width={21}
        height={21}
        bgColor={"background"}
      />

      {availableResources.length === 0 ? (
        
        <p className="px-8 py-4">You have no resources.</p>
      
      ) : (

        <div className="relative">

          {availableResources.map((resource) => ( // Map through availableResources.
            
            <div key={resource.id} className="relative"> {/* Create a div for each availableResources item */}
              
              <ListItem text={resourcePool.find((res) => res.id === resource.id)?.name || "Unknown Resource"} amount={resource.quantity || 0} />

              {console.log(availableResources)}

              {animationDivs.filter((div) => div.resourceId === resource.id).map((div) => (
                  
                <div key={div.id} className="absolute z-10 inset-0 animate-glow pointer-events-none"></div>

              ))}

            </div>

          ))}

        </div>

      )}

    </>
  );
}
