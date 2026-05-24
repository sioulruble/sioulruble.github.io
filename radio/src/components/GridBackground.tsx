interface GridBackgroundProps {
  cellSize?: string
  lineColor?: string
  lineOpacity?: number
  bgColor?: string
}

export function GridBackground({
  cellSize = 'var(--grid-size)',
  lineColor = 'var(--grid-line)',
  lineOpacity,
  bgColor = 'var(--bg)',
}: GridBackgroundProps) {
  const opacityStyle = lineOpacity !== undefined ? String(lineOpacity) : undefined

  const style: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundColor: bgColor,
    backgroundImage: [
      `linear-gradient(to right, ${lineColor} 1px, transparent 1px)`,
      `linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
    ].join(', '),
    backgroundSize: `${cellSize} ${cellSize}`,
    ...(opacityStyle ? { opacity: opacityStyle } : {}),
  }

  return <div style={style} aria-hidden="true" />
}
