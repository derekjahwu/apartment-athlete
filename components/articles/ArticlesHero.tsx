export default function ArticlesHero() {
  return (
    <section
      style={{
        background: '#0a0a0a',
        paddingTop: '64px',
        borderBottom: '1px solid #2a2a2a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(232,82,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,82,26,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          padding: '72px 80px 64px',
          maxWidth: '900px',
        }}
      >
        <div
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#e8521a',
            fontWeight: 700,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '2px',
              background: '#e8521a',
            }}
          />
          Knowledge Base
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: '28px',
            color: '#f5f4f0',
          }}
        >
          Guides, Programs
          <br />
          &amp;{' '}
          <em
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              color: '#e8521a',
            }}
          >
            Honest Reviews
          </em>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#888',
            maxWidth: '540px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Everything you need to train smarter at home — evidence-based workout
          guides, complete programs, and no-BS equipment reviews tested in real
          apartments.
        </p>

        {/* Stats strip */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid #2a2a2a',
          }}
        >
          {[
            ['9', 'Articles Published'],
            ['3', 'Equipment Reviewed'],
            ['2', 'Expert Contributors'],
          ].map(([num, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '2.2rem',
                  color: '#f5f4f0',
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#555',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
