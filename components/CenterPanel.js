import { SectionHeaderColor } from "./SectionHeaderColor";
import { ActionButton } from "./ActionButton";
import ToolTip from "./ToolTip";
import Image from "next/image";

export function CenterPanel({ width }) {
  return (
    <div className={`w-full h-full grid grid-cols-1 grid-rows-2 gap-2`}>

      {/* Gather Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="GATHER" iconSrc="/sell.svg" bgColor="bg-[#4A5E5D]" iconWidth={15} iconHeight={16} />
        <div className="flex justify-between p-4 px-6 items-center border-b-[1px] border-[#212121] bg-background">
          <span className="w-[33%] flex gap-2">POTION<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
          <span className="w-[33%] flex gap-2">ENERGY COST<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
          <span className="w-[33%] flex gap-2 justify-end">COLLECT<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
        </div>
        <div className="flex flex-col gap-1 p-2 overflow-auto">
          {["HERBS", "WATER", "COAL", "MANA LEAVES", "CRYSTAL SHARDS", "LUNAR"].map((item) => (
            <div key={item} className="flex justify-between p-4 -mt-1 border-b-[1px] border-[#212121] group hover:cursor-pointer">
              <span className="w-[33%]">{item}</span>
              <span className="w-[33%]">10</span>
              <span className="w-[33%] flex justify-end"><ActionButton className="" label="COLLECT" /></span>
            </div>
          ))}
        </div>
      </div>

      {/* Crafting Section */}
      <div className="flex flex-col bg-[#131313]">
        <SectionHeaderColor title="CRAFTING" iconSrc="/crafting.svg" bgColor="bg-[#6B4449]" iconWidth={20} iconHeight={20} />
        <div className="flex justify-between p-4 px-6 items-center border-b-[1px] border-[#212121] bg-background">
          <span className="w-[33%] flex gap-2">POTION<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
          <span className=" w-[33%] flex gap-2">REQUIREMENTS<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
          <span className=" w-[33%] flex gap-2 justify-end">CRAFT<Image alt="Down Carrot" src="/down-carrot.svg" width={8} height={8} /></span>
        </div>

        <div className="flex flex-col gap-1 p-2 overflow-auto">
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
