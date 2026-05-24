import { useState, useCallback, useRef } from 'react'
import type { ImageEntry } from '../lib/images'

export interface MediaTransitionState {
  currentIndex: number
  nextIndex: number
  isTransitioning: boolean
  images: ImageEntry[]
  advance: () => void
  jumpTo: (index: number) => void
}

export function useMediaTransition(images: ImageEntry[]): MediaTransitionState {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1 % Math.max(images.length, 1))
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lockRef = useRef(false)

  const advance = useCallback(() => {
    if (lockRef.current || images.length < 2) return
    lockRef.current = true
    setIsTransitioning(true)

    const duration = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--media-transition-duration')
        .trim()
        .replace('ms', '')
    ) || 600

    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length
        setNextIndex((next + 1) % images.length)
        return next
      })
      setIsTransitioning(false)
      lockRef.current = false
    }, duration)
  }, [images.length])

  const jumpTo = useCallback((index: number) => {
    if (lockRef.current || index === currentIndex) return
    lockRef.current = true
    setIsTransitioning(true)
    setNextIndex(index)

    const duration = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--media-transition-duration')
        .trim()
        .replace('ms', '')
    ) || 600

    setTimeout(() => {
      setCurrentIndex(index)
      setNextIndex((index + 1) % images.length)
      setIsTransitioning(false)
      lockRef.current = false
    }, duration)
  }, [currentIndex, images.length])

  return { currentIndex, nextIndex, isTransitioning, images, advance, jumpTo }
}
