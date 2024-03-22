const { cloudinaryUpload } = require('../config/multerConfig');
const cloudinary = require('../config/cloudinaryConfig')
const sendForgotPassEmail = require('../emailConfig/sendEmail');
const Token = require('../models/login');
const User = require('../models/user');
const ganerateAuthToken = require('../utils/genearteToken');
const generatePass = require('../utils/generatePassword');
const { validEmail, validPassword, validStringInput, validDOB, validMobileNumber } = require('../utils/validation');

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

        const user = await User.create({
            full_name: validName,
            email: valid_email,
            password: validPass,
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
                    ...userDATA,
                    re_password
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

        if (user.password !== password) {
            throw new Error('password is incorrect!')
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
                    username,
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
        const { full_name, newPassWord, re_password, email, gender, DOB, mobile_number } = req.body

        const user_id = req.user.user_id

        const user = await User.findOne({ where: { user_id } })

        if (full_name) {
            user.full_name = validStringInput(full_name);
        }

        if (newPassWord ) {
            user.password = validPassword(newPassWord);
        }

        if(re_password !== newPassWord){
            throw new Error('please provide same password!')
        }

        if (email) {
            user.email = validEmail(email);
        }

        if (gender) {
            user.gender = gender;
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

        // console.log(user.toJSON())

        await user.save()

        res.status(200).json({
            status: {
                message: "Successfully profile update!",
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
