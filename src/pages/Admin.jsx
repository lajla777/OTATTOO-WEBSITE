import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const DNEVI = ['Po', 'To', 'Sr', 'Če', 'Pe', 'So', 'Ne']

export default function Admin() {
  const [geslo, setGeslo] = useState('')
  const [prijavljen, setPrijavljen] = useState(false)
  const [rezervacije, setRezervacije] = useState([])
  const [nedosegljivi, setNedosegljivi] = useState([])
  const [izbranDatum, setIzbranDatum] = useState(null)
  const [mesec, setMesec] = useState(new Date().getMonth())
  const [leto, setLeto] = useState(new Date().getFullYear())
  const [pogled, setPogled] = useState('koledar')
  const [filterStatus, setFilterStatus] = useState('vse')
  const [izbranRezervacija, setIzbranRezervacija] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [loading, setLoading] = useState(false)

  const ADMIN_GESLO = 'otattoo2025'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const naloziPodatke = async () => {
  setLoading(true)
  const { data: rez } = await supabase.from('rezervacije').select('*').order('datum', { ascending: true })
  const { data: ned } = await supabase.from('nedosegljivi').select('*')
  if (rez) setRezervacije(rez)
  if (ned) {
    console.log('nedosegljivi iz baze:', ned)
    setNedosegljivi(ned.map(n => n.datum))
  }
  setLoading(false)
}

  useEffect(() => {
    if (prijavljen) naloziPodatke()
  }, [prijavljen])


const posodobiStatus = async (id, novStatus) => {
  const r = rezervacije.find(rez => rez.id === id)

  const { error } = await supabase
    .from('rezervacije')
    .update({ status: novStatus })
    .eq('id', id)

  if (error) {
    alert('Napaka pri posodabljanju statusa.')
    return
  }

  if (r && (novStatus === 'potrjeno' || novStatus === 'zavrnjeno')) {
    await supabase.functions.invoke('send-email', {
      body: {
        ime: r.ime,
        email: r.email,
        datum: r.datum.split('-').reverse().join('.'),
        storitev: r.storitev,
        tip_laser: r.tip_laser || '',
        velikost: r.velikost || '',
        pozicija: r.pozicija || '',
        opombe: r.opombe || '',
        cas: r.cas || '',
        status: novStatus,
      },
    })
  }

  await naloziPodatke()

  if (izbranRezervacija?.id === id) {
    setIzbranRezervacija(prev => ({ ...prev, status: novStatus }))
  }
}

  const potrdiAkcijo = async (e, id, novStatus, sporocilo) => {
    e.stopPropagation()
    if (!window.confirm(sporocilo)) return
    await posodobiStatus(id, novStatus)
  }

  const izbrisiRezervacijo = async (e, id) => {
  e.stopPropagation()
  if (!window.confirm('Ali si prepričana da želiš izbrisati to rezervacijo?')) return
  await supabase.from('rezervacije').delete().eq('id', id)
  await naloziPodatke()
  if (izbranRezervacija?.id === id) setIzbranRezervacija(null)
}

  const toggleNedosegljiv = async (dateStr) => {
    if (nedosegljivi.includes(dateStr)) {
      await supabase.from('nedosegljivi').delete().eq('datum', dateStr)
      setNedosegljivi(prev => prev.filter(d => d !== dateStr))
    } else {
      await supabase.from('nedosegljivi').insert([{ datum: dateStr }])
      setNedosegljivi(prev => [...prev, dateStr])
    }
  }

  const getDanStatus = (dateStr) => {
  const d = new Date(dateStr)
  const dan = d.getDay()
  if (dan === 0 || dan === 6) return 'vikend'
  if (nedosegljivi.includes(dateStr)) return 'ni_mozno'
  
  // Išči aktivne rezervacije (ne zavrnjene)
  const aktivna = rezervacije.find(r => r.datum === dateStr && r.status !== 'zavrnjeno')
  if (!aktivna) return 'prosto'
  if (aktivna.status === 'potrjeno') return 'zasedeno'
  if (aktivna.status === 'rezervirano') return 'rezervirano'
  return 'prosto'
}

  const getDanStyle = (status, jeIzbran) => {
    const base = { textAlign: 'center', padding: '8px 4px', borderRadius: 8, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }
    if (jeIzbran) return { ...base, background: 'var(--color-primary)', color: '#fff', fontWeight: 600 }
    if (status === 'prosto') return { ...base, background: 'rgba(119,97,169,0.15)', color: '#fff', border: '0.5px solid rgba(119,97,169,0.3)' }
    if (status === 'rezervirano') return { ...base, background: 'rgba(230,160,30,0.2)', color: 'rgba(255,200,80,0.9)' }
    if (status === 'zasedeno') return { ...base, background: 'rgba(60,180,100,0.2)', color: 'rgba(100,220,140,0.9)' }
    if (status === 'ni_mozno') return { ...base, background: 'rgba(180,60,60,0.2)', color: 'rgba(255,100,100,0.6)' }
    if (status === 'vikend') return { ...base, background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.2)', cursor: 'default' }
    return base
  }

  const imeMeseca = new Date(leto, mesec, 1).toLocaleString('sl-SI', { month: 'long', year: 'numeric' })
  const prvaDneva = new Date(leto, mesec, 1).getDay()
  const dniVMesecu = new Date(leto, mesec + 1, 0).getDate()
  const offset = prvaDneva === 0 ? 6 : prvaDneva - 1

  const rezervacijeNaDatum = rezervacije.filter(r => r.datum === izbranDatum)
  const filtrirane = rezervacije.filter(r => filterStatus === 'vse' ? true : r.status === filterStatus)
  const vCakanju = rezervacije.filter(r => r.status === 'rezervirano').length

  const cardStyle = {
    background: 'rgba(13,10,20,0.88)', backdropFilter: 'blur(12px)',
    border: '0.5px solid rgba(119,97,169,0.25)',
    boxShadow: '0 4px 32px rgba(119,97,169,0.15)',
    borderRadius: 16,
  }

  const btnStyle = (barva) => ({
    flex: 1, padding: '8px', borderRadius: 50, fontSize: 11, cursor: 'pointer',
    background: barva === 'green' ? 'rgba(60,180,100,0.2)' : barva === 'red' ? 'rgba(180,60,60,0.2)' : 'rgba(230,160,30,0.2)',
    border: `0.5px solid ${barva === 'green' ? 'rgba(60,180,100,0.4)' : barva === 'red' ? 'rgba(180,60,60,0.4)' : 'rgba(230,160,30,0.4)'}`,
    color: barva === 'green' ? 'rgba(100,220,140,0.9)' : barva === 'red' ? 'rgba(255,100,100,0.9)' : 'rgba(255,200,80,0.9)',
  })

  const SlikeGalerija = ({ urls }) => {
    if (!urls || urls.length === 0) return null
    return (
      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
          Referenčne slike
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {urls.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer">
              <img src={url} alt={`slika ${i+1}`} loading="lazy"
  decoding="async" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 8, border: '0.5px solid rgba(119,97,169,0.3)' }} />
            </a>
          ))}
        </div>
      </div>
    )
  }

  const GumbiStatus = ({ r, size = 'small' }) => {
    const p = size === 'small' ? '8px' : '10px'
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {r.status === 'rezervirano' && (
          <>
            <button onClick={e => potrdiAkcijo(e, r.id, 'potrjeno', 'Ali si prepričana da želiš potrditi ta termin?')}
              style={{ ...btnStyle('green'), padding: p }}>✓ Potrdi</button>
            <button onClick={e => potrdiAkcijo(e, r.id, 'zavrnjeno', 'Ali si prepričana da želiš zavrniti ta termin?')}
              style={{ ...btnStyle('red'), padding: p }}>✕ Zavrni</button>
          </>
        )}
        {r.status === 'potrjeno' && (
          <button onClick={e => potrdiAkcijo(e, r.id, 'zavrnjeno', 'Ali si prepričana da želiš preklicati ta termin?')}
            style={{ ...btnStyle('red'), padding: p }}>✕ Prekliči</button>
        )}
        {r.status === 'zavrnjeno' && (
  <div style={{ display: 'flex', gap: 8, flex: 1 }}>
    <button onClick={e => potrdiAkcijo(e, r.id, 'rezervirano', 'Ali si prepričana da želiš obnoviti ta termin?')}
      style={{ ...btnStyle('yellow'), padding: p }}>↩ Obnovi</button>
    <button onClick={e => izbrisiRezervacijo(e, r.id)}
      style={{ ...btnStyle('red'), padding: p }}>🗑 Izbriši</button>
  </div>
)}
      </div>
    )
  }

  if (!prijavljen) {
    return (
      <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#0a0810', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ ...cardStyle, padding: '48px 32px', width: '100%', maxWidth: 340, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: '#fff', marginBottom: 32 }}>
            Admin <em style={{ color: 'var(--color-primary-light)' }}>panel</em>
          </h2>
          <input type="password" placeholder="Geslo" value={geslo}
            onChange={e => setGeslo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && geslo === ADMIN_GESLO && setPrijavljen(true)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: 10, fontSize: 14, background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)', color: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: "'Montserrat', sans-serif", marginBottom: 16 }}
          />
          <button onClick={() => geslo === ADMIN_GESLO && setPrijavljen(true)}
            style={{ width: '100%', padding: 14, borderRadius: 50, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', border: 'none', color: '#fff' }}>
            Prijava
          </button>
          {geslo && geslo !== ADMIN_GESLO && <p style={{ color: 'rgba(255,100,100,0.7)', fontSize: 12, marginTop: 12 }}>Napačno geslo</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#0a0810', minHeight: '100vh', color: '#fff', padding: isMobile ? '90px 12px 60px' : '100px 24px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 44, fontWeight: 300, margin: 0 }}>
            Admin <em style={{ color: 'var(--color-primary-light)' }}>panel</em>
          </h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {vCakanju > 0 && (
              <button onClick={() => { setPogled('rezervacije'); setFilterStatus('rezervirano') }} style={{
                padding: '8px 16px', borderRadius: 50, fontSize: 11, letterSpacing: 1,
                textTransform: 'uppercase', cursor: 'pointer',
                background: 'rgba(230,160,30,0.2)', border: '0.5px solid rgba(230,160,30,0.4)',
                color: 'rgba(255,200,80,0.9)',
              }}>⏳ {vCakanju} v čakanju</button>
            )}
            <button onClick={naloziPodatke} style={{ padding: '8px 14px', borderRadius: 50, fontSize: 16, cursor: 'pointer', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)', color: '#fff' }}>↻</button>
            <button onClick={() => setPrijavljen(false)} style={{ padding: '8px 14px', borderRadius: 50, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }}>
              {isMobile ? '✕' : 'Odjava'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ key: 'koledar', label: '📅 Koledar' }, { key: 'rezervacije', label: '📋 Rezervacije' }].map(t => (
            <button key={t.key} onClick={() => setPogled(t.key)} style={{
              padding: '10px 20px', borderRadius: 50, fontSize: 12, letterSpacing: 1,
              textTransform: 'uppercase', cursor: 'pointer',
              background: pogled === t.key ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'rgba(255,255,255,0.06)',
              border: pogled === t.key ? 'none' : '0.5px solid rgba(255,255,255,0.12)',
              color: '#fff',
            }}>{t.label}</button>
          ))}
        </div>

        {/* KOLEDAR POGLED */}
        {pogled === 'koledar' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: 20 }}>
            <div style={{ ...cardStyle, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <button onClick={() => { if (mesec === 0) { setMesec(11); setLeto(l => l-1) } else setMesec(m => m-1) }}
                  style={{ background: 'none', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 16 }}>‹</button>
                <p style={{ color: '#fff', fontSize: 15, fontWeight: 500, margin: 0, textTransform: 'capitalize' }}>{imeMeseca}</p>
                <button onClick={() => { if (mesec === 11) { setMesec(0); setLeto(l => l+1) } else setMesec(m => m+1) }}
                  style={{ background: 'none', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 16 }}>›</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                {DNEVI.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>{d}</div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {Array(offset).fill(null).map((_, i) => <div key={`e${i}`} />)}
                {Array(dniVMesecu).fill(null).map((_, i) => {
                  const dan = i + 1
                  const dateStr = `${leto}-${String(mesec+1).padStart(2,'0')}-${String(dan).padStart(2,'0')}`
                  const status = getDanStatus(dateStr)
                  const jeIzbran = izbranDatum === dateStr
                  return (
                    <div key={dan} onClick={() => { if (status !== 'vikend') { setIzbranDatum(dateStr); setIzbranRezervacija(null) } }}
                      style={getDanStyle(status, jeIzbran)}>{dan}</div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20, justifyContent: 'center' }}>
                {[
                  { barva: 'rgba(119,97,169,0.4)', label: 'Prosto' },
                  { barva: 'rgba(230,160,30,0.4)', label: 'Rezervirano' },
                  { barva: 'rgba(60,180,100,0.4)', label: 'Zasedeno' },
                  { barva: 'rgba(180,60,60,0.4)', label: 'Ni možno' },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: l.barva }} />
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desna stran */}
            <div style={{ ...cardStyle, padding: 24, overflowY: 'auto', maxHeight: isMobile ? 'none' : '80vh' }}>
              {!izbranDatum ? (
                <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 60, fontSize: 13 }}>Klikni na datum za podrobnosti</p>
              ) : (
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, margin: '0 0 16px', color: '#fff', textTransform: 'capitalize' }}>
                    {new Date(izbranDatum + 'T12:00:00').toLocaleDateString('sl-SI', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h3>

                  {getDanStatus(izbranDatum) !== 'vikend' && (
                    <button onClick={() => toggleNedosegljiv(izbranDatum)} style={{
                      width: '100%', padding: '10px', borderRadius: 10, fontSize: 11,
                      letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', marginBottom: 16,
                      background: nedosegljivi.includes(izbranDatum) ? 'rgba(60,180,100,0.15)' : 'rgba(180,60,60,0.15)',
                      border: nedosegljivi.includes(izbranDatum) ? '0.5px solid rgba(60,180,100,0.4)' : '0.5px solid rgba(180,60,60,0.4)',
                      color: nedosegljivi.includes(izbranDatum) ? 'rgba(100,220,140,0.9)' : 'rgba(255,100,100,0.9)',
                    }}>
                      {nedosegljivi.includes(izbranDatum) ? '✓ Označi kot dosegljivo' : '✕ Označi kot nedosegljivo'}
                    </button>
                  )}

                  {rezervacijeNaDatum.length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center', marginTop: 20 }}>Ni rezervacij za ta datum</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {rezervacijeNaDatum.map(r => (
                        <div key={r.id} onClick={() => setIzbranRezervacija(izbranRezervacija?.id === r.id ? null : r)}
                          style={{
                            padding: 16, borderRadius: 12, cursor: 'pointer',
                            border: `0.5px solid ${izbranRezervacija?.id === r.id ? 'var(--color-primary)' : r.status === 'rezervirano' ? 'rgba(230,160,30,0.4)' : r.status === 'potrjeno' ? 'rgba(60,180,100,0.4)' : 'rgba(180,60,60,0.3)'}`,
                            background: izbranRezervacija?.id === r.id ? 'rgba(119,97,169,0.15)' : 'rgba(255,255,255,0.04)',
                          }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', margin: 0 }}>{r.ime} {r.priimek}</p>
                            <span style={{
                              fontSize: 10, padding: '3px 10px', borderRadius: 50,
                              background: r.status === 'rezervirano' ? 'rgba(230,160,30,0.2)' : r.status === 'potrjeno' ? 'rgba(60,180,100,0.2)' : 'rgba(180,60,60,0.2)',
                              color: r.status === 'rezervirano' ? 'rgba(255,200,80,0.9)' : r.status === 'potrjeno' ? 'rgba(100,220,140,0.9)' : 'rgba(255,100,100,0.8)',
                            }}>{r.status}</span>
                          </div>
                          <p style={{ fontSize: 12, color: 'var(--color-primary-light)', margin: '4px 0 0', textTransform: 'capitalize' }}>
                            {r.storitev}{r.tip_laser ? ` · ${r.tip_laser}` : ''}</p>

                          {izbranRezervacija?.id === r.id && (
                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                                {r.cas && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>🕐 {r.cas}</p>}
                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>📧 {r.email}</p>
                                {r.instagram && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>📸 {r.instagram}</p>}
                                {r.velikost && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>📐 {r.velikost}</p>}
                                {r.pozicija && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>📍 {r.pozicija}</p>}
                                {r.opombe && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0, fontStyle: 'italic' }}>"{r.opombe}"</p>}
                              </div>
                              <SlikeGalerija urls={r.slike_urls} />
                              <div style={{ marginTop: 12 }}>
                                <GumbiStatus r={r} size="small" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* REZERVACIJE POGLED */}
        {pogled === 'rezervacije' && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[
                { key: 'vse', label: 'Vse' },
                { key: 'rezervirano', label: 'Rezervirano' },
                { key: 'potrjeno', label: 'Potrjeno' },
                { key: 'zavrnjeno', label: 'Zavrnjeno' },
              ].map(f => (
                <button key={f.key} onClick={() => setFilterStatus(f.key)} style={{
                  padding: '8px 16px', borderRadius: 50, fontSize: 11, letterSpacing: 1,
                  textTransform: 'uppercase', cursor: 'pointer',
                  background: filterStatus === f.key ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'rgba(255,255,255,0.06)',
                  border: filterStatus === f.key ? 'none' : '0.5px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                }}>{f.label}{filterStatus === f.key ? ` (${filtrirane.length})` : ''}</button>
              ))}
            </div>

            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 40 }}>Nalagam...</p>
            ) : filtrirane.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 40 }}>Ni rezervacij</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtrirane.map(r => (
                  <div key={r.id} style={{
                    ...cardStyle, padding: 20,
                    border: `0.5px solid ${r.status === 'rezervirano' ? 'rgba(230,160,30,0.4)' : r.status === 'potrjeno' ? 'rgba(60,180,100,0.4)' : 'rgba(180,60,60,0.3)'}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 500, color: '#fff', margin: '0 0 2px' }}>{r.ime} {r.priimek}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 2px' }}>{r.email}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{r.telefon}</p>
                      </div>
                      <span style={{
                        fontSize: 10, padding: '4px 12px', borderRadius: 50, flexShrink: 0,
                        background: r.status === 'rezervirano' ? 'rgba(230,160,30,0.2)' : r.status === 'potrjeno' ? 'rgba(60,180,100,0.2)' : 'rgba(180,60,60,0.2)',
                        color: r.status === 'rezervirano' ? 'rgba(255,200,80,0.9)' : r.status === 'potrjeno' ? 'rgba(100,220,140,0.9)' : 'rgba(255,100,100,0.8)',
                      }}>{r.status}</span>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, marginBottom: 12 }}>
                      <p style={{ fontSize: 13, color: 'var(--color-primary-light)', margin: '0 0 4px', textTransform: 'capitalize' }}>{r.storitev}{r.tip_laser ? ` · ${r.tip_laser}` : ''}</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '0 0 2px' }}>📅 {r.datum}</p>
                      {r.velikost && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 2px' }}>📐 {r.velikost}</p>}
                      {r.pozicija && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 2px' }}>📍 {r.pozicija}</p>}
                      {r.opombe && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '4px 0 0', fontStyle: 'italic' }}>"{r.opombe}"</p>}
                      <SlikeGalerija urls={r.slike_urls} />
                    </div>
                    <GumbiStatus r={r} size="large" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}