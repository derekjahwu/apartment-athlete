const items = [
  'BODYWEIGHT STRENGTH',
  'HIIT IN 20 MINUTES',
  'ZERO EQUIPMENT',
  'APARTMENT APPROVED',
  'REAL RESULTS',
  'NO GYM REQUIRED',
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        background: '#e8521a',
        overflow: 'hidden',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="animate-ticker"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              color: '#f5f4f0',
              padding: '0 40px',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {item}
            <span style={{ fontSize: '0.6rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
