'use client'

import useGameStore from '@/store/gameStore'
import { Transmute } from './Transmute'

export function TransmutePanel () {
  const upgradesPool = useGameStore(state => state.upgradesPool)

  return (
    <div className=''>
      <Transmute />
    </div>
  )
}
