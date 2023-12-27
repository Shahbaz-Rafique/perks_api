const { transporter } = require('../utils/nodemailer');

async function sendEmail(regNo, name, path) {
  const mailOptions = {
    from: `PERKS <shahbazrafique429@gmail.com>`,
    to: 'shahbazrafique101@gmail.com',
    subject: `Cover Note: ${regNo}`,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Request for Quotation</title>
        </head>
        <body>
            <div class="email-container">
                <!-- Banner Image -->
                <img class="banner" src="https://cdn.glitch.global/4188ec93-5053-4d82-af14-6b255616e392/JPG%206.jpg?v=1702713266564" alt="Banner" style="width: 100%; max-width: 600px; height: auto;">

                <!-- Heading -->
                <h1>Cover Note - ${regNo}</h1>

                <!-- Email Content -->
                <p>Dear ${name},</p>
                <p>Thank you for your purchase of insurance and road tax (if selected) for vehicle registration number ${regNo}.</p>
                <p>We attach herewith the cover note for your purchase and your road tax (if selected) will be delivered to the residential address provided.</p>
                <p>If you have any queries and/or need clarification, please contact us at +603-2779 2419 or email us at enquiry@perks.com.my. Please state your vehicle registration number on all enquiries.</p>

                <!-- Contact Information -->
                <div class="contact-info">
                    <p>Thank you</p>
                    <p>Yours Sincerely,</p>
                    <p>Perks Customer Service</p>
                </div>
            </div>
        </body>
        </html>
        `,
    attachments: [
      {
        filename: 'coverNote.pdf', 
        path: './test.pdf', 
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  sendEmail,
};
