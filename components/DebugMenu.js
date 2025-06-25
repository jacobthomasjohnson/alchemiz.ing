'use client'

import useDebugStore from '@/store/debugStore'
import { useEffect, useRef } from 'react'

export function DebugMenu () {
  const debugMessage = useDebugStore(state => state.debugMessage)
  const debugTrigger = useDebugStore(state => state.debugTrigger) // Listen to the trigger
  const debugColor = useDebugStore(state => state.debugColor)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!debugMessage) return

    const debugDiv = document.createElement('div')
    debugDiv.textContent = debugMessage
    debugDiv.className =
      'debug-message mb-2 p-1 rounded transition-opacity duration-4000'

    // pick a colour
    const textColor =
      debugColor === 'blue'
        ? '#48768A'
        : debugColor === 'red'
        ? '#6B4449'
        : debugColor === 'green'
        ? '#4A5E5D'
        : undefined

    if (textColor) debugDiv.style.color = textColor
    debugDiv.style.animation = 'fade-out 2s ease-out 2s forwards'

    containerRef.current?.appendChild(debugDiv)

    const timer = setTimeout(() => debugDiv.remove(), 4000)
    return () => clearTimeout(timer)
  }, [debugTrigger, debugMessage, debugColor])

  return (
    <div
      ref={containerRef} // Attach the container to the ref
      className='absolute bottom-0 w-full p-2 font-mono pointer-events-none'
    >
      {/* Debug messages are dynamically appended here */}
    </div>
  )
}
