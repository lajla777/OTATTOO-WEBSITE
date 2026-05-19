import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'O meni', path: '/' },
  { label: 'Tetoviranje', path: '/tetoviranje' },
  { label: 'Laser tretma', path: '/odstranjevanje' },
  { label: 'PMU', path: '/obrvi' },
  { label: 'Galerija', path: '/galerija' },
  { label: 'Cenik', path: '/cenik' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 868)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 868)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Zapri meni ob menjavi strani
  useEffect(() => {
    setMenuOpen(false)
  }, [location])
  console.log('menuOpen:', menuOpen)
  return (
    <>
      <nav style={{
        position: 'fixed', top: 16, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center',
        gap: 8,
        background: 'rgba(6, 3, 15, 0.57)',
        backdropFilter: 'blur(12px)',
        borderRadius: 170,
        padding: '10px 16px',
        border: '0.5px solid rgba(119, 97, 169, 0.25)',
        boxShadow: '0 4px 32px rgba(142, 116, 203, 0.25)',
        width: 'max-content',
        maxWidth: 'calc(100vw - 32px)',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 16, fontWeight: 400, letterSpacing: 4,
          color: '#f0ecf8', textDecoration: 'none',
          paddingRight: 12,
          borderRight: '0.5px solid rgba(180,120,220,0.25)',
          whiteSpace: 'nowrap',
        }}>
          OTATTOO
        </Link>

        {/* Desktop links */}
<div style={{
  display: 'flex', alignItems: 'center', gap: 8,
  maxWidth: isMobile ? 0 : 790,
  overflow: 'hidden',
  opacity: isMobile ? 0 : 1,
  transition: 'max-width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
}}>
  {NAV_LINKS.map(link => {
    const isActive = location.pathname === link.path
    return (
      <Link key={link.path} to={link.path} style={{
        fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase',
        color: isActive ? '#f0ecf8' : 'rgba(240,236,248,0.45)',
        textDecoration: 'none',
        padding: '6px 14px',
        borderRadius: 50,
        background: isActive ? 'rgba(119, 97, 169, 0.3)' : 'transparent',
        whiteSpace: 'nowrap',
      }}>
        {link.label}
      </Link>
    )
  })}
  <Link to="/booking" style={{
    fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase',
    color: '#f0ecf8', textDecoration: 'none',
    padding: '8px 18px',
    borderRadius: 50,
    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    marginLeft: 4,
    whiteSpace: 'nowrap',
  }}>
    Booking
  </Link>
</div>

{/* Hamburger */}
<div style={{
  maxWidth: isMobile ? 40 : 0,
  overflow: 'hidden',
  opacity: isMobile ? 1 : 0,
  transition: 'max-width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
}}>
  <button
    onClick={() => setMenuOpen(o => !o)}
    style={{
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '4px 8px', display: 'flex', flexDirection: 'column',
      gap: 5, alignItems: 'center', justifyContent: 'center',
    }}>
    <span style={{
      display: 'block', width: 22, height: 1.5,
      background: '#f0ecf8', borderRadius: 2,
      transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
      transition: 'transform 0.2s',
    }} />
    <span style={{
      display: 'block', width: 22, height: 1.5,
      background: '#f0ecf8', borderRadius: 2,
      opacity: menuOpen ? 0 : 1,
      transition: 'opacity 0.2s',
    }} />
    <span style={{
      display: 'block', width: 22, height: 1.5,
      background: '#f0ecf8', borderRadius: 2,
      transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
      transition: 'transform 0.2s',
    }} />
  </button>
</div>

        
      </nav>

      {/* Mobile dropdown meni */}
      {isMobile && (
        <div style={{
  position: 'fixed', top: 72, left: '50%',
  transform: `translateX(-50%) scaleY(${menuOpen ? 1 : 0})`,
  transformOrigin: 'top center',
  zIndex: 999,
  background: 'rgba(15, 10, 20, 0.95)',
  backdropFilter: 'blur(12px)',
  borderRadius: 16,
  padding: '12px 8px',
  border: '0.5px solid rgba(119, 97, 169, 0.25)',
  boxShadow: '0 8px 32px rgba(120, 60, 180, 0.2)',
  display: 'flex', flexDirection: 'column', gap: 4,
  minWidth: 200,
  opacity: menuOpen ? 1 : 0,
  pointerEvents: menuOpen ? 'auto' : 'none',
  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
}}>
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path} style={{
                fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
                color: isActive ? '#f0ecf8' : 'rgba(240,236,248,0.55)',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: 10,
                background: isActive ? 'rgba(160, 80, 220, 0.2)' : 'transparent',
              }}>
                {link.label}
              </Link>
            )
          })}
          <Link to="/booking" style={{
            fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
            color: '#f0ecf8', textDecoration: 'none',
            padding: '10px 16px', marginTop: 4,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            textAlign: 'center',
          }}>
            Booking
          </Link>
        </div>
      )}
    </>
  )
}