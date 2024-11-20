"use client";

export function ListItem({ unlockable, text, value = null, opacity, amount, onClick, columns = 2 }) {
  return (
    <div
      className={`p-6 py-4 transition-opacity ease-out w-full flex border-b border-[#212121] hover:bg-[#161616] hover:cursor-pointer ${unlockable === true ? 'unlocked' : ''}`}
      onClick={onClick}
      style={{ opacity }} // Apply dynamic opacity
    >
      {columns === 2 ? (
        <div className="w-full flex">
          <div>{text}</div>
          <div className="grow"></div>
          <div>{amount}</div>
        </div>
      ) : columns === 3 ? (
        <div className="w-full flex">
          <div className="w-[33%]">{text}</div>
          <div className="w-[33%] text-center">
            Sells for <span className="text-[#708B56]">${value}</span>
          </div>
          <div className="w-[33%] text-right">{amount}</div>
        </div>
      ) : (
        <>Error</>
      )}
    </div>
  );
}
