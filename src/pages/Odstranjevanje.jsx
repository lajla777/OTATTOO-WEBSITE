import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

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

function ParallaxSlika({ src }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setOffset(center * 0.3)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} style={{ height: '60vh', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,14,28,0.55)', zIndex: 1 }} />
      <img src={src} style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '130%',
        objectFit: 'cover',
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }} alt="" />
    </div>
  )
}

export default function Odstranjevanje() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: '#ffffff', minHeight: '100vh' }}>

      <style>{`
        .odstavek {
          background: #120e1c;
          padding: 80px 40px;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .odstavek { padding: 60px 20px; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img src="/kaja1.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18,14,28,1) 0%, rgba(18,14,28,0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(119,97,169,0.2) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {!isMobile && <Squiggle style={{ position: 'absolute', top: 100, right: 80, width: 60, height: 130, opacity: 0.2, zIndex: 2 }} />}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '0 20px',
        }}>
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--color-primary-light)', marginBottom: 16 }}>Storitev</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 52 : 88, fontWeight: 300, lineHeight: 1, margin: 0, color: '#ffffff' }}>
            Laser <em style={{ color: 'var(--color-primary-light)' }}>tretma</em>
          </h1>
        </div>
      </section>

      {/* 1. ODSTAVEK — Tatuje */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>01</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' }}>
            Odstranjevanje tetovaž –<br /><em style={{ color: 'var(--color-primary-light)' }}>za nov začetek</em>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
            Si želiš začeti znova? Laser učinkovito razgrajuje pigment in postopoma izbriše neželene tatuje.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              'Vidno bledenje že po prvih tretmajih',
              'Varno in nadzorovano odstranjevanje',
              'Koža ostane gladka in negovana',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: 16, flexShrink: 0, marginTop: 2 }}>✦</span>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: isMobile ? 14 : 15, color: 'var(--color-primary-light)', fontStyle: 'italic' }}>
            Čas je, da zapreš staro poglavje.
          </p>
        </div>
      </div>

      <ParallaxSlika src="/odstr1.jpg" />

      {/* 2. ODSTAVEK — Pege */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>02</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' }}>
            Odstranjevanje starostnih peg –<br /><em style={{ color: 'var(--color-primary-light)' }}>za popoln ten</em>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
            Temne lise, neenakomeren ten in znaki staranja? Obstaja rešitev!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              'Takoj bolj enakomerna in sveža koža',
              'Mladosten in sijoč videz',
              'Hitri tretmaji brez dolgega okrevanja',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: 16, flexShrink: 0, marginTop: 2 }}>✦</span>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: isMobile ? 14 : 15, color: 'var(--color-primary-light)', fontStyle: 'italic' }}>
            Naj tvoja koža ponovno zasije.
          </p>
        </div>
      </div>

      <ParallaxSlika src="/odstr2.jpg" />

      {/* 3. ODSTAVEK — Hollywood peel */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>03</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' }}>
            Hollywood Peel –<br /><em style={{ color: 'var(--color-primary-light)' }}>takojšen glow efekt</em>
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
            Tretma, ki ga obožujejo zvezdnice, zdaj na voljo tudi tebi.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              'Globinsko čiščenje in zožene pore',
              'Manj aken in nepravilnosti',
              'Takojšen "glow" brez okrevanja',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: 16, flexShrink: 0, marginTop: 2 }}>✦</span>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: isMobile ? 14 : 15, color: 'var(--color-primary-light)', fontStyle: 'italic' }}>
            Popolna izbira pred dogodki ali za svež videz vsak dan.
          </p>
        </div>
      </div>

      <ParallaxSlika src="/odstr3.jpg" />

      {/* 4. ODSTAVEK — Zakaj mi */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>04</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 24px', color: '#fff' }}>
            Zakaj stranke <em style={{ color: 'var(--color-primary-light)' }}>izbirajo nas?</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Vidni rezultati že po prvem obisku',
              'Individualno prilagojeni tretmaji',
              'Strokovnost in najsodobnejša tehnologija',
              'Sproščujoča in varna izkušnja',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: 16, flexShrink: 0, marginTop: 2 }}>✦</span>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOOKING CTA */}
      <div className="odstavek" style={{ textAlign: 'center', padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          
          <div style={{ display: 'inline-block', background: 'rgba(13,10,20,0.88)', backdropFilter: 'blur(12px)', borderRadius: 50, padding: '4px', border: '0.5px solid rgba(119,97,169,0.2)' }}>
            <Link to="/booking" style={{
              display: 'inline-block', padding: '14px 36px',
              background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
              color: '#ffffff', fontSize: 10, letterSpacing: 2.5,
              textTransform: 'uppercase', textDecoration: 'none', borderRadius: 50,
            }}>Rezerviraj termin</Link>
          </div>
        </div>
      </div>

      {/* GALERIJA */}
      <div className="odstavek" style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Link to="/galerija" style={{
            fontSize: 9, letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--color-primary-50)', marginBottom: 20, display: 'inline-block', textDecoration: 'none',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--color-primary-light)'}
          onMouseLeave={e => e.target.style.color = 'var(--color-primary-50)'}
          >Galerija →</Link>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 4 : 6 }}>
            {GALLERY.map(n => (
              <div key={n} style={{
                aspectRatio: '1 / 1',
                background: n % 2 === 0 ? 'var(--color-bg-2)' : 'var(--color-bg-3)',
                border: '0.5px solid var(--color-primary-20)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, letterSpacing: 1, color: 'var(--color-primary-25)',
                textTransform: 'uppercase',
              }}>foto {n}</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}