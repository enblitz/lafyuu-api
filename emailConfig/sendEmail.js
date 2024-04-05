const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendForgotPassEmail = async (email, password) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'Forgot Password',
        text: `your new passWord is: ${password}`
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        // console.log(`Nodemailer error sending email to ${user.email}`, error)
        throw new Error(`Error sending forgot password email: ${error}`)
    }
}

const sendOTPToEmail = async (email, OTP) => {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'OTP Verification',
        text: `your 4 digit OTP is : ${OTP}`
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        // console.log(`Nodemailer error sending email to ${user.email}`, error)
        throw new Error(`Error sending forgot password email: ${error}`)
    }
}

module.exports = {sendForgotPassEmail, sendOTPToEmail}