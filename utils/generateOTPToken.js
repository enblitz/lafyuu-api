const jwt = require('jsonwebtoken')

exports.generateOTPToken = (otp) => {
    try {
        const token = jwt.sign({ otp }, "usertokonforlafyuuApp", { expiresIn: '5m' })
        return token
    } catch (error) {
        throw error
    }
}