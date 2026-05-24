import { usePlayer } from '../context/PlayerContext'
import { useListenerCount } from '../hooks/useListenerCount'

export function Player() {
  const { isPlaying, volume, toggle, setVolume } = usePlayer()
  const listeners = useListenerCount()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--player-height)',
        backgroundColor: 'var(--player-bg)',
        borderTop: '1px solid var(--player-border)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '0 1.5rem',
        zIndex: 100,
        fontFamily: 'var(--font-sans)',
      }}
    >
      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          width: 36,
          height: 36,
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius)',
          background: isPlaying ? 'var(--accent)' : 'transparent',
          color: isPlaying ? 'var(--bg)' : 'var(--fg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 14,
          letterSpacing: '0.05em',
          transition: 'background var(--media-transition-duration) var(--media-transition-easing)',
        }}
      >
        {isPlaying ? '■' : '▶'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: 200 }}>
        <span style={{ fontSize: 11, color: 'var(--fg)', opacity: 0.5, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
          Vol
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Volume"
          style={{ flex: 1, accentColor: 'var(--accent)' }}
        />
      </div>

      <div style={{ marginLeft: 'auto', fontSize: 11, letterSpacing: '0.08em', opacity: 0.5, textTransform: 'uppercase' }}>
        {listeners} listening
      </div>
    </div>
  )
}
