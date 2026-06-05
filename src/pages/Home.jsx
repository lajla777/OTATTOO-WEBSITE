import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const HERO_IMAGES = ['/kaja1.webp', '/tatu8.webp', '/tatu1.webp']

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
    <svg style={style} viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 8 C58 24, 22 42, 40 62 C58 82, 22 102, 40 122 C58 142, 24 155, 40 155"
        stroke="var(--color-primary)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M26 18 C40 30, 16 50, 30 70 C44 90, 16 110, 32 130"
        stroke="var(--color-primary)"
        strokeWidth="0.6"
        fill="none"
        opacity="0.45"
      />
    </svg>
  )
}

function FloatingOrb({ style }) {
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '999px',
        background: 'radial-gradient(circle, var(--color-primary-20), transparent 70%)',
        filter: 'blur(2px)',
        animation: 'floatOrb 8s ease-in-out infinite',
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

function Reveal({ children, delay = 0 }) {
  return (
    <div
      className="revealBlock"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function SlikaNaura({ src, alt, height = 460, flip = false, isMobile = false }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: isMobile ? 'none' : '0 0 360px',
        width: isMobile ? '100%' : 'auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: isMobile ? 280 : height,
        perspective: 1000,
      }}
    >

      <div
        style={{
          position: 'absolute',
          inset: isMobile ? 10 : -10,
          border: '1px solid var(--color-primary-20)',
          borderRadius: 18,
          transform: hover ? 'rotate(2deg) scale(1.02)' : 'rotate(-2deg) scale(1)',
          transition: 'transform 0.45s ease',
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          borderRadius: 18,
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hover ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.7s ease',
          }}
          alt={alt}
          loading="lazy"
decoding="async"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hover
              ? 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.13) 50%, transparent 70%)'
              : 'transparent',
            transform: hover ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.9s ease',
          }}
        />
      </div>
    </div>
  )
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % HERO_IMAGES.length), 4200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleMouseMove = e => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const odstavekStyle = {
    padding: isMobile ? '40px 20px' : '50px 40px',
    overflow: 'hidden',
    position: 'relative',
  }

  return (
    <div
      style={{
        fontFamily: "'Google Sans', sans-serif",
        background: 'var(--color-bg)',
        color: '#ffffff',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes floatOrb {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.45; }
            50% { transform: translateY(-24px) scale(1.08); opacity: 0.8; }
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(34px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulseLine {
            0%, 100% { transform: scaleX(0.4); opacity: 0.4; }
            50% { transform: scaleX(1); opacity: 1; }
          }

          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .revealBlock {
            animation: fadeUp 0.9s ease both;
          }

          .heroButton:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 18px 45px rgba(0,0,0,0.45), 0 0 30px var(--color-primary-20);
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
  border-radius: 18px;
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

.galleryOverlay {
  z-index: 2;
}

          .stickyBooking:hover {
            transform: translateY(-3px);
            box-shadow: 0 18px 40px rgba(0,0,0,0.5), 0 0 28px var(--color-primary-20);
          }

          @media (max-width: 767px) {
            .stickyBooking {
              bottom: 16px !important;
              right: 16px !important;
              left: 16px !important;
              text-align: center;
            }
          }
        `}
      </style>

      {/* Slideshow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.6s ease',
              transform: `translate(${mouse.x * 0.25}px, ${mouse.y * 0.25}px) scale(1.04)`,
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: i === current ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 5s ease',
              }}
            />
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(10,6,18,0.99) 0%, rgba(10,6,18,0.72) 45%, rgba(10,6,18,0.28) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 65%, var(--color-primary-20), transparent 35%)',
            opacity: 0.8,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '52%',
            width: isMobile ? 260 : 460,
            height: isMobile ? 260 : 460,
            border: '1px solid var(--color-primary-20)',
            borderRadius: '999px',
            transform: `translate(-50%, -50%) translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)`,
            animation: 'spinSlow 30s linear infinite',
            opacity: 0.45,
          }}
        />

        <FloatingOrb style={{ width: 140, height: 140, top: '20%', left: '8%' }} />
        <FloatingOrb style={{ width: 180, height: 180, bottom: '18%', right: '10%', animationDelay: '1.6s' }} />
      </div>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', zIndex: 1 }}>
        {!isMobile && (
          <>
            <Squiggle
              style={{
                position: 'absolute',
                top: 100,
                right: 80,
                width: 60,
                height: 130,
                opacity: 0.25,
                zIndex: 2,
                transform: `translate(${mouse.x}px, ${mouse.y}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            />

            <Squiggle
              style={{
                position: 'absolute',
                bottom: 120,
                left: 90,
                width: 50,
                height: 120,
                opacity: 0.14,
                zIndex: 2,
                transform: `translate(${-mouse.x}px, ${-mouse.y}px) rotate(180deg)`,
                transition: 'transform 0.2s ease-out',
              }}
            />
          </>
        )}

        <div
  style={{
    position: 'absolute',
    inset: 0,
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
  }}
>
  <Reveal>
    <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12 }}>
      Tattoo Studio
    </p>
    <h1 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 56 : 94, fontWeight: 400, lineHeight: 1.04, letterSpacing: 9, margin: '0 0 28px', color: '#ffffff', textShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
      OTATTOO
    </h1>
    <div style={{ width: isMobile ? 120 : 180, height: 1, background: 'var(--color-primary)', margin: '0 auto', transformOrigin: 'center', animation: 'pulseLine 2.4s ease-in-out infinite', opacity: 0.8 }} />
  </Reveal>
</div>

        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: 0,
            right: 0,
            zIndex: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 26 : 7,
                height: 7,
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                background:
                  i === current ? 'rgba(255,255,255,0.72)' : 'rgba(240,236,248,0.18)',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
      </section>

      {/* O NAS */}
      <section style={{ padding: 0, position: 'relative', zIndex: 200 }}>
        <div style={{background: 'rgba(6, 3, 15, 0.57)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',}}>
        {/* 1. odstavek */}
        <div style={odstavekStyle}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 25% 50%, rgba(119,97,169,0.18) 0%, transparent 58%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 1080,
              margin: '0 auto',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 34 : 70,
              alignItems: 'center',
            }}
          >
            <Reveal>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 34 : 44, fontWeight: 300, lineHeight: 1.05, margin: '0 0 24px', color: '#ffffff' }}>
                  O meni
                </h2>
                <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                  Sem Kaja Otavnik. Moja pot se je začela iz ljubezni do umetnosti in želje, da ljudem pomagam izraziti sebe na unikaten in trajen način.
                </p>
              </div>
            </Reveal>

            <SlikaNaura src="/kaja1.webp" alt="Kaja Otavnik" isMobile={isMobile} />
          </div>
        </div>

        {/* 2. odstavek */}
        <div style={odstavekStyle}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 50%, rgba(119,97,169,0.16) 0%, transparent 58%)', zIndex: 0, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', gap: isMobile ? 34 : 70, alignItems: 'center' }}>
            <Reveal>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 34 : 44, fontWeight: 300, lineHeight: 1.08, margin: '0 0 20px', color: '#ffffff' }}>
                  Tattoo &<br />odstranjevanje
                </h3>
                <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                  Sčasoma sem svoje znanje razširila tudi na področje odstranjevanja tetovaž, saj verjamem, da ima vsak pravico do spremembe in novega začetka.
                </p>
              </div>
            </Reveal>

            <SlikaNaura src="/tatu10.webp" alt="Studio" flip isMobile={isMobile} />
          </div>
        </div>

        {/* 3. odstavek */}
        <div style={odstavekStyle}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%, rgba(119,97,169,0.16) 0%, transparent 58%)', zIndex: 0, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 34 : 70, alignItems: 'center' }}>
            <Reveal>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 34 : 44, fontWeight: 300, lineHeight: 1.08, margin: '0 0 20px', color: '#ffffff' }}>
                  Varnost &<br />osebni pristop
                </h3>
                <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                  Pri svojem delu dajem velik poudarek na varnost, higieno in individualen pristop. Vsaki stranki se posvetim osebno - od prve ideje do končnega rezultata. Pomembno mi je, da se pri meni počutiš sproščeno, slišano in v varnih rokah.
                </p>
              </div>
            </Reveal>

            <SlikaNaura src="/kaja4.webp" alt="Pri delu" isMobile={isMobile} />
          </div>
        </div>

        {/* 4. odstavek */}
        <div style={odstavekStyle}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 50%, rgba(119,97,169,0.16) 0%, transparent 58%)', zIndex: 0, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', gap: isMobile ? 34 : 70, alignItems: 'center' }}>
            <Reveal>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 34 : 44, fontWeight: 300, lineHeight: 1.08, margin: '0 0 20px', color: '#ffffff' }}>
                  Stalno<br />napredovanje
                </h3>
                <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                  Redno se izobražujem in sledim najnovejšim tehnikam, da lahko zagotavljam kakovostne in estetsko dovršene rezultate - bodisi gre za tetovažo ali lasersko odstranjevanje.
                </p>
              </div>
            </Reveal>

            <SlikaNaura src="/tatu9.webp" alt="Certifikati" flip isMobile={isMobile} />
          </div>
        </div>

        {/* 5. CTA */}
        <div style={{ ...odstavekStyle, textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.2) 0%, transparent 65%)', zIndex: 0 }} />

          <Reveal>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
              
              <h3 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 30 : 48, fontWeight: 300, lineHeight: 1.35, margin: '0 0 20px', color: '#ffffff' }}>
                Če razmišljaš o novi tetovaži, popravku ali odstranitvi stare tetovaže,{' '}
                te vabim, da stopiš v stik z mano.
              </h3>
              <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: 36 }}>
                Skupaj bomo našli rešitev, ki bo najbolj ustrezala tebi.
              </p>

              <div style={{ display: 'inline-block', background: 'rgba(13,10,20,0.88)', backdropFilter: 'blur(12px)', borderRadius: 50, padding: '5px', border: '0.5px solid rgba(119,97,169,0.25)' }}>
                <Link
                  to="/booking"
                  className="heroButton"
                  style={{
                    display: 'inline-block',
                    padding: '15px 40px',
                    background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
                    color: '#ffffff',
                    fontSize: 10,
                    letterSpacing: 2.5,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 50,
                    transition: 'all 0.25s ease',
                  }}
                >
                  Rezerviraj termin
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

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

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5,3,10,0.86)',
            backdropFilter: 'blur(14px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'fadeUp 0.25s ease both',
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 42,
              height: 42,
              borderRadius: 999,
              border: '1px solid var(--color-primary-20)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            ×
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 'min(920px, 92vw)',
              maxHeight: '86vh',
              objectFit: 'contain',
              borderRadius: 22,
              border: '1px solid var(--color-primary-20)',
            }}
          />
        </div>
      )}
    </div>
  )
}