import { useState, useEffect } from 'react'

const SLIDES = [
  '/tatu1.webp',
  '/galerija1.webp',
  '/odstr1.webp',
]

const CENIK = [
  {
    kategorija: 'Tetoviranje',
    icon: '🖋',
    postavke: [
      { naziv: 'Tetovaža do 5 cm', cena: 'od 50,00 €' },
      { naziv: 'Tetovaža do 10 cm', cena: 'od 100,00 €' },
      { naziv: 'Tetovaža do 15 cm', cena: 'od 150,00 €' },
      { naziv: 'Tetovaža do 20 cm', cena: 'od 200,00 €' },
      { naziv: 'Tetovaža nad 20 cm', cena: 'po dogovoru' },
    ],
  },
  {
    kategorija: 'Odstranjevanje',
    icon: '✦',
    postavke: [
      { naziv: 'Odstranjevanje do 5 cm', cena: 'od 50,00 €' },
      { naziv: 'Odstranjevanje do 10 cm', cena: 'od 70,00 €' },
      { naziv: 'Odstranjevanje do 15 cm', cena: 'od 90,00 €' },
      { naziv: 'Odstranjevanje do 20 cm', cena: 'od 120,00 €' },
      { naziv: 'Odstranjevanje nad 20 cm', cena: 'po dogovoru' },
    ],
  },
]

export default function Cenik() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{
  fontFamily: "'Montserrat', sans-serif",
  color: '#ffffff',
  minHeight: '100vh',
  position: 'relative',
}}>

      {/* Slideshow ozadje */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {SLIDES.map((src, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}>
            <img src={src} alt="" style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'blur(12px)',
              transform: 'scale(1.05)',
            }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,16,0.75)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.2) 0%, transparent 70%)' }} />
      </div>

      {/* Vsebina */}
      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '100px 16px 60px' : '120px 20px 80px' }}>

        {/* Naslov */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 52 : 72, fontWeight: 300, lineHeight: 1,
            margin: 0, color: '#ffffff',
          }}>
            Cenik<em style={{ color: 'var(--color-primary-light)' }}> storitev</em>
          </h1>
        </div>

        {/* Cenik kartice */}
        <div style={{
          maxWidth: 1020, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 30,
        }}>
          {CENIK.map(kat => (
            <div key={kat.kategorija} style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              borderRadius: 16,
              padding: '32px 25px',
            }}>
              <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 20, marginBottom: 8, display: 'block' }}>{kat.icon}</span>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28, fontWeight: 300, margin: 0, color: '#ffffff',
                }}>
                  {kat.kategorija}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {kat.postavke.map(p => (
                  <div key={p.naziv} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                  }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                      {p.naziv}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--color-primary-light)', whiteSpace: 'nowrap', fontWeight: 500 }}>
                      {p.cena}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Opomba */}
        <p style={{
          textAlign: 'center', fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
          maxWidth: 700, margin: '40px auto 0',
        }}>
          *Ker izvajalec ni davčni zavezanec, DDV ni obračunan na podlagi 1. odstavka 94. člena Zakona o davku na dodano vrednost (ZDDV-1).<br />
          *Cenik je pripravljen v skladu z ZVPot, ZDDV-1 in Pravilnikom o načinu označevanja cen blaga in storitev.<br /><br />

          Veljavno od 9. 9. 2025
        </p>

      </div>
    </div>
  )
}