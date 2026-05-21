import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { tip, ime, email, datum, storitev, tip_laser, velikost, pozicija, opombe } = await req.json()

    let subject = ''
    let html = ''

    if (tip === 'rezervacija') {
      subject = 'Rezervacija prejeta :)'
      html = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Georgia, serif; background: #f9f6ff; padding: 40px 0; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
            <div style="background: #2d1f4e; padding: 40px 40px 32px; text-align: center;">
              <p style="color: #c4b0e8; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">OTattoo Studio</p>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 300; margin: 0; font-family: Georgia, serif;">
                Rezervacija <em style="color: #b89fe0;">prejeta</em> ✓
              </h1>
            </div>
            <div style="padding: 36px 20px;">
              <p style="font-size: 16px; color: #2d1f4e; margin: 0 0 24px;">Hej, <strong>${ime}</strong>!</p>
              <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 28px;">Hvala za tvojo rezervacijo pri OTattoo Studiu!</p>
              <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 16px;">
                Zaradi zavarovanja termina te prosim, da poravnaš <strong style="color: #2d1f4e;">avans v višini 50€</strong> vsaj <strong>48 ur</strong> po oddaji rezervacije. <strong>Termin bo potrjen šele po prejetem plačilu.</strong>
              </p>
              <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">✿ V <strong>zadevo/sporočilo</strong> nakazila <strong>obvezno</strong> napiši (lahko copy-paste):</p>
              <p style="font-size: 15px; color: #2d1f4e; margin: 0 0 20px; font-weight: 500; border: 2px solid #b89fe0; border-radius: 8px; padding: 12px 16px;">
                <strong>${ime}, ${storitev}, ${datum}</strong>
              </p>
              <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #000; margin: 0 0 16px;">✿ Izberi <strong>enega</strong> izmed naslednjih načinov plačila:</p>
              <div style="margin-bottom: 28px;">
                <p style="font-size: 14px; color: #2d1f4e; margin: 0 0 8px;"><strong>1. Flik:</strong> [tel. št.]</p>
                <p style="font-size: 14px; color: #2d1f4e; margin: 0 0 8px;"><strong>2. PayPal:</strong> [paypal]</p>
                <p style="font-size: 14px; color: #2d1f4e; margin: 0 0 8px;"><strong>3. TRR:</strong> [TRR podatki]</p>
              </div>
              <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 16px;">
                Če bi želel/a termin <strong>preklicati</strong>, te lepo prosim, da me obvestiš vsaj <strong>48 ur</strong> pred začetkom svojega termina (v primeru poznejše odpovedi si pridržujem pravico do obdržanja avansa). Za preklic me kontaktiraj preko spodaj navedenega Instagrama ali Gmaila. V sporočilu navedi svoje <strong>ime in datum</strong> rezervacije ter način na katerega želiš, da ti je denar povrnjen.
              </p>
              <p style="font-size: 14px; color: #777; margin: 0 0 4px;">Če imaš kakšno vprašanje, me najdeš na:</p>
              <p style="font-size: 14px; color: #777; margin: 0 0 28px;">
                📸 Instagram: <a href="https://instagram.com/otattoo_ink" style="color: #9b7fd4;">@otattoo_ink</a><br/>
                📧 Gmail: <a href="mailto:otaattoo.ink@gmail.com" style="color: #9b7fd4;">otaattoo.ink@gmail.com</a>
              </p>
              <p style="font-size: 15px; color: #2d1f4e; margin: 0;">Se vidiva! <br/><strong>Kaja :)</strong></p>
            </div>
            <div style="background: #f3eeff; padding: 24px 28px;">
              <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #9b7fd4; margin: 0 0 16px;">Podrobnosti rezervacije</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #888; font-size: 13px; width: 40%;">Storitev</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${storitev}</td></tr>
                <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Datum</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${datum}</td></tr>
                ${tip_laser ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Tip tretmaja</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${tip_laser}</td></tr>` : ''}
                ${velikost ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Velikost</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${velikost}</td></tr>` : ''}
                ${pozicija ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Pozicija</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${pozicija}</td></tr>` : ''}
                ${opombe ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Opombe</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px;">${opombe}</td></tr>` : ''}
              </table>
            </div>
            <div style="background: #2d1f4e; padding: 20px 40px; text-align: center;">
              <p style="font-size: 11px; color: #b89fe0; letter-spacing: 2px; text-transform: uppercase; margin: 0;">OTattoo Studio · Vrečerjeva ulica 1, Žalec</p>
            </div>
          </div>
        </body>
        </html>
      `
    } else if (tip === 'potrditev') {
      subject = 'Termin potrjen :)'
      html = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Georgia, serif; background: #f9f6ff; padding: 40px 0; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
            <div style="background: #2d1f4e; padding: 40px 40px 32px; text-align: center;">
              <p style="color: #c4b0e8; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">OTattoo Studio</p>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 300; margin: 0; font-family: Georgia, serif;">
                Termin <em style="color: #b89fe0;">potrjen</em>!
              </h1>
            </div>
            <div style="padding: 36px 20px;">
              <p style="font-size: 16px; color: #2d1f4e; margin: 0 0 24px;">Hej, <strong>${ime}</strong>!</p>
              <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 28px;">
                Tvoj termin je potrjen!
              </p>
              <div style="background: #f3eeff; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 6px 0; color: #888; font-size: 13px; width: 40%;">Storitev</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${storitev}</td></tr>
                  <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Datum</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${datum}</td></tr>
                  ${tip_laser ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Tip tretmaja</td><td style="padding: 6px 0; color: #2d1f4e; font-size: 13px; font-weight: 600;">${tip_laser}</td></tr>` : ''}
                </table>
              </div>
              <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 16px;">
                Če bi želel/a termin <strong>preklicati</strong>, te lepo prosim, da me obvestiš vsaj <strong>48 ur</strong> pred začetkom svojega termina (v primeru poznejše odpovedi si pridržujem pravico do obdržanja avansa). Za preklic me kontaktiraj preko spodaj navedenega Instagrama ali Gmaila. V sporočilu navedi svoje <strong>ime in datum</strong> rezervacije ter način na katerega želiš, da ti je denar povrnjen.
              </p>
              <p style="font-size: 14px; color: #777; margin: 0 0 4px;">Če imaš kakšno vprašanje, me najdeš na:</p>
              <p style="font-size: 14px; color: #777; margin: 0 0 28px;">
                📸 Instagram: <a href="https://instagram.com/otattoo_ink" style="color: #9b7fd4;">@otattoo_ink</a><br/>
                📧 Gmail: <a href="mailto:otaattoo.ink@gmail.com" style="color: #9b7fd4;">otaattoo.ink@gmail.com</a>
              </p>
              <p style="font-size: 15px; color: #2d1f4e; margin: 0;">Se vidiva! <br/><strong>Kaja :)</strong></p>
            </div>
            <div style="background: #2d1f4e; padding: 20px 40px; text-align: center;">
              <p style="font-size: 11px; color: #b89fe0; letter-spacing: 2px; text-transform: uppercase; margin: 0;">OTattoo Studio · Vrečerjeva ulica 1, Žalec</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OTattoo Studio <onboarding@resend.dev>',
        to: email,
        subject,
        html,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})