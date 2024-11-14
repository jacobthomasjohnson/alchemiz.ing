import Image from "next/image";

export function SectionHeaderColor({ title, iconSrc, bgColor, iconWidth, iconHeight }) {
  return (
    <div className={`flex items-center justify-center gap-2 p-8 ${bgColor}`}>
      <Image src={iconSrc} width={iconWidth} height={iconHeight} />
      {title}
    </div>
  );
}
