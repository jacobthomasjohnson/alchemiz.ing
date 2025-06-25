'use client'

import { useEffect } from 'react'
import useGameStore from '@/store/gameStore'

export function InitGame () {
  const startIncomeTimer = useGameStore(state => state.startIncomeTimer)

  useEffect(() => {
    startIncomeTimer()
  }, [startIncomeTimer])

  return <></>
}
