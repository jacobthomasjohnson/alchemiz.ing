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

// git add .
// git commit -m "Message"
// git push

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" type="image/png" />
      <body className="text-sm uppercase w-full h-full">
        <div className="h-full w-full flex flex-col" id="whole-page">
          <Header />
          <div className="flex h-full w-full px-16 gap-2 mb-16">
            <LeftPanel className="" /> {/* Contains Inventory, Resources Panels */}
            <CenterPanel /> {/* Contains Gather, Sell, Crafting, and Actions Panels */}
            <RightPanel /> {/* Contains Progress, Upgrades Panels */}
          </div>
        </div>
      </body>
    </html>
  );
}
