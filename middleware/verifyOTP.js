const jwt = require('jsonwebtoken')

const veriftOTP = async (req, res, next) => {
    try {
        // const  token = req.header('Authorization').replace('Bearer ', '')
        const token = req.header('OTP')
        const decodeOTP = jwt.verify(token, "usertokonforlafyuuApp") 
        // console.log(decodeOTP)
        req.otp = decodeOTP.otp
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = veriftOTP