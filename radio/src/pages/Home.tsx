import { MediaStage } from '../components/MediaStage'
import { NinaEmbed } from '../components/NinaEmbed'

export function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        paddingBottom: 'var(--player-height)',
      }}
    >
      <div
        style={{
          flex: '1 0 0',
          minHeight: 'min(60vh, 600px)',
          position: 'relative',
        }}
      >
        <MediaStage transitionType="crossfade" autoRotateMs={6000} />
      </div>

      <div style={{ padding: '2rem 1.5rem' }}>
        {/* TODO: replace "your-hub-id" with your actual Nina hub identifier */}
        <NinaEmbed hubId="your-hub-id" height={380} />
      </div>
    </div>
  )
}
