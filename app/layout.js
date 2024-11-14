import "./globals.css";
import Image from "next/image";

import { Header } from "@/components/Header";

import { LeftPanel } from "@/components/LeftPanel";
import { CenterPanel } from "@/components/CenterPanel";
import { RightPanel } from "@/components/RightPanel";

export const metadata = {
  title: "Alchemiz.ing",
  description: "Become the Greatest Alchemist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" type="image/png" />
      <body className="text-sm uppercase w-full h-full">
        <div className="h-full w-full flex flex-col" id="whole-page">
          <Header />
          <div className="w-full h-full flex px-16 gap-4 mb-16">
            <LeftPanel width={`30%`} /> {/* Contains Inventory, Resources Panels */}
            <CenterPanel width={`40%`} /> {/* Contains Gather, Sell, Crafting, and Actions Panels */}
            <RightPanel width={`30%`} /> {/* Contains Progress, Upgrades Panels */}
          </div>
        </div>
      </body>
    </html>
  );
}
