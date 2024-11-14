import { SectionHeaderColor } from "./SectionHeaderColor";
import { ActionButton } from "./ActionButton";

export function CenterPanel({ width }) {
  return (
    <div className={`w-[${width}] h-full grid grid-cols-2 grid-rows-2 gap-2`}>
      
      {/* Gather Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="GATHER" iconSrc="/gather.svg" bgColor="bg-[#4A5E5D]" iconWidth={15} iconHeight={16} />
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          {["HERBS", "WATER", "COAL", "MANA LEAVES", "CRYSTAL SHARDS", "LUNAR"].map((item) => (
            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span>{item}</span>
              <ActionButton label="COLLECT" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Sell Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="SELL" iconSrc="/sell.svg" bgColor="bg-[#3C4F66]" iconWidth={16} iconHeight={16} />
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          {["MATERIALS", "POTIONS"].map((item) => (
            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span>{item}</span>
              <ActionButton label="SELL ALL" />
            </div>
          ))}
        </div>
      </div>

      {/* Crafting Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="CRAFTING" iconSrc="/crafting.svg" bgColor="bg-[#6B4449]" iconWidth={20} iconHeight={20} />
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          {["HEALING SALVE", "MINOR MANA", "ANTIDOTE"].map((item) => (
            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span>{item}</span>
              <ActionButton label="CRAFT" />
            </div>
          ))}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="ACTIONS" iconSrc="/actions.svg" bgColor="bg-[#4A3345]" iconWidth={16} iconHeight={16} />
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          {["ACTION 1", "ACTION 2"].map((item) => (
            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span>{item}</span>
              <ActionButton label="DO THIS" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
