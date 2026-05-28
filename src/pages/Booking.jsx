import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const STORITVE = [
  { id: 'tetoviranje', naziv: 'Tetoviranje', opis: 'Fineline, blackwork, barvno, po meri', icon: '✿' },
  { id: 'odstranjevanje', naziv: 'Laser tretma', opis: 'Varno lasersko odstranjevanje s Philaser', icon: '✦' },
]

const LASER_TIPI = [
  { id: 'tetovaze', naziv: 'Odstranjevanje tetovaž', opis: 'Varno lasersko odstranjevanje z Philaser tehnologijo' },
  { id: 'pege', naziv: 'Odstranjevanje starostnih peg', opis: 'Učinkovito odstranjevanje pigmentacij in peg' },
  { id: 'hollywood', naziv: 'Hollywood peel', opis: 'Globinsko čiščenje in pomladitev kože' },
]

const SLIDES = ['/tatu5.jpg']
const PAYPAL = 'kaja@otattoo.si'

const inputStyle = {
  width: '100%', padding: '14px 16px', borderRadius: 10, fontSize: 14,
  background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)',
  color: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Montserrat', sans-serif",
}
const labelStyle = { fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }

const VELIKOSTI = [
  { value: 'do 5cm', label: 'Do 5 cm' },
  { value: '5-10cm', label: '5 – 10 cm' },
  { value: '10-15cm', label: '10 – 15 cm' },
  { value: '15-20cm', label: '15 – 20 cm' },
  { value: 'nad 20cm', label: 'Nad 20 cm' },
]

function StepIndicator({ step, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 48 }}>
      {Array(total).fill(null).map((_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 500,
            background: step >= i + 1 ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'rgba(255,255,255,0.08)',
            color: step >= i + 1 ? '#fff' : 'rgba(255,255,255,0.3)',
            border: step >= i + 1 ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
          }}>{i + 1}</div>
          {i < total - 1 && (
            <div style={{ width: 50, height: 1, background: step > i + 1 ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s ease' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function Dropdown({ value, onChange, opcije, placeholder }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(o => !o)} style={{
        width: '100%', padding: '14px 16px', borderRadius: 10, fontSize: 14,
        background: 'rgba(255,255,255,0.06)',
        border: open ? '0.5px solid var(--color-primary)' : '0.5px solid rgba(255,255,255,0.12)',
        color: value ? '#fff' : 'rgba(255,255,255,0.35)',
        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxSizing: 'border-box', transition: 'border 0.2s', userSelect: 'none',
      }}>
        <span>{value ? opcije.find(o => o.value === value)?.label : placeholder}</span>
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.5, fontSize: 11 }}>▼</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 100,
          background: '#1e1830', border: '0.5px solid rgba(119,97,169,0.3)',
          borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {opcije.map(o => (
            <div key={o.value}
              onClick={() => { onChange(o.value); setOpen(false) }}
              onMouseEnter={() => setHovered(o.value)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '12px 16px', fontSize: 14, cursor: 'pointer',
                color: value === o.value ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.7)',
                background: value === o.value ? 'rgba(119,97,169,0.25)' : hovered === o.value ? 'rgba(119,97,169,0.1)' : 'transparent',
                transition: 'background 0.15s', borderBottom: '0.5px solid rgba(255,255,255,0.05)',
              }}>{o.label}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function Koledar({ datum, setDatum }) {
  const danes = new Date()
  const [mesec, setMesec] = useState(danes.getMonth())
  const [leto, setLeto] = useState(danes.getFullYear())
  const [rezerviraniTermini, setRezerviraniTermini] = useState([])
  const [zasedenTermini, setZasedenTermini] = useState([])
  const [nedosegljiviTermini, setNedosegljiviTermini] = useState([])

  useEffect(() => {
    const naloziTermine = async () => {
      const { data: rez } = await supabase.from('rezervacije').select('datum, status').in('status', ['rezervirano', 'potrjeno'])
      const { data: ned } = await supabase.from('nedosegljivi').select('datum')
      if (rez) {
        setRezerviraniTermini(rez.filter(r => r.status === 'rezervirano').map(r => r.datum))
        setZasedenTermini(rez.filter(r => r.status === 'potrjeno').map(r => r.datum))
      }
      if (ned) setNedosegljiviTermini(ned.map(n => n.datum))
    }
    naloziTermine()
  }, [])

  const imeMeseca = new Date(leto, mesec, 1).toLocaleString('sl-SI', { month: 'long', year: 'numeric' })
  const prvaDneva = new Date(leto, mesec, 1).getDay()
  const dniVMesecu = new Date(leto, mesec + 1, 0).getDate()
  const offset = prvaDneva === 0 ? 6 : prvaDneva - 1

  const getDanStatus = (dateStr) => {
    const d = new Date(dateStr)
    const danVTednu = d.getDay()
    if (danVTednu === 0 || danVTednu === 6) return 'ni_mozno'
    if (nedosegljiviTermini.includes(dateStr)) return 'ni_mozno'

    const blokiraniDatumi = []
    let stevilec = 0
    let pregledovanDan = new Date(danes)

    while (blokiraniDatumi.length < 2) {
      const dv = pregledovanDan.getDay()
      if (dv !== 0 && dv !== 6) blokiraniDatumi.push(pregledovanDan.toISOString().split('T')[0])
        pregledovanDan = new Date(pregledovanDan)
        pregledovanDan.setDate(pregledovanDan.getDate() + 1)
    }

    if (blokiraniDatumi.includes(dateStr) && !zasedenTermini.includes(dateStr) && !rezerviraniTermini.includes(dateStr)) return 'ni_mozno'
  
    if (d < new Date(danes.toDateString())) return 'preteklo'
    if (zasedenTermini.includes(dateStr)) return 'zasedeno'
    if (rezerviraniTermini.includes(dateStr)) return 'rezervirano'
    return 'prosto'
  }

  const getDanStyle = (status, jeIzbran) => {
    if (jeIzbran) return { background: 'rgba(35, 6, 102, 0.15)', color: '#fff', cursor: 'pointer', border: 'none' }
    if (status === 'prosto') return { background: 'rgba(119,97,169,0.15)', color: '#fff', cursor: 'pointer', border: '0.5px solid rgba(119,97,169,0.3)' }
    if (status === 'rezervirano') return { background: 'rgba(230,160,30,0.2)', color: 'rgba(255,200,80,0.8)', cursor: 'not-allowed' }
    if (status === 'zasedeno') return { background: 'rgba(180,60,60,0.2)', color: 'rgba(255,100,100,0.6)', cursor: 'not-allowed', textDecoration: 'line-through' }
    if (status === 'ni_mozno') return { background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed' }
    if (status === 'preteklo') return { background: 'transparent', color: 'rgba(255,255,255,0.15)', cursor: 'not-allowed' }
    return {}
  }

  return (
    <div>
      <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <button onClick={() => { if (mesec === 0) { setMesec(11); setLeto(l => l-1) } else setMesec(m => m-1) }} style={{ background: 'none', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 16 }}>‹</button>
          <p style={{ color: '#fff', fontSize: 15, fontWeight: 500, margin: 0, textTransform: 'capitalize' }}>{imeMeseca}</p>
          <button onClick={() => { if (mesec === 11) { setMesec(0); setLeto(l => l+1) } else setMesec(m => m+1) }} style={{ background: 'none', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 16 }}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
          {['Po', 'To', 'Sr', 'Če', 'Pe', 'So', 'Ne'].map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {Array(offset).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array(dniVMesecu).fill(null).map((_, i) => {
            const dan = i + 1
            const dateStr = `${leto}-${String(mesec+1).padStart(2,'0')}-${String(dan).padStart(2,'0')}`
            const status = getDanStatus(dateStr)
            const jeIzbran = datum === dateStr
            return (
              <div key={dan} onClick={() => status === 'prosto' && setDatum(dateStr)} style={{ textAlign: 'center', padding: '8px 4px', borderRadius: 8, fontSize: 13, transition: 'all 0.15s', ...getDanStyle(status, jeIzbran) }}>{dan}</div>
            )
          })}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { barva: 'rgba(119,97,169,0.4)', label: 'Prosto' },
          { barva: 'rgba(230,160,30,0.4)', label: 'Rezervirano' },
          { barva: 'rgba(180,60,60,0.4)', label: 'Zasedeno' },
          { barva: 'rgba(255,255,255,0.08)', label: 'Ni možno' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: l.barva }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlikeUpload({ slike, setSlike, id }) {
  return (
    <div style={{ border: '0.5px dashed rgba(119,97,169,0.4)', borderRadius: 10, padding: '24px', textAlign: 'center', background: slike.length > 0 ? 'rgba(119,97,169,0.08)' : 'rgba(255,255,255,0.03)' }}>
      <input type="file" multiple accept="image/*" onChange={e => setSlike(Array.from(e.target.files))} style={{ display: 'none' }} id={id} />
      <label htmlFor={id} style={{ cursor: 'pointer' }}>
        {slike.length > 0 ? (
          <p style={{ color: 'var(--color-primary-light)', margin: 0, fontSize: 14 }}>✓ {slike.length} slika/e naložena</p>
        ) : (
          <>
            <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 8px', fontSize: 24 }}>📎</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: 13 }}>Klikni za nalaganje slik</p>
          </>
        )}
      </label>
    </div>
  )
}

// TETOVIRANJE
function Step2Tet({ velikost, setVelikost, pozicija, setPozicija, slike, setSlike, opombe, setOpombe }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak 2</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        O tvoji <em style={{ color: 'var(--color-primary-light)' }}>tetovaži</em>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div><label style={labelStyle}>Velikost *</label><Dropdown value={velikost} onChange={setVelikost} placeholder="Izberi velikost" opcije={VELIKOSTI} /></div>
        <div><label style={labelStyle}>Pozicija na telesu *</label><input value={pozicija} onChange={e => setPozicija(e.target.value)} placeholder="npr. zapestje, roka, gleženj..." style={inputStyle} /></div>
        <div><label style={labelStyle}>Slike željenega designa *</label><SlikeUpload slike={slike} setSlike={setSlike} id="slike-tet" /></div>
        <div><label style={labelStyle}>Opombe (neobvezno)</label><textarea value={opombe} onChange={e => setOpombe(e.target.value)} placeholder="Stil, barve, posebne želje..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
      </div>
    </div>
  )
}

function Step3Tet({ datum, setDatum }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak 3</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        Izberi <em style={{ color: 'var(--color-primary-light)' }}>termin</em>
      </h2>
      <Koledar datum={datum} setDatum={setDatum} />
    </div>
  )
}

// ODSTRANJEVANJE
function Step2Odstr({ tipLaser, setTipLaser }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak 2</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        Vrsta <em style={{ color: 'var(--color-primary-light)' }}>tretmaja</em>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {LASER_TIPI.map(t => (
          <div key={t.id} onClick={() => setTipLaser(t.id)} style={{
            padding: '20px 24px', borderRadius: 12, cursor: 'pointer',
            border: tipLaser === t.id ? '1px solid var(--color-primary)' : '0.5px solid rgba(255,255,255,0.12)',
            background: tipLaser === t.id ? 'rgba(119,97,169,0.15)' : 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s',
          }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#fff', margin: '0 0 4px' }}>{t.naziv}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t.opis}</p>
            </div>
            {tipLaser === t.id && <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Step3Odstr({ tipLaser, velikost, setVelikost, pozicija, setPozicija, slike, setSlike, opombe, setOpombe }) {
  const jeTetovaze = tipLaser === 'tetovaze'
  const jePege = tipLaser === 'pege'
  const jeHollywood = tipLaser === 'hollywood'

  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak 3</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        Podrobnosti <em style={{ color: 'var(--color-primary-light)' }}>tretmaja</em>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Pozicija — samo za tetovaze in pege */}
        {!jeHollywood && (
          <div><label style={labelStyle}>Pozicija *</label><input value={pozicija} onChange={e => setPozicija(e.target.value)} placeholder="npr. zapestje, obraz, roka..." style={inputStyle} /></div>
        )}
        {/* Velikost — samo za tetovaze in pege */}
        {(jeTetovaze || jePege) && (
          <div><label style={labelStyle}>Velikost *</label><Dropdown value={velikost} onChange={setVelikost} placeholder="Izberi velikost" opcije={VELIKOSTI} /></div>
        )}
        {/* Fotografija — opcijska za tetovaze in pege */}
        {(jeTetovaze || jePege) && (
          <div>
            <label style={labelStyle}>Fotografija (neobvezno)</label>
            <SlikeUpload slike={slike} setSlike={setSlike} id="slike-odstr" />
          </div>
        )}
        <div><label style={labelStyle}>Opombe (neobvezno)</label><textarea value={opombe} onChange={e => setOpombe(e.target.value)} placeholder="Barva, starost, posebnosti..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
      </div>
    </div>
  )
}

function Step4Odstr({ datum, setDatum }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak 4</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        Izberi <em style={{ color: 'var(--color-primary-light)' }}>termin</em>
      </h2>
      <Koledar datum={datum} setDatum={setDatum} />
    </div>
  )
}

// pmu ne bo..

// ── PODATKI (zadnji korak pri vseh) ─────────────────────
function StepPodatki({ ime, setIme, priimek, setPriimek, email, setEmail, telefon, setTelefon, stepNum }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak {stepNum}</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
        Tvoji <em style={{ color: 'var(--color-primary-light)' }}>podatki</em>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={labelStyle}>Ime *</label><input value={ime} onChange={e => setIme(e.target.value)} placeholder="Jana" style={inputStyle} /></div>
          <div><label style={labelStyle}>Priimek *</label><input value={priimek} onChange={e => setPriimek(e.target.value)} placeholder="Novak" style={inputStyle} /></div>
        </div>
        <div><label style={labelStyle}>Email *</label><input value={email} onChange={e => setEmail(e.target.value)} placeholder="jana@email.com" type="email" style={inputStyle} /></div>
        <div><label style={labelStyle}>Telefon *</label><input value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="+386 40 123 456" style={inputStyle} /></div>
      </div>
    </div>
  )
}

// ── MAIN ─────────────────────────────────────────────────
export default function Booking() {
  const [step, setStep] = useState(1)
  const [storitev, setStoritev] = useState(null)
  const [datum, setDatum] = useState(null)
  const [velikost, setVelikost] = useState('')
  const [pozicija, setPozicija] = useState('')
  const [slike, setSlike] = useState([])
  const [opombe, setOpombe] = useState('')
  const [tipLaser, setTipLaser] = useState(null)
  const [ime, setIme] = useState('')
  const [priimek, setPriimek] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [poslano, setPoslano] = useState(false)
  const [loading, setLoading] = useState(false)

  // Tetoviranje: 1→2(spec)→3(termin)→4(podatki)
  // Odstranjevanje: 1→2(tip)→3(spec)→4(termin)→5(podatki)
  // PMU: 1→2(tip+opombe)→3(termin)→4(podatki)
  const skupajKorakov = storitev === 'odstranjevanje' ? 5 : 4

  const canNext = () => {
    if (step === 1) return !!storitev
    if (storitev === 'tetoviranje') {
      if (step === 2) return !!velikost && !!pozicija && slike.length > 0
      if (step === 3) return !!datum
      if (step === 4) return !!ime && !!priimek && !!email && !!telefon
    }
    if (storitev === 'odstranjevanje') {
      if (step === 2) return !!tipLaser
      if (step === 3) {
        if (tipLaser === 'hollywood') return true
        return !!pozicija && !!velikost
      }
      if (step === 4) return !!datum
      if (step === 5) return !!ime && !!priimek && !!email && !!telefon
    }
    return false
  }

  const handleSubmit = async () => {
    if (!canNext() || loading) return
    setLoading(true)
    try {
      let slikeUrls = []
      for (const slika of slike) {
        const fileName = `${Date.now()}_${slika.name}`
        const { error: uploadError } = await supabase.storage.from('rezervacije-slike').upload(fileName, slika)
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('rezervacije-slike').getPublicUrl(fileName)
          slikeUrls.push(urlData.publicUrl)
        }
      }
      const { error } = await supabase.from('rezervacije').insert([{
        storitev, datum, ime, priimek, email, telefon,
        status: 'rezervirano',
        tip_laser: tipLaser || null,
        velikost: velikost || null,
        pozicija: pozicija || null,
        opombe: opombe || null,
        slike_urls: slikeUrls.length > 0 ? slikeUrls : null,
      }])
      if (error) { alert('Prišlo je do napake. Poskusi znova.'); return }
      setPoslano(true)

      await supabase.functions.invoke('send-email', {
      body: {
        tip: 'rezervacija',
        ime,
        email,
        datum: datum.split('-').reverse().join('.'),
        storitev: storitevNaziv,
        tip_laser: tipLaser || '',
        velikost: velikost || '',
        pozicija: pozicija || '',
        opombe: opombe || '',
      }
    })

    } catch (err) {
      console.error(err)
      alert('Prišlo je do napake. Poskusi znova.')
    } finally {
      setLoading(false)
    }
  }

  const storitevNaziv = STORITVE.find(s => s.id === storitev)?.naziv || ''
  const zadnjiKorak = skupajKorakov

  const renderStep = () => {
    if (step === 1) return null
    if (storitev === 'tetoviranje') {
      if (step === 2) return <Step2Tet velikost={velikost} setVelikost={setVelikost} pozicija={pozicija} setPozicija={setPozicija} slike={slike} setSlike={setSlike} opombe={opombe} setOpombe={setOpombe} />
      if (step === 3) return <Step3Tet datum={datum} setDatum={setDatum} />
      if (step === 4) return <StepPodatki ime={ime} setIme={setIme} priimek={priimek} setPriimek={setPriimek} email={email} setEmail={setEmail} telefon={telefon} setTelefon={setTelefon} stepNum={4} />
    }
    if (storitev === 'odstranjevanje') {
      if (step === 2) return <Step2Odstr tipLaser={tipLaser} setTipLaser={setTipLaser} />
      if (step === 3) return <Step3Odstr tipLaser={tipLaser} velikost={velikost} setVelikost={setVelikost} pozicija={pozicija} setPozicija={setPozicija} slike={slike} setSlike={setSlike} opombe={opombe} setOpombe={setOpombe} />
      if (step === 4) return <Step4Odstr datum={datum} setDatum={setDatum} />
      if (step === 5) return <StepPodatki ime={ime} setIme={setIme} priimek={priimek} setPriimek={setPriimek} email={email} setEmail={setEmail} telefon={telefon} setTelefon={setTelefon} stepNum={5} />
    }
    return null
  }

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {SLIDES.map((src, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0 }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(12px)', transform: 'scale(1.05)' }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,16,0.82)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.2) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '120px 24px 80px', maxWidth: 580, margin: '0 auto' }}>
        {!poslano ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 300, margin: 0, color: '#fff' }}>
                Boo<em style={{ color: 'var(--color-primary-light)' }}>king</em>
              </h1>
            </div>

            <StepIndicator step={step} total={skupajKorakov} />

            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '40px 36px', marginBottom: 24 }}>
              {step === 1 && (
                <div>
                  <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-primary-50)', marginBottom: 12, textAlign: 'center' }}>Korak 1</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
                    Izberi <em style={{ color: 'var(--color-primary-light)' }}>storitev</em>
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {STORITVE.map(s => (
                      <div key={s.id} onClick={() => setStoritev(s.id)} style={{
                        padding: '24px 28px', borderRadius: 12,
                        border: storitev === s.id ? '1px solid var(--color-primary)' : '0.5px solid rgba(255,255,255,0.12)',
                        background: storitev === s.id ? 'rgba(119,97,169,0.15)' : 'rgba(255,255,255,0.05)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 0.2s ease',
                      }}>
                        <span style={{ fontSize: 24 }}>{s.icon}</span>
                        <div>
                          <p style={{ fontSize: 16, fontWeight: 500, color: '#fff', margin: '0 0 4px' }}>{s.naziv}</p>
                          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{s.opis}</p>
                        </div>
                        {storitev === s.id && <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {step > 1 && renderStep()}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: step > 1 ? 'space-between' : 'flex-end' }}>
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} style={{ padding: '14px 28px', borderRadius: 50, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.2)', color: '#fff' }}>← Nazaj</button>
              )}
              {step < zadnjiKorak ? (
                <button onClick={() => canNext() && setStep(s => s + 1)} style={{ padding: '14px 32px', borderRadius: 50, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: canNext() ? 'pointer' : 'not-allowed', background: canNext() ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', transition: 'all 0.2s' }}>Naprej →</button>
              ) : (
                <button onClick={handleSubmit} disabled={!canNext() || loading} style={{ padding: '14px 32px', borderRadius: 50, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: canNext() && !loading ? 'pointer' : 'not-allowed', background: canNext() ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', transition: 'all 0.2s' }}>{loading ? 'Pošiljam...' : 'Potrdi rezervacijo ✓'}</button>
              )}
            </div>
          </>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: '#fff', marginBottom: 16 }}>
              Rezervacija <em style={{ color: 'var(--color-primary-light)' }}>prejeta!<br /></em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.9)', marginBottom: 32 }}>
              <br />Za potrditev termina te prosim, da nakažeš avans v višini <strong style={{ color: '#fff' }}>50€</strong>.<br /><br />
              <span style={{ fontSize: 17 }}>Podrobnejša navodila za nakazilo si prejel/a po emailu.</span>
            </p>
            <Link to="/" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 50, background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', color: '#fff', textDecoration: 'none', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Nazaj na začetek</Link>
          </div>
        )}
      </div>
    </div>
  )
}