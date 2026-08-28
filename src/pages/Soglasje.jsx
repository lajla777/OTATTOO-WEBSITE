import { useState, useEffect } from 'react'

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 10,
  fontSize: 14,
  background: 'rgba(255,255,255,0.06)',
  border: '0.5px solid rgba(255,255,255,0.12)',
  color: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'Google Sans', sans-serif",
}

const labelStyle = {
  fontSize: 11,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  display: 'block',
  marginBottom: 8,
}

const errorStyle = (showErrors, condition) =>
  showErrors && condition
    ? {
        border: '1px solid rgba(255,80,80,0.95)',
        boxShadow: '0 0 0 3px rgba(255,80,80,0.14)',
      }
    : {}

const ErrorText = ({ show }) =>
  show ? (
    <p style={{ color: 'rgba(255,100,100,0.9)', fontSize: 11, margin: '7px 0 0' }}>
      To polje je obvezno.
    </p>
  ) : null

const SLIDES = ['/tatu5.webp']

// TODO: uredi/dodaj dejanske točke soglasja — vsaka je obvezna (stranka jo mora obkljukati, da lahko odda)
const TOCKE = [
  'Predhodno sem bil/a seznanjen/a z morebitnimi tveganji povezanimi s postopkom tetoviranja, katere med drugim zajemajo: infekcije, brazgotine, težje prepoznavanje melanoma, alergijske reakcije na pigment, milo ter ostala mazila in pripomočke, ki se uporabljajo med in po tetoviranju. Seznanjen/a sem z možnimi tveganji in želim nadaljevati s postopkom tetoviranja ter sprejmem možna tveganja.',
  'Tattoo studio mi je/bo podal natančna navodila za oskrbo tetovaže tako v ustni kot v pisni obliki. Navodila razumem in jih bom natančno upošteval/a. Razumem, da se lahko v nasprotnem primeru tetovaža vname, kar na njej lahko pusti dolgotrajne posledice. Če tattoo potrebuje popravilo zaradi moje malomarnosti, sem stroške popravila dolžan/na poravnati sam/a (v dogovoru s tattoo studiom).',
  'Tattoo studio Otattoo mi je omogočil, da postavim kakršno koli vprašanje glede samega postopka tetoviranja, nanj pa sem prejel/a odgovor.',
  'Nisem pod vplivom alkohola in/ali drog in se prostovoljno strinjam, da se tetoviram v tattoo studiu Otattoo.',
  'Ne trpim za naštetimi boleznimi: diabetes, epilepsija, hemofilija, srčne bolezni in ne jemljem zdravil, ki redčijo kri. Prav tako ne jemljem antibiotikov. Nimam nobenega drugega zdravstvenega ali kožnega stanja, ki bi lahko vplival na postopek tetoviranja in celjenja tetovaže. Nisem prejemnik/ca presajenega organa ali kostnega mozga, če sem, za to jemljem ustrezna zdravila, ki mi jih je zdravnik predpisal pred samim tetoviranjem. Nisem noseča in ne dojim. Nimam spolno prenosljivih bolezni in/ali okužb. Nimam psihičnih motenj, ki bi lahko odločale pri moji presoj glede tetoviranja. Z morebitnimi drugimi boleznimi sem predhodno seznanil/a tetoverja in upošteval/a njegove nasvete. Če je bilo to potrebno, sem se o tetoviranju posvetoval/a tudi z ustreznim zdravnikom.',
  'Zavedam se, da tattoo studio Otattoo ne odgovarja za pomen izbranega motiva, prav tako ne odgovarja za napačno črkovanje napisov, ki izhajajo iz poslanih idej, flashov ali fotografij drugih tetovaž.',
  'Razumem, da so možna odstopanja v barvi in motivu izbranega dizajna in dejanske tetovaže na mojem telesu. Razumem tudi, da tetovaža s časom zbledi in izgubi ostrino zaradi nezavarovanega izpostavljanja soncu in naravnega postopka razpršitve pigmenta v koži.',
  'Vem, da je tetovaža permanentna sprememba mojega videza in je lahko odstranjena le z laserskim ali zdravstvenim posegom. Vem tudi, da kljub odstranitvi moja koža na tem mestu nikoli ne bo takšna, kot je bila pred tetoviranjem.',
  'Odrekam se vsem avtorskim pravicam fotografij mene in moje tetovaže in soglašam z njihovo reprodukcijo tako v fizični kot digitalni obliki. Fotografija se lahko uporablja v promocijske namene podjetja. Če se s tem ne strinjam, sem o tem pravočasno obvestil/a tetoverja.        ----------*Zavedamo se pomena varovanja tvojih osebnih podatkov in spoštujemo tvojo zasebnost, zato z vsako posredovano informacijo ravnamo skrbno. Osebne podatke zbiramo, uporabljamo in obdelujemo v skladu z Zakonom o varstvu osebnih podatkov (ZVOP-1-UPB1, Ur. I. RS, 3t. 94/2007) in Splošno uredbo o varstvu podatkov (GDPR).',
  'Seznanjen/a sem z dejstvom, da Tattoo studio Otattoo ne upošteva reklamacij za storitve. Hkrati vem, da ne odgovarja za morebitno nastalo škodo na oblačilih.',
  'Morebitne spore bom reševal/a po mirni poti. V kolikor to ni mogoče, je Tattoo studio Otattoo v primeru tožbe oproščen stroškov odvetnikov stranke in drugih stroškov pravnih postopkov, ki jih morebiti sprožim proti tattoo studiu ali tetoverju. Strinjam se, da bo pravne postopke reševalo pristojno sodišče v Žalcu.',
  'Potrjujem, da sem polnoleten/na, za kar sem si priskrbel/a ustrezno identifikacijo in da sem popolnoma priseben/na in zmožen/na podpisati splošne pogoje.',
  'Soglašam, da sem imel/a možnost in čas splošne pogoje natančno prebrati in jih razumem ter uradno sprejmem.',
  'S soglašanjem s splošnimi pogoji prav tako soglašam z »Navodili pred mojim terminom za tetovažo«, ki sem jih prejel/a bodisi v pisni ali e-obliki'
]

export default function Soglasje() {
  const [ime, setIme] = useState('')
  const [priimek, setPriimek] = useState('')
  const [datum, setDatum] = useState('')
  const [telefon, setTelefon] = useState('')
  const [obkljukano, setObkljukano] = useState(Array(TOCKE.length).fill(false))
  const [showErrors, setShowErrors] = useState(false)
  const [oddano, setOddano] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleTocka = (i) => {
    setObkljukano(prev => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  const vseObvezneObkljukane = obkljukano.every(Boolean)

  const canSubmit = () => !!ime && !!priimek && !!datum && !!telefon && vseObvezneObkljukane

  const handleSubmit = () => {
    if (!canSubmit()) {
      setShowErrors(true)
      return
    }

    setShowErrors(false)

    // TODO: tukaj shrani soglasje (npr. insert v Supabase tabelo `soglasja`)
    // { ime, priimek, datum, telefon, tocke: TOCKE, obkljukano, podpisano_ob: new Date().toISOString() }

    setOddano(true)
  }

  return (
    <div style={{ fontFamily: "'Google Sans', sans-serif", color: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {SLIDES.map((src, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0 }}>
            <img src={src} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(12px)', transform: 'scale(1.05)' }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,16,0.82)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(119,97,169,0.2) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '100px 16px 60px' : '120px 24px 80px', maxWidth: 620, margin: '0 auto' }}>
        {!oddano ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
              <h1 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 52 : 72, fontWeight: 300, margin: 0, color: '#fff' }}>
                Splošni pogoji tetoviranja
              </h1>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 36px', marginBottom: 36 }}>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                 Prosim, da obrazec izpolniš skrbno, saj z izpolnitvijo izraziš nepreklicno strinjanje s spodaj navedenim. Pri vsakem odstavku je kvadratek, katerega obkljukaš. Dokument se hrani v arhivu podjetja.
                 Če imaš kakšno vprašanje, ti na njega med samim reševanjem z veseljem odgovorim preko Instagrama ali Gmaila, ki sta navedena na koncu te strani.
                </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 36px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Ime *</label>
                    <input value={ime} onChange={e => setIme(e.target.value)} placeholder="Jana" style={{ ...inputStyle, ...errorStyle(showErrors, !ime) }} />
                    <ErrorText show={showErrors && !ime} />
                  </div>

                  <div>
                    <label style={labelStyle}>Priimek *</label>
                    <input value={priimek} onChange={e => setPriimek(e.target.value)} placeholder="Novak" style={{ ...inputStyle, ...errorStyle(showErrors, !priimek) }} />
                    <ErrorText show={showErrors && !priimek} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Datum *</label>
                    <input type="date" value={datum} onChange={e => setDatum(e.target.value)} style={{ ...inputStyle, ...errorStyle(showErrors, !datum) }} />
                    <ErrorText show={showErrors && !datum} />
                  </div>

                  <div>
                    <label style={labelStyle}>Kontaktna številka *</label>
                    <input value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="041 123 456" style={{ ...inputStyle, ...errorStyle(showErrors, !telefon) }} />
                    <ErrorText show={showErrors && !telefon} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {TOCKE.map((besedilo, i) => {
                  const checked = obkljukano[i]
                  const napaka = showErrors && !checked

                  return (
                    <div
                      key={i}
                      onClick={() => toggleTocka(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                        padding: isMobile ? '14px 16px' : '18px 20px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        border: napaka ? '1px solid rgba(255,80,80,0.85)' : checked ? '1px solid var(--color-primary)' : '0.5px solid rgba(255,255,255,0.12)',
                        background: checked ? 'rgba(119,97,169,0.15)' : 'rgba(255,255,255,0.05)',
                        boxShadow: napaka ? '0 0 0 3px rgba(255,80,80,0.14)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div
                        style={{
                          flexShrink: 0,
                          marginTop: 2,
                          width: 20,
                          height: 20,
                          borderRadius: 5,
                          border: checked ? 'none' : '1px solid rgba(255,255,255,0.3)',
                          background: checked ? 'var(--color-primary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          color: '#fff',
                        }}
                      >
                        {checked && '✓'}
                      </div>

                      <div>
                        <p style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--color-primary-light)', margin: '0 0 6px', display: 'flex', gap: 8, alignItems: 'center' }}>
                          {i + 1}. točka
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                          {besedilo}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '14px 32px',
                  borderRadius: 50,
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  background: canSubmit() ? 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  transition: 'all 0.2s',
                }}
              >
                Potrdi soglasje ✓
              </button>
            </div>
          </>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: isMobile ? '44px 24px' : '60px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
            <h2 style={{ fontFamily: "'Google Sans', serif", fontSize: isMobile ? 26 : 32, fontWeight: 300, color: '#fff', margin: '0 0 16px' }}>
              Soglasje <em style={{ color: '#b89fe0' }}>oddano</em>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Hvala, {ime}!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
