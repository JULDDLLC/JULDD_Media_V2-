import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, name } = await req.json()

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      throw new Error('Resend API key not configured')
    }

    // Send welcome email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'JULDD Media <hello@julddmedia.com>',
        to: [email],
        subject: '🎵 Welcome to the JULDD Media Family!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #001C30 0%, #003366 100%); color: white; border-radius: 16px; overflow: hidden;">
            <div style="padding: 40px 30px; text-align: center;">
              <h1 style="color: #00FFB0; font-size: 32px; margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                Welcome to JULDD Media! ✨
              </h1>
              
              <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; color: #ffffff;">
                ${name ? `Hi ${name}!` : 'Hello there!'} 
                Thank you for joining our magical community of dreamers and creators!
              </p>
              
              <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 25px; margin: 30px 0; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
                <h2 style="color: #FF59F8; margin-bottom: 15px;">What's Coming Your Way:</h2>
                <ul style="text-align: left; padding-left: 20px; line-height: 1.8;">
                  <li>🎵 Exclusive early access to new songs</li>
                  <li>🎨 Behind-the-scenes character development</li>
                  <li>🛍️ Special discounts on merchandise</li>
                  <li>📚 Free coloring pages and activities</li>
                  <li>🎪 Updates on live events and shows</li>
                </ul>
              </div>
              
              <div style="margin: 30px 0;">
                <a href="https://julddmedia.com/songs" style="display: inline-block; background: linear-gradient(45deg, #00FFB0, #FF59F8); color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 255, 176, 0.3);">
                  🎵 Explore Our Songs
                </a>
              </div>
              
              <p style="font-size: 14px; color: #cccccc; margin-top: 40px;">
                Follow us on social media for daily doses of creativity and fun!<br>
                <a href="https://tiktok.com/@julddmedia" style="color: #00FFB0; text-decoration: none;">TikTok</a> • 
                <a href="https://twitter.com/julddmedia" style="color: #00FFB0; text-decoration: none;">Twitter</a> • 
                <a href="https://youtube.com/@julddmedia" style="color: #00FFB0; text-decoration: none;">YouTube</a>
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                <p style="font-size: 12px; color: #999999;">
                  You're receiving this email because you subscribed to JULDD Media updates.<br>
                  <a href="{{unsubscribe_url}}" style="color: #999999;">Unsubscribe</a> if you no longer wish to receive these emails.
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      throw new Error(`Failed to send email: ${errorData}`)
    }

    const emailResult = await emailResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully!',
        emailId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending newsletter email:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})