"use client";

import React from 'react';
import { LevelBar } from './LevelBar';
import { EnergyBar } from './EnergyBar';
import { SectionHeader } from './SectionHeader';
import { UpgradesPanel } from './UpgradesPanel';

export function RightPanel() {
  return (
    <div className="w-[100%] right-panel">
      <SectionHeader title={`PROGRESS`} icon={"/progress.svg"} width={17} height={17} />
      <LevelBar />
      <EnergyBar />
      <UpgradesPanel />
    </div>
  );
}
