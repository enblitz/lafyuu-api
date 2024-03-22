const validator = require('validator')

exports.validEmail = (email) => {
    if(!validator.isEmail(email)) {
        throw new Error ('Invalid email address')
    }
    return email
}


exports.validPassword = (password) => {
    //passwor must be 8 character
    if(!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong password')
    }
    return password
}

exports.validStringInput = (value) => {
    if(!value.match(/^[a-zA-Z -]+$/)) throw new Error ('please provide only alphabetic characters')
    return value
}

exports.validDOB = (DOB) =>  {
    if(!validator.isDate(DOB, { format: 'DD/MM/YYYY', strictMode : true })) throw new Error ('please provide valid Birth-Date')
    return DOB
}

exports.validMobileNumber = (number) => {
    if(!validator.isMobilePhone(number, 'en-IN')){
        throw new Error ('please provide valid mobileNumber')
    }
    return number
}