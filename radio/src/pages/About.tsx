const FOUNDERS = [
  {
    name: 'Ada Lovelace',
    role: 'Artistic Direction',
    bio: 'Poet of algorithms and lover of deep frequencies. Spent a decade curating underground labels before founding the station.',
  },
  {
    name: 'Nikola Tesla',
    role: 'Technology',
    bio: 'Obsessive about signal fidelity and open protocols. Believes every byte of audio deserves a lossless journey.',
  },
  {
    name: 'Grace Hopper',
    role: 'Community',
    bio: 'Built the listener network from 0 to 1. Debugging is her love language; so is finding great music in unexpected places.',
  },
]

export function About() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '4rem 1.5rem',
        paddingBottom: 'calc(var(--player-height) + 2rem)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--fg)',
          opacity: 0.4,
          marginBottom: '3rem',
        }}
      >
        About
      </h1>

      <div style={{ display: 'grid', gap: '1px', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {FOUNDERS.map((f) => (
          <div
            key={f.name}
            style={{
              border: '1px solid var(--player-border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              background: 'rgba(250,250,250,0.6)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--fg)',
                opacity: 0.4,
                marginBottom: '0.25rem',
              }}
            >
              {f.role}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--fg)',
                marginBottom: '0.75rem',
              }}
            >
              {f.name}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--fg)',
                opacity: 0.65,
              }}
            >
              {f.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
