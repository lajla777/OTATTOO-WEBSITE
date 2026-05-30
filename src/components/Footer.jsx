import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

  return (
    <footer style={{
      background: 'rgba(6, 3, 15, 0.57)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '0.5px solid rgba(168,85,247,0.15)',
      padding: '60px 20px 32px',
      fontFamily: "'Google Sans', sans-serif",
      color: '#f0ecf8',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 40, marginBottom: 48,
        padding: '0 20px',
      }}>

        {/* Stolpec 1 — logo + opis */}
        <div>
          <div style={{
            fontFamily: "'Google Sans', serif",
            fontSize: 20, letterSpacing: 5, marginBottom: 16, color: '#f0ecf8',
          }}>
            OTATTOO
          </div>
          
          {/* Social ikonice */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
  {/* Instagram */}
  <a href="https://www.instagram.com/otattoo_ink/" target="_blank" rel="noreferrer" style={{
    width: 36, height: 36, borderRadius: '50%',
    border: '0.5px solid rgba(119,97,169,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(240,236,248,0.6)', textDecoration: 'none',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  </a>

  {/* TikTok */}
  <a href="https://www.tiktok.com/@otavnik_" target="_blank" rel="noreferrer" style={{
    width: 36, height: 36, borderRadius: '50%',
    border: '0.5px solid rgba(119,97,169,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(240,236,248,0.6)', textDecoration: 'none',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  </a>

  {/* Lokacija / Google Maps */}
  <a href="https://maps.google.com/?q=Vrečerjeva+ulica+1,+Žalec" target="_blank" rel="noreferrer" style={{
    width: 36, height: 36, borderRadius: '50%',
    border: '0.5px solid rgba(119,97,169,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(240,236,248,0.6)', textDecoration: 'none',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  </a>
</div>
        </div>

        {/* Stolpec 2 — navigacija */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(168,85,247,0.5)', marginBottom: 20 }}>
            Navigacija
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'O meni', path: '/' },
              { label: 'Tetoviranje', path: '/tetoviranje' },
              { label: 'Laser tretma', path: '/odstranjevanje' },
              { label: 'Galerija', path: '/galerija' },
              { label: 'Cenik', path: '/cenik' },
              { label: 'Booking', path: '/booking' },
            ].map(link => (
              <Link key={link.path} to={link.path} style={{
                fontSize: 12, color: 'rgba(240,236,248,0.5)',
                textDecoration: 'none', letterSpacing: 1,
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Stolpec 3 — kontakt */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(168,85,247,0.5)', marginBottom: 20 }}>
            Kontakt
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Naslov', value: 'Vrečerjeva ulica 1, Žalec', href: 'https://maps.google.com/?q=Vrečerjeva+ulica+1,+Žalec' },
              { label: 'Instagram', value: '@otattoo_ink', href: 'https://www.instagram.com/otattoo_ink/' },
              { label: 'TikTok', value: '@otavnik_', href: 'https://www.tiktok.com/@otavnik_' },
              { label: 'Delovni čas', value: 'Po dogovoru', href: null },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(168,85,247,0.4)', margin: '0 0 3px' }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(240,236,248,0.5)', margin: 0, textDecoration: 'none' }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontSize: 12, color: 'rgba(240,236,248,0.5)', margin: 0 }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spodnja vrstica */}
      <div style={{
      maxWidth: 1000, margin: '0 auto',
      padding: '24px 20px 0',
      borderTop: '0.5px solid rgba(168,85,247,0.1)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 8,
      }}>
        <p style={{ fontSize: 11, color: 'rgba(240,236,248,0.25)', margin: 0 }}>
        © 2025 OTattoo · Kaja Otavnik s.p.
        </p>
            <p style={{ fontSize: 11, color: 'rgba(240,236,248,0.25)', margin: 0 }}>
              Vse pravice pridržane
            </p>
            
          </div>
    </footer>
  )
}