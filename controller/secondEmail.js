const {transporter}=require('../utils/nodemailer');


async function sendEmail(){
    const mailOptions = {
        from: `PERKS <shahbazrafique429@gmail.com>`,
        to: 'shahbazrafique101@gmail.com',
        subject: `Motor Quotation request recieved for: SDF534633`,
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
                <h1>Quotation - SDF35363</h1>
        
                <!-- Email Content -->
                <p>Dear Shahbaz,</p>
                <p>We refer to your request for quotation(s) dated 12-16-2023 12:34:00 for vehicle registration number SDF35363.</p>
                <p>We attach herewith the quotation(s) requested. We trust our quotation(s) will meet with your requirements. Kindly click on the link below to select your preferred quotation and proceed with the renewal.</p>
                <br/>
                <!-- Styled Link -->
                <a href="#" class="btn-link text-decoration-none" style="color: purple; border: 1px solid orange; padding: 8px 16px; border-radius: 4px;">Select Quotation</a>
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