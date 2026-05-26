import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'

const SLIKE = [
  { src: '/galerija1.jpg', alt: 'tetovaža 1' },
  { src: '/galerija5.jpg', alt: 'tetovaža 2' },
  { src: '/galerija3.jpg', alt: 'tetovaža 3' },
  { src: '/galerija4.jpg', alt: 'tetovaža 4' },
  { src: '/galerija2.jpg', alt: 'tetovaža 5' },
  { src: '/galerija8.jpg', alt: 'tetovaža 6' },
  { src: '/galerija7.jpg', alt: 'tetovaža 7' },
  { src: '/galerija12.jpg', alt: 'tetovaža 8' },
  { src: '/galerija9.jpg', alt: 'tetovaža 9' },
  { src: '/galerija10.jpg', alt: 'tetovaža 10' },
  { src: '/galerija11.jpg', alt: 'tetovaža 11' },
  { src: '/galerija6.jpg', alt: 'tetovaža 12' },
  { src: '/galerija13.jpg', alt: 'tetovaža 13' },
  { src: '/galerija14.jpg', alt: 'tetovaža 14' },
  { src: '/galerija15.jpg', alt: 'tetovaža 15' },
  { src: '/galerija16.jpg', alt: 'tetovaža 16' },
  { src: '/galerija17.jpg', alt: 'tetovaža 17' },
  { src: '/galerija18.jpg', alt: 'tetovaža 18' },
  { src: '/galerija19.jpg', alt: 'tetovaža 19' },
  { src: '/galerija20.jpg', alt: 'tetovaža 20' },
]

const breakpoints = {
  default: 3,
  1024: 3,
  768: 2,
  480: 2,
}

export default function Galerija() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#120f1e', color: '#ffffff', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        paddingTop: 140, paddingBottom: 60,
        textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center top, rgba(119,97,169,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 16 }}>
          Portfolio
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 72, fontWeight: 300, lineHeight: 1,
          margin: 0, color: '#ffffff',
        }}>
          Gale<em style={{ color: 'var(--color-primary-light)' }}>rija</em>
        </h1>
      </section>

      {/* MASONRY GALERIJA */}
      <section style={{ padding: '0 24px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <style>{`
  .masonry-grid {
    display: flex;
    gap: ${isMobile ? '6px' : '10px'};
  }
  .masonry-col {
    background-clip: padding-box;
    display: flex;
    flex-direction: column;
    gap: ${isMobile ? '6px' : '10px'};
  }
  .masonry-col > div {
    overflow: hidden;
    border-radius: 12px;
    border: 0.5px solid rgba(119,97,169,0.15);
    cursor: pointer;
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .masonry-col > div:hover {
    transform: scale(1.02);
    border-color: rgba(119,97,169,0.4);
  }
  .masonry-col > div img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: 12px;
  }
  .masonry-col > div .placeholder {
    width: 100%;
    aspect-ratio: 1/1;
    background: rgba(169, 97, 169, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    letter-spacing: 1px;
    color: rgba(119,97,169,0.25);
    text-transform: uppercase;
    border-radius: 12px;
  }
`}</style>

        <Masonry
  breakpointCols={breakpoints}
  className="masonry-grid"
  columnClassName="masonry-col"
>
          {SLIKE.map((slika, i) => (
            <div key={i}>
              <img
                src={slika.src}
                alt={slika.alt}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="placeholder" style={{ display: 'none' }}>
                foto {i + 1}
              </div>
            </div>
          ))}
        </Masonry>
      </section>

    </div>
  )
}