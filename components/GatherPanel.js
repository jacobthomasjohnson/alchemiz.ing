"use client";

import { SectionHeaderColor } from "./SectionHeaderColor";
import { ListItem } from "./ListItem";
import ToolTip from "./ToolTip";
import Image from "next/image";
import useGameStore from '../store/gameStore';

export function GatherPanel() {

      const level = useGameStore((state) => state.level);
      const resources = useGameStore((state) => state.resources);
      const gatherResource = useGameStore((state) => state.gatherResource);

      const availableResources = resources.filter((resource) => resource.requiredLevel <= level);

      return (
            <>
                  <div className="flex flex-col bg-[#131313] rounded-xl rounded-tr-none rounded-tl-none">
                        <SectionHeaderColor title="GATHER" iconSrc="/sell.svg" bgColor="bg-[#4A5E5D]" iconWidth={15} iconHeight={16} />
                        <div className="flex justify-between p-4 px-6 items-center border-b-[1px] border-[#212121] bg-background">
                              <span className="flex gap-2">RESOURCE<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
                              <span className="flex gap-2 justify-end">ENERGY COST<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
                        </div>
                        {availableResources.length === 0 ? (
                              <p>No resources available for your level.</p>
                        ) : (
                              availableResources.map((resource) => (
                                    <ToolTip key={resource.name} tooltipText={`Gather ${resource.name}`}>
                                          <ListItem
                                                text={resource.name}
                                                amount={resource.energyCost || 0}
                                                action={<button onClick={() => gatherResource(resource.name)}>Collect</button>}
                                          />
                                    </ToolTip>
                              ))
                        )}
                  </div>
            </>
      )
}
