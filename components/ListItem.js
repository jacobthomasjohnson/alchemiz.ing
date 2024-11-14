"use client";

export function ListItem({ text, amount }) {
      return (
            <div
                  className="p-6 py-4 w-full flex border-b border-[#212121] hover:bg-[#161616] hover:cursor-pointer"
            >
                  <div className="">
                        {text}
                  </div>
                  <div className="grow"></div>
                  <div className="">
                        {amount}
                  </div>
            </div>
      )
}