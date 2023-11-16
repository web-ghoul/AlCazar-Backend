const nodemailer = require('nodemailer');

const sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.OFFICIAL_EMAIL,
            pass: process.env.OFFICIAL_EMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.OFFICIAL_EMAIL,
        to: email,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error.message);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendMail }