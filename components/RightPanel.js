"use client";

import React from 'react';
import { LevelBar } from './LevelBar';
import { EnergyBar } from './EnergyBar';
import { SectionHeader } from './SectionHeader';

export function RightPanel() {
  return (
    <div className="w-full">
      <SectionHeader title={`PROGRESS`} icon={"/progress.svg"} width={17} height={17} />
      <LevelBar />
      <EnergyBar />
      {/* Add other right panel components here */}
    </div>
  );
}
