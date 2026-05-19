import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const GALLERY = [
  { label: 'foto 1', bg: 'var(--color-bg-3)' },
  { label: 'foto 2', bg: 'var(--color-bg-2)' },
  { label: 'foto 3', bg: 'var(--color-bg-3)' },
  { label: 'foto 4', bg: 'var(--color-bg-2)' },
  { label: 'foto 5', bg: 'var(--color-bg-3)' },
  { label: 'foto 6', bg: 'var(--color-bg-2)' },
]

function Squiggle({ style }) {
  return (
    <svg style={style} viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 8 C58 24, 22 42, 40 62 C58 82, 22 102, 40 122 C58 142, 24 155, 40 155"
        stroke="var(--color-primary)" strokeWidth="1.2" fill="none" />
      <path d="M26 18 C40 30, 16 50, 30 70 C44 90, 16 110, 32 130"
        stroke="var(--color-primary)" strokeWidth="0.6" fill="none" opacity="0.45" />
    </svg>
  )
}

function SlikaNaura({ src, alt, height = 460, flip = false }) {
  return (
    <div style={{
      flex: '0 0 360px', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: height,
    }}>
      <img src={src} style={{
        position: 'absolute',
        width: '115%', height: '115%',
        objectFit: 'cover',
        filter: 'blur(32px)',
        opacity: 0.3,
        borderRadius: 12,
        zIndex: 0,
      }} alt="" />
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: '100%',
        borderRadius: 4, overflow: 'hidden',
        border: '0.5px solid var(--color-primary-20)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        transform: flip ? 'translateY(16px)' : 'translateY(-16px)',
      }}>
        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={alt} />
      </div>
    </div>
  )
}

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % 3), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: 'var(--color-bg)', color: '#ffffff', minHeight: '100vh' }}>

      {/* Slideshow — FIXED v ozadju, samo za hero višino */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {['/tatu1.jpg', '/kaja1.jpg', '/hero.jpg'].map((src, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,6,18,0.98) 0%, rgba(10,6,18,0.55) 50%, rgba(10,6,18,0.35) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '30%', left: '50%',
          transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, var(--color-primary-15) 0%, transparent 70%)',
        }} />
      </div>

      {/* HERO — prozorno ozadje, samo besedilo */}
      <section style={{ position: 'relative', height: '100vh', zIndex: 1 }}>
        <Squiggle style={{ position: 'absolute', top: 100, right: 80, width: 60, height: 130, opacity: 0.2, zIndex: 2 }} />
        <div style={{
          position: 'absolute', bottom: 60, left: 0, right: 0,
          zIndex: 3, textAlign: 'center', padding: '0 20px',
        }}>
          <img src="/logo.png" alt="OTattoo logo" style={{
            width: 160, height: 160, objectFit: 'contain',
            marginBottom: 24, filter: 'brightness(0) invert(1)', opacity: 0.9,
          }} />
          <p style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12 }}>
            Tattoo Studio
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 82, fontWeight: 400, lineHeight: 1.1,
            margin: '0 0 28px', color: '#ffffff',
          }}>
            BLABLABLA
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 4, display: 'flex', justifyContent: 'center', gap: 8 }}>
          {[0,1,2].map(i => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: 6, height: 6, borderRadius: '50%', border: 'none',
              cursor: 'pointer', padding: 0,
              background: i === current ? 'rgba(255, 255, 255, 0.6)' : 'rgba(240, 236, 248, 0.14)',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
      </section>

      {/* O NAS — pride čez slideshow */}
      <section style={{ background: 'var(--color-bg-2)', padding: 0, position: 'relative', zIndex: 200 }}>

        {/* 1. odstavek */}
        <div style={{ padding: '80px 40px', overflow: 'hidden', position: 'relative', background: '#120e1c' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>O meni</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.1, margin: '0 0 24px', color: '#ffffff' }}>
                Sem Kaja <em style={{ color: 'var(--color-primary-light)' }}>Otavnik</em>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Moja pot se je začela iz ljubezni do umetnosti in želje, da ljudem pomagam izraziti sebe na unikaten in trajen način.
              </p>
            </div>
            <SlikaNaura src="/kaja1.jpg" alt="Kaja Otavnik" />
          </div>
        </div>

        {/* 2. odstavek */}
        <div style={{ padding: '80px 40px', overflow: 'hidden', position: 'relative', background: '#120e1c' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center', flexDirection: 'row-reverse' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>Moje področje</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, lineHeight: 1.1, margin: '0 0 20px', color: '#ffffff' }}>
                Tattoo, PMU &<br /><em style={{ color: 'var(--color-primary-light)' }}>odstranjevanje</em>
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Sčasoma sem svoje znanje razširila tudi na področje permanentnega make-upa ter odstranjevanja tetovaž, saj verjamem, da ima vsak pravico do spremembe in novega začetka.
              </p>
            </div>
            <SlikaNaura src="/kaja2.jpg" alt="Studio" flip />
          </div>
        </div>

        {/* 3. odstavek */}
        <div style={{ padding: '80px 40px', overflow: 'hidden', position: 'relative', background: '#120e1c' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>Moj pristop</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, lineHeight: 1.1, margin: '0 0 20px', color: '#ffffff' }}>
                Varnost &<br /><em style={{ color: 'var(--color-primary-light)' }}>osebni pristop</em>
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Pri svojem delu dajem velik poudarek na varnost, higieno in individualen pristop. Vsaki stranki se posvetim osebno – od prve ideje do končnega rezultata. Pomembno mi je, da se pri meni počutiš sproščeno, slišano in v varnih rokah.
              </p>
            </div>
            <SlikaNaura src="/kaja3.jpg" alt="Pri delu" />
          </div>
        </div>

        {/* 4. odstavek */}
        <div style={{ padding: '80px 40px', overflow: 'hidden', position: 'relative', background: '#120e1c' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center', flexDirection: 'row-reverse' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>Izobraževanje</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, lineHeight: 1.1, margin: '0 0 20px', color: '#ffffff' }}>
                Stalno<br /><em style={{ color: 'var(--color-primary-light)' }}>napredovanje</em>
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                Redno se izobražujem in sledim najnovejšim tehnikam, da lahko zagotavljam kakovostne in estetsko dovršene rezultate – bodisi gre za tetovažo, PMU ali lasersko odstranjevanje.
              </p>
            </div>
            <SlikaNaura src="/kaja4.jpg" alt="Certifikati" flip />
          </div>
        </div>

        {/* 5. CTA */}
        <div style={{ padding: '80px 40px', position: 'relative', overflow: 'hidden', textAlign: 'center', background: '#120e1c' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.12) 0%, transparent 70%)', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 20 }}>Stopi v stik</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 300, lineHeight: 1.2, margin: '0 0 20px', color: '#ffffff' }}>
              Če razmišljaš o novi tetovaži, popravku, permanentnem make-upu ali odstranitvi stare tetovaže,<br />
              <em style={{ color: 'var(--color-primary-light)' }}>te vabim, da stopiš v stik z mano.</em>
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: 36 }}>
              Skupaj bomo našli rešitev, ki bo najbolj ustrezala tebi.
            </p>
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

      </section>

      {/* GALERIJA */}
      <section style={{ padding: '60px 0 100px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
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
            {GALLERY.map((item, n) => (
              <div key={n} style={{
                aspectRatio: '1 / 1', background: item.bg,
                border: '0.5px solid var(--color-primary-20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, letterSpacing: 1, color: 'var(--color-primary-25)',
                textTransform: 'uppercase', cursor: 'pointer',
              }}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}