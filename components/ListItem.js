"use client";

import { useState } from "react";

export function ListItem({ text, amount }) {
      return (
            <div
                  className="p-8 py-4 w-full flex border-b border-[#212121] hover:bg-[#131313] hover:cursor-pointer"
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