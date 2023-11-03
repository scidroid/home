export function generateContactEmail(
  name: string,
  message: string,
  email: string
) {
  // Written with issuemailer.com!

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>I will get back to you ASAP</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <p>Hi ${name}!</p>
        <p>Thank you for contacting me. I will get back to you as soon as possible.</p>
        <p>Your email: ${email}</p>
        <p>Your message: ${message}</p>
        <br/>
        <p><strong>Juan Almanza</strong> (@scidroid)</p>
        <p>
          <a href="mailto:hi@scidroid.co">
            hi@scidroid.co
          </a>
        </p>
      </body>
    </html>
  `;
}
