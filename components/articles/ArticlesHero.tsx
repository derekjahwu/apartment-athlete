import { ORANGE, BORDER } from '@/lib/constants'

export default function ArticlesHero() {
  return (
    <section style={{ background: '#0a0a0a', borderBottom: `1px solid ${BORDER}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,82,26,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,82,26,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', padding: '72px 56px 60px', maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ display: 'block', width: 28, height: 2, background: ORANGE, flexShrink: 0 }} />
          <div style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700 }}>Knowledge Base</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3.5rem, 7vw, 7rem)', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 24, color: '#f5f4f0' }}>
          Guides, Programs
          <br />
          &amp;{' '}
          <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>Honest Reviews</em>
        </h1>
        <p style={{ fontSize: 14, color: '#888', maxWidth: 560, lineHeight: 1.7, fontWeight: 300 }}>
          Evidence-based workout guides, complete programs, and no-BS equipment reviews — all tested in real apartments by real athletes.
        </p>
        <div style={{ display: 'flex', gap: 52, marginTop: 52, paddingTop: 36, borderTop: `1px solid ${BORDER}` }}>
          {[['9', 'Articles Published'], ['6', 'Products Reviewed'], ['3', 'Expert Contributors']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#f5f4f0', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 9, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
