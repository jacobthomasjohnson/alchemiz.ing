import Image from "next/image";

export function SectionHeader({ title, icon, width, height, bgColor }) {
      return (
            <div className={`p-8 gap-2 flex items-center justify-center border-b border-[#212121] bg-[${bgColor}]`}>
                  <Image
                        src={icon}
                        width={width}
                        height={height}
                  />
                  {title}
            </div>
      )
}