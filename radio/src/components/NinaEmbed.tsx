// TODO: replace hubId with your Nina Protocol hub identifier
// Embed URL format: https://www.ninaprotocol.com/hubs/{hubId}/embed
// Docs: https://www.ninaprotocol.com

interface NinaEmbedProps {
  hubId: string
  height?: number
}

export function NinaEmbed({ hubId, height = 400 }: NinaEmbedProps) {
  const embedUrl = `https://www.ninaprotocol.com/hubs/${hubId}/embed`

  return (
    <div
      style={{
        width: '100%',
        border: '1px solid var(--player-border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <iframe
        src={embedUrl}
        title="Nina Protocol releases"
        width="100%"
        height={height}
        style={{ border: 'none', display: 'block' }}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  )
}
