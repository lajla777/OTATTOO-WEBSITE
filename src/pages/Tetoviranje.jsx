import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  { src: '/kaja2.webp' },
  { src: '/kaja1.webp' },
  { src: '/hero.webp' },
]

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

// Dodaj na vrh komponente
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

export default function Tetoviranje() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedImage, setSelectedImage] = useState(null)

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
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
          background: rgba(18,14,28,0.4);
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
  <img src="/kaja2.webp" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
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
    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 80 : 88, fontWeight: 400, lineHeight: 1, margin: 0, color: '#ffffff' }}>
      Tetovi<em style={{ color: 'var(--color-primary-light)' }}>ranje</em>
    </h1>
  </div>
</section>

      {/* 1. ODSTAVEK */}
      <div className="odstavek">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.27) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>01</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px', color: '#fff' }}>
            Zakaj izbrati <em style={{ color: 'var(--color-primary-light)' }}>nas?</em>
          </h2>
          <div style={{ fontSize: isMobile ? 14 : 15, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'Certificirana tattoo & PMU artistka z izkušnjami',
              'Vedno dobro vzdušje — sproščeno, osebno, brez pritiska',
              'Tetoviranje je moja največja strast in nekaj, v kar vlagam svoj čas, energijo in pozornost do detajlov.',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: 16, flexShrink: 0, marginTop: 3 }}>✦</span>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARALLAX SLIKA 1 */}
      <ParallaxSlika src="/tatu12.webp" />
      
      {/* 2. ODSTAVEK */}
      <div className="odstavek">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.27) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>02</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px', color: '#fff' }}>
            Moj <em style={{ color: 'var(--color-primary-light)' }}>stil</em>
          </h2>
          <p style={{ fontSize: isMobile? 14 : 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            Najraje ustvarjam v čistem, natančnem slogu, kot sta fine line in stipple shading, kjer lahko res pride do izraza subtilnost linij in senčenja. Kljub temu sem odprta tudi za druge stile in se rada prilagodim željam vsake posamezne stranke.
          </p>
        </div>
      </div>

      {/* PARALLAX SLIKA 2 */}
      <ParallaxSlika src="/tatu6.webp" />

      {/* 3. ODSTAVEK */}
      <div className="odstavek">
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.27) 0%, transparent 70%)', pointerEvents: 'none' }} />
  <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>03</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px', color: '#fff' }}>
            Tvoja ideja, <em style={{ color: 'var(--color-primary-light)' }}>moja izvedba</em>
          </h2>
          <p style={{ fontSize: isMobile? 14:15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            Vsako idejo poslušam z občutkom in jo vzamem resno. Skupaj jo razvijemo v dizajn, ki ni samo vizualno lep, ampak tudi oseben in premišljen. Pomembno mi je, da se v procesu počutiš sproščeno in da na koncu dobiš nekaj, kar res odraža tebe.
          </p>
        </div>
      </div>

      {/* PARALLAX SLIKA 3 */}
      <ParallaxSlika src="/tatu2.webp" />

      {/* BOOKING CTA */}
      <div className="odstavek" style={{ textAlign: 'center', padding: '60px 40px' }}>
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
  <div style={{ position: 'relative', zIndex: 1 }}>
    <div style={{
      display: 'inline-block',
      background: 'rgba(122, 99, 176, 0.08)',
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
      <section style={{ padding: isMobile ? '56px 0 86px' : '90px 0 130px', position: 'relative', zIndex: 2, background: 'rgba(18,14,28,1)' }}>
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
                      zIndex: 2,
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
    >x</button>
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