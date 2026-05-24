import { useEffect, useRef, useState } from 'react'
import { getImages } from '../lib/images'
import { useMediaTransition } from '../hooks/useMediaTransition'
import type { ImageEntry } from '../lib/images'

export type TransitionType = 'crossfade' | 'cut' | 'slide'

interface MediaStageProps {
  transitionType?: TransitionType
  autoRotateMs?: number
  onAdvance?: () => void
}

export function MediaStage({
  transitionType = 'crossfade',
  autoRotateMs = 6000,
  onAdvance,
}: MediaStageProps) {
  const [images, setImages] = useState<ImageEntry[]>([])
  const { currentIndex, nextIndex, isTransitioning, advance } =
    useMediaTransition(images)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    getImages().then(setImages)
  }, [])

  useEffect(() => {
    if (images.length < 2 || autoRotateMs <= 0) return
    autoRef.current = setInterval(() => {
      advance()
      onAdvance?.()
    }, autoRotateMs)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [images.length, autoRotateMs, advance, onAdvance])

  if (!images.length) {
    return <div className="media-stage media-stage--empty" aria-label="Loading…" />
  }

  const current = images[currentIndex]
  const next = images[nextIndex]

  return (
    <div
      className="media-stage"
      style={
        {
          '--mix': 'var(--media-blend-mode)',
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
        } as React.CSSProperties
      }
      onClick={() => advance()}
      role="button"
      aria-label="Next image"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && advance()}
    >
      {/* Layer A — current */}
      <img
        key={`a-${currentIndex}`}
        src={current.src}
        alt={current.alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'var(--media-blend-mode)' as React.CSSProperties['mixBlendMode'],
          opacity: isTransitioning ? 0 : 1,
          transition: buildTransition(transitionType),
        }}
      />
      {/* Layer B — next (pre-loaded underneath) */}
      <img
        key={`b-${nextIndex}`}
        src={next.src}
        alt={next.alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'var(--media-blend-mode)' as React.CSSProperties['mixBlendMode'],
          opacity: isTransitioning ? 1 : 0,
          transition: buildTransition(transitionType),
          zIndex: -1,
        }}
      />
    </div>
  )
}

function buildTransition(type: TransitionType): string {
  switch (type) {
    case 'cut':
      return 'none'
    case 'slide':
      // TODO: implement slide with translateX
      return 'opacity var(--media-transition-duration) var(--media-transition-easing)'
    case 'crossfade':
    default:
      return 'opacity var(--media-transition-duration) var(--media-transition-easing)'
  }
}
