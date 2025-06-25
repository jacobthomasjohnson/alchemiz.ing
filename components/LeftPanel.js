'use client'

import { InventoryPanel } from './InventoryPanel'
import { ResourcesPanel } from './ResourcesPanel'

export function LeftPanel () {
  return (
    <div className='w-full h-full flex flex-col gap-2 overflow-hidden left-panel bg-background rounded-3xl'>
      <ResourcesPanel />
      <InventoryPanel />
    </div>
  )
}
