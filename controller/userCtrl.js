const User = require('../models/user')

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

        res.status(200).json({
            status: {
                message: 'login success!',
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