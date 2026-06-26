const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

transporter.verify((error, success) => {
    if (error) {
        console.error('Erreur de configuration du serveur mail :', error)
    } else {
        console.log('Serveur mail prêt')
    }
})

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        text,
    }

    return transporter.sendMail(mailOptions)
}

const confirmationEmail = async (to, subject, text) => {
    try {
        await sendEmail(to, subject, text)
        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}

module.exports = { transporter, sendEmail, confirmationEmail }
