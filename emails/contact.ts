export function generateContactEmail(
  name: string,
  message: string,
  email: string
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Message received</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Hi ${name},</h2>
        <p>Thanks for your message. I'll get back to you soon.</p>
        
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <strong>Your message:</strong><br/>
          ${message}
        </div>
        
        <p style="color: #666; font-size: 14px;">This is an automated confirmation sent to ${email}</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        
        <p style="color: #666; font-size: 14px;">
          Juan Almanza<br/>
          <a href="https://almanza.cc" style="color: #333;">almanza.cc</a>
        </p>
      </body>
    </html>
  `;
}
