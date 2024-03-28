const sendForgotPassEmail = require('../emailConfig/sendEmail');
const Token = require('../models/login');
const User = require('../models/user');
const ganerateAuthToken = require('../utils/genearteToken');
const generatePass = require('../utils/generatePassword');
const { validEmail, validPassword, validStringInput, validDOB, validMobileNumber } = require('../utils/validation');
const { hashPass, verifyPass } = require('../utils/hashPass');
const { gender } = require('../utils/checkGender');
const { sendOTP } = require('../utils/sendOTP');
const { genearteOTP } = require('../utils/generateOTP');
const { generateOTPToken } = require('../utils/generateOTPToken');

exports.signUp = async (req, res, next) => {
    try {
        const { full_name, email, password, re_password } = req.body

        const findUser = await User.findOne({ where: { email } })

        if (findUser) throw new Error('you are already register with this email!')

        const valid_email = validEmail(email)
        const validPass = validPassword(password)
        const validName = validStringInput(full_name)

        if (re_password !== validPass) {
            throw new Error('please provide same password!')
        }

        const hash = await hashPass(validPass)

        const user = await User.create({
            full_name: validName,
            email: valid_email,
            password: hash,
            user_name: email
        })

        const userDATA = user.toJSON()

        res.status(200).json({
            status: {
                message: 'registration success!',
                code: 200,
                error: false
            },
            data: {
                user: {
                    ...userDATA
                }
            }
        })

        // console.log('success');
    } catch (error) {
        // console.log(error.message);
        next(error)
    }
}

exports.loginCtrl = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: { email: username }
        })

        if (!user) {
            throw new Error('User Not Register!')
        }

        const verifyPassword = await verifyPass(password, user.password)

        if (!verifyPassword) {
            throw new Error('invalid password!')
        }

        const token = await ganerateAuthToken(user.user_id)

        await Token.create({
            user_id: user.user_id,
            active_token: token
        })

        // console.log(user.toJSON());
        const userDATA = user.toJSON()

        delete userDATA.password

        res.status(200).json({
            status: {
                message: 'login success!',
                code: 200,
                error: false
            },
            data: {
                user: {
                    ...userDATA
                },
                token
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.getUserProfileCtrl = async (req, res, next) => {
    try {
        const user_id = req.user.user_id

        const profile = await User.findOne({
            where: { user_id },
            attributes: {
                exclude: ['password']
            }
        })

        res.status(200).json({
            status: {
                message: "Successfully profile fetched!",
                code: 200,
                error: false
            },
            data: {
                user: profile
            }
        })
    } catch (error) {
        next(error)
    }
}


exports.sendForgotPass = async (req, res, next) => {
    try {
        const email = req.body.email

        const user = await User.findOne({ where: { email } })

        if (!user) throw new Error('user not register yet!')

        const newPassWord = generatePass(8)

        await sendForgotPassEmail(user.email, newPassWord)

        user.password = newPassWord
        await user.save()

        res.status(200).json({
            message: 'Forgot password Sent to Your Email successfully',
            code: 200,
            error: false
        })
    } catch (error) {
        next(error)
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const { full_name, gender_id, DOB, mobile_number } = req.body

        const user_id = req.user.user_id

        const user = await User.findOne({ where: { user_id } })

        if (full_name) {
            user.full_name = validStringInput(full_name);
        }

        let userGender
        let verifygender
        if (gender_id) {
            verifygender = gender.find((data) => data.id === parseInt(gender_id))
            // console.log(verifygender);
            if (!verifygender) {
                throw new Error('Please Provide Valid gender ID!')
            }
            userGender = verifygender.gender
            user.gender = userGender
        }

        if (DOB) {
            user.DOB = validDOB(DOB);
        }

        if (mobile_number) {
            const isMobile = validMobileNumber(mobile_number)
            user.mobile_number = isMobile;
        }

        if (req.file) {
            user.user_profile = req.file.path;
        }

        await user.save()

        const userPass = user.toJSON()
        delete userPass.password

        res.status(200).json({
            status: {
                message: "Successfully profile update!",
                code: 200,
                error: false
            },
            data: {
                user: {
                    ...userPass,
                    gender: verifygender
                }
            }
        })

    } catch (error) {
        next(error)
    }
}


exports.changePass = async (req, res, next) => {
    try {
        const { old_password, new_password } = req.body
        const user_id = req.user.user_id
        const user = await User.findOne({ where: { user_id } })

        if (!old_password) throw new Error('please provide old passsword!')

        const verify_pass = await verifyPass(old_password, user.password)
        if (!verify_pass) throw new Error('The old password provided is incorrect.');
        if (!new_password) throw new Error('please provide a new password!')

        if (new_password === old_password) throw new Error('The new password must be different from the old password.')

        const isStrong = validPassword(new_password)
        const encrypt = await hashPass(isStrong)
        user.password = encrypt
        await user.save()

        res.status(200).json({
            status: {
                message: "Password changed successfully!",
                code: 200,
                error: false
            },
            data: {
                user
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.sendOtpToMobile = async (req, res, next) => {
    try {
        const { mobile_number } = req.body;

        const user_id = req.user.user_id

        const user = await User.findOne({ where: { user_id } })

        if (!mobile_number) throw new Error('Please Provide Mobile Number!')

        const isValidMobileNumber = validMobileNumber(mobile_number)

        const otp = genearteOTP(1000, 9999)
        // console.log(otp)
        const otpToken = generateOTPToken(otp)
        await sendOTP(otp, mobile_number)

        user.mobile_number = isValidMobileNumber.phone
        await user.save()

        // console.log(isValidMobileNumber)

        res.status(200).json({
            status: {
                message: "otp send on your mobile number!",
                code: 200,
                error: false
            },
            data: {
                user,
                otpToken
            }
        })
    } catch (error) {
        next(error)
    }
};


exports.verifyOTPByUser = async (req, res, next) => {
    try {
        const user_id = req.user.user_id

        const user = await User.findOne({ where: { user_id } })
        const { otp } = req.body
        const sendOTP = req.otp
        // console.log(sendOTP)

        if (!otp) {
            throw new Error('Please Enter OTP!')
        }

        if (otp.length !== 4) {
            throw new Error('Please Provide 4 Digit OTP!')
        }

        if (parseInt(otp) !== sendOTP) throw new Error('Invalid OTP!')

        res.status(200).json({
            status: {
                message: "OTP Verify successfully!",
                code: 200,
                error: false
            },
            data: user
        })

    } catch (error) {
        next(error)
    }
}