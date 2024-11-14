import Image from "next/image";

export function RightPanel({ width }) {
  return (
    <div className={`w-full`}>

      <div className="p-8 gap-2 flex items-center justify-center border-b border-[#212121]">
        <Image
          src="/progress.svg"
          width={16}
          height={16}
        />
        PROGRESS
      </div>
      <div className="flex items-center p-8 border-b border-[#222222]">
        <div className="w-[25%]">
          LEVEL
        </div>
        <div className="w-[75%]">
          <div className="w-full h-6 overflow-hidden bg-[#222222] rounded-lg">
            <div className="w-[18%] h-full bg-[#708B56]"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center p-8 border-b border-[#222222]">
        <div className="w-[25%]">
          ENERGY
        </div>
        <div className="w-[75%]">
          <div className="w-full h-6 overflow-hidden bg-[#222222] rounded-lg">
            <div className="w-[90%] h-full bg-[#48768A]"></div>
          </div>
        </div>
      </div>

      <div className="p-8 gap-2 flex items-center justify-center border-b border-[#212121]">
        <Image
          src="/upgrades.svg"
          width={18}
          height={18}
        />
        UPGRADES
      </div>

      <div className="flex w-full p-8 border-[#222222] border-b-[2px] group hover:cursor-pointer">
        <div className="">
          HERB GARDEN
        </div>
        <div className="grow"></div>
        <div className="p-3 -m-3 outline outline-[1px] rounded-sm text-xs flex items-center outline-[#1C1C1C] group-hover:bg-[#1C1C1C]">
          UPGRADE
        </div>
      </div>

      {/* <div className="flex w-full p-8 border-[#222222] border-b-[2px] group hover:cursor-pointer">
        <div className="">
          MANA SPRING
        </div>
        <div className="grow"></div>
        <div className="p-3 -m-3 outline outline-[1px] rounded-sm text-xs flex items-center outline-[#1C1C1C] group-hover:bg-[#1C1C1C]">
          UPGRADE
        </div>
      </div>

      <div className="flex w-full p-8 border-[#222222] border-b-[2px] group hover:cursor-pointer">
        <div className="">
          DISTILLATION APPARATUS
        </div>
        <div className="grow"></div>
        <div className="p-3 -m-3 outline outline-[1px] rounded-sm text-xs flex items-center outline-[#1C1C1C] group-hover:bg-[#1C1C1C]">
          UPGRADE
        </div>
      </div> */}

    </div>
  )
}