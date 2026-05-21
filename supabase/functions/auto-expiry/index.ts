import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = 'https://ensoqvarqtldspcwtbrc.supabase.co'
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_KEY')!
serve(async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // Poišči vse rezervacije ki so potekle
  const { data: potekle, error } = await supabase
    .from('rezervacije')
    .select('*')
    .eq('status', 'rezervirano')
    .lt('expires_at', new Date().toISOString())

  if (error) return new Response(JSON.stringify({ error }), { status: 500 })
  if (!potekle || potekle.length === 0) return new Response('Ni poteklih rezervacij', { status: 200 })

  for (const r of potekle) {
    // Posodobi status
    await supabase.from('rezervacije').update({ status: 'zavrnjeno' }).eq('id', r.id)

    // Pošlji email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OTattoo Studio <onboarding@resend.dev>',
        to: r.email,
        subject: 'Rezervacija potekla – OTattoo Studio',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Georgia, serif; background: #f9f6ff; padding: 40px 0; margin: 0;">
            <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              <div style="background: #2d1f4e; padding: 40px 40px 32px; text-align: center;">
                <p style="color: #c4b0e8; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">OTattoo Studio</p>
                <h1 style="color: #ffffff; font-size: 28px; font-weight: 300; margin: 0; font-family: Georgia, serif;">
                  Rezervacija <em style="color: #b89fe0;">potekla</em>
                </h1>
              </div>
              <div style="padding: 36px 20px;">
                <p style="font-size: 16px; color: #2d1f4e; margin: 0 0 24px;">Hej, <strong>${r.ime}</strong>!</p>
                <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 24px;">
                  Ker v predvidenem roku 3 delovnih dni nismo prejeli avansa, smo tvojo rezervacijo za <strong style="color: #2d1f4e;">${r.datum.split('-').reverse().join('.')}</strong> žal morali preklicati in termin sprostiti.
                </p>
                <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 28px;">
                  Če še vedno želiš priti, te vabim, da oddaš novo rezervacijo.
                </p>
                <div style="text-align: center; margin-bottom: 28px;">
                  <a href="https://otattoo.si/booking" style="display: inline-block; padding: 14px 36px; background: linear-gradient(135deg, #4a3480, #7761a9); color: #fff; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; border-radius: 50px;">
                    Nova rezervacija
                  </a>
                </div>
                <p style="font-size: 14px; color: #777; margin: 0 0 4px;">Če imaš kakšno vprašanje, me najdeš na:</p>
                <p style="font-size: 14px; color: #777; margin: 0 0 28px;">
                  📸 Instagram: <a href="https://instagram.com/otattoo_ink" style="color: #9b7fd4;">@otattoo_ink</a><br/>
                  📧 Gmail: <a href="mailto:otaattoo.ink@gmail.com" style="color: #9b7fd4;">otaattoo.ink@gmail.com</a>
                </p>
                <p style="font-size: 15px; color: #2d1f4e; margin: 0;">Lep pozdrav,<br/><strong>Kaja :)</strong></p>
              </div>
              <div style="background: #2d1f4e; padding: 20px 40px; text-align: center;">
                <p style="font-size: 11px; color: #b89fe0; letter-spacing: 2px; text-transform: uppercase; margin: 0;">OTattoo Studio · Vrečerjeva ulica 1, Žalec</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    })
  }

  return new Response(JSON.stringify({ potekle: potekle.length }), { status: 200 })
})