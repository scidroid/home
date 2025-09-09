export function generateReplyEmail(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Thanks for your message</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out! I've received your message and will review it shortly.</p>
        
        <p>I typically respond within 24-48 hours. For urgent matters, you can find me on <a href="https://twitter.com/scidroid" style="color: #333;">Twitter</a>.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        
        <p style="color: #666; font-size: 14px;">
          Juan Almanza<br/>
          <a href="https://scidroid.co" style="color: #333;">scidroid.co</a>
        </p>
      </body>
    </html>
  `;
}