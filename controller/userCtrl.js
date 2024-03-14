const sendForgotPassEmail = require('../emailConfig/sendEmail');
const Token = require('../models/login');
const User = require('../models/user');
const ganerateAuthToken = require('../utils/genearteToken');
const generatePass = require('../utils/generatePassword');

exports.signUp = async (req, res) => {
    try {
        await User.create(req.body)
        console.log('success');
    } catch (error) {
        console.log('error');
    }
}

exports.loginCtrl = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            throw new Error('User Not Register!')
        }

        if(user.password !== password){
            throw new Error ('password is incorrect!')
        }

        const token  = await ganerateAuthToken(user.user_id)

        await Token.create({
            user_id: user.user_id,
            active_token: token
        })

        res.status(200).json({
            status: {
                message: 'login success!',
                code: 200,
                error: false
            },
            data: {
                user,
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
            where: {user_id},
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
            data: profile
        })
    } catch (error) {
        next(error)
    }
}


exports.sendForgotPass = async (req, res, next) => {
    try {
        const email = req.body.email

        const user = await User.findOne({where : {email}})

        if(!user) throw new Error('user not register yet!')

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

