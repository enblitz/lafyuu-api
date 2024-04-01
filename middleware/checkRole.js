const User = require('../models/user')
const checkRole = async (req, res, next) => {
    try {
        const user = await User.findOne({where : {user_id: req.user.user_id}})

        if(user.role === 'Admin'){
            next()
        }else{
            throw new Error('Access Denied, You are not Admin!')
        }
    } catch (error) {
        next(error)
    }
}


module.exports = checkRole