import { SectionHeaderColor } from "./SectionHeaderColor";
import { ActionButton } from "./ActionButton";
import ToolTip from "./ToolTip";

export function CenterPanel({ width }) {
  return (
    <div className={`w-full h-full grid grid-cols-1 grid-rows-2 gap-2`}>

      {/* Gather Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="GATHER" iconSrc="/sell.svg" bgColor="bg-[#4A5E5D]" iconWidth={15} iconHeight={16} />
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          {["HERBS", "WATER", "COAL", "MANA LEAVES", "CRYSTAL SHARDS", "LUNAR"].map((item) => (
            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span>{item}</span>
              <ActionButton label="COLLECT" />
            </div>
          ))}
        </div>
      </div>

      {/* Crafting Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="CRAFTING" iconSrc="/crafting.svg" bgColor="bg-[#6B4449]" iconWidth={20} iconHeight={20} />
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          <div className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121]">
          <span className=" w-[33%]">POTION</span>
          <span className=" w-[33%]">REQUIREMENTS</span>
          <span className=" w-[33%] text-end">CRAFT</span>
          </div>
          {["HEALING SALVE", "MINOR MANA", "ANTIDOTE"].map((item) => (

            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span className=" w-[33%]">{item}</span>
              <span className=" w-[33%]">1 HERB, 2 WATER</span>
              <div className="flex justify-end w-[33%]">
                <ActionButton label="CRAFT" />
              </div>
            </div>

          ))}
        </div>
      </div>



    </div>
  );
}
