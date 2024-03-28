const validator = require('validator')
const PhoneNumber = require('libphonenumber-js');

exports.validEmail = (email) => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email address')
    }
    return email
}


exports.validPassword = (password) => {
    //passwor must be 8 character
    if (!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong password')
    }
    return password
}

exports.validStringInput = (value) => {
    if (!value.match(/^[a-zA-Z -]+$/)) throw new Error('please provide only alphabetic characters')
    return value
}

exports.validDOB = (DOB) => {
    if (!validator.isDate(DOB, { format: 'DD/MM/YYYY', strictMode: true })) throw new Error('please provide valid Birth-Date')
    return DOB
}

// exports.validMobileNumber = (number) => {
//     if(!validator.isMobilePhone(number, 'en-IN')){
//         throw new Error ('please provide valid mobileNumber')
//     }
//     return number
// }

// exports.validMobileNumber = (number) => {
// try {
//     const mobileNumberStr = typeof number === 'string' ? number : number.toString()
//     console.log(number)
//     const mobileNumber = PhoneNumber.parse(mobileNumberStr, 'IN')
//     console.log(mobileNumber)

//     if(!PhoneNumber.isValidPhoneNumber(mobileNumber) || mobileNumber.country !== 'IN'){
//         throw new Error('Please Provide Valid Mobile Number')
//     }
//     return mobileNumber.formatInternational()
// } catch (error) {
//     throw error
// }
// }

exports.validMobileNumber = (mobileNumber) => {
    // Parse the input mobile number
    const phoneNumber = PhoneNumber.parse(mobileNumber, 'IN');

    // Check if the parsed number is valid and belongs to India
    if (!PhoneNumber.isValidNumber(phoneNumber) || phoneNumber.country !== 'IN') {
        throw new Error('Please provide a valid Indian mobile number');
    }

    // Return the formatted number including the country code
    return phoneNumber
};


exports.checkValidStringType = (value) => {
    try {
        if (typeof value !== 'string') {
            throw new Error('Please Provide Alphabetic Value For Name or Title!')
        }
        return value
    } catch (error) {
        throw error
    }
}