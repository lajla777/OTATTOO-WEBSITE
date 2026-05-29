import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'

const SLIKE = [
  { src: '/galerija19.webp', alt: 'tetovaža 1' },
  { src: '/galerija4.webp', alt: 'tetovaža 2' },
  { src: '/galerija14.webp', alt: 'tetovaža 4' },
  { src: '/galerija5.webp', alt: 'tetovaža 5' },
  { src: '/galerija24.webp', alt: 'tetovaža 6' },
  { src: '/galerija21.webp', alt: 'tetovaža 7' },
  { src: '/galerija10.webp', alt: 'tetovaža 8' },
  { src: '/galerija20.webp', alt: 'tetovaža 9' },
  { src: '/galerija7.webp', alt: 'tetovaža 10' },
  { src: '/galerija8.webp', alt: 'tetovaža 11' },
  { src: '/galerija23.webp', alt: 'tetovaža 12' },
  { src: '/galerija22.webp', alt: 'tetovaža 13' },
  { src: '/galerija11.webp', alt: 'tetovaža 14' },
  { src: '/galerija6.webp', alt: 'tetovaža 15' },
  { src: '/galerija12.webp', alt: 'tetovaža 16' },
  { src: '/galerija15.webp', alt: 'tetovaža 17' },
  { src: '/galerija17.webp', alt: 'tetovaža 18' },
  { src: '/galerija25.webp', alt: 'tetovaža 19' },
  { src: '/galerija18.webp', alt: 'tetovaža 20' },
  { src: '/galerija2.webp', alt: 'tetovaža 3' },
  { src: '/galerija16.webp', alt: 'tetovaža 3' },
]

const breakpoints = {
  default: 3,
  1024: 3,
  768: 2,
  480: 2,
}

export default function Galerija() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {

    const handleEsc = e => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => window.removeEventListener('keydown', handleEsc)

  }, [])

  return (

    <div style={{
      fontFamily: "'Montserrat', sans-serif",
      background: '#120f1e',
      color: '#ffffff',
      minHeight: '100vh',
    }}>

      {/* HERO */}

      <section style={{
        paddingTop: 140,
        paddingBottom: 60,
        textAlign: 'center',
        position: 'relative',
      }}>

        <div style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center top, rgba(119,97,169,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontSize: 9,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'var(--color-primary-50)',
          marginBottom: 16,
        }}>
          Portfolio
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 72,
          fontWeight: 300,
          lineHeight: 1,
          margin: 0,
          color: '#ffffff',
        }}>
          Gale<em style={{ color: 'var(--color-primary-light)' }}>rija</em>
        </h1>

      </section>

      {/* GALERIJA */}

      <section style={{
        padding: '0 24px 100px',
        maxWidth: 1200,
        margin: '0 auto',
      }}>

        <style>{`

          .masonry-grid{
            display:flex;
            gap:${isMobile ? '6px' : '10px'};
          }

          .masonry-col{
            display:flex;
            flex-direction:column;
            gap:${isMobile ? '6px' : '10px'};
          }

          .masonry-card{
            overflow:hidden;
            border-radius:14px;
            border:0.5px solid rgba(119,97,169,0.15);
            cursor:pointer;
            transition:all .28s ease;
            background:#171222;
            position: relative;
          }

          .masonry-card::after {
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
          }

          .masonry-card:hover{
            transform:translateY(-2px);
            border-color:rgba(119,97,169,0.42);
            box-shadow:0 24px 60px rgba(0,0,0,0.45);
          }

          .masonry-card:hover::after {
            background: linear-gradient(
              to bottom,
              rgba(18, 9, 30, 0.05) 0%,
              rgba(60, 20, 80, 0.1) 100%
            );
          }

          .masonry-card img{
            width:100%;
            display:block;
            object-fit:cover;
            border-radius:14px;
          }

        `}</style>

        <Masonry
          breakpointCols={breakpoints}
          className="masonry-grid"
          columnClassName="masonry-col"
        >

          {SLIKE.map((slika, i) => (

            <div
              key={i}
              className="masonry-card"
              onClick={() => setSelectedImage(slika)}
            >

              <img
                src={slika.src}
                alt={slika.alt}
              />

            </div>

          ))}

        </Masonry>

      </section>

      {/* LIGHTBOX */}

      {selectedImage && (

        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position:'fixed',
            inset:0,
            background:'rgba(6,4,12,0.88)',
            backdropFilter:'blur(14px)',
            zIndex:9999,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:20,
          }}
        >

          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position:'absolute',
              top:24,
              right:24,
              width:44,
              height:44,
              borderRadius:'50%',
              border:'1px solid rgba(119,97,169,0.3)',
              background:'rgba(255,255,255,0.05)',
              color:'#fff',
              fontSize:24,
              cursor:'pointer',
            }}
          >
            ×
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth:'92vw',
              maxHeight:'88vh',
              objectFit:'contain',
              borderRadius:18,
              boxShadow:'0 30px 100px rgba(0,0,0,0.7)',
              border:'1px solid rgba(119,97,169,0.18)',
            }}
          />

        </div>

      )}

    </div>
  )
}