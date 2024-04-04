const jwt = require('jsonwebtoken')
const Token = require('../models/login')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) throw new Error('please provide a valid token!')

        const decode = jwt.verify(token, process.env.JWT_SECURE_KEY)
        // console.log(decode)

        const userToken = await Token.findOne({ where: { user_id: decode.id } })
        const user = await User.findOne({ where: { user_id: userToken.user_id } })
        if (!user) throw new Error('user not found!')
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: 'unauthorized!'
        })
    }
}

module.exports = auth