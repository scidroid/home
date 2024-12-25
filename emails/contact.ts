export function generateContactEmail(
  name: string,
  message: string,
  email: string
) {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Thanks for reaching out!</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .message-box {
            background-color: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .social-link {
            color: #007bff;
            text-decoration: none;
          }
          .social-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h2>Hi ${name}! 👋</h2>
        <p>Thanks for reaching out! I've received your message and will get back to you as soon as possible.</p>
        
        <div class="message-box">
          <strong>Your message:</strong><br/>
          ${message}
        </div>
        
        <p>I'll respond to you at: ${email}</p>
        
        <div class="signature">
          <p><strong>Juan Almanza</strong></p>
          <p>
            <a href="mailto:hi@scidroid.co" class="social-link">hi@scidroid.co</a> • 
            <a href="https://twitter.com/scidroid" class="social-link">@scidroid</a>
          </p>
        </div>
      </body>
    </html>
  `;
}
