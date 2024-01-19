const {transporter}=require('../utils/nodemailer');


async function sendEmail(regNo,name,email){
    const mailOptions = {
        from: `PERKS <shahbazrafique429@gmail.com>`,
        to: email,
        subject: `Motor Quotation request recieved for: ${regNo}`,
        html : `
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
                <h1>Request for Quotation - ${regNo}</h1>

                <!-- Email Content -->
                <p>Dear ${name},</p>
                <p>Thank you for considering Perks.</p>
                <p>We have received your request for quotation, and our customer service consultants are attending to your request.</p>
                <p>We will forward the quotation within 24-hours. If you have any queries, kindly contact us at +603-2779 2419 or email us at <a href="mailto:enquiry@perks.com.my">enquiry@perks.com.my</a>. Please state your vehicle registration number on all enquiries.</p>

                <!-- Contact Information -->
                <div class="contact-info">
                    <p>Perks Customer Service</p>
                    <p>Phone: +603-2779 2419</p>
                    <p>Email: <a href="mailto:enquiry@perks.com.my">enquiry@perks.com.my</a></p>
                </div>
            </div>
        </body>
        </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        }
         else {
            console.log("done");
        }
      });
}

module.exports={
    sendEmail,
}