import "./globals.css";

import { Header } from "@/components/Header";

import { LeftPanel } from "@/components/LeftPanel";
import { CenterPanel } from "@/components/CenterPanel";
import { RightPanel } from "@/components/RightPanel";

import { InitGame } from "@/components/InitGame";

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
        <div className="h-full w-full flex flex-col overflow-hidden" id="whole-page">
          <InitGame />
          <Header />
          <div className="flex grow w-full px-16 gap-2 overflow-hidden" id="panels-container">
            <LeftPanel /> {/* Contains Inventory, Resources Panels */}
            <CenterPanel /> {/* Contains Gather, Sell, Crafting, and Actions Panels */}
            <RightPanel /> {/* Contains Progress, Upgrades Panels */}
          </div>
          <div className="h-[150px] min-h-[150px]" id="footer-space"></div>
        </div>


        {children}

      </body>
    </html>
  );
}
