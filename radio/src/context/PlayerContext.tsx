import { createContext, useContext, useRef, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface PlayerState {
  isPlaying: boolean
  volume: number
  listenerCount: number
  audioRef: React.RefObject<HTMLAudioElement>
  toggle: () => void
  setVolume: (v: number) => void
}

const PlayerContext = createContext<PlayerState | null>(null)

export function PlayerProvider({ children, audioRef }: { children: ReactNode; audioRef: React.RefObject<HTMLAudioElement> }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.8)

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPlaying, audioRef])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) audioRef.current.volume = v
  }, [audioRef])

  return (
    <PlayerContext.Provider value={{ isPlaying, volume, listenerCount: 42, audioRef, toggle, setVolume }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}
