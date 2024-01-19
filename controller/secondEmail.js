const {transporter}=require('../utils/nodemailer');
const path = require('path');

async function sendEmail(regno,date,name,id,email,count,files){
    const attachments = [];
    console.log(count,files);
    for (let i = 0; i < count; i++) {
        attachments.push({
        path: path.join(__dirname, `../public/files/${files[`file${i + 1}`]}`)
        });
    }
    console.log(attachments);
    const mailOptions = {
        from: `PERKS <shahbazrafique429@gmail.com>`,
        to: email,
        subject: `Motor Quotation request recieved for: ${regno}`,
        html : `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Request for Quotation</title>
            <!-- Include Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
            <div class="email-container">
                <!-- Banner Image -->
                <img class="banner" src="https://cdn.glitch.global/4188ec93-5053-4d82-af14-6b255616e392/JPG%206.jpg?v=1702713266564" alt="Banner" style="width: 100%; max-width: 600px; height: auto;">
        
                <!-- Heading -->
                <h1>Quotation - ${regno}</h1>
        
                <!-- Email Content -->
                <p>Dear ${name},</p>
                <p>We refer to your request for quotation(s) dated ${new Date(date).toLocaleString()} for vehicle registration number ${regno}.</p>
                <p>We attach herewith the quotation(s) requested. We trust our quotation(s) will meet with your requirements. Kindly click on the link below to select your preferred quotation and proceed with the renewal.</p>
                <br/>
                <!-- Styled Link -->
                <a href="https://perks-vehicles.netlify.app/vehicle-details?quotationid=${id}" class="btn-link text-decoration-none" style="color: purple; border: 1px solid orange; padding: 8px 16px; border-radius: 4px;">Select Quotation</a>
                <br/>
                <br/>
                <!-- Contact Information -->
                <div class="contact-info">
                    <p>If you have any queries and/or need clarification, please contact us at +603-2779 2419 or email us at <a href="mailto:enquiry@perks.com.my">enquiry@perks.com.my</a>. Please state your vehicle registration number on all enquiries.</p>
                    <p>Thank you</p>
                    <p>Yours Sincerely,</p>
                    <p>Perks Customer Service</p>
                </div>
            </div>
        
            <!-- Include Bootstrap JS (Optional) -->
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        </html>
        
        `,
        attachments: attachments,
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