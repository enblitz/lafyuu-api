const crypto = require('crypto')


exports.genearteOTP = (min, max) => {
    const otp = crypto.randomInt(min, max)
    return otp
}

