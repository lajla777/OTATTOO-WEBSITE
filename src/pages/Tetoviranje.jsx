import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SLIDES = [
  { src: '/kaja2.jpg' },
  { src: '/kaja1.jpg' },
  { src: '/hero.jpg' },
]

const GALLERY = [1, 2, 3, 4, 5, 6]

function Squiggle({ style }) {
  return (
    <svg style={style} viewBox="0 0 80 160" fill="none">
      <path d="M40 8 C58 24, 22 42, 40 62 C58 82, 22 102, 40 122 C58 142, 24 155, 40 155"
        stroke="var(--color-primary)" strokeWidth="1.2" fill="none" />
      <path d="M26 18 C40 30, 16 50, 30 70 C44 90, 16 110, 32 130"
        stroke="var(--color-primary)" strokeWidth="0.6" fill="none" opacity="0.45" />
    </svg>
  )
}

export default function Tetoviranje() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: '#ffffff', minHeight: '100vh' }}>

      <style>{`
        .parallax-img {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          height: 60vh;
          position: relative;
        }
        .parallax-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(23,18,39,0.55);
        }
        .odstavek {
          background: #120f1e;
          padding: 80px 40px;
          position: relative;
          z-index: 2;
        }
      `}</style>

{/* HERO */}
<section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
  <img src="/kaja2.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
  <div style={{
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(23,18,39,1) 0%, rgba(23,18,39,0.4) 50%, transparent 100%)',
    pointerEvents: 'none',
  }} />
  <div style={{
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 50% 60%, rgba(119,97,169,0.2) 0%, transparent 65%)',
    pointerEvents: 'none',
  }} />
  <Squiggle style={{ position: 'absolute', top: 100, right: 80, width: 60, height: 130, opacity: 0.2, zIndex: 2 }} />
  <div style={{
    position: 'absolute', inset: 0, zIndex: 3,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', textAlign: 'center',
  }}>
    <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--color-primary-light)', marginBottom: 16 }}>Storitev</p>
    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 88, fontWeight: 300, lineHeight: 1, margin: 0, color: '#ffffff' }}>
      Tetovi<em style={{ color: 'var(--color-primary-light)' }}>ranje</em>
    </h1>
  </div>
</section>

      {/* 1. ODSTAVEK */}
      <div className="odstavek">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>01</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px', color: '#fff' }}>
            Zakaj izbrati <em style={{ color: 'var(--color-primary-light)' }}>nas?</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'Certificirana tattoo & PMU artistka z izkušnjami',
              'Vedno dobro vzdušje — sproščeno, osebno, brez pritiska',
              'Tetoviranje je moja največja strast in nekaj, v kar vlagam svoj čas, energijo in pozornost do detajlov.',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: 16, flexShrink: 0, marginTop: 3 }}>✦</span>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARALLAX SLIKA 1 */}
      <div className="parallax-img" style={{ backgroundImage: 'url(/tatu2.jpg)' }} />

      {/* 2. ODSTAVEK */}
      <div className="odstavek">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>02</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px', color: '#fff' }}>
            Moj <em style={{ color: 'var(--color-primary-light)' }}>stil</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            Najraje ustvarjam v čistem, natančnem slogu, kot sta fine line in stipple shading, kjer lahko res pride do izraza subtilnost linij in senčenja. Kljub temu sem odprta tudi za druge stile in se rada prilagodim željam vsake posamezne stranke.
          </p>
        </div>
      </div>

      {/* PARALLAX SLIKA 2 */}
      <div className="parallax-img" style={{ backgroundImage: 'url(/tatu6.jpg)' }} />

      {/* 3. ODSTAVEK */}
      <div className="odstavek">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>03</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px', color: '#fff' }}>
            Tvoja ideja, <em style={{ color: 'var(--color-primary-light)' }}>moja izvedba</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            Vsako idejo poslušam z občutkom in jo vzamem resno. Skupaj jo razvijemo v dizajn, ki ni samo vizualno lep, ampak tudi oseben in premišljen. Pomembno mi je, da se v procesu počutiš sproščeno in da na koncu dobiš nekaj, kar res odraža tebe.
          </p>
        </div>
      </div>

      {/* PARALLAX SLIKA 3 */}
      <div className="parallax-img" style={{ backgroundImage: 'url(/tatu4.jpg)' }} />

      {/* BOOKING CTA */}
      <div className="odstavek" style={{ textAlign: 'center', padding: '60px 40px' }}>
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
  <div style={{ position: 'relative', zIndex: 1 }}>
    <div style={{
      display: 'inline-block',
      background: 'rgba(13, 10, 20, 0.88)',
      backdropFilter: 'blur(12px)',
      borderRadius: 50,
      padding: '4px',
      border: '0.5px solid rgba(119,97,169,0.2)',
    }}>
      <Link to="/booking" style={{
        display: 'inline-block', padding: '14px 36px',
        background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
        color: '#ffffff', fontSize: 10, letterSpacing: 2.5,
        textTransform: 'uppercase', textDecoration: 'none', borderRadius: 50,
      }}>
        Rezerviraj termin
      </Link>
    </div>
  </div>
</div>

      {/* GALERIJA */}
      <div className="odstavek" style={{ paddingTop: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/galerija" style={{
            fontSize: 9, letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--color-primary-50)', marginBottom: 20, display: 'inline-block',
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--color-primary-light)'}
          onMouseLeave={e => e.target.style.color = 'var(--color-primary-50)'}
          >
            Galerija →
          </Link>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {GALLERY.map(n => (
              <div key={n} style={{
                aspectRatio: '1 / 1',
                background: n % 2 === 0 ? 'var(--color-bg-2)' : 'var(--color-bg-3)',
                border: '0.5px solid var(--color-primary-20)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, letterSpacing: 1, color: 'var(--color-primary-25)',
                textTransform: 'uppercase',
              }}>
                foto {n}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}