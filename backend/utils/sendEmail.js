const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        service: 'gmail',
        secure: true,
        auth: {
            user: 'teamimitators007@gmail.com',
            pass: 'vatsal@1234'
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;