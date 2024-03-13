const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'divyarajsinhrayjada3@gmail.com',
        pass: 'utww muua tlup hcps'
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendForgotPassEmail = async (email, password) => {
    const mailOptions = {
        from: 'divyarajsinhrayjada3@gmail.com',
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

module.exports = sendForgotPassEmail