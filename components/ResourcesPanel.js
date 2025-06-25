'use client'

import { useEffect, useState } from 'react'
import useGameStore from '../store/gameStore'
import { SectionHeader } from './SectionHeader'
import { ListItem } from './ListItem'

export function ResourcesPanel () {
  const resources = useGameStore(state => state.resources)
  const resourcePool = useGameStore(state => state.resourcePool)
  const recentlyUpdatedResource = useGameStore(
    state => state.recentlyUpdatedResource
  )
  const availableResources = resources.filter(resource => resource.quantity > 0)
  const [animationDivs, setAnimationDivs] = useState([])
  const clearRecentlyUpdatedResource = () =>
    useGameStore.setState({ recentlyUpdatedResource: null })
  useEffect(() => {
    if (recentlyUpdatedResource) {
      // Checks to see if the recentlyUpdatedResource has changed. If it has, play animation.
      const animationId = `${recentlyUpdatedResource}-${Date.now()}`
      setAnimationDivs(prev => [
        ...prev,
        { id: animationId, resourceId: recentlyUpdatedResource }
      ])
      setTimeout(() => {
        setAnimationDivs(prev => prev.filter(div => div.id !== animationId))
      }, 4000) // Match animation duration
      clearRecentlyUpdatedResource()
    }
  }, [recentlyUpdatedResource])
  return (
    <>
      <div className='grow h-full'>
        <SectionHeader
          title='Resources'
          icon='/resources.svg'
          width={21}
          height={21}
          bgColor={'background'}
        />
        {availableResources.length === 0 ? (
          <p className='p-6 px-8'>You have no resources.</p>
        ) : (
          <div className='relative'>
            {availableResources.map(
              (
                resource // Map through availableResources.
              ) => (
                <div key={resource.id} className='relative'>
                  {' '}
                  {/* Create a div for each availableResources item */}
                  <ListItem
                    text={
                      resourcePool.find(res => res.id === resource.id)?.name ||
                      'Unknown Resource'
                    }
                    amount={resource.quantity || 0}
                  />
                  {animationDivs
                    .filter(div => div.resourceId === resource.id)
                    .map(div => (
                      <div
                        key={div.id}
                        className='absolute z-10 inset-0 animate-glow pointer-events-none'
                      ></div>
                    ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  )
}
