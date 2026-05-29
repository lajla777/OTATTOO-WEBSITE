import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in') // 'in' | 'hold' | 'out'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 800)
    const t2 = setTimeout(() => setPhase('out'), 2000)
    const t3 = setTimeout(() => onDone(), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0612',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 20,
      opacity: phase === 'out' ? 0 : 1,
      transition: phase === 'out' ? 'opacity 0.8s ease' : 'opacity 0.6s ease',
      pointerEvents: phase === 'out' ? 'none' : 'auto',
    }}>
      <img
        src="/logo.jpg"
        alt="OTattoo"
        style={{
          width: 180, height: 180, objectFit: 'contain',
          filter: 'brightness(0) invert(1)',
          opacity: phase === 'in' ? 0 : 1,
          transform: phase === 'in' ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      />
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 13, letterSpacing: 6, textTransform: 'uppercase',
        color: 'rgba(168,85,247,0.6)',
        opacity: phase === 'in' ? 0 : 1,
        transition: 'opacity 1s ease 0.3s',
      }}>
        OTattoo Studio
      </p>
    </div>
  )
}