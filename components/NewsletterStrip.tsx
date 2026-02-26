import EmailForm from './EmailForm'

export default function NewsletterStrip() {
  return (
    <div
      id="newsletter"
      style={{
        background: '#e8521a',
        padding: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '60px',
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            color: '#f5f4f0',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          Train Smarter.
          <br />
          Every Week.
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.75)',
            marginTop: '8px',
          }}
        >
          One email. Three workouts. Zero fluff. Free forever.
        </p>
      </div>

      <div style={{ flexShrink: 0, minWidth: '400px' }}>
        <EmailForm
          placeholder="your@email.com"
          buttonText="Join Free →"
          dark={true}
        />
      </div>
    </div>
  )
}
