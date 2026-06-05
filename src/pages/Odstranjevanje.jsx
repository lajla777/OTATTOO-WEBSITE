import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const GALLERY = [
  { src: '/galerija19.webp', alt: 'tetovaža 1' },
  { src: '/galerija4.webp', alt: 'tetovaža 2' },
  { src: '/galerija14.webp', alt: 'tetovaža 4' },
  { src: '/galerija5.webp', alt: 'tetovaža 5' },
  { src: '/galerija24.webp', alt: 'tetovaža 6' },
  { src: '/galerija21.webp', alt: 'tetovaža 7' },
]

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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,14,28,0.4)', zIndex: 1 }} />
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
  const [selectedImage, setSelectedImage] = useState(null)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ fontFamily: "'Google Sans', sans-serif", color: '#ffffff', minHeight: '100vh' }}>

      <style>{`
        .odstavek {
          background: rgba(18,14,28,0.4) ;
          padding: 80px 40px;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .odstavek { padding: 60px 20px; }
        }
          .galleryCard:hover .galleryOverlay {
          opacity: 1;
        }
        .galleryCard:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          border-color: var(--color-primary-50);
        }
          .galleryCard::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              rgba(18, 9, 30, 0.5) 0%,
              rgba(18, 9, 30, 0.4) 40%,
              rgba(60, 20, 80, 0.2) 100%
            );
            border-radius: 14px;
            pointer-events: none;
            z-index: 1;
          }
          .galleryCard:hover::after {
            background: linear-gradient(
              to bottom,
              rgba(18, 9, 30, 0.05) 0%,
              rgba(60, 20, 80, 0.1) 100%
            );
          }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img src="/odstr6.webp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18,14,28,1) 0%, rgba(18,14,28,0.6) 60%, transparent 100%)',
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
          <h1 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 70 : 88, fontWeight: 400, lineHeight: 1, margin: 0, color: '#ffffff' }}>
            Laser tretma
          </h1>
        </div>
      </section>

      {/* 1. ODSTAVEK — Tatuji */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.27) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' }}>
            Odstranjevanje tetovaž <br />– za nov začetek
          </h2>
          <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
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
                <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: isMobile ? 16 : 18, color: 'var(--color-primary-light)', fontStyle: 'italic' }}>
            Čas je, da zapreš staro poglavje.
          </p>
        </div>
      </div>

      <ParallaxSlika src="/kaja5.webp" />

      {/* 2. ODSTAVEK — Pege */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.27) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' }}>
            Odstranjevanje starostnih peg <br />– za popoln ten
          </h2>
          <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
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
                <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: isMobile ? 16 : 18, color: 'var(--color-primary-light)', fontStyle: 'italic' }}>
            Naj tvoja koža ponovno zasije.
          </p>
        </div>
      </div>
     

      <ParallaxSlika src="/odstr5.webp" />

      {/* 3. ODSTAVEK — Hollywood peel */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.27) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' }}>
            Hollywood Peel <br />– takojšen glow efekt
          </h2>
          <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
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
                <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: isMobile ? 16 : 18, color: 'var(--color-primary-light)', fontStyle: 'italic' }}>
            Popolna izbira pred dogodki ali za svež videz vsak dan.
          </p>
        </div>
      </div>

      <ParallaxSlika src="/odstr3.webp" />

      {/* 4. ODSTAVEK — Zakaj mi */}
      <div className="odstavek">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 24px', color: '#fff' }}>
            Zakaj stranke izbirajo nas?
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
                <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOOKING CTA */}
      <div className="odstavek" style={{ textAlign: 'center', padding: isMobile ? '40px 20px' : '60px 40px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(136, 111, 195, 0) 0%, transparent 0%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          
          <div style={{ display: 'inline-block', background: 'rgba(122, 99, 176, 0.08)', backdropFilter: 'blur(12px)', borderRadius: 50, padding: '4px', border: '0.5px solid rgba(119,97,169,0.2)' }}>
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
      <section style={{ padding: isMobile ? '56px 0 86px' : '90px 0 130px', position: 'relative', zIndex: 2, background: 'rgba(18,14,28,0.4)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.4), transparent 60%)' }} />
      
              <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: isMobile ? '0 16px' : '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 20, marginBottom: 26 }}>
                  <div>
                    <Link
                      to="/galerija"
                      style={{
                        fontSize: 9,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                        color: 'var(--color-primary-50)',
                        marginBottom: 14,
                        display: 'inline-block',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => (e.target.style.color = 'var(--color-primary-light)')}
                      onMouseLeave={e => (e.target.style.color = 'var(--color-primary-50)')}
                    >
                      Galerija →
                    </Link>
                  </div>
                </div>
              <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? 10 : 14,
        }}
      >
        {GALLERY.map((item, n) => (
          <button
            key={n}
            className="galleryCard"
            onClick={() => setSelectedImage(item)}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid var(--color-primary-20)',
              borderRadius: 18,
              overflow: 'hidden',
              padding: 0,
              cursor: 'pointer',
              transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'none',
              }}
            />
      
            <div
              className="galleryOverlay"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                transition: 'opacity 0.35s ease',
                background: 'linear-gradient(to top, rgba(10,6,18,0.82), rgba(10,6,18,0.08))',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 18,
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontSize: 10,
                  letterSpacing: 2.4,
                  textTransform: 'uppercase',
                }}
              >
                {item.alt}
              </span>
            </div>
          </button>
        ))}
      </div>
              </div>
            </section>
{selectedImage && (
  <div
    onClick={() => setSelectedImage(null)}
    style={{
      position: 'fixed', inset: 0,
      background: 'rgba(5,3,10,0.86)',
      backdropFilter: 'blur(14px)',
      zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}
  >
    <button
      onClick={() => setSelectedImage(null)}
      style={{
        position: 'absolute', top: 24, right: 24,
        width: 42, height: 42, borderRadius: 999,
        border: '1px solid var(--color-primary-20)',
        background: 'rgba(255,255,255,0.06)',
        color: '#fff', cursor: 'pointer', fontSize: 20,
      }}
    ></button>
    <img
      src={selectedImage.src}
      alt={selectedImage.alt}
      onClick={e => e.stopPropagation()}
      style={{
        maxWidth: 'min(920px, 92vw)', maxHeight: '86vh',
        objectFit: 'contain', borderRadius: 22,
        border: '1px solid var(--color-primary-20)',
      }}
    />
  </div>
)}
    </div>
  )
}