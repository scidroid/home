export function generateReplyEmail(name: string, message: string) {
  const formattedMessage = message.replace(/\n/g, '<br/>');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Reply from Juan Almanza</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Hi ${name},</h2>

        <p>${formattedMessage}</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="color: #666; font-size: 14px;">
          Juan Almanza<br/>
          <a href="https://scidroid.co" style="color: #333;">scidroid.co</a>
        </p>
      </body>
    </html>
  `;
}